import { TrendingUp, Flame, Clock } from 'lucide-react'

interface StatsProps {
  timeBanked: number
  streak: number
  sessionsCompleted: number
}

export const Stats = ({ timeBanked, streak, sessionsCompleted }: StatsProps) => {
  return (
    <div className="grid grid-cols-3 gap-3 px-4 py-6 bg-slate-800/50 rounded-lg border border-slate-700">
      <div className="text-center">
        <div className="flex items-center justify-center mb-2 text-cyan-400">
          <Clock size={20} />
        </div>
        <div className="text-2xl font-bold text-white">{timeBanked}</div>
        <div className="text-xs text-slate-400">Time Banked</div>
      </div>
      <div className="text-center">
        <div className="flex items-center justify-center mb-2 text-orange-400">
          <Flame size={20} />
        </div>
        <div className="text-2xl font-bold text-white">{streak}</div>
        <div className="text-xs text-slate-400">Streak</div>
      </div>
      <div className="text-center">
        <div className="flex items-center justify-center mb-2 text-green-400">
          <TrendingUp size={20} />
        </div>
        <div className="text-2xl font-bold text-white">{sessionsCompleted}</div>
        <div className="text-xs text-slate-400">Sessions</div>
      </div>
    </div>
  )
}
