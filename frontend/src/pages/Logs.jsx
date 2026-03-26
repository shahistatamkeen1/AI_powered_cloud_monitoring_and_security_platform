import { useState } from 'react'
import LogsTable from '../components/LogsTable'
import { logsData } from '../data/mockData'

export default function Logs() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

  const filteredLogs = logsData.filter((log) => {
    const matchesSearch = log.message
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchesFilter =
      filter === 'All' ? true : log.severity === filter

    return matchesSearch && matchesFilter
  })

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Logs</h1>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search logs..."
          className="border rounded-lg px-4 py-2 w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border rounded-lg px-4 py-2"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option>All</option>
          <option>Critical</option>
          <option>Warning</option>
          <option>Info</option>
        </select>
      </div>

      <LogsTable data={filteredLogs} />
    </div>
  )
}