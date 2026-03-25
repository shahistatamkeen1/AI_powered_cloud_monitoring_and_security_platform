import { useState, useEffect } from 'react'

function getSeverityColor(severity) {
  if (severity === 'Critical') return 'bg-red-100 text-red-600'
  if (severity === 'Warning') return 'bg-orange-100 text-orange-600'
  return 'bg-green-100 text-green-600'
}

function getStatusColor(status) {
  if (status === 'Active') return 'bg-red-100 text-red-600'
  if (status === 'Acknowledged') return 'bg-blue-100 text-blue-600'
  if (status === 'Resolved') return 'bg-green-100 text-green-600'
  return 'bg-gray-100 text-gray-600'
}

export default function AlertsTable({ data = [] }) {
  const [alerts, setAlerts] = useState(data)

  useEffect(() => {
    setAlerts(data)
  }, [data])

  const handleAcknowledge = (id) => {
    const updated = alerts.map((alert) =>
      alert.id === id ? { ...alert, status: 'Acknowledged' } : alert
    )
    setAlerts(updated)
  }

  const handleResolve = (id) => {
    const updated = alerts.map((alert) =>
      alert.id === id ? { ...alert, status: 'Resolved' } : alert
    )
    setAlerts(updated)
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
      <h2 className="text-xl font-semibold mb-4">All Alerts</h2>

      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-500 text-sm border-b">
            <th className="py-3">VM</th>
            <th className="py-3">Alert</th>
            <th className="py-3">Severity</th>
            <th className="py-3">Status</th>
            <th className="py-3">Time</th>
            <th className="py-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {alerts.map((alert) => (
            <tr key={alert.id} className="border-b last:border-none hover:bg-gray-50">
              <td className="py-4">{alert.vmName}</td>
              <td>{alert.alertName}</td>

              <td>
                <span className={`px-3 py-1 rounded-full text-xs ${getSeverityColor(alert.severity)}`}>
                  {alert.severity}
                </span>
              </td>

              <td>
                <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(alert.status)}`}>
                  {alert.status}
                </span>
              </td>

              <td className="text-gray-500">{alert.time}</td>

              <td className="flex gap-2 py-4">
                {alert.status !== 'Acknowledged' && (
                  <button
                    onClick={() => handleAcknowledge(alert.id)}
                    className="px-3 py-1 text-xs bg-blue-500 text-white rounded-lg"
                  >
                    Acknowledge
                  </button>
                )}

                {alert.status !== 'Resolved' && (
                  <button
                    onClick={() => handleResolve(alert.id)}
                    className="px-3 py-1 text-xs bg-green-500 text-white rounded-lg"
                  >
                    Resolve
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}