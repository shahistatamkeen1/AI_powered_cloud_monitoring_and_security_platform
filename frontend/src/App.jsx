import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Alerts from './pages/Alerts'
import Logs from './pages/Logs'
import Insights from './pages/Insights'
import History from './pages/History'

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-[#f8f8fa]">
        <Sidebar />

        <div className="flex-1 flex flex-col">
          <Navbar />

          <main className="p-6 md:p-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/logs" element={<Logs />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/history" element={<History />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  )
}
