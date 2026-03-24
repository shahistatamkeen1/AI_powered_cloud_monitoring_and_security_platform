export default function ChartCard({ title }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 h-72">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="h-52 flex items-center justify-center rounded-xl bg-gray-50 text-gray-400">
        Chart will come here
      </div>
    </div>
  )
}