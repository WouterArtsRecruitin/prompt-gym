export type SubscriptionStatus = 'free' | 'trial' | 'active' | 'cancelled' | 'expired';

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
        };
        Insert: {
          id?: string;
          user_id: string;
          current_week?: number;
          completed_weeks?: number[];
          unlocked_templates?: string[];
          total_score?: number;
          last_activity?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          current_week?: number;
          completed_weeks?: number[];
          unlocked_templates?: string[];
          total_score?: number;
          last_activity?: string;
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
    };
  };
}

// Helper types
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type UserProgress = Database['public']['Tables']['user_progress']['Row'];
export type TrialLog = Database['public']['Tables']['trial_log']['Row'];
