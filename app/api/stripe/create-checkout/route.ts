import { NextResponse } from 'next/server';
import { createClient } from '@/app/lib/supabase/server';
import { stripe, STRIPE_PRICES } from '@/app/lib/stripe';
import { SITE_VERSION } from '@/app/config/site';
import { SubscriptionStatus } from '@/app/types/database';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Je moet ingelogd zijn' },
        { status: 401 }
      );
    }

    const { priceType = 'monthly' } = await request.json();
    const origin = request.headers.get('origin') || '';

    // VERSION B: Mock payment - no real Stripe
    if (SITE_VERSION === 'B') {
      // Directly activate subscription (mock payment success)
      await (supabase as any)
        .from('profiles')
        .update({
          subscription_status: 'active' as SubscriptionStatus,
          subscription_start: new Date().toISOString(),
        })
        .eq('id', user.id);

      // Return success URL directly
      return NextResponse.json({
        url: `${origin}/dashboard?success=true&mock=true`,
      });
    }

    // VERSION A: Real Stripe checkout
    const { data: profile } = await (supabase as any)
      .from('profiles')
      .select('stripe_customer_id, email')
      .eq('id', user.id)
      .single() as { data: { stripe_customer_id: string | null; email: string | null } | null };

    let customerId = profile?.stripe_customer_id;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: profile?.email || user.email,
        metadata: {
          supabase_user_id: user.id,
        },
      });
      customerId = customer.id;

      await (supabase as any)
        .from('profiles')
        .update({ stripe_customer_id: customerId })
        .eq('id', user.id);
    }

    const priceId = priceType === 'monthly'
      ? STRIPE_PRICES.PRO_MONTHLY
      : STRIPE_PRICES.LEVEL_UNLOCK;

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: priceType === 'monthly' ? 'subscription' : 'payment',
      success_url: `${origin}/dashboard?success=true`,
      cancel_url: `${origin}/dashboard?canceled=true`,
      metadata: {
        supabase_user_id: user.id,
        price_type: priceType,
      },
      subscription_data: priceType === 'monthly' ? {
        metadata: {
          supabase_user_id: user.id,
        },
      } : undefined,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: 'Er ging iets mis bij het aanmaken van de checkout' },
      { status: 500 }
    );
  }
}
