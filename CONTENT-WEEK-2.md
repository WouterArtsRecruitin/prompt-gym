# Week 2: Bouwblokken 4-7 Verdieping

## Leerdoel
> Na deze week beheers je alle 7 bouwblokken en schrijf je complete prompts.

---

## Bouwblok 4: Format Specificeren (10 min)

### Format Opties
| Type | Wanneer |
|------|---------|
| Bullets | Snelle samenvatting |
| Tabel | Vergelijkingen |
| Scores (1-5) | Beoordelingen |
| Markdown | Gestructureerde output |

### Voorbeeld
```
Geef je antwoord in dit format:
- Samenvatting (2-3 zinnen)
- Sterke punten (3 bullets)
- Score (1-5)
```

---

## Bouwblok 5: Voorbeelden Geven (10 min)

### Few-Shot Prompting
Laat de AI zien wat je bedoelt met een voorbeeld.

```
Schrijf een LinkedIn outreach bericht.

VOORBEELD:
"Hi [Naam], ik zag je profiel en je ervaring bij [Bedrijf] viel me op.
We zoeken iemand met jouw achtergrond voor [Rol]. Open voor een kort gesprek?"

Schrijf nu een vergelijkbaar bericht voor [KANDIDAAT].
```

---

## Bouwblok 6: Constraints (10 min)

### Wat mag NIET?
| Constraint | Voorbeeld |
|------------|-----------|
| Lengte | "Max 100 woorden" |
| Toon | "Geen corporate jargon" |
| Inhoud | "Geen salarisinfo" |
| Stijl | "Geen uitroeptekens" |

---

## Bouwblok 7: Verfijning (10 min)

### Extra details toevoegen
- Prioriteiten aangeven
- Edge cases benoemen
- Specifieke focus vragen

```
Let speciaal op:
- Gaps in werkervaring
- Korte dienstverbanden (<1 jaar)
- Relevante certificeringen
```

---

## Oefening 2: Complete Prompt

**Opdracht:** Schrijf een prompt met ALLE 7 bouwblokken.

**Situatie:** CV screenen op 5 criteria

### Uitwerking
```
[1. ROL]
Je bent een senior recruiter met 8 jaar ervaring.

[2. CONTEXT]
Ik screen CV's voor een Marketing Manager bij een B2B SaaS scale-up.

[3. TAAK]
Analyseer dit CV en beoordeel op 5 criteria.

[4. FORMAT]
Geef per criterium een score (1-5) en 1 zin toelichting.
Eindig met: "Aanbeveling: JA/NEE + reden"

[5. VOORBEELD]
Criterium: Relevante ervaring
Score: 4/5
Toelichting: "5 jaar B2B marketing, maar geen SaaS achtergrond"

[6. CONSTRAINTS]
- Max 200 woorden totaal
- Wees direct, geen vage termen
- Geen salarisadvies

[7. VERFIJNING]
Focus extra op: digital marketing skills en team leadership ervaring.
```

---

## 7-Bouwblokken Master Template

```
═══════════════════════════════════════════
PROMPT GYM - 7 BOUWBLOKKEN TEMPLATE

[1. ROL]
Je bent een [FUNCTIE] met [ERVARING/EXPERTISE].

[2. CONTEXT]
Situatie: [WAT IS ER AAN DE HAND]
Doel: [WAT WIL JE BEREIKEN]

[3. TAAK]
[ACTIEWOORD] en geef: [SPECIFIEKE OUTPUTS]

[4. FORMAT]
Gebruik dit format:
- [STRUCTUUR 1]
- [STRUCTUUR 2]

[5. VOORBEELD]
[LAAT ZIEN WAT JE BEDOELT]

[6. CONSTRAINTS]
Niet doen:
- [RESTRICTIE 1]
- [RESTRICTIE 2]

[7. VERFIJNING]
Let extra op: [SPECIFIEKE FOCUS]
═══════════════════════════════════════════
```

---

*Week 2 van 12 - Prompt Gym Pro*
