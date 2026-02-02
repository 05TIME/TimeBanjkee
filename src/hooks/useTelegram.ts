import { useEffect, useState } from 'react'

interface TelegramUser {
  id: number
  first_name: string
  last_name?: string
  username?: string
  language_code?: string
}

interface TelegramWebApp {
  ready: () => void
  expand: () => void
  initData: string
  initDataUnsafe: {
    user?: TelegramUser
  }
  version: string
  platform: string
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp
    }
  }
}

export const useTelegram = () => {
  const [webApp, setWebApp] = useState<TelegramWebApp | null>(null)
  const [user, setUser] = useState<TelegramUser | null>(null)

  useEffect(() => {
    const tg = window.Telegram?.WebApp
    if (tg) {
      tg.ready()
      setWebApp(tg)
      setUser(tg.initDataUnsafe?.user || null)
    }
  }, [])

  return { webApp, user }
}
