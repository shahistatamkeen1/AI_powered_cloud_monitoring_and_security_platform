export default function AuthScene({ children, title, subtitle }) {
  return (
    <div className="min-h-screen relative overflow-hidden bg-[#f8f8fa]">
      {/* base background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-0 w-80 h-80 rounded-full bg-blue-200/10 blur-3xl" />
        <div className="absolute bottom-0 right-10 w-96 h-96 rounded-full bg-purple-200/10 blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-cyan-200/10 blur-3xl" />

        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 min-h-screen flex items-center px-6 lg:px-10 xl:px-14">
        <div className="w-full max-w-[1750px] mx-auto grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-6 xl:gap-10 items-center">
          {/* LEFT SIDE - CARD */}
          <div className="flex justify-center lg:justify-start w-full">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 w-full max-w-md relative z-20">
              <p className="text-xs uppercase tracking-[0.25em] text-blue-600 font-semibold mb-2">
                AI-Powered Cloud Monitoring
              </p>

              <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
              <p className="text-gray-500 mb-6">{subtitle}</p>

              {children}
            </div>
          </div>

          {/* RIGHT SIDE - FULL HEIGHT BACKGROUND VISUAL */}
          <div className="hidden lg:block relative min-h-screen overflow-hidden">
            {/* soft right-side background glow */}
            <div className="absolute inset-0">
              <div className="absolute top-[10%] left-[12%] w-[500px] h-[500px] rounded-full bg-blue-200/12 blur-3xl animate-pulse" />
              <div className="absolute bottom-[8%] right-[4%] w-[420px] h-[420px] rounded-full bg-purple-200/12 blur-3xl animate-pulse" />
              <div className="absolute top-[38%] right-[18%] w-[260px] h-[260px] rounded-full bg-cyan-200/10 blur-3xl animate-pulse" />
            </div>

            {/* content wrapper */}
            <div className="absolute inset-0 pl-6 pr-0 xl:pl-8 xl:pr-0 py-16">
              <div className="h-full flex flex-col justify-center">
                {/* top labels */}
                <div className="mb-10">
                  <p className="text-[11px] uppercase tracking-[0.35em] text-blue-500 font-semibold">
                    Live Monitoring
                  </p>
                  <h2 className="text-5xl font-bold text-gray-900/80 mt-3">
                    System Activity
                  </h2>
                </div>

                {/* stats */}
                <div className="grid grid-cols-3 gap-10 max-w-xl mb-14 text-gray-900/75">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-[0.2em]">CPU</p>
                    <h3 className="text-5xl font-bold mt-2">76%</h3>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-[0.2em]">Memory</p>
                    <h3 className="text-5xl font-bold mt-2">64%</h3>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-[0.2em]">Alerts</p>
                    <h3 className="text-5xl font-bold mt-2">03</h3>
                  </div>
                </div>

                {/* animated line chart */}
                <div className="relative h-[220px] mb-10">
                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 1280 240"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    {/* grid lines */}
                    <line x1="10" y1="40" x2="1260" y2="40" stroke="rgba(148,163,184,0.20)" strokeWidth="1" />
                    <line x1="10" y1="95" x2="1260" y2="95" stroke="rgba(148,163,184,0.20)" strokeWidth="1" />
                    <line x1="10" y1="150" x2="1260" y2="150" stroke="rgba(148,163,184,0.20)" strokeWidth="1" />
                    <line x1="10" y1="205" x2="1260" y2="205" stroke="rgba(148,163,184,0.20)" strokeWidth="1" />

                    {/* animated shadow */}
                    <path
                      className="animate-linePulseOnce"
                      d="M10 180 C120 168, 220 118, 340 130 C470 142, 570 80, 700 92 C820 104, 930 58, 1040 72 C1130 78, 1200 70, 1260 68"
                      stroke="rgba(59,130,246,0.14)"
                      strokeWidth="16"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* main line */}
                    <path
                      className="animate-drawLineOnce"
                      d="M10 180 C120 168, 220 118, 340 130 C470 142, 570 80, 700 92 C820 104, 930 58, 1040 72 C1130 78, 1200 70, 1260 68"
                      stroke="url(#lineGradient)"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      pathLength="100"
                    />

                    {/* moving glow */}
                    <path
                      className="animate-drawGlowOnce"
                      d="M10 180 C120 168, 220 118, 340 130 C470 142, 570 80, 700 92 C820 104, 930 58, 1040 72 C1130 78, 1200 70, 1260 68"
                      stroke="rgba(255,255,255,0.7)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      pathLength="100"
                    />

                    {/* dots move once and stop */}
<circle r="6" fill="#3B82F6">
  <animateMotion dur="2.5s" fill="freeze" keyPoints="0;0.7" keyTimes="0;1">
    <mpath href="#livePath" />
  </animateMotion>
</circle>

<circle r="5" fill="#60A5FA" opacity="0.9">
  <animateMotion dur="2.5s" begin="0.5s" fill="freeze" keyPoints="0;0.85" keyTimes="0;1">
    <mpath href="#livePath" />
  </animateMotion>
</circle>

<circle r="5.5" fill="#8B5CF6" opacity="0.95">
  <animateMotion dur="2.5s" begin="1s" fill="freeze" keyPoints="0;1" keyTimes="0;1">
    <mpath href="#livePath" />
  </animateMotion>
</circle>

                    <defs>
                      <linearGradient id="lineGradient" x1="10" y1="0" x2="1260" y2="0" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#60A5FA" />
                        <stop offset="0.5" stopColor="#3B82F6" />
                        <stop offset="1" stopColor="#8B5CF6" />
                      </linearGradient>

                      <path
                        id="livePath"
                        d="M10 180 C120 168, 220 118, 340 130 C470 142, 570 80, 700 92 C820 104, 930 58, 1040 72 C1130 78, 1200 70, 1260 68"
                      />
                    </defs>
                  </svg>
                </div>

                {/* animated bars */}
                <div className="relative h-[230px] flex items-end gap-6 opacity-90 mb-12 pr-2">
                  <div className="flex-1 rounded-t-[30px] bg-gradient-to-t from-blue-200 to-blue-100 h-16 shadow-sm animate-bar1Once" />
                  <div className="flex-1 rounded-t-[30px] bg-gradient-to-t from-blue-300 to-blue-100 h-28 shadow-sm animate-bar2Once" />
                  <div className="flex-1 rounded-t-[30px] bg-gradient-to-t from-blue-400 to-blue-200 h-20 shadow-sm animate-bar3Once" />
                  <div className="flex-1 rounded-t-[30px] bg-gradient-to-t from-blue-500 to-blue-300 h-36 shadow-sm animate-bar4Once" />
                  <div className="flex-1 rounded-t-[30px] bg-gradient-to-t from-blue-300 to-blue-100 h-24 shadow-sm animate-bar5Once" />
                  <div className="flex-1 rounded-t-[30px] bg-gradient-to-t from-purple-400 to-purple-200 h-[120px] shadow-sm animate-bar6Once" />
                </div>

                {/* bottom live status */}
                <div className="flex items-center gap-10 text-sm text-gray-500/80">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                    Monitoring connected
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-orange-400 animate-pulse" />
                    Alert trend active
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
                    Security protected
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes drawLine {
            0% {
              stroke-dasharray: 0 100;
              stroke-dashoffset: 0;
            }
            100% {
              stroke-dasharray: 100 0;
              stroke-dashoffset: 0;
            }
          }

          @keyframes drawGlow {
            0% {
              stroke-dasharray: 8 92;
              stroke-dashoffset: 100;
              opacity: 0;
            }
            20% {
              opacity: 1;
            }
            100% {
              stroke-dasharray: 8 92;
              stroke-dashoffset: 0;
              opacity: 0;
            }
          }

          @keyframes linePulse {
            0% {
              opacity: 0.35;
            }
            50% {
              opacity: 0.8;
            }
            100% {
              opacity: 0.45;
            }
          }

          @keyframes barFloat1 {
            0% { height: 4rem; }
            100% { height: 5rem; }
          }

          @keyframes barFloat2 {
            0% { height: 7rem; }
            100% { height: 8.2rem; }
          }

          @keyframes barFloat3 {
            0% { height: 5rem; }
            100% { height: 6rem; }
          }

          @keyframes barFloat4 {
            0% { height: 9rem; }
            100% { height: 10.5rem; }
          }

          @keyframes barFloat5 {
            0% { height: 6rem; }
            100% { height: 7.2rem; }
          }

          @keyframes barFloat6 {
            0% { height: 7.5rem; }
            100% { height: 8.7rem; }
          }

          .animate-drawLineOnce {
            animation: drawLine 2.2s ease-out forwards;
          }

          .animate-drawGlowOnce {
            animation: drawGlow 2.2s linear forwards;
          }

          .animate-linePulseOnce {
            animation: linePulse 2.2s ease-out forwards;
          }

          .animate-bar1Once {
            animation: barFloat1 1.4s ease-out forwards;
          }

          .animate-bar2Once {
            animation: barFloat2 1.6s ease-out forwards;
          }

          .animate-bar3Once {
            animation: barFloat3 1.5s ease-out forwards;
          }

          .animate-bar4Once {
            animation: barFloat4 1.8s ease-out forwards;
          }

          .animate-bar5Once {
            animation: barFloat5 1.6s ease-out forwards;
          }

          .animate-bar6Once {
            animation: barFloat6 1.7s ease-out forwards;
          }
        `}
      </style>
    </div>
  )
}