import { useEffect, useState } from 'react'

export default function History() {
  const [historyData, setHistoryData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  function getStatusColor(status) {
    if (status === 'Resolved') return 'bg-green-100 text-green-600'
    if (status === 'Acknowledged') return 'bg-blue-100 text-blue-600'
    if (status === 'Critical') return 'bg-red-100 text-red-600'
    if (status === 'Warning') return 'bg-orange-100 text-orange-600'
    return 'bg-gray-100 text-gray-600'
  }

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setError('')

        const res = await fetch('http://127.0.0.1:8000/history')

        if (!res.ok) {
          throw new Error('Failed to fetch history')
        }

        const data = await res.json()
        setHistoryData(Array.isArray(data) ? data : [])
      } catch (err) {
        setError(err.message || 'Something went wrong')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchHistory()
  }, [])

  if (loading) {
    return <p className="text-gray-500">Loading history...</p>
  }

  if (error) {
    return <p className="text-red-500">{error}</p>
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

        {historyData.length > 0 ? (
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-500 text-sm border-b">
                <th className="py-3">Event</th>
                <th className="py-3">User</th>
                <th className="py-3">Status</th>
                <th className="py-3">Time</th>
              </tr>
            </thead>

            <tbody>
              {historyData.map((item) => {
                const status =
                  item.status ||
                  (item.event?.toLowerCase().includes('resolved')
                    ? 'Resolved'
                    : item.event?.toLowerCase().includes('login')
                    ? 'Acknowledged'
                    : 'Acknowledged')

                return (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="py-4">{item.event}</td>
                    <td>{item.user || 'System'}</td>
                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${getStatusColor(status)}`}
                      >
                        {status}
                      </span>
                    </td>
                    <td className="text-gray-500">{item.time}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No history available.</p>
        )}
      </div>
    </div>
  )
}