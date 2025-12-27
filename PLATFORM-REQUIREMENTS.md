# Platform Requirements - Prompt Gym Pro

## Huidige Situatie

### Tech Stack
- **Framework:** Next.js 15.5.7 met React 19.1.0
- **Styling:** Tailwind CSS 4
- **State:** Client-side localStorage (`useGameState.ts`)
- **Analytics:** Google Analytics + Vercel Analytics
- **Leads:** Pipedrive integratie (bestaand)
- **Hosting:** Vercel (aangenomen)

### Bestaande Functionaliteit
| Feature | Status |
|---------|--------|
| 3 levels gratis game | ✅ Werkt |
| Email capture na Level 1 | ✅ Werkt |
| Template library (unlock per level) | ✅ Werkt |
| Progress tracking (localStorage) | ✅ Werkt |
| Pipedrive lead capture | ✅ Werkt |
| Workshop pagina | ✅ Werkt |

---

## Gewenste Situatie: Pro Abonnement

### Product Structuur
```
GRATIS (huidige flow)
├── Level 1: De Basis (4 bouwblokken)
├── Email capture na Level 1
└── Level 2-3: Context & Output (met email)

BETAALD: €49/maand
├── Proef de Pro: Week 1 gratis (anti-abuse: email + max 1x per 90 dagen)
├── Maand 1-3: 12 weken training (7 Bouwblokken verdieping)
├── Maand 4-6: 12 weken training (Vacatures & Content)
├── Maand 7-9: 12 weken training (Sourcing & Outreach)
└── Na 9 maanden: Community toegang + updates
```

---

## Technische Requirements

### 1. Authenticatie

**Must Have:**
- Email + wachtwoord login
- Email verificatie
- Wachtwoord reset
- "Onthoud mij" functionaliteit

**Implementatie Opties:**

| Optie | Pro | Con | Kosten |
|-------|-----|-----|--------|
| **NextAuth.js** | Gratis, veel providers | Meer setup | €0 |
| **Clerk** | Snelle setup, UI klaar | Vendor lock-in | €25/maand |
| **Supabase Auth** | Gratis tier, database erbij | Minder features | €0-25/maand |

**Aanbeveling:** Supabase Auth + Database (alles-in-één)

### 2. Database

**Te Bewaren:**
```typescript
// Users
interface User {
  id: string;
  email: string;
  created_at: Date;
  subscription_status: 'free' | 'trial' | 'active' | 'cancelled' | 'expired';
  subscription_start?: Date;
  trial_started?: Date;
  stripe_customer_id?: string;
}

// Progress
interface UserProgress {
  user_id: string;
  current_week: number;        // 1-36
  completed_weeks: number[];   // [1, 2, 3, ...]
  unlocked_templates: string[];
  last_activity: Date;
}

// Trial Abuse Prevention
interface TrialLog {
  email: string;
  ip_address?: string;
  trial_started: Date;
  trial_used: boolean;
}
```

**Implementatie:** Supabase PostgreSQL (gratis tot 500MB)

### 3. Betalingen (Stripe)

**Producten:**
| Product | Prijs | Stripe Type |
|---------|-------|-------------|
| Pro Maandelijks | €49/maand | Subscription |
| Level 2-3 Unlock | €19 eenmalig | One-time |

**Stripe Integratie:**
```
1. Checkout Session API (hosted checkout)
2. Webhooks voor subscription events:
   - checkout.session.completed
   - customer.subscription.updated
   - customer.subscription.deleted
   - invoice.payment_failed
3. Customer Portal (zelf opzeggen)
```

**Anti-Abuse Measures:**
- Trial: Max 1x per email + IP hash check
- 90 dagen cooldown na trial
- Geen trial na eerdere betaling

### 4. Content Unlock Systeem

**Logica:**
```typescript
function canAccessWeek(user: User, weekNumber: number): boolean {
  if (weekNumber <= 0 || weekNumber > 36) return false;

  // Free users: only intro levels
  if (user.subscription_status === 'free') {
    return weekNumber <= 0; // Only Level 0 (intro game)
  }

  // Trial users: Week 1 only
  if (user.subscription_status === 'trial') {
    return weekNumber === 1;
  }

  // Active subscribers: progressive unlock
  if (user.subscription_status === 'active') {
    const weeksSinceStart = getWeeksSince(user.subscription_start);
    return weekNumber <= weeksSinceStart;
  }

  return false;
}
```

**Week Release Schedule:**
- Week N unlocks op dag 1 van week N sinds subscription start
- Eenmalige €19 gebruikers: Level 2-3 direct beschikbaar
- Pro gebruikers: 1 week per week, max 36 weken

### 5. UI/UX Aanpassingen

**Nieuwe Pagina's:**
| Route | Doel |
|-------|------|
| `/login` | Inloggen |
| `/signup` | Account aanmaken |
| `/dashboard` | Pro overzicht + voortgang |
| `/pro/week/[n]` | Week N content |
| `/pro/templates` | Alle unlocked templates |
| `/account` | Account instellingen + opzeggen |

**Aanpassingen Bestaand:**
| Component | Wijziging |
|-----------|-----------|
| `PromptGym.tsx` | Link naar Pro na Level 3 |
| `UpgradeScreen.tsx` | Pro CTA + pricing toevoegen |
| `useGameState.ts` | Server-side sync voor Pro users |
| `levels.ts` | Uitbreiden naar 36 weken data |

---

## Fasering

### Fase 1: Minimum Viable Pro (2-3 weken dev)

**Scope:**
1. Supabase setup (auth + database)
2. Login/signup flow
3. Stripe checkout (€49/maand)
4. Week 1-4 content toevoegen
5. Basis dashboard
6. Content unlock logic

**Deliverables:**
- [ ] Users kunnen account aanmaken
- [ ] Users kunnen €49/maand abonnement afsluiten
- [ ] Week 1 content is toegankelijk na betaling
- [ ] Elke week unlocks nieuwe content
- [ ] Users kunnen opzeggen via Stripe portal

### Fase 2: Complete Content (2-3 weken content)

**Scope:**
1. Week 5-12 content toevoegen
2. Template library uitbreiden
3. Progress tracking verbeteren
4. Email notificaties (nieuwe week beschikbaar)

### Fase 3: Retentie Features (1-2 weken)

**Scope:**
1. Maand 4-6 content (verlenging 1)
2. Maand 7-9 content (verlenging 2)
3. Community feature (Discord integratie?)
4. Certificaat na 9 maanden

---

## Environment Variables

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_ID_MONTHLY=
STRIPE_PRICE_ID_ONETIME=

# Existing
NEXT_PUBLIC_PIPEDRIVE_FORM_URL=
NEXT_PUBLIC_GA_MEASUREMENT_ID=
```

---

## Kostenschatting

### Maandelijkse Kosten (bij 200 subscribers)

| Service | Kosten | Toelichting |
|---------|--------|-------------|
| Vercel Pro | €20/maand | Hosting |
| Supabase | €0-25/maand | Database + Auth (free tier voldoende) |
| Stripe | 1.4% + €0.25 | Per transactie |
| **Totaal vast** | **~€45/maand** | |
| **Stripe fees (200 × €49)** | **~€207/maand** | 2.1% gemiddeld |

### Break-even
- Vaste kosten: ~€45/maand
- Break-even: 1 betalende klant

---

## File Structuur (Nieuwe Files)

```
app/
├── (auth)/
│   ├── login/page.tsx
│   ├── signup/page.tsx
│   └── reset-password/page.tsx
├── (protected)/
│   ├── dashboard/page.tsx
│   ├── account/page.tsx
│   └── pro/
│       ├── week/[weekNumber]/page.tsx
│       └── templates/page.tsx
├── api/
│   ├── auth/[...supabase]/route.ts
│   ├── stripe/
│   │   ├── create-checkout/route.ts
│   │   ├── webhook/route.ts
│   │   └── portal/route.ts
│   └── user/
│       └── progress/route.ts
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── middleware.ts
│   └── stripe.ts
├── data/
│   └── weeks/
│       ├── week-01.ts
│       ├── week-02.ts
│       └── ... (36 files)
└── types/
    └── pro.ts
```

---

## Database Schema (Supabase)

```sql
-- Users (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT NOT NULL,
  subscription_status TEXT DEFAULT 'free',
  subscription_start TIMESTAMPTZ,
  stripe_customer_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Progress tracking
CREATE TABLE public.user_progress (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles NOT NULL,
  current_week INTEGER DEFAULT 1,
  completed_weeks INTEGER[] DEFAULT '{}',
  unlocked_templates TEXT[] DEFAULT '{}',
  last_activity TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Trial abuse prevention
CREATE TABLE public.trial_log (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT NOT NULL,
  ip_hash TEXT,
  trial_started TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(email)
);

-- Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own progress" ON public.user_progress
  FOR ALL USING (auth.uid() = user_id);
```

---

## Volgende Stappen

1. **Supabase Project Aanmaken**
   - Database + Auth setup
   - Schema migratie runnen

2. **Stripe Configureren**
   - Product + Prijs aanmaken (€49/maand)
   - Webhook endpoint configureren
   - Test mode gebruiken

3. **Auth Flow Bouwen**
   - Login/signup pagina's
   - Protected routes middleware
   - Session management

4. **Eerste Week Content**
   - Week 1 content in code
   - Content component
   - Template download functie

5. **Checkout Flow**
   - Stripe checkout integratie
   - Success/cancel pagina's
   - Webhook handler

---

*Platform Requirements v1.0 - December 2025*
