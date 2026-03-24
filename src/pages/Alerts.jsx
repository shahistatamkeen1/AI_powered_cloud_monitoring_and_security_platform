import AlertsTable from '../components/AlertsTable'
import { recentAlerts } from '../data/mockData'

export default function Alerts() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Alerts</h1>

      <AlertsTable data={recentAlerts} />
    </div>
  )
}