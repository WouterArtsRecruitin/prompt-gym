import { SubscriptionStatus } from './database';

// Week content structure
export interface WeekContent {
  weekNumber: number;
  title: string;
  description: string;
  learningGoals: string[];
  keyPrinciple: string;
  sections: ContentSection[];
  exercises: Exercise[];
  templates: WeekTemplate[];
}

export interface ContentSection {
  title: string;
  content: string;
  type: 'theory' | 'example' | 'practice' | 'tip';
}

export interface Exercise {
  id: string;
  title: string;
  scenario: string;
  challenge: string;
  hints: string[];
  rubric: ExerciseRubric;
  goodExample?: string;
  badExample?: string;
}

export interface ExerciseRubric {
  [key: string]: {
    weight: number;
    check: (prompt: string) => boolean;
    message: string;
  };
}

export interface WeekTemplate {
  id: string;
  title: string;
  description: string;
  prompt: string;
  category: 'screening' | 'vacature' | 'outreach' | 'interview' | 'beoordeling';
}

// User subscription helper
export interface UserSubscription {
  status: SubscriptionStatus;
  canAccessWeek: (weekNumber: number) => boolean;
  currentWeek: number;
  totalWeeksAvailable: number;
  daysUntilNextWeek: number;
  isTrialExpired: boolean;
}

// Pricing
export const PRICING = {
  PRO_MONTHLY: 4900, // in cents
  LEVEL_UNLOCK: 1900, // in cents
  CURRENCY: 'eur',
} as const;

// Content unlock logic
export function calculateAvailableWeeks(
  subscriptionStatus: SubscriptionStatus,
  subscriptionStart: Date | null
): number {
  if (subscriptionStatus === 'free') return 0;
  if (subscriptionStatus === 'trial') return 1;
  if (subscriptionStatus === 'cancelled' || subscriptionStatus === 'expired') return 0;

  if (subscriptionStatus === 'active' && subscriptionStart) {
    const now = new Date();
    const weeksSinceStart = Math.floor(
      (now.getTime() - subscriptionStart.getTime()) / (7 * 24 * 60 * 60 * 1000)
    );
    return Math.min(weeksSinceStart + 1, 36); // Max 36 weeks
  }

  return 0;
}

export function canAccessWeek(
  weekNumber: number,
  subscriptionStatus: SubscriptionStatus,
  subscriptionStart: Date | null
): boolean {
  if (weekNumber < 1 || weekNumber > 36) return false;

  const availableWeeks = calculateAvailableWeeks(subscriptionStatus, subscriptionStart);
  return weekNumber <= availableWeeks;
}

export function getDaysUntilNextWeek(subscriptionStart: Date | null): number {
  if (!subscriptionStart) return 0;

  const now = new Date();
  const daysSinceStart = (now.getTime() - subscriptionStart.getTime()) / (24 * 60 * 60 * 1000);
  const daysIntoCurrentWeek = daysSinceStart % 7;

  return Math.ceil(7 - daysIntoCurrentWeek);
}
