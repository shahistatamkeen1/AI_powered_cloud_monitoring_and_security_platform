import { useEffect, useState } from 'react'
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

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const cpuTrend = [
    { name: '10 AM', value: 10 },
    { name: '11 AM', value: 25 },
    { name: '12 PM', value: stats.cpu },
    { name: '1 PM', value: stats.cpu },
  ]

  const memoryTrend = [
    { name: '10 AM', value: 15 },
    { name: '11 AM', value: 35 },
    { name: '12 PM', value: stats.memory },
    { name: '1 PM', value: stats.memory },
  ]

  const networkTrend = [
    { name: '10 AM', value: 1.2 },
    { name: '11 AM', value: 2.8 },
    { name: '12 PM', value: (stats.network / 1024 / 1024).toFixed(2) },
    { name: '1 PM', value: (stats.network / 1024 / 1024).toFixed(2) },
  ]

  const severityData = [
    { name: 'Critical', value: stats.criticalAlerts },
    { name: 'Warning', value: stats.activeAlerts - stats.criticalAlerts },
    { name: 'Healthy', value: stats.totalVMs - stats.activeAlerts > 0 ? stats.totalVMs - stats.activeAlerts : 0 },
  ]

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
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

        setStats({
          totalVMs: 4,
          activeAlerts,
          criticalAlerts,
          cpu: metricsData.cpu || 0,
          memory: metricsData.memory || 0,
          network: metricsData.network || 0,
        })
      } catch (err) {
        setError(err.message || 'Could not connect to backend')
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (loading) {
    return <p className="text-gray-500">Loading dashboard...</p>
  }

  if (error) {
    return <p className="text-red-500">{error}</p>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
      <p className="text-gray-500 mb-6">
        Monitor system health, alerts, and AI-powered insights.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <StatCard title="Total VMs" value={stats.totalVMs} />
        <StatCard title="Active Alerts" value={stats.activeAlerts} valueClass="text-red-500" />
        <StatCard title="Critical Alerts" value={stats.criticalAlerts} valueClass="text-orange-500" />
        <StatCard title="Average CPU" value={`${stats.cpu}%`} valueClass="text-blue-500" />
        <StatCard
          title="Network"
          value={`${(stats.network / 1024 / 1024).toFixed(2)} MB`}
          valueClass="text-purple-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard title="CPU Usage Trend">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={cpuTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 60]} />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Memory Usage Trend">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={memoryTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 80]} />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Network Usage Trend">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={networkTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={3} />
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