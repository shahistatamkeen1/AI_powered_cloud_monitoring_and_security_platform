import { useState } from 'react'
import { aiInsightsData } from '../data/mockData'
import InsightCard from '../components/InsightCard'

export default function Insights() {
  const [selectedInsight, setSelectedInsight] = useState(aiInsightsData[0])

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">AI Insights</h1>
        <p className="text-gray-500 mt-1">
          AI explains system issues in simple words and suggests possible fixes.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="space-y-4">
          {aiInsightsData.map((insight) => (
            <InsightCard
              key={insight.id}
              insight={insight}
              isSelected={selectedInsight.id === insight.id}
              onClick={() => setSelectedInsight(insight)}
            />
          ))}
        </div>

        <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-2xl font-bold mb-2">{selectedInsight.title}</h2>

          <div className="space-y-6 mt-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Explanation</h3>
              <p className="text-gray-700 leading-7">
                {selectedInsight.explanation}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Suggested Fix</h3>
              <p className="text-gray-700 leading-7">
                {selectedInsight.suggestedFix}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Summary</h3>
              <p className="text-gray-700 leading-7">
                {selectedInsight.summary}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}