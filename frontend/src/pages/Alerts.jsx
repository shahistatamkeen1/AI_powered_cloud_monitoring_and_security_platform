import { useEffect, useState } from 'react'
import AlertsTable from '../components/AlertsTable'

export default function Alerts() {
  const [alerts, setAlerts] = useState([])

  useEffect(() => {
    fetch('http://127.0.0.1:8000/alerts')
      .then((res) => res.json())
      .then((data) => {
        console.log('API data:', data)

        const safeData = Array.isArray(data) ? data : []

        const formatted = safeData.map((item, index) => ({
          id: index + 1,
          vmName: item.type || 'vm-app01',
          alertName: `${item.type || 'System'} Alert`,
          severity: item.status || 'Info',
          status: item.status || 'Info',
          time: new Date().toLocaleTimeString(),
        }))

        setAlerts(formatted)
      })
      .catch((err) => console.error(err))
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Alerts</h1>
      <AlertsTable data={alerts} />
    </div>
  )
}