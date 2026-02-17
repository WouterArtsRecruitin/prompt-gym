import { WeekContent } from '@/app/types/pro';

export const week02: WeekContent = {
  weekNumber: 2,
  title: 'Format & Voorbeelden',
  description: 'Leer hoe je output format en voorbeelden gebruikt voor betere resultaten',
  learningGoals: [
    'Begrijp de kracht van output formatting',
    'Leer few-shot prompting met voorbeelden',
    'Combineer bouwblok 4 (Format) en 5 (Voorbeelden)',
  ],
  keyPrinciple: 'Hoe specifieker je format beschrijft en hoe beter je voorbeelden, hoe bruikbaarder de output',
  sections: [
    {
      title: 'Bouwblok 4: Output Format',
      type: 'theory',
      content: `Het format vertelt de AI HOE je de output wilt ontvangen. Dit is een van de krachtigste bouwblokken.

**Waarom Format belangrijk is:**
Zonder format krijg je een lap tekst. Met format krijg je gestructureerde, direct bruikbare output.

**Format opties voor recruitment:**
| Format | Wanneer |
|--------|---------|
| Tabel | Kandidaat vergelijking |
| Bullets | Snelle samenvatting |
| Score + toelichting | CV screening |
| Email format | Outreach berichten |
| JSON/gestructureerd | ATS import |

**Voorbeeld:**
❌ Zwak: "Beoordeel deze kandidaat"
✅ Sterk: "Beoordeel deze kandidaat en geef je output als:
- Match Score: [1-5]
- Sterke punten: [3 bullets]
- Aandachtspunten: [2 bullets]
- Aanbeveling: [1 zin]"`,
    },
    {
      title: 'Bouwblok 5: Voorbeelden (Few-Shot Prompting)',
      type: 'theory',
      content: `Voorbeelden zijn de snelste manier om de AI te laten zien wat je bedoelt.

**Waarom voorbeelden werken:**
- De AI leert van patronen in je voorbeelden
- Je hoeft minder uit te leggen
- De output volgt automatisch dezelfde stijl en structuur

**Recruitment voorbeelden:**
In plaats van uitleggen hoe een goed InMail bericht eruitziet, geef je een voorbeeld:

"Hier is een voorbeeld van een goed outreach bericht:

Hoi [naam], ik zag je ervaring met [technologie] bij [bedrijf]. We zoeken iemand die [specifieke skill] kan inzetten voor [concreet project]. Interesse om te sparren?

Schrijf nu een vergelijkbaar bericht voor [andere kandidaat]."

**Tips:**
- 1-2 voorbeelden is vaak genoeg
- Gebruik echte voorbeelden uit je eigen werk
- Markeer wat belangrijk is in het voorbeeld`,
    },
    {
      title: 'Praktijkvoorbeeld: Kandidaat Vergelijking',
      type: 'example',
      content: `Laten we bouwblok 4 en 5 combineren met de eerste 3:

**[ROL]** Je bent een senior tech recruiter.

**[CONTEXT]** Ik heb 3 kandidaten voor een Senior Backend Developer positie. Budget: €70-85k.

**[TAAK]** Vergelijk deze 3 kandidaten.

**[FORMAT]** Geef je output als tabel:
| Criterium | Kandidaat A | Kandidaat B | Kandidaat C |
|-----------|------------|------------|------------|
| Relevante ervaring | ... | ... | ... |
| Technische match | ... | ... | ... |
| Salaris fit | ... | ... | ... |
| Cultuur indicatie | ... | ... | ... |
| **Totaal score** | **/5** | **/5** | **/5** |

Eindig met een ranking en korte toelichting per kandidaat.

**[VOORBEELD]** Een goede beoordeling ziet er zo uit:
"Kandidaat A scoort 4/5 - Sterke React ervaring (5jr) en past qua salaris (€72k). Aandachtspunt: geen ervaring met microservices."`,
    },
  ],
  exercises: [
    {
      id: 'week2-ex1',
      title: 'Vacaturetekst met Format',
      scenario: `Je moet een vacaturetekst schrijven voor een Data Engineer bij een fintech startup in Amsterdam. Het team bestaat uit 8 engineers.`,
      challenge: `Schrijf een prompt die alle 5 bouwblokken gebruikt:
1. **Rol** - Wie is Claude?
2. **Context** - Bedrijf, team, cultuur
3. **Taak** - Schrijf een vacaturetekst
4. **Format** - Specificeer de structuur
5. **Voorbeeld** - Geef een voorbeeld van de gewenste toon

Tip: Beschrijf het exacte format dat je wilt (secties, lengte, stijl).`,
      hints: [
        "Geef Claude de rol van recruitment copywriter",
        "Beschrijf de bedrijfscultuur en het team",
        "Specificeer de secties: intro, taken, eisen, aanbod",
        "Geef een voorbeeld van de gewenste schrijftoon",
      ],
      rubric: {
        hasRole: {
          weight: 20,
          check: (p: string) => /je bent|jij bent/i.test(p) && /copywriter|recruiter|schrijver/i.test(p),
          message: "Rol: Geef Claude een rol als copywriter of recruiter",
        },
        hasContext: {
          weight: 20,
          check: (p: string) => /fintech|startup|amsterdam|data|engineer/i.test(p),
          message: "Context: Beschrijf het bedrijf en de positie",
        },
        hasTask: {
          weight: 20,
          check: (p: string) => /schrijf|maak|creeer|genereer/i.test(p) && /vacature/i.test(p),
          message: "Taak: Geef een duidelijke schrijfopdracht",
        },
        hasFormat: {
          weight: 20,
          check: (p: string) => /format|structuur|sectie|opbouw|intro|taken|eisen|aanbod/i.test(p),
          message: "Format: Specificeer de gewenste structuur",
        },
        hasExample: {
          weight: 20,
          check: (p: string) => /voorbeeld|bijv|zoals|toon|stijl/i.test(p),
          message: "Voorbeeld: Geef een voorbeeld van de gewenste toon of stijl",
        },
      },
      goodExample: `Je bent een recruitment copywriter die gespecialiseerd is in tech vacatures voor startups.

Context: We zijn een fintech startup in Amsterdam met 8 engineers. Onze cultuur is informeel, we werken met moderne data stack (Python, Airflow, dbt, BigQuery).

Schrijf een vacaturetekst voor Data Engineer met deze structuur:
1. Pakkende intro (max 3 zinnen, informele toon)
2. Wat ga je doen? (5 bullets)
3. Wat breng je mee? (must-haves vs nice-to-haves)
4. Wat bieden wij? (6 bullets incl. salaris €55-70k)

Toon voorbeeld: "Bij [bedrijf] bouwen we niet alleen software - we bouwen de toekomst van financiele technologie. En ja, daar heb jij een data pipeline voor nodig."`,
    },
  ],
  templates: [
    {
      id: 'week2-template1',
      title: 'Kandidaat Vergelijking Tabel',
      description: 'Vergelijk meerdere kandidaten in een overzichtelijke tabel',
      prompt: `Je bent een ervaren [VAKGEBIED] recruiter.

Context: Ik vergelijk [AANTAL] kandidaten voor de positie [FUNCTIE].
Must-haves: [EISEN]
Budget: [SALARIS RANGE]

Vergelijk de kandidaten en geef output als tabel:
| Criterium | Kandidaat A | Kandidaat B | Kandidaat C |
|-----------|------------|------------|------------|
| Relevante ervaring | | | |
| Technische match | | | |
| Salaris fit | | | |
| Cultuur indicatie | | | |
| **Totaal** | **/5** | **/5** | **/5** |

Eindig met een ranking en aanbeveling.`,
      category: 'screening',
    },
    {
      id: 'week2-template2',
      title: 'Vacaturetekst Generator',
      description: 'Genereer een gestructureerde vacaturetekst',
      prompt: `Je bent een recruitment copywriter voor [TYPE BEDRIJF].

Context: Team van [AANTAL] mensen, cultuur is [CULTUUR BESCHRIJVING].

Schrijf een vacaturetekst voor [FUNCTIE] met:
1. Pakkende intro (3 zinnen, [TOON] toon)
2. Wat ga je doen? (5 bullets)
3. Wat breng je mee? (must-haves + nice-to-haves)
4. Wat bieden wij? (6 bullets incl. salaris [RANGE])

Stijl: [VOORBEELD ZIN VAN GEWENSTE TOON]`,
      category: 'vacature',
    },
  ],
};
