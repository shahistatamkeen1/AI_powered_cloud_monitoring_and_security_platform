import { Link } from 'react-router-dom'

export default function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-black text-white p-6">
      <h1 className="text-xl font-bold mb-8">Cloud Monitor</h1>

      <nav className="flex flex-col gap-4">
        <Link to="/" className="hover:text-blue-400">Dashboard</Link>
        <Link to="/alerts" className="hover:text-blue-400">Alerts</Link>
        <Link to="/logs" className="hover:text-blue-400">Logs</Link>
        <Link to="/insights" className="hover:text-blue-400">AI Insights</Link>
        <Link to="/history" className="hover:text-blue-400">History</Link>
      </nav>
    </div>
  )
}