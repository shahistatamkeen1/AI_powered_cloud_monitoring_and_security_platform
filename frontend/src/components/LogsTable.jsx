function getSeverityColor(severity) {
  if (severity === 'Critical') return 'bg-red-100 text-red-600'
  if (severity === 'Warning') return 'bg-orange-100 text-orange-600'
  return 'bg-gray-100 text-gray-600'
}

export default function LogsTable({ data }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
      <h2 className="text-xl font-semibold mb-4">System Logs</h2>

      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-500 text-sm border-b">
            <th className="py-3">VM</th>
            <th className="py-3">Message</th>
            <th className="py-3">Severity</th>
            <th className="py-3">Time</th>
          </tr>
        </thead>

        <tbody>
          {data.map((log) => (
            <tr key={log.id} className="border-b hover:bg-gray-50">
              <td className="py-4">{log.vm}</td>
              <td>{log.message}</td>

              <td>
                <span className={`px-3 py-1 rounded-full text-xs ${getSeverityColor(log.severity)}`}>
                  {log.severity}
                </span>
              </td>

              <td className="text-gray-500">{log.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}