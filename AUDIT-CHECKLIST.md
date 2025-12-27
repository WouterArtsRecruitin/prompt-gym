# Prompt Gym - Volledige Audit & Risico Analyse

## Status Overzicht

### Templates Status
| Template | Status | Locatie |
|----------|--------|---------|
| Week 1: Basis CV Screening | ✅ Klaar | `week-01.ts` |
| Week 1: 3 Bouwblokken Template | ✅ Klaar | `week-01.ts` |
| Week 2: 7-Bouwblokken Master | ✅ Klaar | `week-02.ts` |
| Week 2: CV Screening Scorecard | ✅ Klaar | `week-02.ts` |
| Week 3: Level 1/2/3 Templates | ✅ Klaar | `week-03.ts` |
| Week 4: Interview Vragen | ✅ Klaar | `week-04.ts` |
| Week 4: Kandidaat Briefing | ✅ Klaar | `week-04.ts` |
| Week 4: Library Starter | ✅ Klaar | `week-04.ts` |

**Totaal: 10 templates klaar**

---

## RISICO ANALYSE

### 1. Content Moderatie (HOOG RISICO)

#### Probleem: Discriminerende/Intimiderende Teksten
Users kunnen prompts schrijven die discrimineren op basis van:
- Leeftijd, geslacht, afkomst
- Persoonlijke kenmerken
- Beschermde groepen

#### Huidige Situatie
```
❌ Geen content filtering op user input
❌ Geen AI moderatie op gegenereerde content
❌ Geen meldsysteem voor ongepaste content
```

#### Oplossing Nodig
```typescript
// app/lib/contentModeration.ts
const BLOCKED_PATTERNS = [
  /leeftijd.*(max|onder|boven)/i,
  /alleen.*(man|vrouw|jong|oud)/i,
  /geen.*(allochtoon|buitenlander|moslim)/i,
  // etc.
];

export function checkForBias(text: string): {
  hasBias: boolean;
  warnings: string[];
} {
  // Implementatie
}
```

### 2. Beveiliging (HOOG RISICO)

#### a. Wachtwoord Reset
| Feature | Status |
|---------|--------|
| Reset pagina | ❌ ONTBREEKT |
| Reset email flow | ❌ ONTBREEKT |
| Supabase reset configured | ❌ ONTBREEKT |

#### b. Brute Force Bescherming
| Feature | Status |
|---------|--------|
| Rate limiting login | ❌ ONTBREEKT |
| Account lockout na X pogingen | ❌ ONTBREEKT |
| Suspicious activity logging | ❌ ONTBREEKT |

#### c. Session Management
| Feature | Status |
|---------|--------|
| Session timeout | ⚠️ Supabase default |
| Multi-device detection | ❌ ONTBREEKT |
| Force logout all devices | ❌ ONTBREEKT |

### 3. Activiteit Monitoring (MEDIUM RISICO)

#### Vreemde Activiteiten Detectie
```
❌ Geen alerting bij:
   - Veel mislukte login pogingen
   - Downloads vanaf onbekende locaties
   - Ongebruikelijke gebruikspatronen
   - Account sharing indicaties
```

#### Aanbevolen Events om te Tracken
| Event | Priority |
|-------|----------|
| failed_login | HOOG |
| password_reset_request | HOOG |
| multiple_sessions | MEDIUM |
| rapid_template_downloads | MEDIUM |
| unusual_activity_hours | LAAG |

### 4. Privacy & Compliance (HOOG RISICO)

#### Cookie Consent
| Feature | Status |
|---------|--------|
| Cookie banner | ✅ Aanwezig (custom) |
| Cookiebot integratie | ❌ ONTBREEKT |
| Granulaire consent | ⚠️ Basis (alleen necessary/analytics) |
| Consent logging | ❌ ONTBREEKT |

#### GDPR Compliance
| Requirement | Status |
|-------------|--------|
| Data export (user request) | ❌ ONTBREEKT |
| Data deletion (user request) | ❌ ONTBREEKT |
| Data retention policy | ❌ ONTBREEKT |
| Processing records | ❌ ONTBREEKT |

### 5. Analytics (MEDIUM)

#### GA4 Tracking
| Event | Status |
|-------|--------|
| Page views | ✅ Aanwezig |
| Game start | ✅ Aanwezig |
| Level complete | ✅ Aanwezig |
| Template unlock | ✅ Aanwezig |
| Email signup | ✅ Aanwezig |
| Pro subscription | ❌ ONTBREEKT |
| Login/logout | ❌ ONTBREEKT |
| Error tracking | ❌ ONTBREEKT |
| User journey | ⚠️ Basis |

### 6. Support & Communicatie (HOOG)

| Feature | Status |
|---------|--------|
| FAQ pagina | ❌ ONTBREEKT |
| Contact formulier | ❌ ONTBREEKT |
| WhatsApp widget | ❌ ONTBREEKT |
| Klachten procedure | ❌ ONTBREEKT |
| Help centrum | ❌ ONTBREEKT |
| Email support | ❌ ONTBREEKT |

### 7. Account Management (MEDIUM)

| Feature | Status |
|---------|--------|
| Account pagina | ❌ ONTBREEKT |
| Wachtwoord wijzigen | ❌ ONTBREEKT |
| Email wijzigen | ❌ ONTBREEKT |
| Account verwijderen | ❌ ONTBREEKT |
| Export mijn data | ❌ ONTBREEKT |

---

## PRIORITEIT ACTIELIJST

### KRITIEK (Voor Launch)

1. **Wachtwoord Reset Flow**
   ```
   /reset-password pagina
   Supabase password reset email
   Reset confirmation
   ```

2. **FAQ Pagina**
   ```
   Veelgestelde vragen
   Hoe werkt het?
   Prijzen/abonnementen
   Contact informatie
   ```

3. **Account Pagina**
   ```
   /account route
   Profiel bewerken
   Wachtwoord wijzigen
   Abonnement beheren
   ```

4. **Contact/Klachten**
   ```
   Contact formulier
   Of: WhatsApp button
   Email: support@recruitin.nl
   ```

### HOOG (Week 1 na Launch)

5. **Content Moderatie**
   ```
   Bias detectie in prompts
   Waarschuwing bij problematische content
   Meld-functie
   ```

6. **Cookiebot Integratie**
   ```
   Recruitin Cookiebot account
   Script toevoegen
   Consent management
   ```

7. **Rate Limiting**
   ```
   Login attempts: max 5 per 15 min
   API calls: max 100 per min
   Account lockout na 10 failed attempts
   ```

### MEDIUM (Maand 1)

8. **WhatsApp Integration**
   ```
   WhatsApp Business API
   Of: Simple wa.me link
   Chatbot voor FAQ
   ```

9. **Uitgebreide GA4 Events**
   ```
   Pro subscription tracking
   Funnel analyse
   Error tracking
   User properties
   ```

10. **Activity Monitoring Dashboard**
    ```
    Admin view voor suspicious activity
    Email alerts
    User behavior analytics
    ```

---

## IMPLEMENTATIE AANBEVELINGEN

### 1. Wachtwoord Reset (Meest Urgent)

```typescript
// app/(auth)/reset-password/page.tsx
// Supabase heeft ingebouwde password reset
// Alleen UI nodig

const handleReset = async (email: string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?next=/update-password`,
  });
};
```

### 2. Rate Limiting

```typescript
// middleware.ts - Add rate limiting
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "15 m"), // 5 attempts per 15 min
});
```

### 3. Content Moderatie

```typescript
// app/lib/contentModeration.ts
const BIAS_KEYWORDS = {
  age: ['jong', 'oud', 'leeftijd', 'max 30', 'min 25'],
  gender: ['alleen mannen', 'alleen vrouwen', 'geen vrouwen'],
  origin: ['autochtoon', 'allochtoon', 'buitenlander'],
};

export function detectBias(text: string): Warning[] {
  const warnings: Warning[] = [];
  // Check for bias patterns
  return warnings;
}
```

### 4. WhatsApp Widget (Simpel)

```tsx
// components/WhatsAppButton.tsx
export function WhatsAppButton() {
  const phoneNumber = "31612345678"; // Recruitin nummer
  const message = "Hallo, ik heb een vraag over Prompt Gym";

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      className="fixed bottom-6 right-6 bg-green-500 p-4 rounded-full shadow-lg"
      target="_blank"
    >
      <WhatsAppIcon />
    </a>
  );
}
```

---

## ENVIRONMENT VARIABLES NODIG

```bash
# Supabase (KRITIEK)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe (Voor Versie A)
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_ID_MONTHLY=

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=

# Cookiebot (Optioneel)
NEXT_PUBLIC_COOKIEBOT_ID=

# Rate Limiting (Optioneel)
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# Email (Voor notificaties)
RESEND_API_KEY=
```

---

## QUICK WINS (< 1 uur werk)

1. ✅ FAQ pagina met hardcoded content
2. ✅ WhatsApp link button
3. ✅ Contact email in footer
4. ✅ Password reset pagina (UI only)
5. ✅ Account pagina basis

Wil je dat ik een van deze quick wins implementeer?
