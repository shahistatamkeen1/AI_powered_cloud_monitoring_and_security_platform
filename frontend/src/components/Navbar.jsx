export default function Navbar() {
  const userName = localStorage.getItem('userName') || 'User'

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userName')
    localStorage.removeItem('userEmail')
    window.location.href = '/login'
  }

  return (
    <div className="w-full bg-white border-b px-6 py-4 flex justify-between items-center">
      <h2 className="text-2xl font-semibold">
        AI-Powered Cloud Monitoring Dashboard
      </h2>

      <div className="flex items-center gap-4">
        <div className="text-sm text-gray-600">
          Welcome, <span className="font-semibold text-black">{userName}</span>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm"
        >
          Logout
        </button>
      </div>
    </div>
  )
}