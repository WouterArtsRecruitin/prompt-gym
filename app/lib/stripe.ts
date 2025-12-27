import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
  typescript: true,
});

export const STRIPE_PRICES = {
  PRO_MONTHLY: process.env.STRIPE_PRICE_ID_MONTHLY!,
  LEVEL_UNLOCK: process.env.STRIPE_PRICE_ID_ONETIME,
} as const;
