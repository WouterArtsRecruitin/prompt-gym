export type SubscriptionStatus = 'free' | 'trial' | 'active' | 'cancelled' | 'expired';
export type ChurnRisk = 'low' | 'medium' | 'high';

// Week attempt tracking (stored as JSONB)
export interface WeekAttempt {
  attempts: number;
  first_completed: string | null;
  best_score: number;
  last_attempt: string;
}

export interface WeekAttempts {
  [weekNumber: string]: WeekAttempt;
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          subscription_status: SubscriptionStatus;
          subscription_start: string | null;
          subscription_end: string | null;
          stripe_customer_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          subscription_status?: SubscriptionStatus;
          subscription_start?: string | null;
          subscription_end?: string | null;
          stripe_customer_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          subscription_status?: SubscriptionStatus;
          subscription_start?: string | null;
          subscription_end?: string | null;
          stripe_customer_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_progress: {
        Row: {
          id: string;
          user_id: string;
          current_week: number;
          completed_weeks: number[];
          unlocked_templates: string[];
          total_score: number;
          last_activity: string;
          // Extended tracking
          week_attempts: WeekAttempts;
          streak_days: number;
          longest_streak: number;
          total_time_minutes: number;
          sessions_count: number;
          // Retention signals
          churn_risk: ChurnRisk;
          last_reminder_sent: string | null;
          reminder_count: number;
        };
        Insert: {
          id?: string;
          user_id: string;
          current_week?: number;
          completed_weeks?: number[];
          unlocked_templates?: string[];
          total_score?: number;
          last_activity?: string;
          week_attempts?: WeekAttempts;
          streak_days?: number;
          longest_streak?: number;
          total_time_minutes?: number;
          sessions_count?: number;
          churn_risk?: ChurnRisk;
          last_reminder_sent?: string | null;
          reminder_count?: number;
        };
        Update: {
          id?: string;
          user_id?: string;
          current_week?: number;
          completed_weeks?: number[];
          unlocked_templates?: string[];
          total_score?: number;
          last_activity?: string;
          week_attempts?: WeekAttempts;
          streak_days?: number;
          longest_streak?: number;
          total_time_minutes?: number;
          sessions_count?: number;
          churn_risk?: ChurnRisk;
          last_reminder_sent?: string | null;
          reminder_count?: number;
        };
      };
      trial_log: {
        Row: {
          id: string;
          email: string;
          ip_hash: string | null;
          trial_started: string;
        };
        Insert: {
          id?: string;
          email: string;
          ip_hash?: string | null;
          trial_started?: string;
        };
        Update: {
          id?: string;
          email?: string;
          ip_hash?: string | null;
          trial_started?: string;
        };
      };
      activity_log: {
        Row: {
          id: string;
          user_id: string;
          event_type: string;
          event_data: Record<string, unknown>;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          event_type: string;
          event_data?: Record<string, unknown>;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          event_type?: string;
          event_data?: Record<string, unknown>;
          created_at?: string;
        };
      };
    };
  };
}

// Helper types
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type UserProgress = Database['public']['Tables']['user_progress']['Row'];
export type TrialLog = Database['public']['Tables']['trial_log']['Row'];
export type ActivityLog = Database['public']['Tables']['activity_log']['Row'];
