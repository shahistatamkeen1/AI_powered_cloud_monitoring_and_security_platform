import { historyData } from '../data/mockData'

export default function History() {
  function getStatusColor(status) {
    if (status === 'Resolved') return 'bg-green-100 text-green-600'
    if (status === 'Acknowledged') return 'bg-blue-100 text-blue-600'
    if (status === 'Critical') return 'bg-red-100 text-red-600'
    return 'bg-gray-100 text-gray-600'
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">History</h1>
        <p className="text-gray-500 mt-1">
          View previous alerts, acknowledgements, and resolved system events.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
        <h2 className="text-xl font-semibold mb-4">System History</h2>

        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500 text-sm border-b">
              <th className="py-3">Event</th>
              <th className="py-3">VM</th>
              <th className="py-3">Status</th>
              <th className="py-3">Date</th>
            </tr>
          </thead>

          <tbody>
            {historyData.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="py-4">{item.event}</td>
                <td>{item.vm}</td>
                <td>
                  <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td className="text-gray-500">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}