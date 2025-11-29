import { Level } from '../types';

export const levels: Level[] = [
  {
    id: 0,
    title: "De Basis",
    icon: "🎯",
    color: "from-orange-500 to-orange-600",
    description: "Leer de 4 bouwstenen van een goede prompt",
    learningGoal: "Je leert hoe je Claude context geeft zodat je betere antwoorden krijgt",
    keyPrinciple: "ROL + TAAK + CONTEXT + FORMAT = Goed resultaat",
    scenario: `Je hebt net een CV ontvangen van een kandidaat voor een Marketing Manager positie.
Je wilt Claude gebruiken om snel de belangrijkste punten uit het CV te halen, zodat je kunt beslissen of je de kandidaat wilt uitnodigen voor een gesprek.`,
    challenge: `Schrijf een prompt met deze 4 elementen:

1. **Rol** - Wie is Claude? (bijv. "Je bent een recruiter")
2. **Taak** - Wat moet Claude doen? (bijv. "Maak een samenvatting")
3. **Context** - Waarom? (bijv. "voor eerste screening")
4. **Format** - Hoe wil je het resultaat? (bijv. "in 3 bullets")`,
    hints: [
      "Start met: 'Je bent een ervaren recruiter...'",
      "Zeg wat je wilt: 'Maak een samenvatting van dit CV...'",
      "Geef het doel: '...zodat ik kan beslissen of ik wil uitnodigen'",
      "Bepaal het format: '...in maximaal 3 korte bullets'"
    ],
    rubric: {
      hasRole: {
        weight: 25,
        check: (p: string) => /\b(je bent|jij bent|als|recruiter|hr|specialist)\b/i.test(p),
        message: "Rol: Vertel Claude wie het is → 'Je bent een recruiter'"
      },
      hasTask: {
        weight: 25,
        check: (p: string) => /\b(maak|schrijf|geef|vat samen|samenvatting|analyseer|beoordeel)\b/i.test(p),
        message: "Taak: Zeg wat Claude moet doen → 'Maak een samenvatting'"
      },
      hasContext: {
        weight: 25,
        check: (p: string) => /\b(voor|omdat|zodat|doel|screening|beslissen|uitnodigen|gesprek)\b/i.test(p),
        message: "Context: Leg uit waarom → 'voor eerste screening'"
      },
      hasFormat: {
        weight: 25,
        check: (p: string) => /\b(bullet|punt|lijst|max|kort|3|drie|overzicht)\b/i.test(p),
        message: "Format: Bepaal de structuur → 'in 3 bullets'"
      }
    },
    goodExample: `Je bent een ervaren recruiter. Maak een korte samenvatting van dit CV in maximaal 3 bullets. Dit is voor een eerste screening, zodat ik kan beslissen of ik de kandidaat wil uitnodigen voor een gesprek. Focus op relevante ervaring en skills.`,
    badExample: `Vat dit CV samen.`,
    templates: {
      basis: {
        title: "📝 CV Screening - Basis",
        prompt: `Je bent een recruiter.
Vat dit CV samen in 3 bullets voor eerste screening.
Focus op: relevante ervaring, belangrijkste skills, en rode vlaggen.`
      },
      uitgebreid: {
        title: "🚀 CV Screening - Uitgebreid",
        prompt: `Je bent een senior recruiter met 10 jaar ervaring.

Analyseer dit CV voor de functie [FUNCTIE] en geef:
1. Samenvatting (3 bullets)
2. Sterke punten voor deze rol
3. Mogelijke rode vlaggen
4. Aanbeveling: wel/niet uitnodigen + waarom

Wees eerlijk en direct.`
      }
    }
  },
  {
    id: 1,
    title: "Context is King",
    icon: "👑",
    color: "from-blue-500 to-blue-600",
    description: "Leer hoe meer context leidt tot betere resultaten",
    learningGoal: "Je leert hoe je Claude genoeg achtergrondinformatie geeft voor relevante output",
    keyPrinciple: "Hoe meer relevante context, hoe beter het resultaat",
    scenario: `Je moet een vacaturetekst schrijven voor een Frontend Developer.
Maar je wilt niet zomaar een standaard tekst - je wilt een tekst die past bij jullie bedrijf en de juiste kandidaten aantrekt.`,
    challenge: `Schrijf een prompt waarin je Claude genoeg context geeft over:

1. **Het bedrijf** - Wat voor type? Hoe groot? Welke fase?
2. **De cultuur** - Hoe werken jullie? Wat is de sfeer?
3. **De functie** - Wat ga je echt doen? Met wie werk je?
4. **De ideale kandidaat** - Ervaring, skills, maar ook: wat voor persoon?`,
    hints: [
      "Beschrijf je bedrijf: 'Een scale-up van 50 man in fintech...'",
      "Beschrijf de cultuur: 'Informele sfeer, veel vrijheid...'",
      "Wees specifiek over de rol: 'Je bouwt onze klantportal in React...'",
      "Beschrijf de ideale persoon: 'Iemand die houdt van...''"
    ],
    rubric: {
      hasCompanyContext: {
        weight: 25,
        check: (p: string) => /\b(bedrijf|startup|scale-up|corporate|team|medewerkers|groot|klein|fase)\b/i.test(p),
        message: "Bedrijf: Beschrijf type en grootte → 'scale-up van 30 man'"
      },
      hasCulture: {
        weight: 25,
        check: (p: string) => /\b(cultuur|sfeer|informeel|formeel|vrijheid|samenwerk|remote|kantoor|flexibel)\b/i.test(p),
        message: "Cultuur: Beschrijf hoe jullie werken → 'informeel, remote-friendly'"
      },
      hasRoleDetails: {
        weight: 25,
        check: (p: string) => /\b(bouw|ontwikkel|werk aan|verantwoordelijk|taken|project|product)\b/i.test(p),
        message: "De rol: Wat ga je echt doen? → 'Je bouwt onze app'"
      },
      hasIdealCandidate: {
        weight: 25,
        check: (p: string) => /\b(ervaring|jaar|junior|senior|skills|kennis|persoon|iemand die|zoeken)\b/i.test(p),
        message: "Kandidaat: Wie zoek je? → '3+ jaar ervaring, teamplayer'"
      }
    },
    goodExample: `Schrijf een vacaturetekst voor Frontend Developer.

**Over ons:** Scale-up in fintech, 45 medewerkers, Amsterdam. We bouwen een app waarmee mensen makkelijker kunnen investeren.

**Cultuur:** Informeel, veel vrijheid, 2 dagen remote. Jong team, gemiddeld 32 jaar. We lunchen samen en doen vrijdag een borrel.

**De rol:** Je werkt in een team van 4 developers aan onze klantportal (React/TypeScript). Je bouwt nieuwe features en verbetert de UX.

**We zoeken:** 3+ jaar ervaring met React, iemand die houdt van clean code en goede UX. Geen rockstar, wel een teamplayer.

Schrijf een eerlijke, aantrekkelijke vacature. Niet te corporate, wel professioneel.`,
    badExample: `Schrijf een vacature voor een developer.`,
    templates: {
      basis: {
        title: "📝 Vacature - Basis",
        prompt: `Schrijf een vacature voor [FUNCTIE].

Bedrijf: [TYPE + GROOTTE]
Cultuur: [HOE WERKEN JULLIE]
De rol: [WAT GA JE DOEN]
We zoeken: [ERVARING + TYPE PERSOON]

Toon: [FORMEEL/INFORMEEL]`
      },
      uitgebreid: {
        title: "🚀 Vacature - Uitgebreid",
        prompt: `Je bent een recruitment copywriter die vacatures schrijft die kandidaten echt willen lezen.

Schrijf een vacature voor [FUNCTIE] bij [BEDRIJF].

Context:
- Type bedrijf: [STARTUP/SCALE-UP/CORPORATE]
- Grootte: [AANTAL MENSEN]
- Cultuur: [BESCHRIJVING]
- Tech stack: [TOOLS/TECHNOLOGIE]
- Salaris range: [BEDRAG]
- Remote policy: [BELEID]

Maak de tekst:
- Eerlijk (geen bullshit requirements)
- Aantrekkelijk (laat zien waarom dit leuk is)
- Scanbaar (bullets, korte alinea's)
- Met een duidelijke CTA`
      }
    }
  },
  {
    id: 2,
    title: "Output Sturen",
    icon: "🎨",
    color: "from-purple-500 to-purple-600",
    description: "Leer hoe je precies krijgt wat je nodig hebt",
    learningGoal: "Je leert hoe je het format en de structuur van Claude's antwoord bepaalt",
    keyPrinciple: "Wees specifiek over HOE je het antwoord wilt ontvangen",
    scenario: `Je hebt een goed gesprek gehad met een kandidaat en wilt nu een gestructureerde beoordeling maken. Je wilt dit later kunnen vergelijken met andere kandidaten, dus je hebt een vast format nodig.`,
    challenge: `Schrijf een prompt waarin je Claude vraagt om een kandidaatbeoordeling te maken.
Stuur de output door te specificeren:

1. **Structuur** - Welke onderdelen wil je? (bijv. kopjes, secties)
2. **Format per onderdeel** - Bullets, scores, korte tekst?
3. **Lengte** - Hoe uitgebreid per onderdeel?
4. **Stijl** - Direct en bondig? Of uitgebreide toelichting?`,
    hints: [
      "Geef een structuur: 'Gebruik deze kopjes: Samenvatting, Sterke punten, ...'",
      "Specificeer format: 'Geef sterke punten in 3 bullets'",
      "Geef scores: 'Beoordeel op schaal 1-5'",
      "Bepaal lengte: 'Houd elke sectie onder de 50 woorden'"
    ],
    rubric: {
      hasStructure: {
        weight: 25,
        check: (p: string) => /\b(kopje|sectie|onderdeel|deel|1\)|2\)|eerst|dan|daarna|format)\b/i.test(p),
        message: "Structuur: Welke onderdelen? → 'Gebruik kopjes: A, B, C'"
      },
      hasFormat: {
        weight: 25,
        check: (p: string) => /\b(bullet|punt|score|schaal|1-5|rating|lijst|tabel)\b/i.test(p),
        message: "Format: Hoe presenteren? → 'in bullets', 'score 1-5'"
      },
      hasLength: {
        weight: 25,
        check: (p: string) => /\b(kort|lang|max|woorden|zinnen|beknopt|uitgebreid|bondig)\b/i.test(p),
        message: "Lengte: Hoe uitgebreid? → 'max 3 bullets per onderdeel'"
      },
      hasStyle: {
        weight: 25,
        check: (p: string) => /\b(direct|eerlijk|objectief|concreet|specifiek|voorbeeld|onderbouw)\b/i.test(p),
        message: "Stijl: Hoe schrijven? → 'wees direct en concreet'"
      }
    },
    goodExample: `Je bent een senior recruiter. Maak een kandidaatbeoordeling voor [NAAM].

Gebruik dit format:

**1. Samenvatting** (2-3 zinnen)
Korte conclusie: aannemen of niet?

**2. Scores** (1-5, waar 5 = uitstekend)
- Relevante ervaring: [score]
- Technische skills: [score]
- Communicatie: [score]
- Culture fit: [score]

**3. Sterke punten** (max 3 bullets)
Concreet en specifiek, met voorbeelden uit het gesprek.

**4. Aandachtspunten** (max 3 bullets)
Eerlijk maar fair. Wat moet je checken of ontwikkelen?

**5. Eindadvies** (1 zin)
Directe aanbeveling.

Wees objectief en onderbouw je scores met concrete observaties.`,
    badExample: `Geef feedback over de kandidaat.`,
    templates: {
      basis: {
        title: "📝 Kandidaatbeoordeling - Basis",
        prompt: `Maak een beoordeling van deze kandidaat.

Gebruik dit format:
1. Samenvatting (2 zinnen)
2. Sterke punten (3 bullets)
3. Aandachtspunten (3 bullets)
4. Advies (aannemen: ja/nee + waarom)`
      },
      uitgebreid: {
        title: "🚀 Kandidaatbeoordeling - Scorecard",
        prompt: `Je bent een objectieve recruiter. Maak een gestructureerde kandidaatbeoordeling.

**Format:**

SAMENVATTING
[2-3 zinnen conclusie]

SCORES (1-5)
| Criterium | Score | Toelichting |
|-----------|-------|-------------|
| Ervaring | X | [1 zin] |
| Skills | X | [1 zin] |
| Communicatie | X | [1 zin] |
| Culture fit | X | [1 zin] |

STERKE PUNTEN
• [Punt 1 met concreet voorbeeld]
• [Punt 2 met concreet voorbeeld]
• [Punt 3 met concreet voorbeeld]

AANDACHTSPUNTEN
• [Punt 1 - wat en hoe oplossen]
• [Punt 2 - wat en hoe oplossen]

EINDADVIES
[Duidelijke aanbeveling met onderbouwing]`
      }
    }
  }
];
