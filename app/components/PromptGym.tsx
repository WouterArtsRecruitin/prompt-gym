'use client';

import React, { useState } from 'react';
import { CheckCircle2, XCircle, Trophy, Sparkles, ArrowRight, RefreshCw, Copy, Target, Book, Star } from 'lucide-react';

const PromptGym = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [userPrompt, setUserPrompt] = useState('');
  const [feedback, setFeedback] = useState<any>(null);
  const [attempts, setAttempts] = useState(0);
  const [score, setScore] = useState(0);
  const [unlockedTemplates, setUnlockedTemplates] = useState<any[]>([]);
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
      color: "from-blue-500 to-cyan-600",
      description: "Job descriptions die kandidaten doen swipe-right",
      scenario: "Je moet een tech vacature schrijven die toppers aanspreekt én realistisch is.",
      challenge: "Schrijf een prompt die Claude helpt een vacature te maken die authentiek, aantrekkelijk en eerlijk is.",
      hints: [
        "Geef context: Wat voor bedrijf? Welke fase? Wat voor cultuur?",
        "Specificeer tone of voice: Formal vs casual?",
        "Vraag om realistische requirements",
        "Include salary range en benefits"
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
      color: "from-emerald-500 to-teal-600",
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

  const checkPrompt = (prompt: string, rubric: any) => {
    let totalScore = 0;
    let maxScore = 0;
    const results: any[] = [];

    Object.entries(rubric).forEach(([key, rule]: [string, any]) => {
      maxScore += rule.weight;
      const passed = rule.check(prompt);
      if (passed) totalScore += rule.weight;
      results.push({ key, passed, message: rule.message, weight: rule.weight });
    });

    return { percentage: Math.round((totalScore / maxScore) * 100), results };
  };

  const handleSubmit = () => {
    const level = levels[currentLevel];
    const result = checkPrompt(userPrompt, level.rubric);
    setAttempts(attempts + 1);

    if (result.percentage >= 75) {
      const pointsEarned = Math.max(100 - (attempts * 10), 50);
      setScore(score + pointsEarned);
      setUnlockedTemplates([...unlockedTemplates, level.templates]);
      if (attempts === 0) setPerfectStreak(perfectStreak + 1);
      else setPerfectStreak(0);
      
      setFeedback({
        type: 'pass',
        percentage: result.percentage,
        message: attempts === 0 ? "🎉 PERFECT! Eerste poging raak!" : "✅ Yes! Je hebt het door!",
        details: result.results,
        pointsEarned
      });
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      setFeedback({
        type: 'improve',
        percentage: result.percentage,
        message: result.percentage >= 50 ? "⚠️ Bijna!" : "❌ Not quite.",
        details: result.results
      });
      if (attempts >= 4) setShowHint(true);
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

  const copyTemplate = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const currentLevelData = levels[currentLevel];
  const progressPercentage = ((currentLevel) / levels.length) * 100;

  if (showWelcome) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 p-8 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              THE PROMPT GYM
            </h1>
            <p className="text-2xl text-gray-600 mb-2">Where Recruiters Become Prompt Athletes 💪</p>
            <div className="text-lg text-gray-500">Train je Claude skills in 3 levels</div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-purple-700 mb-4 flex items-center gap-2">
                🎯 Wat ga je leren?
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>Effectieve prompts schrijven voor CV screening</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>Vacatureteksten die toppers aantrekken</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>Sourcing strategies met AI ondersteuning</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>Ready-to-use templates voor je dagelijkse werk</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-orange-100 to-yellow-100 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-orange-700 mb-4 flex items-center gap-2">
                🏋️ Hoe werkt het?
              </h2>
              <div className="space-y-4 text-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                  <span>Lees het scenario en de challenge</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                  <span>Schrijf je prompt in de tekstbox</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-cyan-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                  <span>Krijg directe feedback en tips</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
                  <span>Unlock templates en ga naar het volgende level</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-700 mb-4 text-center">🎖️ De 3 Levels</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-4xl mb-2">🥉</div>
                <div className="font-bold text-purple-600">Prompt Padawan</div>
                <div className="text-sm text-gray-600">CV Screening basics</div>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">⚡</div>
                <div className="font-bold text-blue-600">Vacature Virtuoso</div>
                <div className="text-sm text-gray-600">Job posts die converteren</div>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🔍</div>
                <div className="font-bold text-green-600">Sourcing Sorcerer</div>
                <div className="text-sm text-gray-600">Boolean is zo 2020</div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => setShowWelcome(false)}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-12 py-4 rounded-2xl font-bold text-xl hover:scale-105 transition flex items-center gap-3 mx-auto"
            >
              <Sparkles className="w-6 h-6" />
              Start Training
              <ArrowRight className="w-6 h-6" />
            </button>
            <p className="text-sm text-gray-500 mt-4">Duurt ongeveer 10-15 minuten</p>
          </div>
        </div>
      </div>
    );
  }

  if (gameComplete) {
    const totalPossibleScore = levels.length * 100;
    const finalPercentage = Math.round((score / totalPossibleScore) * 100);
    
    let badge = "🥉 Prompt Padawan";
    if (finalPercentage >= 90) badge = "🏆 Prompt Titan";
    else if (finalPercentage >= 75) badge = "💎 Prompt Master";
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 p-8 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-2xl">
          <Trophy className="w-24 h-24 mx-auto text-yellow-500 mb-4" />
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            GEFELICITEERD!
          </h1>
          <p className="text-2xl text-gray-700 mb-2">Je hebt de Prompt Gym voltooid! 🎉</p>
          <div className="text-6xl font-bold text-purple-600 my-6">{badge}</div>

          <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-2xl p-6 mb-8">
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="text-4xl font-bold text-purple-600">{score}</div>
                <div className="text-sm text-gray-600">Score</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-indigo-600">{finalPercentage}%</div>
                <div className="text-sm text-gray-600">Success</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-pink-600">{perfectStreak || '-'}</div>
                <div className="text-sm text-gray-600">Streak</div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowTemplate(true)}
            className="mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            📚 Bekijk Templates ({unlockedTemplates.length})
          </button>

          <div>
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition flex items-center gap-2 mx-auto"
            >
              <RefreshCw className="w-5 h-5" />
              Speel Opnieuw
            </button>
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
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 p-8">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`
              }}
            >
              🎉
            </div>
          ))}
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            THE PROMPT GYM
          </h1>
          <p className="text-gray-600 text-lg">Where Recruiters Become Prompt Athletes 💪</p>
          
          <div className="mt-6 bg-white rounded-2xl shadow-lg p-4 max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-purple-600">{score}</span>
                <span className="text-sm text-gray-500">points</span>
              </div>
              <div className="text-sm text-gray-600">Level {currentLevel + 1}/{levels.length}</div>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-2 justify-center mb-8">
          {levels.map((level, idx) => (
            <div
              key={idx}
              className={`px-4 py-2 rounded-full ${
                idx < currentLevel ? 'bg-green-100 text-green-700' :
                idx === currentLevel ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white scale-110' :
                'bg-gray-100 text-gray-400'
              }`}
            >
              <span className="text-xl">{level.icon}</span>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Main Challenge Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <div className={`inline-flex items-center gap-4 bg-gradient-to-r ${currentLevelData.color} text-white px-8 py-4 rounded-2xl mb-6`}>
                <div className="text-4xl">{currentLevelData.icon}</div>
                <div className="text-left">
                  <h2 className="text-2xl font-bold">{currentLevelData.title}</h2>
                  <p className="text-white/90">{currentLevelData.description}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <Target className="w-6 h-6 text-blue-600" />
                Jouw Opdracht
              </h3>
              <div className="bg-white rounded-xl p-6 mb-6">
                <h4 className="font-bold text-gray-700 mb-3">📋 Scenario:</h4>
                <p className="text-gray-700 text-lg leading-relaxed">{currentLevelData.scenario}</p>
              </div>
              <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl p-6">
                <h4 className="font-bold text-purple-700 mb-3">🎯 Challenge:</h4>
                <p className="text-purple-800 text-lg font-medium leading-relaxed">{currentLevelData.challenge}</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">✏️ Schrijf hier je prompt:</h3>
              <textarea
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                placeholder="Begin met: 'Je bent een ervaren recruiter...' en schrijf je volledige prompt hier..."
                className="w-full h-40 p-6 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none resize-none text-lg"
              />
              
              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleSubmit}
                  disabled={!userPrompt.trim()}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:scale-105 transition disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-3"
                >
                  <Sparkles className="w-6 h-6" />
                  Check Mijn Prompt
                </button>
                {attempts > 0 && (
                  <button
                    onClick={() => {
                      setUserPrompt('');
                      setFeedback(null);
                    }}
                    className="px-6 bg-gray-100 hover:bg-gray-200 rounded-xl transition flex items-center justify-center"
                    title="Reset"
                  >
                    <RefreshCw className="w-6 h-6" />
                  </button>
                )}
              </div>

              {attempts >= 2 && !showHint && (
                <button
                  onClick={() => setShowHint(true)}
                  className="w-full mt-4 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 py-3 rounded-xl font-semibold transition"
                >
                  💡 Geef me een hint
                </button>
              )}
            </div>

            {showHint && (
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-2xl p-8 mb-8">
                <h3 className="text-xl font-bold text-yellow-800 mb-6 flex items-center gap-2">
                  💡 Hints om je te helpen:
                </h3>
                <div className="grid gap-4">
                  {currentLevelData.hints.map((hint, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-4 border-l-4 border-yellow-400">
                      <p className="text-gray-800">{hint}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Side Panel for Templates */}
          {unlockedTemplates.length > 0 && (
            <div className="text-center">
              <button
                onClick={() => setShowTemplate(true)}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition flex items-center justify-center gap-3 mx-auto"
              >
                <Book className="w-6 h-6" />
                Bekijk Mijn Templates ({unlockedTemplates.length})
              </button>
            </div>
          )}
        </div>

        {feedback && (
          <div className="max-w-4xl mx-auto">
            <div className={`rounded-3xl shadow-2xl p-8 ${
              feedback.type === 'pass' ? 'bg-green-50 border-2 border-green-300' : 'bg-orange-50 border-2 border-orange-300'
            }`}>
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-4 mb-4">
                  {feedback.type === 'pass' ? <CheckCircle2 className="w-16 h-16 text-green-600" /> : <XCircle className="w-16 h-16 text-orange-600" />}
                  <div>
                    <h3 className="text-3xl font-bold mb-2">{feedback.message}</h3>
                    <div className="text-5xl font-bold">{feedback.percentage}%</div>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 mb-8">
                {feedback.details.map((detail: any, idx: number) => (
                  <div key={idx} className={`p-6 rounded-xl border-2 ${
                    detail.passed ? 'bg-green-100 border-green-300' : 'bg-white border-orange-300'
                  }`}>
                    <p className="text-lg font-medium">{detail.passed ? '✅ Perfect!' : detail.message}</p>
                  </div>
                ))}
              </div>

              {feedback.type === 'pass' && (
                <>
                  <div className="bg-white rounded-2xl p-8 mb-8 border-2 border-green-200">
                    <h4 className="text-xl font-bold mb-6 flex items-center gap-3">
                      <Star className="w-6 h-6 text-yellow-500" />
                      Perfecte prompt voorbeeld:
                    </h4>
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <pre className="text-sm whitespace-pre-wrap font-mono leading-relaxed">
                        {currentLevelData.goodExample}
                      </pre>
                    </div>
                  </div>

                  <button
                    onClick={nextLevel}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-6 rounded-2xl font-bold text-xl hover:scale-105 transition flex items-center justify-center gap-3"
                  >
                    {currentLevel < levels.length - 1 ? (
                      <>🎉 Ga naar het volgende level! <ArrowRight className="w-6 h-6" /></>
                    ) : (
                      <>🏆 Voltooi de training! <Trophy className="w-6 h-6" /></>
                    )}
                  </button>
                </>
              )}

              {feedback.type === 'improve' && (
                <button
                  onClick={() => setFeedback(null)}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-6 rounded-2xl font-bold text-xl hover:scale-105 transition"
                >
                  🔄 Probeer Opnieuw
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

export default PromptGym;
