'use client';

import React, { useState } from 'react';
import { CheckCircle2, XCircle, Trophy, Sparkles, ArrowRight, RefreshCw, Copy, Award, Target, Zap, Search, Users, DollarSign, Rocket, Book, Star, TrendingUp } from 'lucide-react';

const PromptGym = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [userPrompt, setUserPrompt] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [score, setScore] = useState(0);
  const [levelScores, setLevelScores] = useState([]);
  const [unlockedTemplates, setUnlockedTemplates] = useState([]);
  const [showTemplate, setShowTemplate] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [perfectStreak, setPerfectStreak] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const levels = [
    {
      id: 0,
      title: "Prompt Padawan",
      icon: "🥉",
      color: "from-purple-500 to-indigo-600",
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
          check: (p) => /\b(je bent|als|rol van|senior recruiter|tech recruiter|recruiter)\b/i.test(p), 
          message: "❌ Geef Claude een duidelijke rol (bijv. 'Je bent een tech recruiter')" 
        },
        hasContext: { 
          weight: 25, 
          check: (p) => /\b(voor|omdat|doel|screening|eerste ronde|selectie)\b/i.test(p), 
          message: "❌ Leg uit WAAROM je dit vraagt (bijv. 'voor eerste screening')" 
        },
        hasFormat: { 
          weight: 25, 
          check: (p) => /\b(bullet|punt|lijst|max|kort|3|format)\b/i.test(p), 
          message: "❌ Specificeer het gewenste format (bijv. '3 bullets', 'korte samenvatting')" 
        },
        hasSpecifics: { 
          weight: 25, 
          check: (p) => /\b(skills|ervaring|fit|competenties|jaren|technisch)\b/i.test(p), 
          message: "❌ Vraag om specifieke elementen (bijv. 'relevante skills en jaren ervaring')" 
        }
      },
      goodExample: "Je bent een ervaren tech recruiter. Maak een samenvatting van dit CV in max 3 bullets voor een eerste screening. Focus op: relevante technical skills, jaren ervaring, en culture fit signalen.",
      templates: {
        basis: {
          title: "📝 Basis Template - CV Samenvatting",
          prompt: `Je bent een recruiter bij een tech bedrijf.

Maak een korte samenvatting van dit CV in 3 bullets.

Focus op:
- Relevante skills voor deze rol
- Jaren ervaring
- Opvallende achievements

CV: [PLAK HIER CV TEKST]`
        },
        uitgebreid: {
          title: "🚀 Uitgebreid Template - CV Deep Dive",
          prompt: `Je bent een senior tech recruiter met 10+ jaar ervaring in het screenen van developers.

CONTEXT: Ik doe een eerste screening voor een [FUNCTIE] positie. We zoeken iemand met [KEY REQUIREMENTS].

TAAK: Analyseer dit CV en geef me:

1. **Quick Summary** (max 3 bullets)
   - Core technical skills + niveau
   - Jaren relevante ervaring
   - Meest relevante achievement

2. **Red Flags Check** (bullets)
   - Job hopping (>3 switches in 2 jaar?)
   - Grote gaps in CV (>6 maanden?)
   - Mismatch met functie-eisen

3. **Culture Fit Signalen** (bullets)
   - Team vs solo projects
   - Open source / community involvement
   - Growth mindset indicatoren

4. **Aanbeveling**: Door naar volgende ronde? (Ja/Nee + 1-zin waarom)

CV: [PLAK HIER CV TEKST]

FORMAT: Gebruik bullets, wees direct en concreet.`
        }
      }
    },
    {
      id: 1,
      title: "Vacature Virtuoso",
      icon: "⚡",
      color: "from-blue-500 to-cyan-600",
      description: "Job descriptions die kandidaten doen swipe-right",
      scenario: "Je moet een tech vacature schrijven die toppers aanspreekt én realistisch is.",
      challenge: "Schrijf een prompt die Claude helpt een vacature te maken die authentiek, aantrekkelijk en eerlijk is.",
      hints: [
        "Geef context: Wat voor bedrijf? Welke fase? Wat voor cultuur?",
        "Specificeer tone of voice: Formal vs casual vs tech-bro?",
        "Vraag om realistische requirements (geen 'senior met 2 jaar exp')",
        "Include salary range en benefits (transparantie = trust)"
      ],
      rubric: {
        hasRole: { 
          weight: 20, 
          check: (p) => /\b(schrijf|maak|creëer|vacature|job description)\b/i.test(p), 
          message: "❌ Maak duidelijk dat je een vacature wilt schrijven" 
        },
        hasContext: { 
          weight: 30, 
          check: (p) => /\b(bedrijf|startup|scale.up|cultuur|team|fase)\b/i.test(p), 
          message: "❌ Geef bedrijfscontext (type bedrijf, fase, cultuur)" 
        },
        hasTone: { 
          weight: 25, 
          check: (p) => /\b(tone|stijl|formeel|casual|authentiek|eerlijk|transparant)\b/i.test(p), 
          message: "❌ Specificeer de tone of voice" 
        },
        hasRequirements: { 
          weight: 25, 
          check: (p) => /\b(requirements|eisen|skills|ervaring|salaris|benefits|realistisch)\b/i.test(p), 
          message: "❌ Vraag om realistische eisen en transparantie over comp" 
        }
      },
      goodExample: "Schrijf een vacature voor een Senior Frontend Developer bij een scale-up in Amsterdam. Tone: Casual maar professioneel, authentiek (geen corporate clichés). Include: Realistische requirements (5+ jaar), salary range €70-85k, remote-hybrid beleid, en tech stack details.",
      templates: {
        basis: {
          title: "📝 Basis Template - Vacature Writer",
          prompt: `Schrijf een vacature voor een [FUNCTIE] bij [BEDRIJF TYPE].

Details:
- Locatie: [STAD]
- Ervaring: [X-Y] jaar
- Belangrijkste skills: [SKILL 1, SKILL 2, SKILL 3]
- Team size: [AANTAL] personen

Tone of voice: [FORMEEL / CASUAL / TECH]

Format:
- Intro (waarom dit cool is)
- Wat je gaat doen (taken)
- Wat we zoeken (requirements)
- Wat we bieden (benefits)

Hou het realistisch en eerlijk.`
        },
        uitgebreid: {
          title: "🚀 Uitgebreid Template - Killer Job Post",
          prompt: `Je bent een recruitment marketing expert die vacatures schrijft die toptalent aantrekken.

BEDRIJFSCONTEXT:
- Type: [Startup / Scale-up / Corporate]
- Sector: [INDUSTRIE]
- Fase: [Early stage / Growth / Mature]
- Team size: [AANTAL] mensen
- Cultuur: [Beschrijf in 3 woorden]
- Remote policy: [On-site / Hybrid / Remote-first]

FUNCTIE DETAILS:
- Titel: [EXACTE FUNCTIETITEL]
- Seniority: [Junior / Medior / Senior / Lead]
- Team: [TEAMNAAM] - [KORT TEAM DOEL]

COMPENSATION (wees transparant!):
- Salary range: €[MIN] - €[MAX]
- Equity: [Ja/Nee + details]

MUST-HAVES:
- [REQUIREMENT 1]
- [REQUIREMENT 2]
- [REQUIREMENT 3]

TONE OF VOICE: [Casual & Friendly / Tech & Direct]

SPECIAL INSTRUCTIONS:
- Schrijf GEEN clichés zoals "rockstar" of "ninja"
- Wees eerlijk over challenges
- Include 1 fun fact over het team
- Gebruik inclusive language

OUTPUT FORMAT:
1. Catchy title
2. Hook (waarom dit cool is)
3. About us (authentiek)
4. What you'll do (5-7 taken)
5. What we're looking for (must-haves)
6. What we offer (comp, benefits, culture)
7. How to apply`
        }
      }
    },
    {
      id: 2,
      title: "Sourcing Sorcerer",
      icon: "🔍",
      color: "from-emerald-500 to-teal-600",
      description: "Boolean strings zijn zo 2020",
      scenario: "Je wilt Claude helpen een ideale candidate persona te bouwen voor targeted sourcing.",
      challenge: "Schrijf een prompt die een persona maakt + sourcing strategies + waar je deze kandidaten vindt.",
      hints: [
        "Geef functiecontext: wat doet deze persoon exact?",
        "Vraag om persona details: skills, motivaties, career phase",
        "Include sourcing kanalen: LinkedIn, GitHub, communities",
        "Vraag om messaging strategies voor first contact"
      ],
      rubric: {
        hasContext: { 
          weight: 25, 
          check: (p) => /\b(functie|rol|positie|senior|junior|tech|developer)\b/i.test(p), 
          message: "❌ Geef duidelijke functiecontext" 
        },
        hasPersona: { 
          weight: 25, 
          check: (p) => /\b(persona|profiel|kandidaat|ideaal|type persoon)\b/i.test(p), 
          message: "❌ Vraag om een candidate persona" 
        },
        hasSourcing: { 
          weight: 25, 
          check: (p) => /\b(waar|kanalen|vinden|sourcing|linkedin|github|communities)\b/i.test(p), 
          message: "❌ Vraag waar je deze kandidaten kunt vinden" 
        },
        hasStrategy: { 
          weight: 25, 
          check: (p) => /\b(messaging|benadering|contact|approach|strategie)\b/i.test(p), 
          message: "❌ Include messaging/contact strategie" 
        }
      },
      goodExample: "Maak een candidate persona voor een Senior Backend Engineer bij een fintech scale-up. Include: skills & experience profile, motivaties (waarom switchen), waar ze te vinden zijn (kanalen), en een messaging strategie voor first contact die niet voelt als spam.",
      templates: {
        basis: {
          title: "📝 Basis Template - Candidate Persona",
          prompt: `Maak een candidate persona voor een [FUNCTIE].

Include:
1. **Profile**
   - Skills & ervaring
   - Huidige rol type
   - Seniority level

2. **Motivaties**
   - Waarom zouden ze switchen?
   - Wat zoeken ze?

3. **Waar te vinden**
   - LinkedIn zoekterm
   - Communities/platforms

4. **First Contact**
   - Messaging tip (kort)

Praktisch en actionable.`
        },
        uitgebreid: {
          title: "🚀 Uitgebreid Template - Sourcing Playbook",
          prompt: `Je bent een sourcing specialist met 8+ jaar ervaring in tech recruitment.

FUNCTIE CONTEXT:
- Positie: [EXACTE FUNCTIETITEL]
- Seniority: [Junior/Medior/Senior/Lead]
- Bedrijf: [TYPE] in [SECTOR]
- Tech stack: [TECHNOLOGIES]
- Challenge: [GROOTSTE TECHNICAL CHALLENGE]

TAAK: Maak een sourcing playbook met:

**1. IDEALE CANDIDATE PERSONA**
- Huidige functie(s): [Wat doen ze NU?]
- Skills profile (bullets):
  • Core technical skills + niveau
  • Nice-to-have skills
  • Soft skills
- Jaren ervaring: [RANGE]
- Career fase: [Early/mid/senior]

**2. MOTIVATIES**
- Wat motiveert ze? (carrière, geld, impact, leren?)
- Waarom zouden ze NU switchen?
- Red flags waarom NIET switchen

**3. WAAR VIND JE ZE?**

LinkedIn Search:
- Boolean search string (ready to copy)
- Title keywords
- Company types om te targeten

Beyond LinkedIn:
- GitHub repos waar ze actief zijn
- Tech communities (Discord, Slack, forums)
- Conferences/meetups

**4. MESSAGING STRATEGIE**

First Contact:
- Hook (opener die opvalt)
- Value prop (waarom interessant)
- Call to action
- Length: [Kort <100 woorden]
- Tone: [Casual/Professional]

Example message: [SCHRIJF 1 VOORBEELD]

**5. DISQUALIFIERS** (Skip deze mensen)
- Te recent geswitcht (<1 jaar)
- Mismatch in [CRITERIA]

OUTPUT: Actionable playbook die ik vandaag kan gebruiken.`
        }
      }
    },
    {
      id: 3,
      title: "Screening Sensei",
      icon: "🎯",
      color: "from-orange-500 to-red-600",
      description: "Interview vragen scherper dan een deadline",
      scenario: "Je wilt Claude helpen competency-based interview vragen te maken die bullshit-artists ontmaskeren.",
      challenge: "Schrijf een prompt die vragen genereert + doorvraag-tactieken + red flag detectie.",
      hints: [
        "Specificeer competenties: concrete situaties",
        "Vraag om STAR-format vragen",
        "Include follow-up vragen voor diepgang",
        "Vraag om red flags waar je op moet letten"
      ],
      rubric: {
        hasCompetencies: { 
          weight: 25, 
          check: (p) => /\b(competentie|skill|eigenschap|problem solving|leadership|teamwork)\b/i.test(p), 
          message: "❌ Specificeer welke competenties je wilt toetsen" 
        },
        hasFormat: { 
          weight: 25, 
          check: (p) => /\b(STAR|situatie|gedrag|behavioral|voorbeeld)\b/i.test(p), 
          message: "❌ Vraag om STAR/behavioral format vragen" 
        },
        hasFollowUp: { 
          weight: 25, 
          check: (p) => /\b(doorvragen|follow.up|dieper|probe|vervolgvraag)\b/i.test(p), 
          message: "❌ Include doorvraag-tactieken" 
        },
        hasRedFlags: { 
          weight: 25, 
          check: (p) => /\b(red flag|waarschuwing|let op|signaal|bullshit)\b/i.test(p), 
          message: "❌ Vraag om red flags/waarschuwingssignalen" 
        }
      },
      goodExample: "Maak 5 behavioral interview vragen voor een Tech Lead. Focus op: technical leadership, stakeholder management, conflict resolution. Gebruik STAR-format. Include per vraag: 2 follow-up vragen, red flags in antwoorden, en wat een excellent antwoord bevat.",
      templates: {
        basis: {
          title: "📝 Basis Template - Interview Vragen",
          prompt: `Maak [AANTAL] interview vragen voor een [FUNCTIE].

Competenties:
- [COMPETENTIE 1]
- [COMPETENTIE 2]
- [COMPETENTIE 3]

Format:
- Behavioral (STAR-format)
- Open vragen

Per vraag geef:
- De vraag
- Wat je zoekt in antwoord
- 1 follow-up vraag`
        },
        uitgebreid: {
          title: "🚀 Uitgebreid Template - Interview Toolkit",
          prompt: `Je bent een senior tech recruiter die interviews doet voor [FUNCTIE] posities.

CONTEXT:
- Functie: [TITEL]
- Seniority: [Level]
- Key challenges: [1-2 zinnen]

COMPETENTIES OM TE TOETSEN:
1. [COMPETENTIE 1] - [Waarom belangrijk?]
2. [COMPETENTIE 2] - [Waarom belangrijk?]
3. [COMPETENTIE 3] - [Waarom belangrijk?]

TAAK: Maak een interview guide met:

**PER COMPETENTIE:**

**Opening Question** (STAR-format)
- [De hoofdvraag - open, specifiek]
- Context: [Wat je hier toetst]

**Probe Questions** (3 follow-ups)
1. [Verdiep Situation/Task]
2. [Begrijp Action]
3. [Kwantificeer Result]

**Red Flags** (bullets)
- [Red flag 1 in antwoord]
- [Red flag 2]

**Excellent Answer Signals**
- [Wat hoor je in top antwoord?]
- [Specifics die kwaliteit tonen]

**BONUS:**

**Ice Breaker** (casual opener)
- [Vraag - insightful]

**Closing Question**
- "Wat had je willen delen dat we niet vroegen?"

**BULLSHIT DETECTOR**
- [ ] Te veel "we" i.p.v. "ik"
- [ ] Vage resultaten zonder cijfers
- [ ] Alleen successen, geen failures

OUTPUT: Interview guide ready to use.`
        }
      }
    },
    {
      id: 4,
      title: "Offer Architect",
      icon: "💰",
      color: "from-yellow-500 to-amber-600",
      description: "Compensation talks zonder awkward silences",
      scenario: "Je wilt Claude helpen een competitive offer + negotiation strategie samen te stellen.",
      challenge: "Schrijf een prompt die cijfers geeft + argumentatie + alternatives + hoe je het pitch.",
      hints: [
        "Geef marktcontext: regio, seniority, sector",
        "Vraag om benchmarking data",
        "Include total comp breakdown",
        "Vraag om negotiation scenarios"
      ],
      rubric: {
        hasContext: { 
          weight: 25, 
          check: (p) => /\b(markt|regio|Amsterdam|seniority|sector|benchmark)\b/i.test(p), 
          message: "❌ Geef marktcontext (regio, level, sector)" 
        },
        hasBreakdown: { 
          weight: 25, 
          check: (p) => /\b(base|bonus|equity|benefits|total comp|pakket)\b/i.test(p), 
          message: "❌ Vraag om complete comp breakdown" 
        },
        hasStrategy: { 
          weight: 25, 
          check: (p) => /\b(negotiation|pitch|presenteer|verkoop|uitleg)\b/i.test(p), 
          message: "❌ Include hoe je de offer presenteert" 
        },
        hasScenarios: { 
          weight: 25, 
          check: (p) => /\b(counter|scenario|als ze vragen|alternatives)\b/i.test(p), 
          message: "❌ Vraag om negotiation scenarios/alternatives" 
        }
      },
      goodExample: "Help me een offer maken voor een Senior Frontend Developer in Amsterdam. Benchmark tegen markt, break down total comp (base + bonus + equity), geef pitch strategy, en include: hoe omgaan met counter-offers, wat flexibel is, en alternatives als budget beperkt is.",
      templates: {
        basis: {
          title: "📝 Basis Template - Offer Builder",
          prompt: `Help me een job offer maken voor een [FUNCTIE] in [STAD].

Context:
- Seniority: [Junior/Medior/Senior]
- Sector: [INDUSTRIE]
- Company size: [KLEIN/MEDIUM/GROOT]

Geef:
1. **Salary Range** (markt benchmark)
   - Low: €[X]
   - High: €[X]

2. **Total Compensation**
   - Base salary
   - Bonus
   - Benefits

3. **Pitch Points**
   - Waarom competitive
   - USPs

Realistisch en transparant.`
        },
        uitgebreid: {
          title: "🚀 Uitgebreid Template - Offer & Negotiation Master",
          prompt: `Je bent een senior recruitment leader met expertise in compensation.

**CANDIDATE:**
- Functie: [TITEL]
- Current comp: €[X] (of "onbekend")
- Jaren exp: [X]
- Locatie: [STAD/REMOTE]

**COMPANY:**
- Type: [Startup/Scale-up]
- Sector: [INDUSTRIE]
- Budget: [Flexibel / Beperkt]

**MARKET:**
- Regio: [STAD]
- Competition: [High / Medium / Low]

---

**DEEL 1: BENCHMARKING**

Salary Ranges (bruto/jaar):
- P25: €[X]
- P50: €[X]
- P75: €[X]

Positioning advies: [JE AANBEVELING]

---

**DEEL 2: TOTAL COMP**

**Base:** €[X]
- Rationale: [Waarom dit nummer]

**Bonus:** [X]% (€[Y])
- Trigger: [Hoe verdienen]

**Equity** (if applicable):
- Amount: [X]%
- Vesting: 4 jaar

**Benefits:**
- Vakantiedagen: [X]
- Remote: [Policy]
- Learning: €[X]/jaar
- Pension: [X]%

**TOTAL:** €[X] (cash + equity + benefits)

---

**DEEL 3: THE PITCH**

Opening: "We're thrilled to offer you..."

Highlights:
1. [Strength 1]
2. [Strength 2]
3. [Growth trajectory]

---

**DEEL 4: NEGOTIATION**

**Scenario 1: "I want €[X] more"**
- If budget allows: [How to meet]
- If tight: [Counter options]
- If impossible: [Hold line with empathy]

**Scenario 2: "Competitor offers more"**
- Match: [Can we? Ceiling?]
- Differentiate: [What we offer they don't]

**Red Lines (non-negotiable):**
- [ITEM 1]: Why
- [ITEM 2]: Why

**Flexibility:**
- [ITEM 1]: Range [X to Y]

---

**DEEL 5: TIMELINE**

Offer valid: [DATE - typically 5-7 days]

Follow-up:
- Day 1: Send offer
- Day 3: Check-in
- Day 7: Final call

OUTPUT: Complete offer + negotiation playbook.`
        }
      }
    },
    {
      id: 5,
      title: "Pipeline Titan",
      icon: "🚀",
      color: "from-pink-500 to-purple-600",
      description: "Workflows die zichzelf runnen",
      scenario: "Je wilt Claude helpen een end-to-end recruitment proces op te zetten met automation.",
      challenge: "Schrijf een prompt die een complete recruitment machine bouwt: sourcing tot onboarding.",
      hints: [
        "Map het proces: stages, triggers, handoffs",
        "Include automation opportunities",
        "Vraag om templates voor elke fase",
        "Specificeer KPIs en bottleneck detectie"
      ],
      rubric: {
        hasProcess: { 
          weight: 25, 
          check: (p) => /\b(proces|stages|funnel|pipeline|sourcing.*onboarding|stappen)\b/i.test(p), 
          message: "❌ Map het volledige recruitment proces" 
        },
        hasAutomation: { 
          weight: 25, 
          check: (p) => /\b(automation|automate|trigger|reminder|email|template)\b/i.test(p), 
          message: "❌ Include automation mogelijkheden" 
        },
        hasTemplates: { 
          weight: 25, 
          check: (p) => /\b(template|message|email|script|format)\b/i.test(p), 
          message: "❌ Vraag om templates voor elke fase" 
        },
        hasMetrics: { 
          weight: 25, 
          check: (p) => /\b(KPI|metric|conversion|time.*hire|bottleneck|measure)\b/i.test(p), 
          message: "❌ Specificeer KPIs en success metrics" 
        }
      },
      goodExample: "Design een recruitment pipeline voor tech rollen. Map alle stages van sourcing tot onboarding. Include: automation opportunities, templates voor elke touchpoint, KPIs per stage, en hoe je bottlenecks spot.",
      templates: {
        basis: {
          title: "📝 Basis Template - Recruitment Pipeline",
          prompt: `Design een recruitment pipeline voor [FUNCTIE TYPE].

Stages:
1. Sourcing
2. First Contact
3. Screening
4. Interview(s)
5. Offer
6. Onboarding

Per stage:
- Doel
- Wie doet wat
- Template (email/script)
- Doorlooptijd target
- Conversion target

Simpel en uitvoerbaar.`
        },
        uitgebreid: {
          title: "🚀 Uitgebreid Template - Recruitment Machine",
          prompt: `Je bent een recruitment operations expert.

**SCOPE:**
- Functie type: [TECH/SALES/etc]
- Volume: [X] hires per [periode]
- Team: [AANTAL] recruiters
- Tools: [ATS, email tool]
- Pain points: [Wat werkt nu niet?]

---

**TAAK: Bouw recruitment machine**

---

# PIPELINE STAGES

## STAGE 1: SOURCING
**Doel:** [X] qualified candidates
**Owner:** [Wie]

**Activities:**
- [Activity 1]
- [Activity 2]

**Automation:**
- [ ] Auto-import profiles
- [ ] Scheduled reports

**Templates:**
- Sourcing notes format

**KPIs:**
- Candidates/week: [TARGET]
- Quality: [% pass to next]

→ NEXT: First Contact

---

## STAGE 2: FIRST CONTACT
**Doel:** [X]% response rate
**Timing:** Within [X] hours

**Templates:**

**LinkedIn InMail:**
```
[TEMPLATE]
```

**Email:**
```
[TEMPLATE]
```

**Follow-up:**
- Day 0: Initial
- Day 3: Follow-up 1
- Day 7: Follow-up 2

**Automation:**
- [ ] Auto-send
- [ ] Track responses

**KPIs:**
- Messages sent: [TARGET/week]
- Response rate: [TARGET %]

→ NEXT: Screening

---

## STAGE 3: SCREENING (15-20 min)
**Doel:** Qualify fit

**Script:**
```
INTRO (2 min):
"Hi [NAME], thanks for time..."

THEIR STORY (8 min):
- Current role
- What they're looking for

OUR PITCH (5 min):
- Company brief
- Role overview

LOGISTICS (3 min):
- Comp expectations
- Timeline

CLOSE (2 min):
"Next steps: [EXPLAIN]"
```

**Templates:**
- Pre-call email
- Rejection email (if not fit)

**KPIs:**
- Show-up rate: [%]
- Pass-through: [%]

→ NEXT: Interviews

---

[Continue for Stages 4-7...]

---

# KPIs & METRICS

**Funnel:**
| Stage | Target | Health |
|-------|--------|--------|
| Sourced | [X]/week | 🟢 |
| Responded | [X]% | 🟢 |
| Screened | [X]% | 🟡 |
| Interviewed | [X]% | 🟢 |
| Offered | [X]% | 🟢 |
| Accepted | [X]% | 🟢 |

**Time:**
- Time-to-hire: [X] days
- Per stage: [breakdown]

---

# BOTTLENECK DETECTION

**Low response?**
- Check: Message quality
- Fix: A/B test

**High drop-off post-screen?**
- Check: Screening quality
- Fix: Better questions

---

# AUTOMATION ROADMAP

**Quick Wins:**
1. Email sequences
2. Calendar automation
3. Reminders
4. Template library

**Medium Term:**
1. ATS workflows
2. Scoring
3. Dashboard

---

# TEMPLATE LIBRARY

1. Outreach (LinkedIn, email)
2. Follow-ups (3 touches)
3. Screening invite
4. Interview invites
5. Rejections
6. Offer letter
7. Pre-boarding (4-week sequence)

---

OUTPUT: Complete, implementable machine.`
        }
      }
    }
  ];

  const checkPrompt = (prompt, rubric) => {
    let totalScore = 0;
    let maxScore = 0;
    const results = [];

    Object.entries(rubric).forEach(([key, rule]) => {
      maxScore += rule.weight;
      const passed = rule.check(prompt);
      if (passed) {
        totalScore += rule.weight;
      }
      results.push({
        key,
        passed,
        message: rule.message,
        weight: rule.weight
      });
    });

    const percentage = Math.round((totalScore / maxScore) * 100);
    return { percentage, totalScore, maxScore, results };
  };

  const handleSubmit = () => {
    const level = levels[currentLevel];
    const result = checkPrompt(userPrompt, level.rubric);
    
    setAttempts(attempts + 1);

    if (result.percentage >= 75) {
      const pointsEarned = Math.max(100 - (attempts * 10), 50);
      setScore(score + pointsEarned);
      setLevelScores([...levelScores, pointsEarned]);
      setUnlockedTemplates([...unlockedTemplates, level.templates]);
      
      if (attempts === 0) {
        setPerfectStreak(perfectStreak + 1);
      } else {
        setPerfectStreak(0);
      }
      
      setFeedback({
        type: 'pass',
        percentage: result.percentage,
        message: attempts === 0 
          ? "🎉 PERFECT! Eerste poging raak! Je bent een natuurtalent!" 
          : attempts === 1
          ? "✅ BINGO! Tweede poging, dat is sterk!"
          : "✅ Yes! Je hebt het door!",
        details: result.results,
        pointsEarned
      });
      
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      
    } else {
      setFeedback({
        type: 'improve',
        percentage: result.percentage,
        message: result.percentage >= 50 
          ? "⚠️ Bijna! Je bent op de goede weg..." 
          : "❌ Not quite. Laten we verbeteren!",
        details: result.results,
        attempts: attempts + 1
      });
      
      if (attempts >= 4) {
        setShowHint(true);
      }
    }
  };

  const nextLevel = () => {
    if (currentLevel < levels.length - 1) {
      setCurrentLevel(currentLevel + 1);
      setUserPrompt('');
      setFeedback(null);
      setAttempts(0);
      setShowHint(false);
    } else {
      setGameComplete(true);
    }
  };

  const resetGame = () => {
    setCurrentLevel(0);
    setUserPrompt('');
    setFeedback(null);
    setAttempts(0);
    setScore(0);
    setLevelScores([]);
    setUnlockedTemplates([]);
    setPerfectStreak(0);
    setGameComplete(false);
    setShowHint(false);
  };

  const copyTemplate = (text) => {
    navigator.clipboard.writeText(text);
  };

  const currentLevelData = levels[currentLevel];
  const progressPercentage = ((currentLevel) / levels.length) * 100;

  if (gameComplete) {
    const totalPossibleScore = levels.length * 100;
    const finalPercentage = Math.round((score / totalPossibleScore) * 100);
    
    let badge = "🥉 Prompt Padawan";
    if (finalPercentage >= 90) badge = "🏆 Prompt Titan";
    else if (finalPercentage >= 75) badge = "💎 Prompt Master";
    else if (finalPercentage >= 60) badge = "⚡ Prompt Expert";
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center">
            <Trophy className="w-24 h-24 mx-auto text-yellow-500 mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              GEFELICITEERD!
            </h1>
            <p className="text-2xl text-gray-700 mb-2">Je hebt de Prompt Gym voltooid! 🎉</p>
            <div className="text-6xl font-bold text-purple-600 my-6">{badge}</div>

            <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-2xl p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="text-4xl font-bold text-purple-600">{score}</div>
                  <div className="text-sm text-gray-600">Totale Score</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-indigo-600">{finalPercentage}%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-pink-600">{perfectStreak > 0 ? `${perfectStreak}🔥` : '-'}</div>
                  <div className="text-sm text-gray-600">Perfect Streak</div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">🎁 Unlocked Templates:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {unlockedTemplates.map((template, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-lg p-4">
                    <div className="font-semibold text-purple-600">Level {idx + 1}</div>
                    <div className="text-xs text-gray-600">2 templates beschikbaar</div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setShowTemplate(true)}
                className="mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-transform"
              >
                📚 Bekijk Alle Templates
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-gray-600 text-lg">
                {finalPercentage >= 90 
                  ? "Je bent nu een Prompt Wizard! 🧙‍♂️"
                  : finalPercentage >= 75
                  ? "Sterk werk! Je beheerst prompt engineering. 💪"
                  : "Goed bezig! Practice makes perfect! 🚀"
                }
              </p>
              
              <button
                onClick={resetGame}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform flex items-center gap-2 mx-auto"
              >
                <RefreshCw className="w-5 h-5" />
                Speel Opnieuw
              </button>
            </div>

            {perfectStreak >= 3 && (
              <div className="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border-2 border-yellow-300">
                <div className="text-3xl mb-2">🏆 HIDDEN ACHIEVEMENT!</div>
                <div className="text-lg font-semibold text-orange-600">Speed Demon</div>
                <div className="text-sm text-gray-600">{perfectStreak} perfecte pogingen op rij!</div>
              </div>
            )}
          </div>
        </div>

        {showTemplate && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">📚 Template Library</h2>
                <button onClick={() => setShowTemplate(false)} className="text-2xl">×</button>
              </div>
              
              <div className="space-y-8">
                {unlockedTemplates.map((templates, idx) => (
                  <div key={idx} className="border-b pb-8">
                    <h3 className="text-xl font-bold text-purple-600 mb-4">
                      Level {idx + 1}: {levels[idx].title}
                    </h3>
                    
                    <div className="mb-6 bg-gray-50 rounded-xl p-6">
                      <div className="flex justify-between mb-3">
                        <h4 className="font-bold">{templates.basis.title}</h4>
                        <button
                          onClick={() => {
                            copyTemplate(templates.basis.prompt);
                            alert('✅ Basis template gekopieerd!');
                          }}
                          className="flex items-center gap-2 text-sm bg-purple-600 text-white px-3 py-1 rounded-lg"
                        >
                          <Copy className="w-4 h-4" />
                          Copy
                        </button>
                      </div>
                      <pre className="text-xs bg-white p-4 rounded-lg overflow-x-auto whitespace-pre-wrap">
                        {templates.basis.prompt}
                      </pre>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6">
                      <div className="flex justify-between mb-3">
                        <h4 className="font-bold">{templates.uitgebreid.title}</h4>
                        <button
                          onClick={() => {
                            copyTemplate(templates.uitgebreid.prompt);
                            alert('✅ Uitgebreid template gekopieerd!');
                          }}
                          className="flex items-center gap-2 text-sm bg-indigo-600 text-white px-3 py-1 rounded-lg"
                        >
                          <Copy className="w-4 h-4" />
                          Copy
                        </button>
                      </div>
                      <pre className="text-xs bg-white p-4 rounded-lg overflow-x-auto whitespace-pre-wrap">
                        {templates.uitgebreid.prompt}
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 p-4 md:p-8">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`
              }}
            >
              {['🎉', '⭐', '💎', '🚀'][Math.floor(Math.random() * 4)]}
            </div>
          ))}
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-12 h-12 text-purple-600" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              THE PROMPT GYM
            </h1>
          </div>
          <p className="text-gray-600 text-lg">Where Recruiters Become Prompt Athletes 💪</p>
          
          <div className="mt-6 bg-white rounded-2xl shadow-lg p-4 max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-purple-600">{score}</span>
                <span className="text-sm text-gray-500">points</span>
              </div>
              <div className="flex items-center gap-2">
                {perfectStreak > 0 && (
                  <div className="flex items-center gap-1 bg-orange-100 px-3 py-1 rounded-full">
                    <span>🔥</span>
                    <span className="text-sm font-bold text-orange-600">{perfectStreak}</span>
                  </div>
                )}
                <div className="text-sm text-gray-600">Level {currentLevel + 1}/{levels.length}</div>
              </div>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-2 justify-center mb-8 flex-wrap">
          {levels.map((level, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                idx < currentLevel
                  ? 'bg-green-100 text-green-700 border-2 border-green-300'
                  : idx === currentLevel
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white scale-110 shadow-lg'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              <span className="text-xl">{level.icon}</span>
              {idx < currentLevel && <CheckCircle2 className="w-4 h-4" />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <div className={`bg-gradient-to-br ${currentLevelData.color} rounded-2xl shadow-xl p-6 text-white`}>
              <div className="text-5xl mb-4">{currentLevelData.icon}</div>
              <h2 className="text-2xl font-bold mb-2">{currentLevelData.title}</h2>
              <p className="text-white/90 text-sm">{currentLevelData.description}</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-600" />
                Scenario
              </h3>
              <p className="text-gray-700 text-sm mb-4">{currentLevelData.scenario}</p>
              
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                Challenge
              </h3>
              <p className="text-gray-700 text-sm">{currentLevelData.challenge}</p>
            </div>

            {showHint && (
              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-2xl p-6">
                <h3 className="font-bold text-yellow-800 mb-3">💡 Hints</h3>
                <ul className="space-y-2">
                  {currentLevelData.hints.map((hint, idx) => (
                    <li key={idx} className="text-sm text-yellow-900 flex gap-2">
                      <span>•</span>
                      <span>{hint}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {unlockedTemplates.length > 0 && (
              <button
                onClick={() => setShowTemplate(true)}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:scale-105 transition-transform flex items-center justify-center gap-2"
              >
                <Book className="w-5 h-5" />
                Templates ({unlockedTemplates.length})
              </button>
            )}
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="font-bold text-gray-800 mb-4 text-xl">Schrijf je prompt:</h3>
              <textarea
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                placeholder="Type hier je prompt..."
                className="w-full h-48 p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none resize-none"
              />
              
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleSubmit}
                  disabled={!userPrompt.trim()}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  Check Prompt
                </button>
                {attempts > 0 && (
                  <button
                    onClick={() => {
                      setUserPrompt('');
                      setFeedback(null);
                    }}
                    className="px-6 bg-gray-100 rounded-xl hover:bg-gray-200"
                  >
                    <RefreshCw className="w-5 h-5" />
                  </button>
                )}
              </div>

              {attempts > 0 && !feedback && (
                <div className="mt-4 text-sm text-gray-500 text-center">
                  Poging {attempts}
                </div>
              )}
            </div>

            {feedback && (
              <div className={`rounded-2xl shadow-xl p-6 ${
                feedback.type === 'pass' 
                  ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300' 
                  : 'bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-300'
              }`}>
                <div className="flex items-start gap-4 mb-4">
                  {feedback.type === 'pass' ? (
                    <CheckCircle2 className="w-12 h-12 text-green-600" />
                  ) : (
                    <XCircle className="w-12 h-12 text-orange-600" />
                  )}
                  <div>
                    <h3 className={`text-2xl font-bold mb-2 ${
                      feedback.type === 'pass' ? 'text-green-700' : 'text-orange-700'
                    }`}>
                      {feedback.message}
                    </h3>
                    <div className="flex items-center gap-3">
                      <div className={`text-4xl font-bold ${
                        feedback.type === 'pass' ? 'text-green-600' : 'text-orange-600'
                      }`}>
                        {feedback.percentage}%
                      </div>
                      {feedback.type === 'pass' && (
                        <div className="bg-green-100 px-4 py-2 rounded-full">
                          <span className="text-green-700 font-bold">+{feedback.pointsEarned} points!</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {feedback.details.map((detail, idx) => (
                    <div
                      key={idx}
                      className={`flex gap-3 p-4 rounded-xl ${
                        detail.passed 
                          ? 'bg-green-100 border border-green-200' 
                          : 'bg-white border border-orange-200'
                      }`}
                    >
                      {detail.passed ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-orange-600" />
                      )}
                      <p className={`text-sm ${
                        detail.passed ? 'text-green-800 font-medium' : 'text-gray-700'
                      }`}>
                        {detail.passed ? `✓ Goed!` : detail.message}
                      </p>
                    </div>
                  ))}
                </div>

                {feedback.type === 'pass' && (
                  <>
                    <div className="bg-white rounded-xl p-6 mb-6">
                      <h4 className="font-bold mb-3 flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-500" />
                        Goed voorbeeld:
                      </h4>
                      <pre className="text-xs bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">
                        {currentLevelData.goodExample}
                      </pre>
                    </div>

                    <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl p-6 mb-6">
                      <h4 className="font-bold text-purple-800 mb-3">🎁 Templates Unlocked!</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="bg-white rounded-lg p-3">
                          <div className="font-semibold text-purple-600">📝 Basis</div>
                          <div className="text-xs text-gray-600">Simpel, effectief</div>
                        </div>
                        <div className="bg-white rounded-lg p-3">
                          <div className="font-semibold text-indigo-600">🚀 Uitgebreid</div>
                          <div className="text-xs text-gray-600">Advanced, detailed</div>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={nextLevel}
                      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2"
                    >
                      {currentLevel < levels.length - 1 ? (
                        <>
                          Volgende Level
                          <ArrowRight className="w-5 h-5" />
                        </>
                      ) : (
                        <>
                          Voltooien
                          <Trophy className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </>
                )}

                {feedback.type === 'improve' && (
                  <>
                    <div className="bg-white rounded-xl p-6 mb-4">
                      <h4 className="font-bold mb-3">💡 Hoe te verbeteren:</h4>
                      <ul className="space-y-2">
                        {feedback.details
                          .filter(d => !d.passed)
                          .map((detail, idx) => (
                            <li key={idx} className="text-sm flex gap-2">
                              <span className="text-orange-600">→</span>
                              <span>{detail.message.replace('❌ ', '')}</span>
                            </li>
                          ))}
                      </ul>
                      
                      {feedback.attempts >= 3 && (
                        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                          <p className="text-sm text-blue-700">
                            {currentLevelData.hints[Math.min(feedback.attempts - 3, currentLevelData.hints.length - 1)]}
                          </p>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => setFeedback(null)}
                      className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2"
                    >
                      Probeer Opnieuw
                      <RefreshCw className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {showTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">📚 Template Library</h2>
              <button onClick={() => setShowTemplate(false)} className="text-2xl">×</button>
            </div>
            
            <div className="space-y-8">
              {unlockedTemplates.map((templates, idx) => (
                <div key={idx} className="border-b pb-8">
                  <h3 className="text-xl font-bold text-purple-600 mb-4">
                    Level {idx + 1}: {levels[idx].title}
                  </h3>
                  
                  <div className="mb-6 bg-gray-50 rounded-xl p-6">
                    <div className="flex justify-between mb-3">
                      <h4 className="font-bold">{templates.basis.title}</h4>
                      <button
                        onClick={() => {
                          copyTemplate(templates.basis.prompt);
                          alert('✅ Template gekopieerd!');
                        }}
                        className="flex items-center gap-2 text-sm bg-purple-600 text-white px-3 py-1 rounded-lg"
                      >
                        <Copy className="w-4 h-4" />
                        Copy
                      </button>
                    </div>
                    <pre className="text-xs bg-white p-4 rounded-lg overflow-x-auto whitespace-pre-wrap">
                      {templates.basis.prompt}
                    </pre>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6">
                    <div className="flex justify-between mb-3">
                      <h4 className="font-bold">{templates.uitgebreid.title}</h4>
                      <button
                        onClick={() => {
                          copyTemplate(templates.uitgebreid.prompt);
                          alert('✅ Template gekopieerd!');
                        }}
                        className="flex items-center gap-2 text-sm bg-indigo-600 text-white px-3 py-1 rounded-lg"
                      >
                        <Copy className="w-4 h-4" />
                        Copy
                      </button>
                    </div>
                    <pre className="text-xs bg-white p-4 rounded-lg overflow-x-auto whitespace-pre-wrap">
                      {templates.uitgebreid.prompt}
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromptGym;
