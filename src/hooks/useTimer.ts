import { useState, useEffect, useCallback } from 'react'

const FOCUS_DURATION = 25 * 60

export const useTimer = () => {
  const [timeLeft, setTimeLeft] = useState(FOCUS_DURATION)
  const [isRunning, setIsRunning] = useState(false)
  const [sessionsCompleted, setSessionsCompleted] = useState(0)

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false)
            setSessionsCompleted(prev => prev + 1)
            return FOCUS_DURATION
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isRunning, timeLeft])

  const startTimer = useCallback(() => {
    setIsRunning(true)
  }, [])

  const pauseTimer = useCallback(() => {
    setIsRunning(false)
  }, [])

  const resetTimer = useCallback(() => {
    setIsRunning(false)
    setTimeLeft(FOCUS_DURATION)
  }, [])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  return {
    timeLeft,
    minutes,
    seconds,
    isRunning,
    startTimer,
    pauseTimer,
    resetTimer,
    sessionsCompleted,
    progress: ((FOCUS_DURATION - timeLeft) / FOCUS_DURATION) * 100
  }
}
