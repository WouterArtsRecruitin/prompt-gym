import { WeekContent } from '@/app/types/pro';

export const week01: WeekContent = {
  weekNumber: 1,
  title: 'De 7 Bouwblokken Basis',
  description: 'Introductie tot het 7 Bouwblokken framework voor effectieve prompts',
  learningGoals: [
    'Begrijp waarom structuur belangrijk is bij prompts',
    'Ken de eerste 3 bouwblokken: Rol, Context, Taak',
    'Schrijf je eerste gestructureerde prompt',
  ],
  keyPrinciple: 'Een goede prompt = duidelijke instructie + relevante context + gewenst format',
  sections: [
    {
      title: 'Introductie: Waarom de 7 Bouwblokken?',
      type: 'theory',
      content: `De meeste mensen gebruiken AI zoals een zoekmachine: ze typen een vraag en hopen op het beste.

Maar AI is geen zoekmachine. AI is een intelligente assistent die precies doet wat je vraagt - als je het goed vraagt.

Het verschil tussen:
- "Schrijf een vacaturetekst" → Generic output die je moet herschrijven
- Een prompt met alle 7 bouwblokken → Output die je direct kunt gebruiken

De 7 Bouwblokken zijn:
1. **Rol** - Wie is de AI?
2. **Context** - Wat is de situatie?
3. **Taak** - Wat moet er gebeuren?
4. **Format** - Hoe wil je de output?
5. **Voorbeelden** - Laat zien wat je bedoelt
6. **Constraints** - Wat mag NIET?
7. **Verfijning** - Welke details zijn belangrijk?

Deze week focussen we op de eerste 3 bouwblokken.`,
    },
    {
      title: 'Bouwblok 1: Rol Toewijzen',
      type: 'theory',
      content: `De eerste stap is de AI vertellen wie het is. Dit bepaalt de "lens" waardoor de AI naar je vraag kijkt.

**Waarom dit werkt:**
Een "senior recruiter" denkt anders dan een "copywriter" of "data analyst". Door een rol te geven, activeer je relevante kennis en perspectief.

**Recruitment Rollen:**
| Rol | Wanneer gebruiken |
|-----|-------------------|
| Senior Recruiter | CV screening, kandidaat beoordeling |
| Recruitment Copywriter | Vacatureteksten, employer branding |
| Boolean Expert | Zoekstrings voor LinkedIn |
| Interview Coach | Vragen voorbereiden |

**Voorbeeld:**
❌ Zwak: "Schrijf een vacaturetekst."
✅ Sterk: "Je bent een recruitment copywriter met 10 jaar ervaring bij tech startups. Je schrijft vacatureteksten die eerlijk zijn en de juiste mensen aantrekken."`,
    },
    {
      title: 'Bouwblok 2: Context Geven',
      type: 'theory',
      content: `Context is de achtergrondinformatie die de AI nodig heeft om relevant te antwoorden.

**Context Checklist:**
- **Situatie:** Wat is er aan de hand?
- **Doel:** Wat wil je bereiken?
- **Restricties:** Wat zijn de beperkingen?

**Voorbeeld voor CV screening:**
"Situatie: Ik screen CV's voor een Senior Frontend Developer rol.
Doel: Bepaal of deze kandidaat door mag naar screening.
Restrictie: Maximaal 6 kandidaten mogen door."

**Tip:** Hoe specifieker je context, hoe beter de output. "Een developer positie" is minder nuttig dan "Senior Frontend Developer bij een fintech scale-up van 45 man in Amsterdam."`,
    },
    {
      title: 'Bouwblok 3: Taak Beschrijven',
      type: 'theory',
      content: `De taak is de actie die de AI moet uitvoeren. Wees specifiek en actiegericht.

**Actiewoorden voor recruitment:**
| Actie | Voorbeelden |
|-------|-------------|
| Analyseer | CV, profiel, match |
| Schrijf | Vacature, bericht |
| Genereer | Vragen, boolean strings |
| Vergelijk | Kandidaten, profielen |
| Beoordeel | Fit, kwalificaties |

**Voorbeeld:**
❌ Vaag: "Kijk naar dit CV"
✅ Specifiek: "Analyseer dit CV en geef:
1. Top 3 relevante ervaringen
2. Eventuele rode vlaggen
3. Go/no-go aanbeveling met onderbouwing"`,
    },
    {
      title: 'Praktijkvoorbeeld',
      type: 'example',
      content: `Laten we de eerste 3 bouwblokken combineren voor een CV screening:

**[ROL]**
Je bent een senior recruiter met 8 jaar ervaring in tech recruitment.

**[CONTEXT]**
Situatie: Ik zoek een Frontend Developer voor onze scale-up.
Doel: Eerste screening om te bepalen wie doorgestuurd wordt naar hiring manager.
Restrictie: Budget is €60-75k, moet minimaal 3 jaar React ervaring hebben.

**[TAAK]**
Analyseer dit CV en geef:
1. Samenvatting in 2 zinnen
2. Match score op schaal 1-5
3. Top 3 sterke punten
4. Eventuele rode vlaggen
5. Aanbeveling: door naar hiring manager of afwijzen

---

Vergelijk dit met "Vat dit CV samen" - zie je het verschil in wat je terugkrijgt?`,
    },
  ],
  exercises: [
    {
      id: 'week1-ex1',
      title: 'Jouw Eerste Gestructureerde Prompt',
      scenario: `Je hebt net een CV ontvangen van een kandidaat voor een Marketing Manager positie bij een B2B SaaS bedrijf. Je wilt Claude gebruiken om snel te bepalen of deze kandidaat interessant is.`,
      challenge: `Schrijf een prompt met de eerste 3 bouwblokken:
1. **Rol** - Wie is Claude?
2. **Context** - Wat is de situatie, het doel, en zijn er restricties?
3. **Taak** - Wat moet Claude precies doen?

Tip: Wees specifiek over wat je terugwilt.`,
      hints: [
        "Start met: 'Je bent een [type recruiter] met expertise in [vakgebied].'",
        "Beschrijf de situatie: wat voor bedrijf, wat voor rol?",
        "Geef het doel: waarom doe je deze screening?",
        "Zeg precies wat je wilt: samenvatting, score, aanbeveling?",
      ],
      rubric: {
        hasRole: {
          weight: 30,
          check: (p: string) => /je bent|jij bent/i.test(p) && /recruiter|hr|specialist/i.test(p),
          message: "Rol: Start met 'Je bent een [type] recruiter...'",
        },
        hasContext: {
          weight: 35,
          check: (p: string) => /situatie|doel|voor|omdat|zodat/i.test(p) && /marketing|b2b|saas|bedrijf/i.test(p),
          message: "Context: Beschrijf de situatie en het doel",
        },
        hasTask: {
          weight: 35,
          check: (p: string) => /analyseer|beoordeel|geef|samenvatting|score|aanbeveling/i.test(p),
          message: "Taak: Zeg wat Claude moet doen en opleveren",
        },
      },
      goodExample: `Je bent een senior B2B marketing recruiter met 8 jaar ervaring.

Situatie: Ik screen CV's voor een Marketing Manager positie bij een SaaS scale-up.
Doel: Bepaal of deze kandidaat interessant genoeg is voor een eerste gesprek.

Analyseer dit CV en geef:
1. Korte samenvatting (2 zinnen)
2. Match score (1-5)
3. Top 3 relevante ervaringen
4. Aanbeveling: wel of niet uitnodigen, met onderbouwing`,
    },
  ],
  templates: [
    {
      id: 'week1-template1',
      title: 'Basis CV Screening',
      description: 'Snelle CV screening met de eerste 3 bouwblokken',
      prompt: `Je bent een ervaren recruiter met expertise in [VAKGEBIED].

Situatie: Ik screen CV's voor de positie [FUNCTIE] bij [TYPE BEDRIJF].
Doel: Bepaal of deze kandidaat door mag naar de volgende ronde.

Analyseer dit CV en geef:
1. Samenvatting (2-3 zinnen)
2. Sterke punten (3 bullets)
3. Aandachtspunten
4. Aanbeveling: wel/niet uitnodigen + waarom`,
      category: 'screening',
    },
    {
      id: 'week1-template2',
      title: 'Eerste 3 Bouwblokken Template',
      description: 'Basis template voor elke prompt',
      prompt: `[ROL]
Je bent een [FUNCTIE] met [ERVARING/EXPERTISE].

[CONTEXT]
Situatie: [WAT IS ER AAN DE HAND]
Doel: [WAT WIL JE BEREIKEN]

[TAAK]
[ACTIEWOORD] en geef:
1. [OUTPUT 1]
2. [OUTPUT 2]
3. [OUTPUT 3]`,
      category: 'screening',
    },
  ],
};
