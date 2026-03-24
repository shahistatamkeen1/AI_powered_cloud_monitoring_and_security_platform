function getSeverityColor(severity) {
  if (severity === 'Critical') return 'text-red-600 bg-red-50'
  if (severity === 'Warning') return 'text-orange-600 bg-orange-50'
  return 'text-green-600 bg-green-50'
}

function getStatusColor(status) {
  if (status === 'Active') return 'text-red-600 bg-red-50'
  if (status === 'Acknowledged') return 'text-blue-600 bg-blue-50'
  if (status === 'Resolved') return 'text-green-600 bg-green-50'
  return 'text-gray-600 bg-gray-50'
}

export default function RecentAlertsTable({ alerts }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
      <h3 className="text-lg font-semibold mb-4">Recent Alerts</h3>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-sm text-gray-500 border-b">
              <th className="py-3">VM Name</th>
              <th className="py-3">Alert</th>
              <th className="py-3">Severity</th>
              <th className="py-3">Status</th>
              <th className="py-3">Time</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((alert) => (
              <tr key={alert.id} className="border-b last:border-b-0">
                <td className="py-4">{alert.vmName}</td>
                <td className="py-4">{alert.alertName}</td>
                <td className="py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}
                  >
                    {alert.severity}
                  </span>
                </td>
                <td className="py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(alert.status)}`}
                  >
                    {alert.status}
                  </span>
                </td>
                <td className="py-4 text-gray-500">{alert.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}