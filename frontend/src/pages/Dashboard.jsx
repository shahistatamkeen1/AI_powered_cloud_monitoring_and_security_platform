import { useEffect, useMemo, useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

const COLORS = ['#ef4444', '#f59e0b', '#22c55e']

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalVMs: 4,
    activeAlerts: 0,
    criticalAlerts: 0,
    cpu: 0,
    memory: 0,
    network: 0,
  })

  const [metricsTrend, setMetricsTrend] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [timeFilter, setTimeFilter] = useState('1min')

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setError('')

        const [metricsRes, alertsRes] = await Promise.all([
          fetch('http://127.0.0.1:8000/metrics'),
          fetch('http://127.0.0.1:8000/alerts'),
        ])

        if (!metricsRes.ok || !alertsRes.ok) {
          throw new Error('Could not connect to backend')
        }

        const metricsData = await metricsRes.json()
        const alertsData = await alertsRes.json()

        const safeAlerts = Array.isArray(alertsData) ? alertsData : []
        const activeAlerts = safeAlerts.length
        const criticalAlerts = safeAlerts.filter(
          (alert) => alert.severity === 'Critical'
        ).length

        const summary = metricsData.summary || {}
        const trend = Array.isArray(metricsData.trend) ? metricsData.trend : []

        setStats({
          totalVMs: 4,
          activeAlerts,
          criticalAlerts,
          cpu: Number(summary.cpu) || 0,
          memory: Number(summary.memory) || 0,
          network: Number(summary.network) || 0,
        })

        setMetricsTrend(
          trend.map((item, index) => ({
            id: index,
            time: item.time || '',
            recorded_at: item.recorded_at || null,
            cpu: Number(item.cpu) || 0,
            memory: Number(item.memory) || 0,
            network: Number(item.network) || 0,
          }))
        )
      } catch (err) {
        setError(err.message || 'Could not connect to backend')
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
    const interval = setInterval(fetchDashboardData, 10000)

    return () => clearInterval(interval)
  }, [])

  const groupedTrend = useMemo(() => {
    if (!metricsTrend.length) return []

    // If backend returns real timestamp, use precise grouping.
    const hasRealTimestamp = metricsTrend.some((item) => item.recorded_at)

    if (hasRealTimestamp) {
      const bucketMinutes =
        timeFilter === '1min' ? 1 :
        timeFilter === '5min' ? 5 :
        timeFilter === '15min' ? 15 : 60

      const buckets = {}

      metricsTrend.forEach((item) => {
        const date = new Date(item.recorded_at)
        if (Number.isNaN(date.getTime())) return

        const bucketDate = new Date(date)
        bucketDate.setSeconds(0, 0)

        const minute = bucketDate.getMinutes()
        const flooredMinute = Math.floor(minute / bucketMinutes) * bucketMinutes
        bucketDate.setMinutes(flooredMinute)

        const key = bucketDate.toISOString()

        if (!buckets[key]) {
          buckets[key] = {
            time: bucketDate.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
            cpuTotal: 0,
            memoryTotal: 0,
            networkTotal: 0,
            count: 0,
          }
        }

        buckets[key].cpuTotal += item.cpu
        buckets[key].memoryTotal += item.memory
        buckets[key].networkTotal += item.network
        buckets[key].count += 1
      })

      return Object.values(buckets).map((bucket) => ({
        time: bucket.time,
        cpu: Number((bucket.cpuTotal / bucket.count).toFixed(2)),
        memory: Number((bucket.memoryTotal / bucket.count).toFixed(2)),
        network: Number((bucket.networkTotal / bucket.count).toFixed(2)),
      }))
    }

    // Fallback for current backend response that only has visible "time"
    const minuteBuckets = {}

    metricsTrend.forEach((item) => {
      const key = item.time

      if (!minuteBuckets[key]) {
        minuteBuckets[key] = {
          time: item.time,
          cpuTotal: 0,
          memoryTotal: 0,
          networkTotal: 0,
          count: 0,
        }
      }

      minuteBuckets[key].cpuTotal += item.cpu
      minuteBuckets[key].memoryTotal += item.memory
      minuteBuckets[key].networkTotal += item.network
      minuteBuckets[key].count += 1
    })

    const mergedByMinute = Object.values(minuteBuckets).map((bucket) => ({
      time: bucket.time,
      cpu: Number((bucket.cpuTotal / bucket.count).toFixed(2)),
      memory: Number((bucket.memoryTotal / bucket.count).toFixed(2)),
      network: Number((bucket.networkTotal / bucket.count).toFixed(2)),
    }))

    let step = 1
    if (timeFilter === '1min') step = 1
    if (timeFilter === '5min') step = 5
    if (timeFilter === '15min') step = 15
    if (timeFilter === '1hr') step = 60

    const result = []

    for (let i = 0; i < mergedByMinute.length; i += step) {
      const chunk = mergedByMinute.slice(i, i + step)
      if (!chunk.length) continue

      const avgCpu = chunk.reduce((sum, item) => sum + item.cpu, 0) / chunk.length
      const avgMemory = chunk.reduce((sum, item) => sum + item.memory, 0) / chunk.length
      const avgNetwork = chunk.reduce((sum, item) => sum + item.network, 0) / chunk.length

      result.push({
        time: chunk[chunk.length - 1].time,
        cpu: Number(avgCpu.toFixed(2)),
        memory: Number(avgMemory.toFixed(2)),
        network: Number(avgNetwork.toFixed(2)),
      })
    }

    return result
  }, [metricsTrend, timeFilter])

  const cpuTrend = useMemo(
    () =>
      groupedTrend.map((item) => ({
        time: item.time,
        value: item.cpu,
      })),
    [groupedTrend]
  )

  const memoryTrend = useMemo(
    () =>
      groupedTrend.map((item) => ({
        time: item.time,
        recorded_at: item.recorded_at,
        value: item.memory,
      })),
    [groupedTrend]
  )

  const networkTrend = useMemo(
    () =>
      groupedTrend.map((item) => ({
        time: item.time,
        recorded_at: item.recorded_at,
        value: Number((item.network / 1024 / 1024).toFixed(2)),
      })),
    [groupedTrend]
  )

  const severityData = useMemo(
    () => [
      { name: 'Critical', value: stats.criticalAlerts },
      {
        name: 'Warning',
        value: Math.max(stats.activeAlerts - stats.criticalAlerts, 0),
      },
      {
        name: 'Healthy',
        value: Math.max(stats.totalVMs - stats.activeAlerts, 0),
      },
    ],
    [stats]
  )

  if (loading) {
    return <p className="text-gray-500">Loading dashboard...</p>
  }

  if (error) {
    return <p className="text-red-500">{error}</p>
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-500">
            Monitor system health, alerts, and AI-powered insights.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-600 font-medium">
            Time Filter:
          </label>
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm"
          >
            <option value="1min">1 min</option>
            <option value="5min">5 min</option>
            <option value="15min">15 min</option>
            <option value="1hr">1 hr</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <StatCard title="Total VMs" value={stats.totalVMs} />
        <StatCard
          title="Active Alerts"
          value={stats.activeAlerts}
          valueClass="text-red-500"
        />
        <StatCard
          title="Critical Alerts"
          value={stats.criticalAlerts}
          valueClass="text-orange-500"
        />
        <StatCard
          title="Average CPU"
          value={`${stats.cpu}%`}
          valueClass="text-blue-500"
        />
        <StatCard
          title="Network"
          value={`${(stats.network / 1024 / 1024).toFixed(2)} MB`}
          valueClass="text-purple-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard title={`CPU Usage Trend (${labelFromFilter(timeFilter)})`}>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={cpuTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" minTickGap={30} />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#2563eb"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title={`Memory Usage Trend (${labelFromFilter(timeFilter)})`}>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={memoryTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" minTickGap={30} />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#7c3aed"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title={`Network Usage Trend (${labelFromFilter(timeFilter)})`}>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={networkTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" minTickGap={30} />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#9333ea"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Alert Severity Distribution">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={severityData}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                label
              >
                {severityData.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  )
}

function labelFromFilter(filter) {
  if (filter === '1min') return '1 Min'
  if (filter === '5min') return '5 Min'
  if (filter === '15min') return '15 Min'
  if (filter === '1hr') return '1 Hour'
  return filter
}

function StatCard({ title, value, valueClass = '' }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className={`text-2xl font-bold ${valueClass}`}>{value}</h2>
    </div>
  )
}

function ChartCard({ title, children }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <h2 className="text-2xl font-semibold mb-6">{title}</h2>
      {children}
    </div>
  )
}