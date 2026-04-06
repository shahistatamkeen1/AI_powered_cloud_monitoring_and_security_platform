import { useState } from 'react'

export default function Insights() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const analyze = async () => {
    setLoading(true)

    try {
      const res = await fetch('http://127.0.0.1:8000/ai/analyze', {
        method: 'POST',
      })

      const data = await res.json()
      console.log(data)

      setResult(data)
    } catch (err) {
      console.error(err)
    }

    setLoading(false)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">AI Insights</h1>

      <button
        onClick={analyze}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-6"
      >
        {loading ? 'Analyzing...' : 'Run AI Analysis'}
      </button>

      {result && (
        <div className="bg-white p-6 rounded shadow space-y-3">

          <h2 className="text-xl font-semibold">System Metrics</h2>
          <p><strong>CPU:</strong> {result.cpu}%</p>
          <p><strong>Memory:</strong> {result.memory}%</p>

          <hr />

          <h2 className="text-xl font-semibold">AI Analysis</h2>

          <p><strong>Issue:</strong> {result.ai_analysis.issue}</p>
          <p><strong>Cause:</strong> {result.ai_analysis.cause}</p>
          <p><strong>Recommendation:</strong> {result.ai_analysis.recommendation}</p>

          <p>
            <strong>Severity:</strong>{' '}
            <span
              className={
                result.ai_analysis.severity === 'High'
                  ? 'text-red-600 font-bold'
                  : result.ai_analysis.severity === 'Medium'
                  ? 'text-yellow-600 font-bold'
                  : 'text-green-600 font-bold'
              }
            >
              {result.ai_analysis.severity}
            </span>
          </p>

        </div>
      )}
    </div>
  )
}