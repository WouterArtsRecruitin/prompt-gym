import Stripe from 'stripe';

// Stripe is only initialized when the secret key is available
// This allows build to succeed without the env var
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

export const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      apiVersion: '2025-12-15.clover',
      typescript: true,
    })
  : null as unknown as Stripe; // Type cast to satisfy TypeScript

export const STRIPE_PRICES = {
  PRO_MONTHLY: process.env.STRIPE_PRICE_ID_MONTHLY || '',
  LEVEL_UNLOCK: process.env.STRIPE_PRICE_ID_ONETIME || '',
} as const;
