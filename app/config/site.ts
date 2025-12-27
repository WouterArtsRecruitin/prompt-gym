/**
 * Site Configuration - A/B Versioning
 *
 * VERSION A: Full Pro (9 maanden, €49/maand)
 * - 36 weken content
 * - Module 4-9 teasers
 * - Subscription model
 *
 * VERSION B: Simple (Level 1-3, €19 eenmalig)
 * - Level 1 gratis
 * - Level 2-3 voor €19
 * - Geen subscription, eenmalige betaling
 * - Voor testen: dashboard, emails, templates
 */

export type SiteVersion = 'A' | 'B';

// Change this to switch between versions
export const SITE_VERSION: SiteVersion = 'B';

// Version A: Full Pro Config
const configA = {
  version: 'A' as const,
  name: 'Full Pro',

  // Pricing
  pricing: {
    levelUnlock: 1900, // €19 for Level 2-3
    proMonthly: 4900,  // €49/month
    currency: 'eur',
  },

  // Features
  features: {
    hasProSubscription: true,
    hasModuleTeasers: true,
    totalWeeks: 36,
    showComingSoon: true,
  },

  // Content
  content: {
    freeLevel: 1,
    paidLevels: [2, 3],
    proWeeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], // Expandable to 36
  },

  // Copy
  copy: {
    upgradeTitle: 'Upgrade naar Pro',
    upgradeDescription: 'Krijg toegang tot alle 36 weken training voor €49/maand',
    ctaButton: 'Start Pro - €49/maand',
    dashboardTitle: 'Prompt Gym Pro',
  },
};

// Version B: Simple Test Config (NO REAL PAYMENTS)
const configB = {
  version: 'B' as const,
  name: 'Simple Test',

  // Pricing (mock - no real charges)
  pricing: {
    levelUnlock: 0,    // Free for testing
    proMonthly: 0,     // No subscription
    currency: 'eur',
    isMock: true,      // Flag for mock payments
  },

  // Features
  features: {
    hasProSubscription: false,
    hasModuleTeasers: false,
    totalWeeks: 3, // Just the 3 levels
    showComingSoon: false,
    mockPayments: true, // No real Stripe
  },

  // Content
  content: {
    freeLevel: 1,
    paidLevels: [2, 3],
    proWeeks: [], // No pro weeks in B
  },

  // Copy
  copy: {
    upgradeTitle: 'Unlock Level 2 & 3',
    upgradeDescription: 'Test modus - geen echte betaling',
    ctaButton: 'TEST: Unlock gratis',
    dashboardTitle: 'Prompt Gym',
  },
};

// Export active config based on version
export const siteConfig = SITE_VERSION === 'A' ? configA : configB;

// Type for config
export type SiteConfig = typeof configA;

// Helper functions
export function isVersionA(): boolean {
  return SITE_VERSION === 'A';
}

export function isVersionB(): boolean {
  return SITE_VERSION === 'B';
}

export function hasProSubscription(): boolean {
  return siteConfig.features.hasProSubscription;
}

export function getUpgradeCTA(): string {
  return siteConfig.copy.ctaButton;
}

export function getPriceDisplay(): string {
  if (isVersionB()) {
    return '€19';
  }
  return '€49/maand';
}
