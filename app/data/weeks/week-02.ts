import { WeekContent } from '@/app/types/pro';

export const week02: WeekContent = {
  weekNumber: 2,
  title: 'Bouwblokken Verdieping',
  description: 'Beheers alle 7 bouwblokken en schrijf complete prompts',
  learningGoals: [
    'Beheers bouwblokken 4-7: Format, Voorbeelden, Constraints, Verfijning',
    'Schrijf complete prompts met alle 7 bouwblokken',
    'Begrijp wanneer je welke bouwblokken nodig hebt',
  ],
  keyPrinciple: 'Hoe specifieker je prompt, hoe minder je hoeft te corrigeren',
  sections: [
    {
      title: 'Recap Week 1',
      type: 'theory',
      content: `Vorige week leerde je de eerste 3 bouwblokken:
1. **Rol** - Wie is de AI?
2. **Context** - Wat is de situatie?
3. **Taak** - Wat moet er gebeuren?

Deze week voegen we de laatste 4 toe voor complete, professionele prompts.`,
    },
    {
      title: 'Bouwblok 4: Format Specificeren',
      type: 'theory',
      content: `Het format bepaalt HOE je de output wilt ontvangen. Dit voorkomt dat je de output moet herstructureren.

**Format Opties:**
| Type | Wanneer gebruiken |
|------|-------------------|
| Bullets | Snelle samenvatting, scanbaar |
| Tabel | Vergelijkingen, scorecards |
| Scores (1-5) | Beoordelingen, rankings |
| Genummerd | Stappen, prioriteiten |
| Markdown | Gestructureerde documenten |

**Voorbeeld:**
\`\`\`
Geef je antwoord in dit format:
- Samenvatting (2-3 zinnen)
- Sterke punten (3 bullets)
- Aandachtspunten (max 2)
- Score (1-5) met onderbouwing
\`\`\`

**Tip:** Hoe specifieker je format, hoe consistenter de output.`,
    },
    {
      title: 'Bouwblok 5: Voorbeelden Geven (Few-Shot)',
      type: 'theory',
      content: `Few-shot prompting = de AI een voorbeeld laten zien van wat je wilt.

**Waarom dit werkt:**
De AI leert van je voorbeeld de stijl, lengte, en structuur die je zoekt.

**Voorbeeld voor LinkedIn outreach:**
\`\`\`
Schrijf een LinkedIn bericht voor sourcing.

VOORBEELD (toon):
"Hi [Naam], je profiel bij [Bedrijf] viel me op - vooral je ervaring met [Skill].
We zoeken iemand met precies die achtergrond voor [Rol].
Open voor een kort gesprek deze week?"

Schrijf nu een vergelijkbaar bericht voor [KANDIDAAT].
\`\`\`

**Let op:** Je voorbeeld bepaalt de toon. Formeel voorbeeld = formele output.`,
    },
    {
      title: 'Bouwblok 6: Constraints Toevoegen',
      type: 'theory',
      content: `Constraints vertellen de AI wat NIET mag. Dit voorkomt ongewenste output.

**Veelgebruikte constraints:**
| Type | Voorbeeld |
|------|-----------|
| Lengte | "Max 100 woorden" |
| Toon | "Geen corporate jargon" |
| Inhoud | "Geen salarisinfo noemen" |
| Stijl | "Geen uitroeptekens" |
| Scope | "Focus alleen op technische skills" |

**Voorbeeld:**
\`\`\`
Constraints:
- Maximaal 150 woorden
- Geen buzzwords zoals "dynamisch" of "gedreven"
- Niet refereren naar leeftijd of geslacht
- Wees direct, geen inleidende zinnen
\`\`\`

**Tip:** Denk na over wat je NIET wilt zien in de output.`,
    },
    {
      title: 'Bouwblok 7: Verfijning',
      type: 'theory',
      content: `Verfijning = extra details en focus toevoegen voor betere resultaten.

**Wat kun je verfijnen?**
- Prioriteiten: "Focus vooral op..."
- Edge cases: "Als X, dan Y"
- Specifieke aandacht: "Let extra op..."
- Nuances: "Wees strenger bij..."

**Voorbeeld:**
\`\`\`
Verfijning:
- Focus extra op: remote work ervaring en async communicatie skills
- Bij gaps > 6 maanden: vraag door maar wees niet veroordelend
- Prioriteer kandidaten met startup ervaring boven corporate
- Let speciaal op: side projects en open source contributions
\`\`\`

**Wanneer gebruiken:** Bij complexe taken waar nuance belangrijk is.`,
    },
    {
      title: 'Complete 7-Bouwblokken Prompt',
      type: 'example',
      content: `Laten we alle 7 bouwblokken combineren:

**[1. ROL]**
Je bent een senior tech recruiter met 8 jaar ervaring bij scale-ups.

**[2. CONTEXT]**
Situatie: Ik screen CV's voor een Senior Frontend Developer bij een fintech scale-up (50 man, Amsterdam).
Doel: Bepalen wie door mag naar technische screening.
Restrictie: Budget €70-85k, moet hybride willen werken (2 dagen kantoor).

**[3. TAAK]**
Analyseer dit CV en geef een screening rapport.

**[4. FORMAT]**
Gebruik dit format:
- Samenvatting (2 zinnen)
- Match score (1-5)
- Sterke punten (3 bullets)
- Aandachtspunten (max 2)
- Aanbeveling: DOOR / AFWIJZEN + waarom

**[5. VOORBEELD]**
Match score voorbeeld:
"4/5 - Sterke React ervaring, maar geen fintech achtergrond"

**[6. CONSTRAINTS]**
- Max 200 woorden totaal
- Geen vage termen als "interessant" of "potentieel"
- Niet speculeren over salarisverwachting
- Wees direct en concreet

**[7. VERFIJNING]**
Let extra op:
- TypeScript ervaring (must-have)
- Ervaring met testing (Jest, Cypress)
- Remote/async werk ervaring
- Rode vlag: >3 jobs in 2 jaar zonder goede reden`,
    },
  ],
  exercises: [
    {
      id: 'week2-ex1',
      title: 'Complete Prompt met 7 Bouwblokken',
      scenario: `Je moet een CV screenen voor een Marketing Manager positie bij een B2B SaaS bedrijf. Je wilt een gestructureerde beoordeling die je kunt delen met de hiring manager.`,
      challenge: `Schrijf een complete prompt met ALLE 7 bouwblokken:

1. **Rol** - Wie is de AI?
2. **Context** - Situatie, doel, restricties
3. **Taak** - Wat moet de AI doen?
4. **Format** - Hoe wil je de output?
5. **Voorbeeld** - Laat zien wat je bedoelt
6. **Constraints** - Wat mag niet?
7. **Verfijning** - Extra details/focus`,
      hints: [
        "Geef de AI een specifieke rol met ervaring",
        "Beschrijf het bedrijf en de positie in context",
        "Specificeer een duidelijk output format (bullets, scores)",
        "Geef een voorbeeld van hoe een score eruit ziet",
        "Voeg constraints toe: lengte, toon, wat niet mag",
        "Verfijn met specifieke focus punten",
      ],
      rubric: {
        hasRole: {
          weight: 15,
          check: (p: string) => /je bent|jij bent/i.test(p) && /recruiter|hr|specialist|expert/i.test(p),
          message: "Rol: Geef de AI een specifieke identiteit",
        },
        hasContext: {
          weight: 15,
          check: (p: string) => /situatie|context|doel|voor|b2b|saas|marketing/i.test(p),
          message: "Context: Beschrijf situatie en doel",
        },
        hasTask: {
          weight: 15,
          check: (p: string) => /analyseer|beoordeel|screen|geef/i.test(p),
          message: "Taak: Zeg wat de AI moet doen",
        },
        hasFormat: {
          weight: 15,
          check: (p: string) => /format|bullet|score|tabel|structuur/i.test(p),
          message: "Format: Specificeer de output structuur",
        },
        hasExample: {
          weight: 15,
          check: (p: string) => /voorbeeld|zoals|bijv|example/i.test(p),
          message: "Voorbeeld: Laat zien wat je bedoelt",
        },
        hasConstraints: {
          weight: 15,
          check: (p: string) => /niet|geen|max|constraint|vermijd|zonder/i.test(p),
          message: "Constraints: Zeg wat niet mag",
        },
        hasRefinement: {
          weight: 10,
          check: (p: string) => /let op|focus|extra|speciaal|priorit/i.test(p),
          message: "Verfijning: Voeg extra focus toe",
        },
      },
      goodExample: `Je bent een senior B2B marketing recruiter met 10 jaar ervaring.

CONTEXT:
Situatie: Ik screen CV's voor Marketing Manager bij een SaaS scale-up (60 man).
Doel: Bepalen wie door mag naar gesprek met CMO.
Restricties: Budget €65-80k, moet ervaring hebben met product-led growth.

TAAK:
Analyseer dit CV en maak een screening rapport.

FORMAT:
- Samenvatting (2 zinnen)
- Match score (1-5)
- Sterke punten (3 bullets)
- Aandachtspunten (max 2)
- Aanbeveling: JA/NEE + onderbouwing

VOORBEELD:
"Score: 4/5 - Sterke B2B ervaring maar geen SaaS achtergrond"

CONSTRAINTS:
- Max 150 woorden
- Geen vage termen
- Niet speculeren over cultuur fit

VERFIJNING:
Let extra op: demand gen ervaring, data-driven mindset, startup mentaliteit.`,
    },
  ],
  templates: [
    {
      id: 'week2-template1',
      title: '7-Bouwblokken Master Template',
      description: 'Complete template voor elke recruitment prompt',
      prompt: `[1. ROL]
Je bent een [FUNCTIE] met [ERVARING/EXPERTISE].

[2. CONTEXT]
Situatie: [WAT IS ER AAN DE HAND]
Doel: [WAT WIL JE BEREIKEN]
Restricties: [BEPERKINGEN]

[3. TAAK]
[ACTIEWOORD] en geef: [SPECIFIEKE OUTPUTS]

[4. FORMAT]
Gebruik dit format:
- [STRUCTUUR 1]
- [STRUCTUUR 2]
- [STRUCTUUR 3]

[5. VOORBEELD]
[LAAT ZIEN WAT JE BEDOELT]

[6. CONSTRAINTS]
Niet doen:
- [RESTRICTIE 1]
- [RESTRICTIE 2]

[7. VERFIJNING]
Let extra op: [SPECIFIEKE FOCUS]`,
      category: 'screening',
    },
    {
      id: 'week2-template2',
      title: 'CV Screening Scorecard',
      description: 'Gestructureerde CV beoordeling met scores',
      prompt: `Je bent een senior recruiter met expertise in [VAKGEBIED].

CONTEXT:
Ik screen CV's voor [FUNCTIE] bij [BEDRIJF TYPE].
Doel: Bepalen wie door mag naar [VOLGENDE STAP].

TAAK:
Analyseer dit CV en maak een scorecard.

FORMAT:
| Criterium | Score (1-5) | Toelichting |
|-----------|-------------|-------------|
| Relevante ervaring | X | [1 zin] |
| Technische skills | X | [1 zin] |
| Cultuur indicatoren | X | [1 zin] |

Aanbeveling: [DOOR/AFWIJZEN] - [Onderbouwing in 1 zin]

CONSTRAINTS:
- Wees objectief en concreet
- Geen aannames over persoonlijkheid
- Max 100 woorden totaal

VERFIJNING:
Focus op: [BELANGRIJKSTE CRITERIA]`,
      category: 'screening',
    },
  ],
};
