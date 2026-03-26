import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#f5f5f6] text-[#111827]">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-[1500px] mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
              CM
            </div>
            <div>
              <h1 className="text-lg font-semibold">Cloud Monitor</h1>
              <p className="text-xs text-gray-500">AI-Powered Monitoring Platform</p>
            </div>
          </div>

          <div className="flex items-center gap-3 relative z-30">
            <Link
              to="/login"
              className="px-5 py-2.5 border border-gray-300 rounded-xl text-sm font-medium hover:bg-gray-100 transition"
            >
              Log In
            </Link>

            <Link
              to="/register"
              className="px-5 py-2.5 bg-black text-white rounded-xl text-sm font-medium hover:bg-gray-900 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="max-w-[1500px] mx-auto px-6 lg:px-10 py-16 lg:py-24">
        <section className="grid lg:grid-cols-[0.9fr_1.35fr] gap-10 items-center">
          {/* Left Content */}
          <div className="relative z-30">
            <p className="text-sm uppercase tracking-[0.25em] text-blue-600 font-semibold mb-5">
              Secure Cloud Monitoring
            </p>

            <h2 className="text-5xl lg:text-7xl font-bold leading-[0.95] tracking-[-0.04em] text-gray-900">
              Monitor Systems. <br />
              Detect Issues. <br />
              Act Faster.
            </h2>

            <p className="mt-8 text-lg leading-9 text-gray-600 max-w-xl">
              A centralized dashboard for metrics, alerts, logs, and AI-powered insights.
              Built to help teams understand system health and respond quickly.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/register"
                className="px-6 py-4 bg-black text-white rounded-2xl font-semibold hover:bg-gray-900 transition shadow-sm"
              >
                Launch Platform
              </Link>

              <Link
                to="/login"
                className="px-6 py-4 border border-gray-300 rounded-2xl font-semibold hover:bg-white transition"
              >
                Log In
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6 max-w-lg">
              <div>
                <p className="text-3xl font-bold text-gray-900">24/7</p>
                <p className="text-sm text-gray-500 mt-1">Monitoring Access</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">AI</p>
                <p className="text-sm text-gray-500 mt-1">Issue Analysis</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">4+</p>
                <p className="text-sm text-gray-500 mt-1">Core Modules</p>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="flex justify-center lg:justify-end w-full pointer-events-none select-none relative z-0">
            <div className="relative w-full max-w-[1250px]">
              {/* Blue Background */}
              <div className="bg-[#7fa2cf] h-[720px] lg:h-[780px] w-full rounded-[18px]" />

              {/* Desktop Mock */}
              <div className="absolute left-[4%] bottom-0 w-[80%] bg-[#0d1724] text-white shadow-2xl rounded-t-md overflow-hidden border border-black/20">
                <div className="bg-black h-12 flex items-center justify-between px-5 text-white text-xs">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">≡</span>
                    <span className="font-semibold text-base">Cloud Monitor</span>
                  </div>
                  <div className="flex items-center gap-3 opacity-80">
                    <span>◔</span>
                    <span>◌</span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 mb-4 text-[11px]">
                    <span className="bg-[#223447] text-white px-3 py-1.5 rounded-sm">Metrics</span>
                    <span className="bg-[#223447] text-white px-3 py-1.5 rounded-sm">Alerts</span>
                    <span className="bg-[#223447] text-white px-3 py-1.5 rounded-sm">Logs</span>
                  </div>

                  <div className="bg-[#13202f] border border-[#223447] rounded-md p-4 mb-4">
                    <div className="text-[11px] text-gray-400 mb-3">Live Monitoring Chart</div>

                    <div className="h-[300px] relative overflow-hidden rounded-md bg-[#102033]">
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 700 300" fill="none">
                        <rect x="0" y="0" width="700" height="300" fill="#102033" />
                        <line x1="0" y1="240" x2="700" y2="240" stroke="#223447" strokeWidth="1" />
                        <line x1="0" y1="190" x2="700" y2="190" stroke="#223447" strokeWidth="1" />
                        <line x1="0" y1="140" x2="700" y2="140" stroke="#223447" strokeWidth="1" />
                        <line x1="0" y1="90" x2="700" y2="90" stroke="#223447" strokeWidth="1" />
                        <path
                          d="M0 180 C45 120, 120 80, 180 120 C250 165, 320 145, 390 210 C470 270, 560 205, 700 190"
                          stroke="#60a5fa"
                          strokeWidth="4"
                          fill="none"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="bg-[#13202f] border border-[#223447] rounded-md p-4 text-white text-sm mb-4">
                    <div className="mb-2">
                      <span className="text-blue-400 font-semibold">Database Server</span>{' '}
                      <span className="text-green-400 font-semibold">Memory 64%</span>{' '}
                      <span className="text-gray-300">|</span>{' '}
                      <span className="text-red-400 font-semibold">3 Active Alerts</span>
                    </div>
                    <div className="text-gray-400 text-xs">
                      AI Insight: resource pressure is increasing. Review active processes and optimize memory usage.
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-3 text-xs">
                    <div className="bg-[#13202f] border border-[#223447] rounded-md p-3">
                      <div className="text-gray-400">VMs</div>
                      <div className="mt-1 font-semibold text-white">4</div>
                    </div>
                    <div className="bg-[#13202f] border border-[#223447] rounded-md p-3">
                      <div className="text-gray-400">CPU</div>
                      <div className="mt-1 font-semibold text-white">76%</div>
                    </div>
                    <div className="bg-[#13202f] border border-[#223447] rounded-md p-3">
                      <div className="text-gray-400">Alerts</div>
                      <div className="mt-1 font-semibold text-white">03</div>
                    </div>
                    <div className="bg-[#13202f] border border-[#223447] rounded-md p-3">
                      <div className="text-gray-400">AI Status</div>
                      <div className="mt-1 font-semibold text-white">Ready</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Mock */}
              <div className="absolute right-[4%] top-[6%] w-[36%] lg:w-[34%] bg-white rounded-[32px] shadow-2xl border border-black/10 overflow-hidden">
                <div className="px-5 pt-5 pb-4 border-b border-gray-200 bg-white">
                  <div className="flex items-center justify-between text-xs text-black">
                    <span>9:41</span>
                    <span>◔ ◠ ▬</span>
                  </div>

                  <div className="mt-4 flex items-center gap-3 text-sm text-gray-700">
                    <span className="text-lg">←</span>
                    <span className="font-semibold">Alerts</span>
                    <span className="text-gray-400">|</span>
                    <span className="font-semibold">AI Insight</span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="text-[11px] text-gray-500 mb-3 flex gap-4">
                    <span className="text-gray-400">▭ System Trend</span>
                    <span className="text-orange-500">▭ Risk Analysis</span>
                  </div>

                  <div className="h-[420px] bg-[#f8f8fa] border rounded-xl relative overflow-hidden">
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 260 420" fill="none">
                      <path d="M22 28 L22 370 L238 370" stroke="#d1d5db" strokeWidth="1" />
                      <path
                        d="M30 110 C48 40, 78 145, 105 215 C122 250, 140 185, 165 220 C188 252, 215 165, 235 60"
                        stroke="#3b82f6"
                        strokeWidth="2.5"
                        fill="none"
                      />
                      <path d="M120 220 L230 75" stroke="#ef4444" strokeWidth="1" opacity="0.45" />
                      <path d="M120 220 L230 105" stroke="#f97316" strokeWidth="1" opacity="0.45" />
                      <path d="M120 220 L230 135" stroke="#f59e0b" strokeWidth="1" opacity="0.45" />
                      <path d="M120 220 L230 165" stroke="#84cc16" strokeWidth="1" opacity="0.45" />
                      <path d="M120 220 L230 195" stroke="#22c55e" strokeWidth="1" opacity="0.45" />
                    </svg>
                  </div>

                  <div className="mt-4">
                    <div className="text-sm leading-6">
                      <span className="text-blue-600 font-semibold">Memory Pressure Detected</span>{' '}
                      <span className="text-green-500 font-semibold">Server Stable</span>{' '}
                      <span className="text-red-500 font-semibold">/ Alert Risk Rising</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      Suggested action: review active queries and increase memory allocation.
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <div className="bg-black text-white px-3 py-2 rounded-lg text-sm font-semibold">
                      3 Alerts
                    </div>
                    <div className="border px-3 py-2 rounded-lg text-sm">AI Ready</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <section id="features" className="max-w-[1500px] mx-auto px-6 lg:px-10 pb-20">
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-3">Dashboard</h3>
            <p className="text-gray-600 leading-7">
              Track CPU, memory, network, and overall system health from one place.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
            <div className="text-3xl mb-4">🚨</div>
            <h3 className="text-xl font-semibold mb-3">Alerts</h3>
            <p className="text-gray-600 leading-7">
              Get clear alert visibility with acknowledge and resolve actions.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
            <div className="text-3xl mb-4">📜</div>
            <h3 className="text-xl font-semibold mb-3">Logs</h3>
            <p className="text-gray-600 leading-7">
              Review centralized log data to understand events and system behavior.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
            <div className="text-3xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold mb-3">AI Insights</h3>
            <p className="text-gray-600 leading-7">
              Turn technical issues into simple explanations and actionable suggestions.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}