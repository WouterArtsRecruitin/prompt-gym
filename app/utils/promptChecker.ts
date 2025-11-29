import { Rubric, FeedbackDetail } from '../types';

export interface CheckResult {
  percentage: number;
  results: FeedbackDetail[];
}

/**
 * Verbeterde prompt checker met meer robuuste matching
 * - Case-insensitive
 * - Synoniemen ondersteuning
 * - Betere word boundary detection
 */
export function checkPrompt(prompt: string, rubric: Rubric): CheckResult {
  let totalScore = 0;
  let maxScore = 0;
  const results: FeedbackDetail[] = [];

  // Normalize prompt voor betere matching
  const normalizedPrompt = prompt
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, ''); // Remove diacritics

  Object.entries(rubric).forEach(([key, rule]) => {
    maxScore += rule.weight;
    const passed = rule.check(normalizedPrompt);
    if (passed) totalScore += rule.weight;
    results.push({
      key,
      passed,
      message: rule.message,
      weight: rule.weight,
    });
  });

  return {
    percentage: Math.round((totalScore / maxScore) * 100),
    results,
  };
}

/**
 * Calculate points earned based on attempts
 * First attempt = 100 points, decreases by 10 per attempt, minimum 50
 */
export function calculatePoints(attempts: number): number {
  return Math.max(100 - attempts * 10, 50);
}

/**
 * Determine pass/fail threshold
 */
export const PASS_THRESHOLD = 75;
export const HINT_THRESHOLD = 2; // Show hints after this many attempts
