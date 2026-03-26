import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const navigate = useNavigate()
  const [userName, setUserName] = useState('User')
  const [email, setEmail] = useState('')

  useEffect(() => {
    const name = localStorage.getItem('userName')
    const savedEmail = localStorage.getItem('userEmail')

    if (name) {
      setUserName(name)
    }

    if (savedEmail) {
      setEmail(savedEmail)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userName')
    localStorage.removeItem('userEmail')
    navigate('/login')
  }

  return (
    <header className="flex items-center justify-between border-b border-gray-300 bg-white px-8 py-5">
      <h1 className="text-2xl font-bold">
        AI-Powered Cloud Monitoring Dashboard
      </h1>

      <div className="flex items-center gap-4">
        <span title={email} className="text-lg cursor-pointer">
          Welcome, <strong>{userName}</strong>
        </span>

        <button
          onClick={handleLogout}
          className="rounded-lg bg-red-500 px-5 py-3 text-white font-semibold hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </header>
  )
}