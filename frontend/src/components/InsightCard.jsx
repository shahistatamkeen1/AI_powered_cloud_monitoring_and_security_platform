function getSeverityColor(severity) {
  if (severity === 'Critical') return 'bg-red-100 text-red-600'
  if (severity === 'Warning') return 'bg-orange-100 text-orange-600'
  return 'bg-gray-100 text-gray-600'
}

export default function InsightCard({ insight, isSelected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-2xl border transition ${
        isSelected
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-200 bg-white hover:bg-gray-50'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold">{insight.title}</h3>

        <span
          className={`px-3 py-1 rounded-full text-xs ${getSeverityColor(
            insight.severity
          )}`}
        >
          {insight.severity}
        </span>
      </div>

      <p className="text-sm text-gray-500 mt-2">
        {insight.summary}
      </p>
    </button>
  )
}