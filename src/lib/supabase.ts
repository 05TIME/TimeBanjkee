import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_SUPABASE_ANON_KEY as string

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type UserProfile = {
  id: string
  user_id: string
  username?: string
  ton_address?: string
  total_time_banked: number
  current_streak: number
  sessions_completed: number
  created_at: string
  updated_at: string
}

export type Session = {
  id: string
  user_id: string
  started_at: string
  completed_at?: string
  duration_minutes: number
  time_earned: number
  streak_bonus: number
  created_at: string
}
