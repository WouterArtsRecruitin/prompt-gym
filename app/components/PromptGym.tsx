'use client';

import React, { useState } from 'react';
import { CheckCircle2, XCircle, Trophy, Sparkles, ArrowRight, RefreshCw, Copy, Target, Book, Star } from 'lucide-react';

const PromptGym = () => {
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-6">
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
                    <li key={idx} className="text-sm text-yellow-900">• {hint}</li>
                  ))}
                </ul>
              </div>
            )}

            {unlockedTemplates.length > 0 && (
              <button
                onClick={() => setShowTemplate(true)}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:scale-105 transition flex items-center justify-center gap-2"
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
                  className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:scale-105 transition disabled:opacity-50 flex items-center justify-center gap-2"
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
            </div>

            {feedback && (
              <div className={`rounded-2xl shadow-xl p-6 ${
                feedback.type === 'pass' ? 'bg-green-50 border-2 border-green-300' : 'bg-orange-50 border-2 border-orange-300'
              }`}>
                <div className="flex items-start gap-4 mb-4">
                  {feedback.type === 'pass' ? <CheckCircle2 className="w-12 h-12 text-green-600" /> : <XCircle className="w-12 h-12 text-orange-600" />}
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{feedback.message}</h3>
                    <div className="text-4xl font-bold">{feedback.percentage}%</div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {feedback.details.map((detail: any, idx: number) => (
                    <div key={idx} className={`p-4 rounded-xl ${detail.passed ? 'bg-green-100' : 'bg-white'}`}>
                      <p className="text-sm">{detail.passed ? '✓ Goed!' : detail.message}</p>
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

                    <button
                      onClick={nextLevel}
                      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:scale-105 transition flex items-center justify-center gap-2"
                    >
                      {currentLevel < levels.length - 1 ? (
                        <>Volgende Level <ArrowRight className="w-5 h-5" /></>
                      ) : (
                        <>Voltooien <Trophy className="w-5 h-5" /></>
                      )}
                    </button>
                  </>
                )}

                {feedback.type === 'improve' && (
                  <button
                    onClick={() => setFeedback(null)}
                    className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold text-lg hover:scale-105 transition"
                  >
                    Probeer Opnieuw
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptGym;
