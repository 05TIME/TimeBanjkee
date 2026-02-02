import { Play, Pause, RotateCcw } from 'lucide-react'
import { useTimer } from '../hooks/useTimer'

export const Timer = () => {
  const { minutes, seconds, isRunning, startTimer, pauseTimer, resetTimer, progress } = useTimer()

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="relative w-64 h-64 mb-8">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="#334155"
            strokeWidth="2"
          />
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="#0ea5e9"
            strokeWidth="2"
            strokeDasharray={`${565 * (progress / 100)} 565`}
            strokeLinecap="round"
            className="transition-all duration-300"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl font-bold text-cyan-400">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>
            <div className="text-sm text-slate-400 mt-2">Focus Time</div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 justify-center">
        {!isRunning ? (
          <button
            onClick={startTimer}
            className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-full p-4 transition-colors"
          >
            <Play size={24} fill="currentColor" />
          </button>
        ) : (
          <button
            onClick={pauseTimer}
            className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-full p-4 transition-colors"
          >
            <Pause size={24} fill="currentColor" />
          </button>
        )}
        <button
          onClick={resetTimer}
          className="bg-slate-600 hover:bg-slate-700 text-white rounded-full p-4 transition-colors"
        >
          <RotateCcw size={24} />
        </button>
      </div>
    </div>
  )
}
