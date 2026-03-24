export default function SummaryCard({ title, value, color }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className={`text-3xl font-bold mt-2 ${color}`}>{value}</h3>
    </div>
  )
}