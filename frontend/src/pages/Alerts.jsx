import { useEffect, useState } from 'react'
import AlertsTable from '../components/AlertsTable'

export default function Alerts() {
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        setLoading(true)
        setError('')

        const res = await fetch('http://52.234.161.141:8000/alerts')
        const data = await res.json()

        if (!res.ok) {
          throw new Error('Failed to fetch alerts')
        }

        const safeData = Array.isArray(data) ? data : []

        const formatted = safeData.map((item, index) => ({
          id: index + 1,
          vmName: item.vmName || item.type || `vm-app0${index + 1}`,
          alertName: item.alertName || `${item.type || 'System'} Alert`,
          severity: item.severity || item.status || 'Info',
          status: item.status || 'Open',
          time: item.time || new Date().toLocaleTimeString(),
        }))

        setAlerts(formatted)
      } catch (err) {
        setError(err.message || 'Could not load alerts')
      } finally {
        setLoading(false)
      }
    }

    fetchAlerts()
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Alerts</h1>

      {loading && (
        <p className="text-gray-500 mb-4">Loading alerts...</p>
      )}

      {error && (
        <p className="text-red-500 mb-4">{error}</p>
      )}

      {!loading && !error && alerts.length === 0 && (
        <p className="text-gray-500 mb-4">No alerts found.</p>
      )}

      {!loading && !error && alerts.length > 0 && (
        <AlertsTable data={alerts} />
      )}
    </div>
  )
}