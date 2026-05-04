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
  const [aiInsights, setAiInsights] = useState([])
  const [aiHealth, setAiHealth] = useState('')
  const [aiRecommendation, setAiRecommendation] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [timeFilter, setTimeFilter] = useState('1min')

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setError('')

        const [summaryRes, historyRes, alertsRes, insightsRes] = await Promise.all([
          fetch('http://52.234.161.141:8000/metrics/summary'),
          fetch('http://52.234.161.141:8000/metrics/history'),
          fetch('http://52.234.161.141:8000/alerts'),
          fetch('http://52.234.161.141:8000/metrics/ai-insights'),
        ])

        if (!summaryRes.ok || !historyRes.ok || !alertsRes.ok || !insightsRes.ok) {
          throw new Error('Could not connect to backend')
        }

        const summaryData = await summaryRes.json()
        const historyData = await historyRes.json()
        const alertsData = await alertsRes.json()
        const insightsData = await insightsRes.json()

        const safeAlerts = Array.isArray(alertsData) ? alertsData : []
        const activeAlerts = safeAlerts.length
        const criticalAlerts = safeAlerts.filter(
          (alert) => alert.severity === 'Critical'
        ).length

        const trend = Array.isArray(historyData) ? historyData : []

        setStats({
          totalVMs: 4,
          activeAlerts,
          criticalAlerts,
          cpu: Number(summaryData.cpu) || 0,
          memory: Number(summaryData.memory) || 0,
          network: Number(summaryData.network) || 0,
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

        setAiInsights(Array.isArray(insightsData.insights) ? insightsData.insights : [])
        setAiHealth(insightsData.health || '')
        setAiRecommendation(insightsData.recommendation || '')
      } catch (err) {
        setError(err.message || 'Could not connect to backend')
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
    const interval = setInterval(fetchDashboardData, 5000)

    return () => clearInterval(interval)
  }, [])

  const groupedTrend = useMemo(() => {
    if (!metricsTrend.length) return []

    const step =
      timeFilter === '1min' ? 1 :
      timeFilter === '5min' ? 5 :
      timeFilter === '15min' ? 15 : 60

    const result = []

    for (let i = 0; i < metricsTrend.length; i += step) {
      const chunk = metricsTrend.slice(i, i + step)
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
        value: item.memory,
      })),
    [groupedTrend]
  )

  const networkTrend = useMemo(
    () =>
      groupedTrend.map((item) => ({
        time: item.time,
        value: item.network,
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

      {aiHealth === 'Critical' && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4">
          <h2 className="text-lg font-bold mb-1">Critical AI Alert</h2>
          <p>{aiRecommendation || 'Immediate attention recommended by AI analysis.'}</p>
        </div>
      )}

      {aiHealth === 'Warning' && (
        <div className="mb-6 bg-orange-50 border border-orange-200 text-orange-700 rounded-xl p-4">
          <h2 className="text-lg font-bold mb-1">AI Warning</h2>
          <p>{aiRecommendation || 'AI detected conditions that should be monitored closely.'}</p>
        </div>
      )}

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
          title="Network Usage"
          value={`${stats.network}`}
          valueClass="text-purple-500"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
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

      <ChartCard title="AI Insights">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-gray-600">Current Health:</span>
          <span className={healthBadgeClass(aiHealth)}>
            {aiHealth || 'Unknown'}
          </span>
        </div>

        {aiRecommendation && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-blue-800">
            <span className="font-semibold">Recommendation:</span> {aiRecommendation}
          </div>
        )}

        {aiInsights.length ? (
          <ul className="space-y-3">
            {aiInsights.map((insight, index) => (
              <li
                key={index}
                className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-700"
              >
                {insight}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No AI insights available.</p>
        )}
      </ChartCard>
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

function healthBadgeClass(health) {
  if (health === 'Critical') {
    return 'px-3 py-1 rounded-full text-sm bg-red-100 text-red-600'
  }
  if (health === 'Warning') {
    return 'px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-600'
  }
  if (health === 'Healthy') {
    return 'px-3 py-1 rounded-full text-sm bg-green-100 text-green-600'
  }
  return 'px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-600'
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