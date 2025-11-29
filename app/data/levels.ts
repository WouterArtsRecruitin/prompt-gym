import { Level } from '../types';

export const levels: Level[] = [
  {
    id: 0,
    title: "Prompt Padawan",
    icon: "🥉",
    color: "from-orange-500 to-gray-600",
    description: "Leer de basis zonder je vingers te breken",
    scenario: "Je wilt Claude vragen om een korte samenvatting te maken van een CV voor eerste screening.",
    challenge: "Schrijf een prompt die Claude duidelijk vertelt WAT (samenvatting), HOE (format), en WAAROM (doel).",
    hints: [
      "Geef Claude een rol: 'Je bent een ervaren recruiter...'",
      "Leg context uit: waarom maak je deze samenvatting?",
      "Specificeer het format: bullets, lengte, focus punten",
      "Vraag om specifieke info: skills, ervaring, culture fit"
    ],
    rubric: {
      hasRole: {
        weight: 25,
        check: (p: string) => /\b(je bent|als|rol van|recruiter)\b/i.test(p),
        message: "❌ Geef Claude een duidelijke rol (bijv. 'Je bent een tech recruiter')"
      },
      hasContext: {
        weight: 25,
        check: (p: string) => /\b(voor|omdat|doel|screening)\b/i.test(p),
        message: "❌ Leg uit WAAROM je dit vraagt (bijv. 'voor eerste screening')"
      },
      hasFormat: {
        weight: 25,
        check: (p: string) => /\b(bullet|punt|lijst|max|kort)\b/i.test(p),
        message: "❌ Specificeer het gewenste format (bijv. '3 bullets', 'korte samenvatting')"
      },
      hasSpecifics: {
        weight: 25,
        check: (p: string) => /\b(skills|ervaring|fit)\b/i.test(p),
        message: "❌ Vraag om specifieke elementen (bijv. 'relevante skills en jaren ervaring')"
      }
    },
    goodExample: "Je bent een ervaren tech recruiter. Maak een samenvatting van dit CV in max 3 bullets voor een eerste screening. Focus op: relevante technical skills, jaren ervaring, en culture fit signalen.",
    templates: {
      basis: {
        title: "📝 Basis Template - CV Samenvatting",
        prompt: "Je bent een recruiter. Vat dit CV samen in 3 bullets. Focus op skills, ervaring en fit."
      },
      uitgebreid: {
        title: "🚀 Uitgebreid Template - CV Deep Dive",
        prompt: "Je bent senior recruiter. Analyseer CV: 1) Summary (3 bullets), 2) Red flags, 3) Culture fit, 4) Aanbeveling."
      }
    }
  },
  {
    id: 1,
    title: "Vacature Virtuoso",
    icon: "⚡",
    color: "from-gray-500 to-gray-700",
    description: "Job descriptions die kandidaten doen swipe-right",
    scenario: "Je moet een tech vacature schrijven die toppers aanspreekt én realistisch is.",
    challenge: "Schrijf een prompt die Claude helpt een vacature te maken die authentiek, aantrekkelijk en eerlijk is.",
    hints: [
      "Geef context: Wat voor bedrijf? Welke fase? Wat voor cultuur?",
      "Specificeer tone of voice: Formal vs casual?",
      "Vraag om realistische requirements",
      "Include salary range én benefits"
    ],
    rubric: {
      hasRole: {
        weight: 20,
        check: (p: string) => /\b(schrijf|maak|vacature)\b/i.test(p),
        message: "❌ Maak duidelijk dat je een vacature wilt schrijven"
      },
      hasContext: {
        weight: 30,
        check: (p: string) => /\b(bedrijf|startup|cultuur|team)\b/i.test(p),
        message: "❌ Geef bedrijfscontext (type bedrijf, fase, cultuur)"
      },
      hasTone: {
        weight: 25,
        check: (p: string) => /\b(tone|stijl|casual|authentiek)\b/i.test(p),
        message: "❌ Specificeer de tone of voice"
      },
      hasRequirements: {
        weight: 25,
        check: (p: string) => /\b(requirements|skills|salaris|benefits)\b/i.test(p),
        message: "❌ Vraag om realistische eisen en transparantie"
      }
    },
    goodExample: "Schrijf een vacature voor Senior Frontend Developer bij scale-up in Amsterdam. Tone: Casual maar professioneel. Include: Requirements (5+ jaar), salary range €70-85k, remote-hybrid, tech stack.",
    templates: {
      basis: {
        title: "📝 Basis Template - Vacature",
        prompt: "Schrijf vacature voor [FUNCTIE] bij [BEDRIJF]. Include: locatie, ervaring, skills, tone of voice, format."
      },
      uitgebreid: {
        title: "🚀 Uitgebreid Template - Killer Job Post",
        prompt: "Je bent recruitment expert. Schrijf vacature met: bedrijfscontext, functie details, compensation, must-haves, tone."
      }
    }
  },
  {
    id: 2,
    title: "Sourcing Sorcerer",
    icon: "🔍",
    color: "from-orange-600 to-gray-600",
    description: "Boolean strings zijn zo 2020",
    scenario: "Je wilt Claude helpen een ideale candidate persona te bouwen voor targeted sourcing.",
    challenge: "Schrijf een prompt die een persona maakt + sourcing strategies + waar je kandidaten vindt.",
    hints: [
      "Geef functiecontext: wat doet deze persoon?",
      "Vraag om persona details: skills, motivaties",
      "Include sourcing kanalen: LinkedIn, GitHub",
      "Vraag om messaging strategies"
    ],
    rubric: {
      hasContext: {
        weight: 25,
        check: (p: string) => /\b(functie|rol|developer|engineer)\b/i.test(p),
        message: "❌ Geef duidelijke functiecontext"
      },
      hasPersona: {
        weight: 25,
        check: (p: string) => /\b(persona|profiel|kandidaat)\b/i.test(p),
        message: "❌ Vraag om een candidate persona"
      },
      hasSourcing: {
        weight: 25,
        check: (p: string) => /\b(waar|kanalen|linkedin|github)\b/i.test(p),
        message: "❌ Vraag waar je deze kandidaten kunt vinden"
      },
      hasStrategy: {
        weight: 25,
        check: (p: string) => /\b(messaging|contact|strategie)\b/i.test(p),
        message: "❌ Include messaging/contact strategie"
      }
    },
    goodExample: "Maak candidate persona voor Senior Backend Engineer bij fintech scale-up. Include: skills, motivaties (waarom switchen), waar te vinden (kanalen), messaging strategie.",
    templates: {
      basis: {
        title: "📝 Basis Template - Candidate Persona",
        prompt: "Maak persona voor [FUNCTIE]. Include: profile (skills, ervaring), motivaties, waar te vinden, first contact tip."
      },
      uitgebreid: {
        title: "🚀 Uitgebreid Template - Sourcing Playbook",
        prompt: "Je bent sourcing specialist. Maak playbook: ideale persona, motivaties, waar vinden (LinkedIn + beyond), messaging strategie."
      }
    }
  }
];
