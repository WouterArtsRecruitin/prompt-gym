export interface RubricRule {
  weight: number;
  check: (prompt: string) => boolean;
  message: string;
}

export interface Rubric {
  [key: string]: RubricRule;
}

export interface Template {
  title: string;
  prompt: string;
}

export interface Templates {
  basis: Template;
  uitgebreid: Template;
}

export interface Level {
  id: number;
  title: string;
  icon: string;
  color: string;
  description: string;
  learningGoal: string;
  keyPrinciple: string;
  scenario: string;
  challenge: string;
  hints: string[];
  rubric: Rubric;
  goodExample: string;
  badExample?: string;
  templates: Templates;
}

export interface FeedbackDetail {
  key: string;
  passed: boolean;
  message: string;
  weight: number;
}

export interface Feedback {
  type: 'pass' | 'improve';
  percentage: number;
  message: string;
  details: FeedbackDetail[];
  pointsEarned?: number;
}

export interface GameState {
  currentLevel: number;
  score: number;
  unlockedTemplates: Templates[];
  perfectStreak: number;
  gameComplete: boolean;
}
