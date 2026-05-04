import { useEffect, useState } from 'react'

export default function Insights() {
  const [result, setResult] = useState(null)
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)
  const [historyLoading, setHistoryLoading] = useState(false)
  const [error, setError] = useState('')
  const [historyMessage, setHistoryMessage] = useState('')

  const getHealthColor = (health) => {
    if (health === 'Critical') return 'bg-red-100 text-red-600'
    if (health === 'Warning') return 'bg-orange-100 text-orange-600'
    if (health === 'Healthy') return 'bg-green-100 text-green-600'
    return 'bg-gray-100 text-gray-600'
  }

  const fetchHistory = async () => {
    try {
      setHistoryLoading(true)
      setHistoryMessage('')
      setError('')

      const res = await fetch('http://52.234.161.141:8000/metrics/ai-history')

      if (!res.ok) {
        throw new Error('Failed to fetch AI history')
      }

      const data = await res.json()
      setHistory(Array.isArray(data) ? data : [])
      setHistoryMessage('History refreshed successfully')
    } catch (err) {
      setError(err.message || 'Something went wrong while loading history')
      console.error(err)
    } finally {
      setHistoryLoading(false)
    }
  }

  const analyze = async () => {
    try {
      setLoading(true)
      setError('')
      setHistoryMessage('')
      setResult(null)

      const res = await fetch('http://52.234.161.141:8000/metrics/ai-insights')

      if (!res.ok) {
        throw new Error('Failed to fetch AI insights')
      }

      const data = await res.json()
      setResult(data)
      await fetchHistory()
    } catch (err) {
      setError(err.message || 'Something went wrong')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHistory()
  }, [])

  return (
    <div className="relative z-10">
      <h1 className="text-3xl font-bold mb-6">AI Insights</h1>

      <div className="flex flex-wrap gap-3 mb-6 relative z-20">
        <button
          type="button"
          onClick={analyze}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed relative z-20"
        >
          {loading ? 'Analyzing...' : 'Run AI Analysis'}
        </button>

        <button
          type="button"
          onClick={fetchHistory}
          disabled={historyLoading}
          className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed relative z-20"
        >
          {historyLoading ? 'Refreshing...' : 'Refresh History'}
        </button>
      </div>

      {historyMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded mb-4">
          {historyMessage}
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded mb-4">
          {error}
        </div>
      )}

      {result && (
        <div className="bg-white p-6 rounded-xl shadow border mb-8">
          <h2 className="text-2xl font-semibold mb-4">Latest AI Analysis</h2>

          <div className="mb-3">
            <strong>Status:</strong> {result.status}
          </div>

          <div className="mb-3">
            <strong>Message:</strong> {result.message}
          </div>

          <div className="mb-3">
            <strong>Health:</strong>{' '}
            <span className={`px-3 py-1 rounded-full text-sm ${getHealthColor(result.health)}`}>
              {result.health}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-blue-50 border border-blue-200 rounded p-3">
              <strong>CPU:</strong> {result.cpu}
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded p-3">
              <strong>Memory:</strong> {result.memory}
            </div>
            <div className="bg-pink-50 border border-pink-200 rounded p-3">
              <strong>Network:</strong> {result.network}
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Insights</h3>
            {result.insights && result.insights.length > 0 ? (
              <ul className="space-y-2">
                {result.insights.map((item, index) => (
                  <li
                    key={index}
                    className="bg-gray-50 border border-gray-200 rounded p-3"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No insights available.</p>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Recommendation</h3>
            <div className="bg-blue-50 border border-blue-200 rounded p-3 text-blue-800">
              {result.recommendation}
            </div>
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded-xl shadow border">
        <h2 className="text-2xl font-semibold mb-4">AI Analysis History</h2>

        {history.length > 0 ? (
          <div className="space-y-4">
            {history.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                  <div>
                    <strong>Time:</strong> {item.created_at}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm w-fit ${getHealthColor(item.health)}`}>
                    {item.health}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                  <div><strong>CPU:</strong> {item.cpu}</div>
                  <div><strong>Memory:</strong> {item.memory}</div>
                  <div><strong>Network:</strong> {item.network}</div>
                </div>

                <div className="mb-3">
                  <strong>Insights:</strong>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    {item.insights.map((insight, index) => (
                      <li key={index}>{insight}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <strong>Recommendation:</strong> {item.recommendation}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No AI history available yet.</p>
        )}
      </div>
    </div>
  )
}