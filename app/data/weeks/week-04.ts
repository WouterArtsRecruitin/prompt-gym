import { WeekContent } from '@/app/types/pro';

export const week04: WeekContent = {
  weekNumber: 4,
  title: 'Chain Prompting & Iteratie',
  description: 'Leer complexe taken opdelen in stappen en je prompts iteratief verbeteren',
  learningGoals: [
    'Splits complexe taken op in meerdere prompts',
    'Gebruik chain prompting voor betere resultaten',
    'Leer iteratief verfijnen op basis van output',
  ],
  keyPrinciple: 'Complexe taken worden eenvoudig als je ze opdeelt in logische stappen',
  sections: [
    {
      title: 'Chain Prompting: De Kracht van Stappen',
      type: 'theory',
      content: `Niet alles hoeft in een prompt. Vaak krijg je betere resultaten door je taak op te delen.

**Waarom Chain Prompting?**
- Elke stap is eenvoudiger en specifieker
- Je kunt tussenresultaten controleren en bijsturen
- De AI maakt minder fouten bij kleinere taken
- Je houdt overzicht over het proces

**Recruitment Chain Voorbeeld:**
In plaats van "Screen dit CV en schrijf een afwijzingsmail":

**Stap 1:** "Analyseer dit CV voor de rol [X]. Geef een score en onderbouwing."
**Stap 2:** "Op basis van deze analyse, is dit een afwijzing. Schrijf een respectvol afwijzingsbericht dat [specifieke feedback] bevat."

**Wanneer Chain Prompting gebruiken:**
| Situatie | Chain? |
|----------|--------|
| Eenvoudige CV screening | Nee, 1 prompt |
| CV screening + feedback + mail | Ja, 2-3 stappen |
| Volledige intake verwerken | Ja, 3-4 stappen |
| Boolean string genereren | Nee, 1 prompt |
| Sourcing strategie uitwerken | Ja, 3-5 stappen |`,
    },
    {
      title: 'Iteratief Verfijnen',
      type: 'theory',
      content: `De eerste output is zelden perfect. Leer hoe je effectief bijstuurt.

**Iteratie Technieken:**

1. **Meer specifiek maken:**
   "Dit is goed, maar maak de toon informeler en voeg een concreet voorbeeld toe bij punt 3."

2. **Focus verschuiven:**
   "Goed overzicht. Zoom nu in op de technische vaardigheden en geef per skill een score 1-5."

3. **Format aanpassen:**
   "Zet dit om in een email-format die ik direct kan versturen naar de hiring manager."

4. **Kwaliteit verhogen:**
   "Dit is te generiek. Gebruik specifiekere voorbeelden en vermijd cliches als 'dynamisch team'."

**Gouden Regel:** Zeg altijd WAT je anders wilt en WAAROM. Niet alleen "maak het beter".

**Voorbeeld:**
❌ "Maak het beter"
✅ "De intro is te formeel voor een startup. Herschrijf in een informele, directe toon. Voorbeeld: 'Wij bouwen software die...' in plaats van 'Ons bedrijf is gespecialiseerd in...'"`,
    },
    {
      title: 'Praktijkvoorbeeld: Complete Intake Verwerking',
      type: 'example',
      content: `Hier is een chain prompting workflow voor het verwerken van een intake:

**Stap 1 - Intake Samenvatten:**
"Je bent een recruitment consultant. Ik heb net een intake gehad met een hiring manager. Hier zijn mijn notities: [NOTITIES]. Maak een gestructureerde samenvatting met: functie-eisen, team context, cultuur, dealbreakers."

**Stap 2 - Zoekprofiel Opstellen:**
"Op basis van deze samenvatting, stel een zoekprofiel op met: must-haves, nice-to-haves, knockout criteria, en een ideaal kandidaatprofiel in 3 zinnen."

**Stap 3 - Vacaturetekst:**
"Gebruik het zoekprofiel om een vacaturetekst te schrijven. Format: [gewenst format]. Toon: [gewenste toon]."

**Stap 4 - Boolean Strings:**
"Genereer 3 LinkedIn boolean strings gebaseerd op het zoekprofiel. Van breed naar specifiek."

Dit levert 4x betere resultaten op dan alles in 1 prompt proberen te stoppen.`,
    },
    {
      title: 'Tips voor Effectieve Iteratie',
      type: 'tip',
      content: `**Do's:**
- Wees specifiek in je feedback
- Refereer aan concrete delen van de output
- Geef voorbeelden van wat je WEL wilt
- Bouw voort op wat goed is

**Don'ts:**
- Niet hele prompt opnieuw typen
- Niet vaag zijn ("maak het beter")
- Niet te veel tegelijk veranderen
- Niet opgeven na 1 iteratie

**Pro tip:** Bewaar je beste prompts als templates. Na 2-3 iteraties heb je vaak een gouden prompt die je steeds kunt hergebruiken.`,
    },
  ],
  exercises: [
    {
      id: 'week4-ex1',
      title: 'Chain Prompting Workflow',
      scenario: `Je hebt een intake gehad met een hiring manager voor een Product Owner positie bij een e-commerce bedrijf. Je wilt het volledige proces automatiseren: van intake notities naar zoekprofiel naar vacaturetekst.`,
      challenge: `Ontwerp een chain prompting workflow met minimaal 2 stappen:
1. **Stap 1:** Een prompt die intake notities verwerkt tot een gestructureerd zoekprofiel
2. **Stap 2:** Een prompt die het zoekprofiel omzet naar een vacaturetekst

Gebruik voor elke stap de 7 bouwblokken. Zorg dat de output van stap 1 bruikbaar is als input voor stap 2.`,
      hints: [
        "Begin stap 1 met het structureren van ruwe notities",
        "Zorg dat stap 1 output een format heeft dat stap 2 kan gebruiken",
        "Stap 2 kan refereren aan 'het zoekprofiel hierboven'",
        "Voeg constraints toe om de output van elke stap beknopt te houden",
      ],
      rubric: {
        hasMultipleSteps: {
          weight: 25,
          check: (p: string) => /stap\s*[12]|stap\s*1[\s\S]*stap\s*2|eerst[\s\S]*dan|1\)[\s\S]*2\)|1\.[\s\S]*2\./i.test(p),
          message: "Chain: Gebruik minimaal 2 duidelijke stappen",
        },
        hasRole: {
          weight: 15,
          check: (p: string) => /je bent|jij bent/i.test(p) && /recruiter|consultant|specialist/i.test(p),
          message: "Rol: Geef Claude een duidelijke rol",
        },
        hasContext: {
          weight: 15,
          check: (p: string) => /product owner|e-commerce|intake|hiring manager/i.test(p),
          message: "Context: Beschrijf de situatie (intake, bedrijf, rol)",
        },
        hasFormat: {
          weight: 20,
          check: (p: string) => /format|structuur|output|geef.*als|bullets|tabel/i.test(p),
          message: "Format: Specificeer het gewenste output format per stap",
        },
        hasConnection: {
          weight: 25,
          check: (p: string) => /zoekprofiel|op basis van|gebruik.*als|input.*output|resultaat.*stap/i.test(p),
          message: "Verbinding: Zorg dat de stappen op elkaar voortbouwen",
        },
      },
      goodExample: `**Stap 1 - Intake naar Zoekprofiel:**

Je bent een senior recruitment consultant.

Context: Ik heb een intake gehad voor Product Owner bij een e-commerce bedrijf (50 man, scale-up fase). Hier zijn mijn ruwe notities:
[NOTITIES HIER]

Verwerk deze notities tot een gestructureerd zoekprofiel.

Format:
- Functietitel & senioriteitsniveau
- Must-haves (max 5)
- Nice-to-haves (max 3)
- Knockout criteria
- Ideaal kandidaatprofiel (3 zinnen)
- Salarisindicatie

Constraints: Alleen informatie uit de notities, geen aannames.

---

**Stap 2 - Zoekprofiel naar Vacaturetekst:**

Je bent een recruitment copywriter voor tech bedrijven.

Context: Op basis van het zoekprofiel hierboven, schrijf een vacaturetekst.

Format:
1. Pakkende titel
2. Intro (3 zinnen, informele toon)
3. Wat ga je doen? (5 bullets)
4. Wat breng je mee? (must-haves apart van nice-to-haves)
5. Wat bieden wij? (5 bullets)

Constraints: Max 400 woorden, geen cliches, inclusieve taal.

Verfijning: Benadruk impact en groei boven functie-eisen.`,
    },
  ],
  templates: [
    {
      id: 'week4-template1',
      title: 'Intake Verwerking (Chain)',
      description: 'Verwerk intake notities in 2 stappen naar een zoekprofiel',
      prompt: `**Stap 1:** Je bent een recruitment consultant. Verwerk deze intake notities:

[PLAK NOTITIES HIER]

Geef output als:
- Functie & niveau
- Must-haves (max 5)
- Nice-to-haves (max 3)
- Knockout criteria
- Ideaal profiel (3 zinnen)

---

**Stap 2:** Gebruik het zoekprofiel om een vacaturetekst te schrijven met:
1. Pakkende intro (informele toon)
2. Taken (5 bullets)
3. Eisen (must-haves + nice-to-haves)
4. Aanbod (5 bullets)

Constraints: Max 400 woorden, inclusieve taal, geen cliches.`,
      category: 'vacature',
    },
    {
      id: 'week4-template2',
      title: 'Iteratie Feedback Template',
      description: 'Template voor het bijsturen van AI output',
      prompt: `De output hierboven is een goede start, maar ik wil het volgende aanpassen:

1. **Toon:** [HUIDIGE TOON] veranderen naar [GEWENSTE TOON]
   Voorbeeld: [VOORBEELD ZIN IN GEWENSTE TOON]

2. **Focus:** Meer nadruk op [ASPECT] en minder op [ANDER ASPECT]

3. **Format:** [SPECIFIEKE FORMAT AANPASSING]

4. **Toevoegen:** [WAT MIST ER]

5. **Verwijderen:** [WAT IS OVERBODIG]

Behoud wat goed is: [SPECIFIEK BENOEMEN WAT GOED IS].`,
      category: 'screening',
    },
  ],
};
