import Stripe from 'stripe';

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2025-05-28.basil' as Stripe.LatestApiVersion,
      typescript: true,
    });
  }
  return _stripe;
}

// Lazy getter - avoids crash during build when env vars are not set
export const stripe = new Proxy({} as Stripe, {
  get(_, prop) {
    return (getStripe() as Record<string | symbol, unknown>)[prop];
  },
});

export const STRIPE_PRICES = {
  PRO_MONTHLY: process.env.STRIPE_PRICE_ID_MONTHLY!,
  LEVEL_UNLOCK: process.env.STRIPE_PRICE_ID_ONETIME,
} as const;
