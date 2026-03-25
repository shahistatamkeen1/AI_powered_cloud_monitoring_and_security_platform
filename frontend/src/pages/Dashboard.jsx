import { useEffect, useState } from 'react'
import SummaryCard from '../components/SummaryCard'
import LineChartCard from '../components/LineChartCard'
import PieChartCard from '../components/PieChartCard'
import RecentAlertsTable from '../components/RecentAlertsTable'

export default function Dashboard() {
  const [metrics, setMetrics] = useState(null)
  const [alerts, setAlerts] = useState([])
  const [cpuHistory, setCpuHistory] = useState([
    { name: 'T1', value: 0 },
    { name: 'T2', value: 0 },
  ])
  const [memoryHistory, setMemoryHistory] = useState([
    { name: 'T1', value: 0 },
    { name: 'T2', value: 0 },
  ])
  const [networkHistory, setNetworkHistory] = useState([
    { name: 'T1', value: 0 },
    { name: 'T2', value: 0 },
  ])
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [metricsRes, alertsRes] = await Promise.all([
          fetch('http://127.0.0.1:8000/metrics'),
          fetch('http://127.0.0.1:8000/alerts'),
        ])

        if (!metricsRes.ok) {
          throw new Error(`Metrics HTTP error: ${metricsRes.status}`)
        }

        if (!alertsRes.ok) {
          throw new Error(`Alerts HTTP error: ${alertsRes.status}`)
        }

        const metricsData = await metricsRes.json()
        const alertsData = await alertsRes.json()

        setMetrics(metricsData)
        setAlerts(alertsData)

        const timeLabel = new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })

        setCpuHistory((prev) => [
          ...prev.slice(-9),
          { name: timeLabel, value: Number(metricsData.cpu) || 0 },
        ])

        setMemoryHistory((prev) => [
          ...prev.slice(-9),
          { name: timeLabel, value: Number(metricsData.memory) || 0 },
        ])

        setNetworkHistory((prev) => [
          ...prev.slice(-9),
          {
            name: timeLabel,
            value: Number((metricsData.network / 1024 / 1024).toFixed(2)) || 0,
          },
        ])

        setError('')
      } catch (err) {
        console.error('Error fetching dashboard data:', err)
        setError('Could not connect to backend')
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 5000)

    return () => clearInterval(interval)
  }, [])

  if (error) {
    return <p className="text-lg p-6 text-red-600">{error}</p>
  }

  if (!metrics) {
    return <p className="text-lg p-6">Loading dashboard...</p>
  }

  const activeAlerts =
    alerts.length === 1 && alerts[0].status === 'All systems normal'
      ? 0
      : alerts.length

  const criticalAlerts = alerts.filter(
    (alert) => alert.status === 'Critical'
  ).length

  const warningAlerts = alerts.filter(
    (alert) => alert.status === 'Warning' || alert.status === 'High'
  ).length

  const normalAlerts =
    alerts.length === 1 && alerts[0].status === 'All systems normal' ? 1 : 0

  const summaryData = [
    {
      title: 'Total VMs',
      value: 4,
      color: 'text-black',
    },
    {
      title: 'Active Alerts',
      value: activeAlerts,
      color: 'text-red-500',
    },
    {
      title: 'Critical Alerts',
      value: criticalAlerts,
      color: 'text-orange-500',
    },
    {
      title: 'Average CPU',
      value: `${metrics.cpu}%`,
      color: 'text-blue-500',
    },
    {
      title: 'Network',
      value: `${(metrics.network / 1024 / 1024).toFixed(2)} MB`,
      color: 'text-purple-500',
    },
  ]

  const alertPieData = [
    { name: 'Critical', value: criticalAlerts },
    { name: 'Warning', value: warningAlerts },
    { name: 'Normal', value: normalAlerts },
  ]

  const tableAlerts =
    alerts.length === 1 && alerts[0].status === 'All systems normal'
      ? [
          {
            id: 1,
            vmName: 'System',
            alertName: 'No active alerts',
            severity: 'Info',
            status: 'Resolved',
            time: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
          },
        ]
      : alerts.map((alert, index) => ({
          id: index + 1,
          vmName: 'Local VM',
          alertName: `${alert.type} usage alert`,
          severity: alert.status === 'Critical' ? 'Critical' : 'Warning',
          status: 'Active',
          time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        }))

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-black">Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Monitor system health, alerts, and AI-powered insights.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 mb-8">
        {summaryData.map((item, index) => (
          <SummaryCard
            key={index}
            title={item.title}
            value={item.value}
            color={item.color}
          />
        ))}
      </div>

      {activeAlerts === 0 && (
        <p className="text-green-600 mt-2 font-medium mb-6">
          System is running normally
        </p>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <LineChartCard title="CPU Usage Trend" data={cpuHistory} dataKey="value" />
        <LineChartCard title="Memory Usage Trend" data={memoryHistory} dataKey="value" />
        <LineChartCard title="Network Usage Trend" data={networkHistory} dataKey="value" />
        <PieChartCard title="Alert Severity Distribution" data={alertPieData} />
      </div>

      <div className="mt-8">
        <RecentAlertsTable alerts={tableAlerts} />
      </div>
    </div>
  )
}