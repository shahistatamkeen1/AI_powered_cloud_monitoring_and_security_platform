import { useState } from 'react'

export default function Insights() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const analyze = async () => {
    setLoading(true)

    try {
      const res = await fetch('http://127.0.0.1:8000/ai/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}), // you can add data later
      })

      const data = await res.json()
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
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Result</h2>
          <p><strong>Status:</strong> {result.status}</p>
          <p><strong>Message:</strong> {result.message}</p>
        </div>
      )}
    </div>
  )
}