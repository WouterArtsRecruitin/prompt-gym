import { createClient } from '@/app/lib/supabase/client';
import { WeekAttempts, UserProgress } from '@/app/types/database';

// Event types for activity logging
export type ActivityEventType =
  | 'session_start'
  | 'session_end'
  | 'week_started'
  | 'week_completed'
  | 'exercise_attempt'
  | 'exercise_completed'
  | 'template_viewed'
  | 'template_copied';

interface ActivityEventData {
  session_start: { referrer?: string };
  session_end: { duration_minutes: number };
  week_started: { week_number: number };
  week_completed: { week_number: number; score: number; attempts: number };
  exercise_attempt: { week_number: number; exercise_id: string; score: number };
  exercise_completed: { week_number: number; exercise_id: string; score: number; attempts: number };
  template_viewed: { template_id: string };
  template_copied: { template_id: string };
}

/**
 * Log an activity event
 */
export async function logActivity<T extends ActivityEventType>(
  eventType: T,
  eventData: ActivityEventData[T]
) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return;

  await supabase.from('activity_log').insert({
    user_id: user.id,
    event_type: eventType,
    event_data: eventData,
  });
}

/**
 * Record a week attempt (handles first completion, best score, etc.)
 */
export async function recordWeekAttempt(
  weekNumber: number,
  score: number,
  completed: boolean
): Promise<void> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return;

  // Get current progress
  const { data: progress } = await supabase
    .from('user_progress')
    .select('week_attempts, completed_weeks, total_score')
    .eq('user_id', user.id)
    .single();

  if (!progress) return;

  const weekAttempts: WeekAttempts = progress.week_attempts || {};
  const weekKey = String(weekNumber);
  const now = new Date().toISOString();

  // Update week attempts
  const currentAttempt = weekAttempts[weekKey] || {
    attempts: 0,
    first_completed: null,
    best_score: 0,
    last_attempt: now,
  };

  const updatedAttempt = {
    attempts: currentAttempt.attempts + 1,
    first_completed: completed && !currentAttempt.first_completed
      ? now
      : currentAttempt.first_completed,
    best_score: Math.max(currentAttempt.best_score, score),
    last_attempt: now,
  };

  weekAttempts[weekKey] = updatedAttempt;

  // Update completed weeks (only add if not already completed)
  let completedWeeks = progress.completed_weeks || [];
  let totalScore = progress.total_score || 0;

  if (completed && !completedWeeks.includes(weekNumber)) {
    completedWeeks = [...completedWeeks, weekNumber].sort((a, b) => a - b);
    // Only add score on first completion
    totalScore += score;
  }

  // Update progress
  await supabase
    .from('user_progress')
    .update({
      week_attempts: weekAttempts,
      completed_weeks: completedWeeks,
      total_score: totalScore,
      last_activity: now,
    })
    .eq('user_id', user.id);

  // Log activity
  if (completed) {
    await logActivity('week_completed', {
      week_number: weekNumber,
      score,
      attempts: updatedAttempt.attempts,
    });
  } else {
    await logActivity('exercise_attempt', {
      week_number: weekNumber,
      exercise_id: `week-${weekNumber}`,
      score,
    });
  }
}

/**
 * Start a session and update session count
 */
export async function startSession(): Promise<void> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return;

  await supabase
    .from('user_progress')
    .update({
      sessions_count: supabase.rpc('increment_sessions'),
      last_activity: new Date().toISOString(),
    })
    .eq('user_id', user.id);

  await logActivity('session_start', {
    referrer: typeof window !== 'undefined' ? document.referrer : undefined,
  });
}

/**
 * End a session and record duration
 */
export async function endSession(durationMinutes: number): Promise<void> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return;

  // Get current total time
  const { data: progress } = await supabase
    .from('user_progress')
    .select('total_time_minutes')
    .eq('user_id', user.id)
    .single();

  if (progress) {
    await supabase
      .from('user_progress')
      .update({
        total_time_minutes: (progress.total_time_minutes || 0) + durationMinutes,
        last_activity: new Date().toISOString(),
      })
      .eq('user_id', user.id);
  }

  await logActivity('session_end', { duration_minutes: durationMinutes });
}

/**
 * Get user progress with computed fields
 */
export async function getUserProgress(): Promise<UserProgress | null> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', user.id)
    .single();

  return data;
}

/**
 * Get progress statistics for dashboard
 */
export interface ProgressStats {
  currentWeek: number;
  completedWeeks: number;
  totalWeeks: number;
  totalScore: number;
  streakDays: number;
  longestStreak: number;
  totalTimeHours: number;
  sessionsCount: number;
  averageScorePerWeek: number;
  completionPercentage: number;
}

export async function getProgressStats(): Promise<ProgressStats | null> {
  const progress = await getUserProgress();

  if (!progress) return null;

  const completedCount = progress.completed_weeks?.length || 0;
  const totalWeeks = 36; // Total weeks in curriculum

  return {
    currentWeek: progress.current_week || 1,
    completedWeeks: completedCount,
    totalWeeks,
    totalScore: progress.total_score || 0,
    streakDays: progress.streak_days || 0,
    longestStreak: progress.longest_streak || 0,
    totalTimeHours: Math.round((progress.total_time_minutes || 0) / 60 * 10) / 10,
    sessionsCount: progress.sessions_count || 0,
    averageScorePerWeek: completedCount > 0
      ? Math.round((progress.total_score || 0) / completedCount)
      : 0,
    completionPercentage: Math.round((completedCount / totalWeeks) * 100),
  };
}

/**
 * Unlock a template
 */
export async function unlockTemplate(templateId: string): Promise<void> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return;

  const { data: progress } = await supabase
    .from('user_progress')
    .select('unlocked_templates')
    .eq('user_id', user.id)
    .single();

  if (!progress) return;

  const templates = progress.unlocked_templates || [];

  if (!templates.includes(templateId)) {
    await supabase
      .from('user_progress')
      .update({
        unlocked_templates: [...templates, templateId],
      })
      .eq('user_id', user.id);

    await logActivity('template_viewed', { template_id: templateId });
  }
}

/**
 * Copy a template (for analytics)
 */
export async function copyTemplate(templateId: string): Promise<void> {
  await logActivity('template_copied', { template_id: templateId });
}
