import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token')

  if (!token) {
    return <Navigate to="/login" replace />
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]))

    if (payload.exp * 1000 < Date.now()) {
      localStorage.removeItem('token')
      localStorage.removeItem('userName')
      localStorage.removeItem('userEmail')
      return <Navigate to="/login" replace />
    }
  } catch (error) {
    localStorage.removeItem('token')
    localStorage.removeItem('userName')
    localStorage.removeItem('userEmail')
    return <Navigate to="/login" replace />
  }

  return children
}