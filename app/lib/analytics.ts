// Google Analytics 4 utility functions

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Track custom events
type GTagEvent = {
  action: string;
  category: string;
  label?: string;
  value?: number;
};

export const event = ({ action, category, label, value }: GTagEvent) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Predefined events for the Prompt Gym
export const trackGameStart = () => {
  event({
    action: 'game_start',
    category: 'engagement',
    label: 'prompt_gym',
  });
};

export const trackLevelComplete = (level: number, score: number) => {
  event({
    action: 'level_complete',
    category: 'engagement',
    label: `level_${level}`,
    value: score,
  });
};

export const trackGameComplete = (totalScore: number) => {
  event({
    action: 'game_complete',
    category: 'conversion',
    label: 'prompt_gym',
    value: totalScore,
  });
};

export const trackTemplateUnlock = (templateName: string) => {
  event({
    action: 'template_unlock',
    category: 'engagement',
    label: templateName,
  });
};

export const trackEmailSignup = (source: string) => {
  event({
    action: 'email_signup',
    category: 'conversion',
    label: source,
  });
};

export const trackWorkshopSignup = () => {
  event({
    action: 'workshop_signup',
    category: 'conversion',
    label: 'workshop_page',
    value: 297,
  });
};

export const trackExitIntent = (converted: boolean) => {
  event({
    action: 'exit_intent',
    category: converted ? 'conversion' : 'engagement',
    label: converted ? 'email_captured' : 'popup_shown',
  });
};

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}
