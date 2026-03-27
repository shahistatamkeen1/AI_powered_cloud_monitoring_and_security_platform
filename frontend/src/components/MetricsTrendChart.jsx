import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

export default function MetricsTrendChart({ data }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm h-[320px]">
      <h3 className="text-lg font-semibold mb-4">System Metrics Trend</h3>

      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="cpu" stroke="#3b82f6" strokeWidth={3} />
          <Line type="monotone" dataKey="memory" stroke="#8b5cf6" strokeWidth={3} />
          <Line type="monotone" dataKey="network" stroke="#f97316" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}