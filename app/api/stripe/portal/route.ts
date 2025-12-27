import { NextResponse } from 'next/server';
import { createClient } from '@/app/lib/supabase/server';
import { SITE_VERSION } from '@/app/config/site';

export async function POST(request: Request) {
  try {
    // Version B doesn't have Stripe portal
    if (SITE_VERSION === 'B') {
      return NextResponse.json(
        { error: 'Billing portal niet beschikbaar in test modus' },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Je moet ingelogd zijn' },
        { status: 401 }
      );
    }

    // Dynamic import Stripe only for Version A
    const { stripe } = await import('@/app/lib/stripe');

    if (!stripe) {
      return NextResponse.json(
        { error: 'Stripe is niet geconfigureerd' },
        { status: 500 }
      );
    }

    // Get Stripe customer ID
    const { data: profile } = await (supabase as any)
      .from('profiles')
      .select('stripe_customer_id')
      .eq('id', user.id)
      .single() as { data: { stripe_customer_id: string | null } | null };

    if (!profile?.stripe_customer_id) {
      return NextResponse.json(
        { error: 'Geen actief abonnement gevonden' },
        { status: 400 }
      );
    }

    // Create billing portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: profile.stripe_customer_id,
      return_url: `${request.headers.get('origin')}/dashboard`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe portal error:', error);
    return NextResponse.json(
      { error: 'Er ging iets mis' },
      { status: 500 }
    );
  }
}
