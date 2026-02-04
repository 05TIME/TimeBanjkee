import { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { Timer } from './components/Timer'
import { Stats } from './components/Stats'
import { TONConnect } from './components/TONConnect'
import { useTelegram } from './hooks/useTelegram'
import { useTimer } from './hooks/useTimer'

function App() {
  const { user } = useTelegram()
  const { sessionsCompleted } = useTimer()
  const [timeBanked, setTimeBanked] = useState(0)
  const [streak, setStreak] = useState(0)

  useEffect(() => {
    setTimeBanked(sessionsCompleted * 25)
    if (sessionsCompleted > 0) {
      setStreak(Math.floor(sessionsCompleted / 2) + 1)
    }
  }, [sessionsCompleted])

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-slate-950 to-slate-900 text-white">
      <Header username={user?.first_name} />

      <div className="flex-1 overflow-y-auto">
        <div className="space-y-6 pb-20">
          <Timer />

          <div className="px-4">
            <Stats
              timeBanked={timeBanked}
              streak={streak}
              sessionsCompleted={sessionsCompleted}
            />
          </div>

          <div className="px-4 space-y-3">
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              <h3 className="text-sm font-semibold text-slate-300 mb-2">How it works</h3>
              <ul className="text-xs text-slate-400 space-y-1">
                <li>✓ Complete 25-minute focus sessions</li>
                <li>✓ Earn time units with each session</li>
                <li>✓ Build streaks for bonus rewards</li>
                <li>✓ Redeem for $TIME tokens</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-700 bg-slate-900 sticky bottom-0">
        <TONConnect />
      </div>
    </div>
  )
}

<div style={{ marginTop: '40px', textAlign: 'center' }}>
  <h2>🧠 $TIMEŒ – Time AI Godfather Speaks</h2>
  <p>Based on your focus today: Future looks bullish for $TIMEŒ 🔥</p>
  <button 
    onClick={() => alert("What if you focused 2 more hours? → +15% projected $TIMEŒ value!")}
    style={{ padding: '12px 24px', fontSize: '18px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '8px' }}
  >
    Simulate What-If
  </button>
</div>

export default App
