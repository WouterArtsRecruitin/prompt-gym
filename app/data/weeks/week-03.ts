import { WeekContent } from '@/app/types/pro';

export const week03: WeekContent = {
  weekNumber: 3,
  title: 'Constraints & Verfijning',
  description: 'Leer grenzen stellen en je prompts verfijnen voor optimale output',
  learningGoals: [
    'Gebruik constraints om ongewenste output te voorkomen',
    'Verfijn prompts met specifieke details en nuances',
    'Beheers alle 7 bouwblokken samen',
  ],
  keyPrinciple: 'Constraints vertellen de AI wat NIET mag, verfijning voegt de details toe die het verschil maken',
  sections: [
    {
      title: 'Bouwblok 6: Constraints',
      type: 'theory',
      content: `Constraints zijn de grenzen die je stelt. Ze voorkomen dat de AI afdwaalt of ongewenste output geeft.

**Waarom Constraints cruciaal zijn in recruitment:**
- Voorkom discriminerende taal in vacatureteksten
- Beperk output lengte voor snelle screening
- Zorg voor AVG-compliance in communicatie
- Houd focus op relevante criteria

**Recruitment Constraints:**
| Type | Voorbeeld |
|------|-----------|
| Lengte | "Maximaal 200 woorden" |
| Taal | "Gebruik geen jargon" |
| Compliance | "Geen verwijzingen naar leeftijd, geslacht of afkomst" |
| Focus | "Alleen technische skills beoordelen, geen soft skills" |
| Toon | "Professioneel maar niet formeel" |

**Voorbeeld:**
"Beoordeel ALLEEN de technische kwalificaties. Gebruik GEEN:
- Verwijzingen naar leeftijd of afstudeerjaarn
- Aannames over cultuurfit
- Discriminerende criteria
Maximaal 150 woorden."`,
    },
    {
      title: 'Bouwblok 7: Verfijning',
      type: 'theory',
      content: `Verfijning is het toevoegen van specifieke details die de output naar een hoger niveau tillen.

**Verfijning technieken:**

1. **Perspectief specificeren:**
   "Beoordeel vanuit het perspectief van een hiring manager die waarde hecht aan leervermogen boven ervaring"

2. **Edge cases benoemen:**
   "Als de kandidaat een career switch heeft gemaakt, weeg dit positief mee als de motivatie duidelijk is"

3. **Prioriteiten stellen:**
   "Focus eerst op hands-on ervaring, dan op opleiding, als laatste op certificeringen"

4. **Output kwaliteit sturen:**
   "Wees eerlijk en direct. Zeg niet 'goed profiel' als het een middelmatig profiel is"

**Tip:** Verfijning komt ALTIJD als laatste. Eerst de basis (bouwblok 1-5), dan constraints (6), dan verfijning (7).`,
    },
    {
      title: 'Alle 7 Bouwblokken Samen',
      type: 'example',
      content: `Hier is een complete prompt met alle 7 bouwblokken:

**[1. ROL]**
Je bent een senior tech recruiter met 10 jaar ervaring bij scale-ups.

**[2. CONTEXT]**
Situatie: Ik screen CV's voor een Lead Frontend Developer bij een fintech scale-up (Serie B, 120 man).
Doel: Top 3 selecteren uit 8 kandidaten voor hiring manager review.
Budget: €85-100k, Amsterdam of hybride.

**[3. TAAK]**
Analyseer dit CV en geef een gestructureerde beoordeling.

**[4. FORMAT]**
Output als:
- Samenvatting (2 zinnen)
- Match Score: [1-5] met toelichting
- Technische Match: [bullets]
- Leadership Indicatoren: [bullets]
- Rode Vlaggen: [bullets of "geen"]
- Verdict: Door / Twijfel / Afwijzen

**[5. VOORBEELD]**
"Score 4/5 - Sterke React/TypeScript ervaring (6jr) met 2 jaar teamlead bij vergelijkbare scale-up. Aandachtspunt: geen fintech achtergrond maar sterke leercurve bij vorige switches."

**[6. CONSTRAINTS]**
- Maximaal 200 woorden
- Beoordeel NIET op basis van leeftijd, geslacht, of universiteit naam
- Alleen objectieve criteria
- Bij twijfel: liever door dan afwijzen

**[7. VERFIJNING]**
- Weeg hands-on coding zwaarder dan management ervaring
- Open source bijdragen zijn een sterk signaal
- Career switches positief meewegen als er een duidelijk patroon van groei is`,
    },
  ],
  exercises: [
    {
      id: 'week3-ex1',
      title: 'Complete 7-Bouwblokken Prompt',
      scenario: `Je wilt een LinkedIn outreach bericht schrijven voor een passive kandidaat. De kandidaat is een Senior Data Scientist bij een groot consultancybedrijf, en jij wilt haar benaderen voor een ML Engineer rol bij jullie AI startup.`,
      challenge: `Schrijf een complete prompt met alle 7 bouwblokken:
1. **Rol** - Expert outreach specialist
2. **Context** - Situatie, kandidaat profiel, jouw bedrijf
3. **Taak** - Schrijf een outreach bericht
4. **Format** - Structuur van het bericht
5. **Voorbeeld** - Toon/stijl voorbeeld
6. **Constraints** - Wat mag niet?
7. **Verfijning** - Extra details voor kwaliteit`,
      hints: [
        "Geef Claude de rol van een sourcing specialist",
        "Beschrijf zowel de kandidaat als je eigen bedrijf",
        "Specificeer de structuur: opening, hook, propositie, CTA",
        "Constraints: niet te lang, niet te salesy, geen copy-paste gevoel",
      ],
      rubric: {
        hasRole: {
          weight: 15,
          check: (p: string) => /je bent|jij bent/i.test(p) && /recruiter|sourcer|specialist|outreach/i.test(p),
          message: "Rol: Start met een duidelijke rol",
        },
        hasContext: {
          weight: 15,
          check: (p: string) => /data scientist|kandidaat|startup|ai|ml/i.test(p),
          message: "Context: Beschrijf de situatie en het kandidaatprofiel",
        },
        hasTask: {
          weight: 15,
          check: (p: string) => /schrijf|maak|genereer/i.test(p) && /bericht|inmall|outreach|linkedin/i.test(p),
          message: "Taak: Geef een duidelijke opdracht",
        },
        hasFormat: {
          weight: 15,
          check: (p: string) => /format|structuur|opbouw|opening|hook|cta|call to action/i.test(p),
          message: "Format: Beschrijf de gewenste structuur",
        },
        hasExample: {
          weight: 15,
          check: (p: string) => /voorbeeld|toon|stijl|zoals/i.test(p),
          message: "Voorbeeld: Geef een voorbeeld van toon of stijl",
        },
        hasConstraints: {
          weight: 15,
          check: (p: string) => /niet|geen|vermijd|maximaal|max\b|beperkt/i.test(p),
          message: "Constraints: Stel duidelijke grenzen",
        },
        hasRefinement: {
          weight: 10,
          check: (p: string) => /persoonlijk|specifiek|detail|nuance|focus|prioriteit/i.test(p),
          message: "Verfijning: Voeg details toe die de kwaliteit verhogen",
        },
      },
      goodExample: `Je bent een senior tech sourcer die gespecialiseerd is in het benaderen van passive kandidaten in AI/ML.

Context: Ik wil een Senior Data Scientist benaderen die bij een groot consultancybedrijf werkt. Ons bedrijf is een AI startup (20 man) die NLP-oplossingen bouwt voor de juridische sector. We zoeken een ML Engineer.

Schrijf een persoonlijk LinkedIn outreach bericht.

Format:
1. Persoonlijke opening (refereer aan iets specifieks van haar profiel)
2. Hook (waarom dit interessant is voor HAAR)
3. Korte propositie (wat maakt ons uniek)
4. Laagdrempelige CTA (geen sollicitatie, wel gesprek)

Voorbeeld toon: "Ik zag je talk over transformer architecturen - fascinerend hoe je dat toepast op [x]."

Constraints:
- Maximaal 100 woorden
- Geen "ik heb een interessante opportuniteit"
- Niet pushy of salesy
- Geen copy-paste gevoel

Verfijning:
- Gebruik haar specifieke expertise als haak
- Benadruk impact over titel
- Suggereer een informeel gesprek, geen sollicitatie`,
    },
  ],
  templates: [
    {
      id: 'week3-template1',
      title: 'LinkedIn Outreach Generator',
      description: 'Persoonlijk outreach bericht met alle 7 bouwblokken',
      prompt: `Je bent een senior tech sourcer met expertise in [VAKGEBIED].

Context: Ik benader een [HUIDIGE FUNCTIE] bij [HUIDIG BEDRIJF] voor de rol [FUNCTIE] bij [JOUW BEDRIJF]. Ons bedrijf: [KORTE BESCHRIJVING].

Schrijf een persoonlijk LinkedIn bericht.

Format:
1. Persoonlijke opening (refereer aan [SPECIFIEK DETAIL])
2. Hook (waarom dit interessant is voor hen)
3. Propositie (wat maakt jullie uniek)
4. Laagdrempelige CTA

Constraints:
- Max 100 woorden
- Geen "interessante opportuniteit"
- Niet pushy
- Persoonlijk en authentiek

Verfijning:
- Focus op hun specifieke expertise als haak
- Benadruk impact boven titel`,
      category: 'outreach',
    },
    {
      id: 'week3-template2',
      title: 'Complete CV Screening (7 Bouwblokken)',
      description: 'Uitgebreide CV screening met alle bouwblokken',
      prompt: `Je bent een senior [VAKGEBIED] recruiter met [X] jaar ervaring.

Context: Ik screen CV's voor [FUNCTIE] bij [TYPE BEDRIJF] ([GROOTTE], [FASE]).
Doel: [DOEL VAN SCREENING].
Budget: [SALARIS RANGE].

Analyseer dit CV en geef een beoordeling.

Format:
- Samenvatting (2 zinnen)
- Match Score: [1-5] + toelichting
- Sterke punten: [3 bullets]
- Aandachtspunten: [bullets]
- Verdict: Door / Twijfel / Afwijzen

Voorbeeld: "[VOORBEELD VAN GEWENSTE BEOORDELING]"

Constraints:
- Max 200 woorden
- Alleen objectieve criteria
- Geen discriminerende aannames

Verfijning:
- [PRIORITEIT 1] weegt zwaarder dan [PRIORITEIT 2]
- [SPECIFIEKE INSTRUCTIE]`,
      category: 'screening',
    },
  ],
};
