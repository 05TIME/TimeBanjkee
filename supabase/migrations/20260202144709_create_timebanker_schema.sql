/*
  # Initialize TimeBanker Database Schema

  1. New Tables
    - `profiles` - User profile information
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `username` (text, optional)
      - `ton_address` (text, optional - for TON wallet)
      - `total_time_banked` (integer - total minutes earned)
      - `current_streak` (integer - current session streak)
      - `sessions_completed` (integer - total sessions done)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `sessions` - Individual focus session records
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `started_at` (timestamp)
      - `completed_at` (timestamp, optional)
      - `duration_minutes` (integer - session length)
      - `time_earned` (integer - base reward)
      - `streak_bonus` (integer - bonus from streak)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Users can only view and edit their own data
    - Policies protect cross-user data access

  3. Indexes
    - user_id for quick lookups
    - created_at for time-based queries
*/

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid UNIQUE NOT NULL,
  username text,
  ton_address text,
  total_time_banked integer DEFAULT 0,
  current_streak integer DEFAULT 0,
  sessions_completed integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  started_at timestamptz NOT NULL,
  completed_at timestamptz,
  duration_minutes integer DEFAULT 25,
  time_earned integer DEFAULT 25,
  streak_bonus integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_created_at ON sessions(created_at);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can view own sessions"
  ON sessions FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own sessions"
  ON sessions FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own sessions"
  ON sessions FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());
