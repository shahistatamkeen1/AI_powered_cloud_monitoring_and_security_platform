import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import AuthScene from '../components/AuthScene'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      navigate('/dashboard')
    }
  }, [navigate])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const API_BASE = import.meta.env.VITE_API_BASE_URL || ''

const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const text = await res.text()
      console.log('LOGIN STATUS:', res.status)
      console.log('LOGIN RESPONSE:', text)

      if (!res.ok) {
        throw new Error(text || 'Login failed')
      }

      if (!text) {
        throw new Error('Empty response from backend')
      }

      const data = JSON.parse(text)

      localStorage.setItem('token', data.access_token)
      localStorage.setItem('token_type', data.token_type || 'bearer')

      const displayName =
        form.email.split('@')[0].charAt(0).toUpperCase() +
        form.email.split('@')[0].slice(1)

      localStorage.setItem('userName', displayName)
      localStorage.setItem('userEmail', form.email)

      navigate('/dashboard')
    } catch (err) {
      setError(err.message || 'Failed to fetch')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthScene
      title="Welcome Back 👋🏻"
      subtitle="Login to access your secure cloud monitoring dashboard."
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4 relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-3 pr-20 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-blue-600"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full font-semibold py-3 rounded-lg text-white ${
            loading ? 'bg-gray-500' : 'bg-black hover:bg-gray-900'
          }`}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <p className="mt-6 text-sm text-gray-600 text-center">
        No account?{' '}
        <Link to="/register" className="text-blue-600 hover:underline">
          Register
        </Link>
      </p>
    </AuthScene>
  )
}