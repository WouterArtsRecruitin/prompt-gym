import { WeekContent } from '@/app/types/pro';

export const week03: WeekContent = {
  weekNumber: 3,
  title: 'Prompt Levels',
  description: 'Leer wanneer je simpele, medior of complexe prompts nodig hebt',
  learningGoals: [
    'Herken wanneer je welk prompt level nodig hebt',
    'Bespaar tijd door niet te over-engineeren',
    'Schrijf efficiënte prompts voor elke situatie',
  ],
  keyPrinciple: 'Gebruik het minimale aantal bouwblokken dat nodig is voor de taak',
  sections: [
    {
      title: 'Niet Elke Taak Vraagt om 7 Bouwblokken',
      type: 'theory',
      content: `Een veelgemaakte fout: elke prompt volproppen met alle 7 bouwblokken.

**Het probleem:**
- Kost extra tijd om te schrijven
- Maakt prompts onnodig lang
- Soms werkt simpel beter

**De oplossing: Prompt Levels**
Kies het juiste level voor de taak:

| Level | Bouwblokken | Wanneer |
|-------|-------------|---------|
| Simpel | 1-3 | Snelle taken, duidelijke output |
| Medior | 4-5 | Gestructureerde output nodig |
| Complex | 6-7 | Nuance en precisie cruciaal |`,
    },
    {
      title: 'Level 1: Simpele Prompts (1-3 bouwblokken)',
      type: 'theory',
      content: `**Wanneer gebruiken:**
- Snelle, eenmalige taken
- Output is vrij standaard
- Je gaat toch nog aanpassen

**Bouwblokken:** Rol + Taak (+ eventueel Context)

**Voorbeelden:**

✅ Geschikt voor Level 1:
- "Vat dit CV samen in 3 bullets"
- "Genereer 5 interviewvragen voor een developer"
- "Herschrijf deze zin professioneler"

❌ Niet geschikt voor Level 1:
- Formele kandidaat beoordelingen
- Vacatureteksten die live gaan
- Outreach sequences

**Template:**
\`\`\`
Je bent een [ROL].
[TAAK]: [WAT MOET ER GEBEUREN]
\`\`\``,
    },
    {
      title: 'Level 2: Medior Prompts (4-5 bouwblokken)',
      type: 'theory',
      content: `**Wanneer gebruiken:**
- Je wilt specifieke output structuur
- Resultaat wordt gedeeld met anderen
- Consistentie is belangrijk

**Bouwblokken:** Rol + Context + Taak + Format + Constraints

**Voorbeelden:**

✅ Geschikt voor Level 2:
- CV screenings voor hiring manager
- Standaard outreach berichten
- Interview samenvattingen

**Template:**
\`\`\`
Je bent een [ROL] met [ERVARING].

Context: [SITUATIE]

Taak: [WAT MOET ER GEBEUREN]

Format:
- [STRUCTUUR]

Constraints:
- [WAT NIET MAG]
\`\`\``,
    },
    {
      title: 'Level 3: Complexe Prompts (6-7 bouwblokken)',
      type: 'theory',
      content: `**Wanneer gebruiken:**
- Hoge stakes (kandidaat ervaring, client facing)
- Nuance en precisie cruciaal
- Output moet perfect zijn

**Bouwblokken:** Alle 7

**Voorbeelden:**

✅ Geschikt voor Level 3:
- Vacatureteksten die live gaan
- Multi-step outreach sequences
- Complexe kandidaat vergelijkingen
- Hiring manager briefings

**Signalen dat je Level 3 nodig hebt:**
- "Dit moet echt goed zijn"
- "Ik kan dit niet nog een keer doen"
- "Meerdere mensen gaan dit zien"
- "Er zijn veel nuances"`,
    },
    {
      title: 'Vergelijking: Dezelfde Taak, 3 Levels',
      type: 'example',
      content: `**Taak:** LinkedIn outreach bericht schrijven

---

**Level 1 (simpel):**
\`\`\`
Schrijf een kort LinkedIn bericht om een developer te benaderen voor een React positie.
\`\`\`
→ Prima voor snelle, informele outreach

---

**Level 2 (medior):**
\`\`\`
Je bent een tech recruiter.

Context: Ik benader een senior developer voor een React rol bij een fintech startup.

Taak: Schrijf een LinkedIn bericht.

Format: Max 3 zinnen, eindig met open vraag.

Constraint: Geen "exciting opportunity" of corporate taal.
\`\`\`
→ Goed voor consistente outreach

---

**Level 3 (complex):**
\`\`\`
Je bent een senior tech recruiter met 8 jaar ervaring.

Context:
- Kandidaat: Senior developer bij [Bedrijf], 6 jaar ervaring
- Rol: Lead Frontend Developer bij fintech scale-up (Series B)
- Unique selling point: Equity + technical leadership rol

Taak: Schrijf een gepersonaliseerd LinkedIn bericht.

Format:
- Zin 1: Persoonlijke hook (referentie naar hun werk)
- Zin 2: Waarom interessant voor hen
- Zin 3: Lage drempel CTA

Voorbeeld:
"Hi [Naam], je talk over React performance optimization viel me op..."

Constraints:
- Max 50 woorden
- Geen "exciting opportunity"
- Niet pushy

Verfijning:
- Refereer aan specifiek project/post van kandidaat
- Benadruk technical leadership, niet management
\`\`\`
→ Voor belangrijke kandidaten die je echt wilt`,
    },
    {
      title: 'Prompt Level Selector',
      type: 'tip',
      content: `**Vraag jezelf af:**

1. **Wat is de impact?**
   - Laag (intern, draft) → Level 1
   - Medium (gedeeld, standaard) → Level 2
   - Hoog (extern, cruciaal) → Level 3

2. **Hoeveel tijd heb ik?**
   - Weinig + laag risico → Level 1
   - Genoeg + gemiddeld risico → Level 2
   - Voldoende + hoog risico → Level 3

3. **Ga ik dit vaker doen?**
   - Eenmalig → Level 1-2
   - Herhaaldelijk → Level 2-3 (investeer in goede prompt)

**Vuistregel:** Start simpel, upgrade alleen als nodig.`,
    },
  ],
  exercises: [
    {
      id: 'week3-ex1',
      title: 'Kies het Juiste Prompt Level',
      scenario: `Je krijgt drie verschillende taken. Bepaal voor elke taak welk prompt level je zou gebruiken en waarom.`,
      challenge: `Schrijf voor EEN van deze taken een prompt op het juiste level:

**Taak A:** Je wilt snel checken of een CV relevant is (ja/nee)

**Taak B:** Je moet een screening rapport maken voor de hiring manager

**Taak C:** Je schrijft een vacaturetekst die op de website komt

Kies de taak, bepaal het level, en schrijf de prompt.`,
      hints: [
        "Taak A = lage impact, snel → welk level?",
        "Taak B = gedeeld met anderen, structuur nodig → welk level?",
        "Taak C = extern, moet perfect zijn → welk level?",
        "Match het aantal bouwblokken met het level",
      ],
      rubric: {
        correctLevel: {
          weight: 30,
          check: (p: string) => {
            const isSimple = p.split('\n').length < 8 && !/format|constraint|voorbeeld/i.test(p);
            const isComplex = /format|constraint|voorbeeld|verfijn/i.test(p);
            return isSimple || isComplex; // Either end of spectrum is intentional
          },
          message: "Level: Kies bewust simpel, medior, of complex",
        },
        hasRole: {
          weight: 20,
          check: (p: string) => /je bent|jij bent|recruiter/i.test(p),
          message: "Rol: Elke prompt heeft minimaal een rol",
        },
        hasTask: {
          weight: 25,
          check: (p: string) => /analyseer|schrijf|check|beoordeel|geef/i.test(p),
          message: "Taak: Zeg wat de AI moet doen",
        },
        appropriateLength: {
          weight: 25,
          check: (p: string) => p.length > 50 && p.length < 2000,
          message: "Lengte: Passend bij het gekozen level",
        },
      },
      goodExample: `[Voor Taak B - Level 2]

Je bent een senior recruiter.

Context: Ik screen CV's voor Marketing Manager bij een B2B SaaS scale-up.
Dit rapport gaat naar de hiring manager.

Taak: Analyseer dit CV en maak een screening rapport.

Format:
- Match score (1-5)
- Top 3 sterke punten
- Belangrijkste aandachtspunt
- Aanbeveling (ja/nee + waarom)

Constraints:
- Max 100 woorden
- Wees direct en concreet`,
    },
  ],
  templates: [
    {
      id: 'week3-template1',
      title: 'Level 1: Snelle Check',
      description: 'Voor simpele, snelle taken',
      prompt: `Je bent een recruiter.

[TAAK]: [WAT MOET ER GEBEUREN]

Geef een kort antwoord.`,
      category: 'screening',
    },
    {
      id: 'week3-template2',
      title: 'Level 2: Gestructureerde Output',
      description: 'Voor taken die gedeeld worden',
      prompt: `Je bent een [ROL] met [ERVARING].

Context: [SITUATIE + DOEL]

Taak: [WAT MOET ER GEBEUREN]

Format:
- [ONDERDEEL 1]
- [ONDERDEEL 2]
- [ONDERDEEL 3]

Constraints:
- [WAT NIET MAG]
- [LENGTE BEPERKING]`,
      category: 'screening',
    },
    {
      id: 'week3-template3',
      title: 'Level 3: Precision Prompt',
      description: 'Voor high-stakes taken',
      prompt: `Je bent een [ROL] met [SPECIFIEKE ERVARING].

CONTEXT:
Situatie: [GEDETAILLEERDE SITUATIE]
Doel: [SPECIFIEK DOEL]
Restricties: [BEPERKINGEN]

TAAK:
[GEDETAILLEERDE TAAK BESCHRIJVING]

FORMAT:
[EXACTE STRUCTUUR VAN OUTPUT]

VOORBEELD:
[CONCREET VOORBEELD VAN GEWENSTE OUTPUT]

CONSTRAINTS:
- [RESTRICTIE 1]
- [RESTRICTIE 2]
- [RESTRICTIE 3]

VERFIJNING:
- Focus op: [PRIORITEIT 1]
- Let op: [PRIORITEIT 2]
- Belangrijk: [NUANCE]`,
      category: 'screening',
    },
  ],
};
