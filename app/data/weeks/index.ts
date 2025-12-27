import { WeekContent } from '@/app/types/pro';
import { week01 } from './week-01';

// Week content - will be expanded as content is developed
export const weekContent: Record<number, WeekContent> = {
  1: week01,
  // Week 2-36 will be added as content is developed
};

export function getWeekContent(weekNumber: number): WeekContent | null {
  return weekContent[weekNumber] || null;
}

export function getAllWeeks(): WeekContent[] {
  return Object.values(weekContent);
}

// Module status
export type ModuleStatus = 'available' | 'coming_soon' | 'locked';

export interface Module {
  id: number;
  title: string;
  description: string;
  weeks: number[];
  color: string;
  status: ModuleStatus;
  month: string;
  highlights?: string[];
  bonus?: string;
}

// Complete 9-month curriculum structure
export const modules: Module[] = [
  // ============ MAAND 1-3: PRO START ============
  {
    id: 1,
    title: 'Prompt Fundamentals',
    description: 'Leer de 7 bouwblokken van effectieve prompts',
    weeks: [1, 2, 3, 4],
    color: 'from-orange-500 to-orange-600',
    status: 'available',
    month: 'Maand 1',
    highlights: [
      'De 7 Bouwblokken framework',
      'Prompt levels: simpel tot complex',
      'Bouw je eigen prompt library',
    ],
  },
  {
    id: 2,
    title: 'Content & Vacatures',
    description: 'Schrijf vacatures en content die converteren',
    weeks: [5, 6, 7, 8],
    color: 'from-blue-500 to-blue-600',
    status: 'available',
    month: 'Maand 2',
    highlights: [
      'Vacatureteksten die converteren',
      'SEO & inclusief schrijven',
      'LinkedIn content strategie',
    ],
  },
  {
    id: 3,
    title: 'Sourcing & Outreach',
    description: 'Vind en bereik de beste kandidaten',
    weeks: [9, 10, 11, 12],
    color: 'from-purple-500 to-purple-600',
    status: 'available',
    month: 'Maand 3',
    highlights: [
      'Boolean search met AI',
      'LinkedIn outreach templates',
      'Kandidaat research & matching',
    ],
  },

  // ============ MAAND 4-6: EERSTE VERLENGING ============
  {
    id: 4,
    title: 'CV Screening & Selectie',
    description: 'Screen CV\'s in 30 seconden met AI',
    weeks: [13, 14, 15, 16],
    color: 'from-emerald-500 to-emerald-600',
    status: 'coming_soon',
    month: 'Maand 4',
    highlights: [
      'CV screening in 30 seconden',
      'Criteria-based filtering',
      'Rode vlaggen detectie',
    ],
  },
  {
    id: 5,
    title: 'Interview Preparation',
    description: 'Genereer perfecte interviewvragen',
    weeks: [17, 18, 19, 20],
    color: 'from-cyan-500 to-cyan-600',
    status: 'coming_soon',
    month: 'Maand 5',
    highlights: [
      'Competentie-based vragen',
      'STAR methode prompts',
      'Interview scorecards',
    ],
  },
  {
    id: 6,
    title: 'Advanced Outreach',
    description: 'Multi-step sequences met 40% meer response',
    weeks: [21, 22, 23, 24],
    color: 'from-indigo-500 to-indigo-600',
    status: 'coming_soon',
    month: 'Maand 6',
    highlights: [
      '3-5 staps outreach sequences',
      'A/B testing strategie',
      'Response rate optimalisatie',
    ],
  },

  // ============ MAAND 7-9: TWEEDE VERLENGING + COACHING ============
  {
    id: 7,
    title: 'Workflow Automation',
    description: 'Automatiseer repetitieve taken',
    weeks: [25, 26, 27, 28],
    color: 'from-rose-500 to-rose-600',
    status: 'coming_soon',
    month: 'Maand 7',
    highlights: [
      'Prompt chaining',
      'Batch processing',
      'Template systemen',
    ],
  },
  {
    id: 8,
    title: 'Advanced Strategies',
    description: 'Geavanceerde AI technieken voor recruitment',
    weeks: [29, 30, 31, 32],
    color: 'from-amber-500 to-amber-600',
    status: 'coming_soon',
    month: 'Maand 8',
    highlights: [
      'Multi-model strategieën',
      'Custom GPT\'s bouwen',
      'AI recruitment stack',
    ],
  },
  {
    id: 9,
    title: 'Mastery & Coaching',
    description: 'Bereik expert niveau + persoonlijke coaching',
    weeks: [33, 34, 35, 36],
    color: 'from-fuchsia-500 to-fuchsia-600',
    status: 'coming_soon',
    month: 'Maand 9',
    highlights: [
      'Expert prompt patterns',
      'Eigen workflow design',
      'Certificering',
    ],
    bonus: '30 min personal coaching call',
  },
];

// Helper functions
export function getModuleByWeek(weekNumber: number): Module | null {
  return modules.find(m => m.weeks.includes(weekNumber)) || null;
}

export function getAvailableModules(): Module[] {
  return modules.filter(m => m.status === 'available');
}

export function getComingSoonModules(): Module[] {
  return modules.filter(m => m.status === 'coming_soon');
}

export function getTotalWeeks(): number {
  return 36;
}

export function getModuleProgress(completedWeeks: number[], moduleId: number): number {
  const module = modules.find(m => m.id === moduleId);
  if (!module) return 0;

  const completedInModule = module.weeks.filter(w => completedWeeks.includes(w)).length;
  return Math.round((completedInModule / module.weeks.length) * 100);
}

// Pricing tiers for display
export const pricingTiers = {
  proStart: {
    name: 'Pro Start',
    months: '1-3',
    modules: [1, 2, 3],
    price: 49,
    totalValue: 147,
  },
  extension1: {
    name: 'Eerste Verlenging',
    months: '4-6',
    modules: [4, 5, 6],
    price: 49,
    totalValue: 147,
    teaser: 'CV screening in 30 sec, Interview prep, 40% meer response',
  },
  extension2: {
    name: 'Tweede Verlenging',
    months: '7-9',
    modules: [7, 8, 9],
    price: 49,
    totalValue: 147,
    teaser: 'Automation, Advanced strategies, Personal coaching',
    bonus: '30 min coaching call',
  },
};

// LTV calculation
export const lifetimeValue = {
  levelUnlock: 19,
  months9: 441, // 9 × €49
  total: 460,   // €19 + €441
};
