-- Prompt Gym Pro Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  subscription_status TEXT DEFAULT 'free' CHECK (subscription_status IN ('free', 'trial', 'active', 'cancelled', 'expired')),
  subscription_start TIMESTAMPTZ,
  subscription_end TIMESTAMPTZ,
  stripe_customer_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User progress tracking with extended features
CREATE TABLE public.user_progress (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles ON DELETE CASCADE NOT NULL,

  -- Basic progress
  current_week INTEGER DEFAULT 1,
  completed_weeks INTEGER[] DEFAULT '{}',
  unlocked_templates TEXT[] DEFAULT '{}',
  total_score INTEGER DEFAULT 0,
  last_activity TIMESTAMPTZ DEFAULT NOW(),

  -- Extended tracking: per-week attempts (JSONB)
  -- Format: { "1": { "attempts": 3, "first_completed": "2025-01-01", "best_score": 95, "last_attempt": "2025-01-02" } }
  week_attempts JSONB DEFAULT '{}',

  -- Engagement metrics
  streak_days INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  total_time_minutes INTEGER DEFAULT 0,
  sessions_count INTEGER DEFAULT 0,

  -- Retention signals
  churn_risk TEXT DEFAULT 'low' CHECK (churn_risk IN ('low', 'medium', 'high')),
  last_reminder_sent TIMESTAMPTZ,
  reminder_count INTEGER DEFAULT 0,

  UNIQUE(user_id)
);

-- Activity log for detailed event tracking
CREATE TABLE public.activity_log (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles ON DELETE CASCADE NOT NULL,
  event_type TEXT NOT NULL,
  event_data JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Event types:
-- 'session_start' - User opens the app
-- 'session_end' - User closes the app (with duration)
-- 'week_started' - User starts a week
-- 'week_completed' - User completes a week
-- 'exercise_attempt' - User attempts an exercise
-- 'exercise_completed' - User completes an exercise
-- 'template_viewed' - User views a template
-- 'template_copied' - User copies a template

-- Trial abuse prevention
CREATE TABLE public.trial_log (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT NOT NULL,
  ip_hash TEXT,
  trial_started TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(email)
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trial_log ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- User progress policies
CREATE POLICY "Users can view own progress" ON public.user_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress" ON public.user_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress" ON public.user_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- Activity log policies
CREATE POLICY "Users can view own activity" ON public.activity_log
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own activity" ON public.activity_log
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Trial log: only service role can access (for admin/webhook use)
CREATE POLICY "Service role only for trial_log" ON public.trial_log
  FOR ALL USING (false);

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  );

  INSERT INTO public.user_progress (user_id)
  VALUES (NEW.id);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for updated_at on profiles
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Function to calculate churn risk based on activity
CREATE OR REPLACE FUNCTION public.calculate_churn_risk(last_activity TIMESTAMPTZ)
RETURNS TEXT AS $$
BEGIN
  IF last_activity IS NULL THEN
    RETURN 'high';
  ELSIF last_activity < NOW() - INTERVAL '14 days' THEN
    RETURN 'high';
  ELSIF last_activity < NOW() - INTERVAL '7 days' THEN
    RETURN 'medium';
  ELSE
    RETURN 'low';
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Function to update streak on activity
CREATE OR REPLACE FUNCTION public.update_streak()
RETURNS TRIGGER AS $$
DECLARE
  last_date DATE;
  current_date_val DATE := CURRENT_DATE;
BEGIN
  -- Get the date of last activity
  last_date := DATE(OLD.last_activity);

  -- If activity is on consecutive day, increment streak
  IF current_date_val = last_date + 1 THEN
    NEW.streak_days := OLD.streak_days + 1;
    IF NEW.streak_days > OLD.longest_streak THEN
      NEW.longest_streak := NEW.streak_days;
    END IF;
  -- If activity is on same day, keep streak
  ELSIF current_date_val = last_date THEN
    -- No change to streak
    NULL;
  -- If more than 1 day gap, reset streak
  ELSE
    NEW.streak_days := 1;
  END IF;

  -- Update churn risk
  NEW.churn_risk := 'low';

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update streak when progress is updated
CREATE TRIGGER update_user_streak
  BEFORE UPDATE OF last_activity ON public.user_progress
  FOR EACH ROW
  WHEN (OLD.last_activity IS DISTINCT FROM NEW.last_activity)
  EXECUTE FUNCTION public.update_streak();

-- Indexes for performance
CREATE INDEX idx_profiles_email ON public.profiles(email);
CREATE INDEX idx_profiles_stripe_customer_id ON public.profiles(stripe_customer_id);
CREATE INDEX idx_profiles_subscription_status ON public.profiles(subscription_status);
CREATE INDEX idx_user_progress_user_id ON public.user_progress(user_id);
CREATE INDEX idx_user_progress_last_activity ON public.user_progress(last_activity);
CREATE INDEX idx_user_progress_churn_risk ON public.user_progress(churn_risk);
CREATE INDEX idx_activity_log_user_id ON public.activity_log(user_id);
CREATE INDEX idx_activity_log_event_type ON public.activity_log(event_type);
CREATE INDEX idx_activity_log_created_at ON public.activity_log(created_at);
CREATE INDEX idx_trial_log_email ON public.trial_log(email);

-- View for users at risk of churning (for admin dashboard)
CREATE VIEW public.churn_risk_users AS
SELECT
  p.id,
  p.email,
  p.full_name,
  p.subscription_status,
  up.last_activity,
  up.streak_days,
  up.churn_risk,
  up.completed_weeks,
  up.reminder_count,
  EXTRACT(DAY FROM NOW() - up.last_activity) as days_inactive
FROM public.profiles p
JOIN public.user_progress up ON p.id = up.user_id
WHERE up.churn_risk IN ('medium', 'high')
  AND p.subscription_status = 'active'
ORDER BY up.last_activity ASC;
