import { WeekContent } from '@/app/types/pro';
import { week01 } from './week-01';
import { week02 } from './week-02';
import { week03 } from './week-03';
import { week04 } from './week-04';

export const weekContent: Record<number, WeekContent> = {
  1: week01,
  2: week02,
  3: week03,
  4: week04,
  // More weeks will be added as content is developed
};

export function getWeekContent(weekNumber: number): WeekContent | null {
  return weekContent[weekNumber] || null;
}

export function getAllWeeks(): WeekContent[] {
  return Object.values(weekContent);
}

// Module structure for UI
export const modules = [
  {
    id: 1,
    title: 'Prompt Fundamentals',
    description: 'Leer de 7 bouwblokken van effectieve prompts',
    weeks: [1, 2, 3, 4],
    color: 'from-orange-500 to-orange-600',
  },
  {
    id: 2,
    title: 'Content & Vacatures',
    description: 'Schrijf vacatures en content die converteren',
    weeks: [5, 6, 7, 8],
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 3,
    title: 'Sourcing & Outreach',
    description: 'Vind en bereik de beste kandidaten',
    weeks: [9, 10, 11, 12],
    color: 'from-purple-500 to-purple-600',
  },
];
