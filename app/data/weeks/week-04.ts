import { WeekContent } from '@/app/types/pro';

export const week04: WeekContent = {
  weekNumber: 4,
  title: 'Praktijkopdracht: Bouw Je Prompt Library',
  description: 'Pas alles toe en bouw je persoonlijke prompt collectie',
  learningGoals: [
    'Creëer 5 herbruikbare prompts voor jouw dagelijkse werk',
    'Test en verfijn je prompts tot ze consistent werken',
    'Bouw de basis van je persoonlijke prompt library',
  ],
  keyPrinciple: 'Een goede prompt library bespaart je uren per week',
  sections: [
    {
      title: 'Recap Module 1',
      type: 'theory',
      content: `**Wat je hebt geleerd:**

Week 1: De eerste 3 bouwblokken (Rol, Context, Taak)
Week 2: Alle 7 bouwblokken compleet
Week 3: Prompt levels (simpel, medior, complex)

**Nu:** Alles toepassen in je eigen prompt library.

**Waarom een prompt library?**
- Geen tijd meer verspillen aan steeds opnieuw prompts schrijven
- Consistente output kwaliteit
- Makkelijk te delen met collega's
- Bouwt op: elke week voeg je nieuwe prompts toe`,
    },
    {
      title: 'De 5 Essentiële Recruitment Prompts',
      type: 'theory',
      content: `Elke recruiter heeft minimaal deze 5 prompts nodig:

| # | Prompt | Frequentie | Level |
|---|--------|------------|-------|
| 1 | CV Quick Scan | Dagelijks | 1-2 |
| 2 | CV Diepte Analyse | Wekelijks | 2-3 |
| 3 | LinkedIn Outreach | Dagelijks | 2 |
| 4 | Interview Vragen | Wekelijks | 2-3 |
| 5 | Kandidaat Samenvatting | Wekelijks | 2 |

**Je opdracht:** Maak voor elk type minimaal 1 prompt.`,
    },
    {
      title: 'Template: CV Quick Scan',
      type: 'example',
      content: `**Doel:** In 30 seconden weten of een CV relevant is

**Level:** 1-2 (simpel, snel)

\`\`\`
Je bent een ervaren recruiter.

Scan dit CV voor de [FUNCTIE] positie.

Geef in 3 bullets:
1. Relevantie score (1-5)
2. Belangrijkste match
3. Grootste vraagteken

Eindig met: DOOR / SKIP
\`\`\`

**Wanneer gebruiken:** Eerste batch screening, grote aantallen CV's`,
    },
    {
      title: 'Template: CV Diepte Analyse',
      type: 'example',
      content: `**Doel:** Volledige analyse voor hiring manager

**Level:** 2-3 (gestructureerd, gedetailleerd)

\`\`\`
Je bent een senior recruiter met expertise in [VAKGEBIED].

CONTEXT:
Rol: [FUNCTIE] bij [BEDRIJF TYPE]
Must-haves: [CRITERIA 1], [CRITERIA 2]
Nice-to-haves: [CRITERIA 3]

TAAK:
Maak een kandidaat rapport.

FORMAT:
## Samenvatting
[2-3 zinnen]

## Scores
| Criterium | Score | Toelichting |
|-----------|-------|-------------|
| [Criterium 1] | X/5 | [1 zin] |
| [Criterium 2] | X/5 | [1 zin] |

## Sterke punten
- [Punt 1]
- [Punt 2]

## Aandachtspunten
- [Punt 1]

## Aanbeveling
[DOOR / AFWIJZEN] - [Onderbouwing]

CONSTRAINTS:
- Wees specifiek en concreet
- Refereer aan specifieke ervaringen uit CV
- Max 200 woorden
\`\`\``,
    },
    {
      title: 'Template: LinkedIn Outreach',
      type: 'example',
      content: `**Doel:** Gepersonaliseerde benadering

**Level:** 2 (gestructureerd, consistent)

\`\`\`
Je bent een recruiter die kandidaten benadert op LinkedIn.

CONTEXT:
Kandidaat: [NAAM] - [HUIDIGE FUNCTIE] bij [BEDRIJF]
Rol: [FUNCTIE] bij [JOUW BEDRIJF]
Hook: [WAT VALT OP AAN PROFIEL]

TAAK:
Schrijf een LinkedIn bericht.

FORMAT:
- Zin 1: Persoonlijke hook
- Zin 2: Waarom interessant
- Zin 3: Lage drempel vraag

CONSTRAINTS:
- Max 50 woorden
- Geen "exciting opportunity"
- Eindig met open vraag
- Informele maar professionele toon

VOORBEELD:
"Hi [Naam], je post over [onderwerp] viel me op. We zoeken iemand met precies die visie voor [rol]. Open voor een kort gesprek?"
\`\`\``,
    },
    {
      title: 'Tips voor Je Prompt Library',
      type: 'tip',
      content: `**Organisatie:**
- Gebruik een Notion/Google Doc
- Categoriseer per type (Screening, Outreach, Interview)
- Geef elke prompt een duidelijke naam

**Onderhoud:**
- Test elke prompt minimaal 3x
- Noteer wat wel/niet werkt
- Update regelmatig op basis van ervaring

**Variaties:**
- Maak variaties per senioriteit (junior/senior)
- Maak variaties per vakgebied (tech/marketing/sales)
- Bewaar wat werkt, verwijder wat niet werkt

**Delen:**
- Deel succesvolle prompts met je team
- Vraag feedback van collega's
- Bouw samen aan een team library`,
    },
  ],
  exercises: [
    {
      id: 'week4-ex1',
      title: 'Bouw Je Prompt Library',
      scenario: `Dit is je eindopdracht voor Module 1. Je gaat 5 prompts maken die je direct kunt gebruiken in je dagelijkse werk.`,
      challenge: `Maak minimaal 1 prompt voor elk van deze 5 categorieën:

1. **CV Quick Scan** - Snelle relevantie check
2. **CV Diepte Analyse** - Volledig screening rapport
3. **LinkedIn Outreach** - Kandidaat benadering
4. **Interview Vragen** - Vragen generator
5. **Kandidaat Samenvatting** - Briefing voor hiring manager

**Voor elke prompt:**
- Kies het juiste level (1, 2, of 3)
- Gebruik de relevante bouwblokken
- Maak hem specifiek voor jouw vakgebied

Start met de prompt waar je het meeste behoefte aan hebt.`,
      hints: [
        "Begin met de prompt die je het vaakst zou gebruiken",
        "Denk aan je eigen situatie: welk type bedrijf, welke rollen?",
        "Test je prompt met een echt CV of situatie",
        "Pas aan tot het resultaat bruikbaar is",
      ],
      rubric: {
        hasMultiplePrompts: {
          weight: 25,
          check: (p: string) => p.split(/prompt|---|\n\n\n/).length >= 2 || p.length > 500,
          message: "Maak minimaal 2 verschillende prompts",
        },
        hasRole: {
          weight: 15,
          check: (p: string) => /je bent|jij bent/i.test(p),
          message: "Elke prompt heeft een rol nodig",
        },
        hasContext: {
          weight: 15,
          check: (p: string) => /context|situatie|voor|doel/i.test(p),
          message: "Voeg context toe",
        },
        hasFormat: {
          weight: 15,
          check: (p: string) => /format|bullet|score|geef/i.test(p),
          message: "Specificeer output format",
        },
        isRecruitmentRelevant: {
          weight: 15,
          check: (p: string) => /cv|kandidaat|recruiter|screening|outreach|interview|vacature/i.test(p),
          message: "Maak de prompts recruitment-specifiek",
        },
        isReusable: {
          weight: 15,
          check: (p: string) => /\[.*\]/.test(p),
          message: "Gebruik [PLACEHOLDERS] voor herbruikbaarheid",
        },
      },
      goodExample: `# Mijn Prompt Library

## 1. CV Quick Scan (Level 1)

Je bent een tech recruiter.

Scan dit CV voor [FUNCTIE].

Geef:
- Relevantie (1-5)
- Belangrijkste match
- Grootste vraagteken
- Verdict: DOOR / SKIP

---

## 2. LinkedIn Outreach (Level 2)

Je bent een recruiter.

Context:
Kandidaat: [NAAM] bij [BEDRIJF]
Rol: [FUNCTIE] bij [MIJN BEDRIJF]

Schrijf een LinkedIn bericht.

Format: 3 zinnen max
- Persoonlijke hook
- Waarom interessant
- Open vraag

Constraints:
- Max 50 woorden
- Geen "exciting opportunity"
- Informeel maar professioneel`,
    },
  ],
  templates: [
    {
      id: 'week4-template1',
      title: 'Interview Vragen Generator',
      description: 'Genereer relevante interviewvragen',
      prompt: `Je bent een senior recruiter.

CONTEXT:
Functie: [FUNCTIE]
Senioriteitslevel: [JUNIOR/MEDIOR/SENIOR]
Focus: [TECHNISCH/CULTUUR/ERVARING]

TAAK:
Genereer 5 interviewvragen.

FORMAT:
Per vraag:
- De vraag
- Wat je ermee test
- Rode vlag antwoord

CONSTRAINTS:
- Mix van technisch en gedrag
- Geen cliché vragen ("waar zie je jezelf over 5 jaar")
- Specifiek voor deze rol`,
      category: 'interview',
    },
    {
      id: 'week4-template2',
      title: 'Kandidaat Briefing',
      description: 'Samenvatting voor hiring manager',
      prompt: `Je bent een senior recruiter.

CONTEXT:
Kandidaat: [NAAM] voor [FUNCTIE]
Gesproken op: [DATUM]

TAAK:
Schrijf een briefing voor de hiring manager.

FORMAT:
**Samenvatting** (3 zinnen)
[Wie is dit, waarom interessant, belangrijkste aandachtspunt]

**Highlights**
- [Sterk punt 1]
- [Sterk punt 2]
- [Sterk punt 3]

**Aandachtspunten**
- [Punt 1]

**Aanbevolen volgende stap**
[Wat nu?]

CONSTRAINTS:
- Max 150 woorden
- Focus op wat hiring manager moet weten
- Eerlijk maar positief geframed`,
      category: 'beoordeling',
    },
    {
      id: 'week4-template3',
      title: 'Prompt Library Starter',
      description: 'Template om je library te organiseren',
      prompt: `# Mijn Prompt Library
Laatst bijgewerkt: [DATUM]

---

## Screening

### CV Quick Scan
[JOUW PROMPT]

### CV Diepte Analyse
[JOUW PROMPT]

---

## Outreach

### LinkedIn Eerste Bericht
[JOUW PROMPT]

### Follow-up
[JOUW PROMPT]

---

## Interviews

### Vragen Generator
[JOUW PROMPT]

### Interview Samenvatting
[JOUW PROMPT]

---

## Notities
- Wat werkt goed: [NOTITIES]
- Te verbeteren: [NOTITIES]`,
      category: 'screening',
    },
  ],
};
