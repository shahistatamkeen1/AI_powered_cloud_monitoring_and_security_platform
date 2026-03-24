import SummaryCard from '../components/SummaryCard'
import LineChartCard from '../components/LineChartCard'
import PieChartCard from '../components/PieChartCard'
import RecentAlertsTable from '../components/RecentAlertsTable'
import {
  summaryData,
  recentAlerts,
  cpuData,
  memoryData,
  networkData,
  alertPieData,
} from '../data/mockData'

export default function Dashboard() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-black">Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Monitor system health, alerts, and AI-powered insights.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {summaryData.map((item, index) => (
          <SummaryCard
            key={index}
            title={item.title}
            value={item.value}
            color={item.color}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
        <LineChartCard title="CPU Usage Trend" data={cpuData} dataKey="value" />
        <LineChartCard title="Memory Usage Trend" data={memoryData} dataKey="value" />
        <LineChartCard title="Network Usage Trend" data={networkData} dataKey="value" />
        <PieChartCard title="Alert Severity Distribution" data={alertPieData} />
      </div>

      <RecentAlertsTable alerts={recentAlerts} />
    </div>
  )
}