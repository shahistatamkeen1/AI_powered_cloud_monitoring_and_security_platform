import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  const baseStyle = "px-4 py-2 rounded-lg transition"
  const activeStyle = "bg-white/10 text-white font-semibold"
  const inactiveStyle = "text-gray-300 hover:text-blue-400"

  return (
    <div className="w-64 min-h-screen bg-black text-white p-6">
      <h1 className="text-xl font-bold mb-8">Cloud Monitor</h1>

      <nav className="flex flex-col gap-3">

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/alerts"
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
          }
        >
          Alerts
        </NavLink>

        <NavLink
          to="/logs"
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
          }
        >
          Logs
        </NavLink>

        <NavLink
          to="/insights"
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
          }
        >
          AI Insights
        </NavLink>

        <NavLink
          to="/history"
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
          }
        >
          History
        </NavLink>

      </nav>
    </div>
  )
}