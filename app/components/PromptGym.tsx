'use client';

import React, { useState, useCallback } from 'react';
import { Sparkles, RefreshCw, Target, Book, Lightbulb, Key, X, Copy, ArrowRight } from 'lucide-react';

// Components
import { WelcomeScreen } from './WelcomeScreen';
import { GameCompleteScreen } from './GameCompleteScreen';
import { UpgradeScreen } from './UpgradeScreen';
import { ProgressBar, LevelIndicators } from './ProgressBar';
import { FeedbackPanel } from './FeedbackPanel';
import { Confetti } from './Confetti';
import { ExitIntentPopup } from './ExitIntentPopup';
import { StickyFooterCTA } from './StickyFooterCTA';
import { SocialProofBar } from './SocialProofBar';

// Data & Utils
import { levels } from '../data/levels';
import { useGameState } from '../hooks/useGameState';
import { checkPrompt, calculatePoints, PASS_THRESHOLD, HINT_THRESHOLD } from '../utils/promptChecker';
import { Feedback } from '../types';
import { trackGameStart, trackLevelComplete, trackGameComplete, trackTemplateUnlock, trackEmailSignup } from '../lib/analytics';

const PromptGym = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [userPrompt, setUserPrompt] = useState('');
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showTemplate, setShowTemplate] = useState(false);

  const {
    currentLevel,
    score,
    unlockedTemplates,
    perfectStreak,
    gameComplete,
    hasUnlockedPremium,
    isLoaded,
    updateScore,
    nextLevel,
    unlockTemplate,
    updatePerfectStreak,
    resetGame,
    setGameComplete,
    unlockPremium,
  } = useGameState();

  const currentLevelData = levels[currentLevel];
  const hasSavedProgress = currentLevel > 0 || score > 0;

  const handleSubmit = useCallback(() => {
    const level = levels[currentLevel];
    const result = checkPrompt(userPrompt, level.rubric);
    setAttempts(prev => prev + 1);

    if (result.percentage >= PASS_THRESHOLD) {
      const pointsEarned = calculatePoints(attempts);
      updateScore(pointsEarned);
      unlockTemplate(level.templates);
      updatePerfectStreak(attempts === 0);

      // Track level completion
      trackLevelComplete(currentLevel + 1, pointsEarned);
      trackTemplateUnlock(`${level.templates.basis.title}, ${level.templates.uitgebreid.title}`);

      setFeedback({
        type: 'pass',
        percentage: result.percentage,
        message: attempts === 0 ? "PERFECT! Eerste poging raak!" : "Yes! Je hebt het door!",
        details: result.results,
        pointsEarned,
      });
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      setFeedback({
        type: 'improve',
        percentage: result.percentage,
        message: result.percentage >= 50 ? "Bijna!" : "Not quite.",
        details: result.results,
      });
      if (attempts >= HINT_THRESHOLD) setShowHint(true);
    }
  }, [userPrompt, currentLevel, attempts, updateScore, unlockTemplate, updatePerfectStreak]);

  const handleNextLevel = useCallback(() => {
    if (currentLevel === 0 && !hasUnlockedPremium) {
      setShowUpgrade(true);
      return;
    }

    if (currentLevel < levels.length - 1) {
      nextLevel(levels.length);
      setUserPrompt('');
      setFeedback(null);
      setAttempts(0);
      setShowHint(false);
    } else {
      // Track game completion
      trackGameComplete(score);
      setGameComplete(true);
    }
  }, [currentLevel, hasUnlockedPremium, nextLevel, setGameComplete, score]);

  const handleContinueFree = useCallback((email: string) => {
    // Track email signup for game unlock
    trackEmailSignup('game_unlock');

    unlockPremium(email);
    setShowUpgrade(false);
    nextLevel(levels.length);
    setUserPrompt('');
    setFeedback(null);
    setAttempts(0);
    setShowHint(false);
  }, [unlockPremium, nextLevel]);

  const handleStart = useCallback(() => {
    // Track game start
    trackGameStart();

    resetGame();
    setShowWelcome(false);
    setUserPrompt('');
    setFeedback(null);
    setAttempts(0);
    setShowHint(false);
  }, [resetGame]);

  const handleContinue = useCallback(() => {
    setShowWelcome(false);
  }, []);

  const handleRestart = useCallback(() => {
    resetGame();
    setShowWelcome(true);
    setUserPrompt('');
    setFeedback(null);
    setAttempts(0);
    setShowHint(false);
  }, [resetGame]);

  const copyTemplate = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // Loading state
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#0f0f12] flex items-center justify-center">
        <div className="w-16 h-16 bg-gradient-to-br from-[#f5a623] to-[#e09620] rounded-2xl animate-pulse flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-[#0f0f12]" />
        </div>
      </div>
    );
  }

  // Welcome screen
  if (showWelcome) {
    return (
      <>
        <ExitIntentPopup />
        <WelcomeScreen
          onStart={handleStart}
          hasSavedProgress={hasSavedProgress}
          onContinue={hasSavedProgress ? handleContinue : undefined}
        />
      </>
    );
  }

  // Upgrade screen (after level 1)
  if (showUpgrade) {
    return (
      <UpgradeScreen
        score={score}
        onContinueFree={handleContinueFree}
      />
    );
  }

  // Game complete screen
  if (gameComplete) {
    return (
      <GameCompleteScreen
        score={score}
        perfectStreak={perfectStreak}
        unlockedTemplates={unlockedTemplates}
        levels={levels}
        onRestart={handleRestart}
      />
    );
  }

  // Main game screen - Dark Mode
  return (
    <div className="min-h-screen bg-[#0f0f12] text-[#f0ede8] p-4 sm:p-8 pb-24">
      {showConfetti && <Confetti />}
      <ExitIntentPopup />
      <SocialProofBar />

      {/* Gradient orbs */}
      <div className="fixed -top-[300px] -right-[200px] w-[700px] h-[700px] bg-[#f5a623]/[0.06] rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[10%] -left-[150px] w-[500px] h-[500px] bg-purple-500/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header with logo */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#f5a623] to-[#e09620] rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#0f0f12]" />
            </div>
            <div>
              <h1 className="font-bold text-lg">Prompt Gym</h1>
              <p className="text-xs text-[#6a6a70]">by Recruitin</p>
            </div>
          </div>
          <a
            href="/workshop"
            className="hidden sm:flex items-center gap-2 bg-[#1c1c23] border border-white/[0.06] px-4 py-2 rounded-lg text-sm text-[#9a9a9f] hover:border-[#f5a623] hover:text-[#f5a623] transition"
          >
            Bekijk Workshop
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <ProgressBar currentLevel={currentLevel} score={score} levels={levels} />
        <LevelIndicators currentLevel={currentLevel} levels={levels} />

        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          {/* Level Card */}
          <div className="bg-[#1c1c23] border border-white/[0.06] rounded-[28px] p-4 sm:p-8 relative overflow-hidden">
            {/* Top gradient line */}
            <div className="absolute top-0 left-10 right-10 h-0.5 bg-gradient-to-r from-transparent via-[#f5a623] to-transparent" />

            <div className="text-center mb-6 sm:mb-8">
              <div className={`inline-flex items-center gap-3 sm:gap-4 bg-gradient-to-r ${currentLevelData.color} text-white px-4 sm:px-8 py-3 sm:py-4 rounded-2xl mb-4 sm:mb-6 shadow-lg`}>
                <div className="text-2xl sm:text-4xl">{currentLevelData.icon}</div>
                <div className="text-left">
                  <h2 className="text-lg sm:text-2xl font-bold">{currentLevelData.title}</h2>
                  <p className="text-white/90 text-xs sm:text-base">{currentLevelData.description}</p>
                </div>
              </div>
            </div>

            {/* Learning Goal & Key Principle */}
            <div className="grid sm:grid-cols-2 gap-4 mb-6 sm:mb-8">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-4 h-4 text-blue-400" />
                  <h4 className="font-bold text-blue-300 text-sm">Wat leer je?</h4>
                </div>
                <p className="text-blue-200 text-sm">{currentLevelData.learningGoal}</p>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Key className="w-4 h-4 text-purple-400" />
                  <h4 className="font-bold text-purple-300 text-sm">Kernprincipe</h4>
                </div>
                <p className="text-purple-200 text-sm font-medium">{currentLevelData.keyPrinciple}</p>
              </div>
            </div>

            {/* Challenge Section */}
            <div className="bg-[#24242d] border border-white/[0.06] rounded-2xl p-4 sm:p-8 mb-6 sm:mb-8">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-7 sm:w-8 h-7 sm:h-8 bg-[#f5a623] rounded-full flex items-center justify-center">
                  <Target className="w-3 sm:w-4 h-3 sm:h-4 text-[#0f0f12]" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">Jouw Opdracht</h3>
              </div>
              <div className="bg-[#1c1c23] rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 border border-white/[0.06]">
                <h4 className="font-bold text-[#9a9a9f] mb-2 sm:mb-3 text-sm sm:text-base">Scenario:</h4>
                <p className="text-[#f0ede8] text-sm sm:text-base leading-relaxed whitespace-pre-line">{currentLevelData.scenario}</p>
              </div>
              <div className="bg-gradient-to-r from-[#f5a623]/10 to-[#f5a623]/5 border border-[#f5a623]/20 rounded-xl p-4 sm:p-6">
                <h4 className="font-bold text-[#f5a623] mb-2 sm:mb-3 text-sm sm:text-base">Jouw taak:</h4>
                <div className="text-[#f0ede8] text-sm sm:text-base leading-relaxed whitespace-pre-line">
                  {currentLevelData.challenge.split('\n').map((line, i) => {
                    const parts = line.split(/\*\*(.*?)\*\*/g);
                    return (
                      <p key={i} className={line.startsWith('1.') || line.startsWith('2.') || line.startsWith('3.') || line.startsWith('4.') ? 'ml-2 my-1' : 'my-1'}>
                        {parts.map((part, j) =>
                          j % 2 === 1 ? <strong key={j} className="text-[#f5a623]">{part}</strong> : part
                        )}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Data Warning Banner */}
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <span className="text-red-400 text-xl">⚠️</span>
                <div>
                  <p className="text-red-300 font-medium text-sm">Gebruik GEEN echte persoonsgegevens</p>
                  <p className="text-red-200/70 text-xs mt-1">
                    Gebruik altijd fictieve namen en geanonimiseerde data bij het oefenen met AI-tools.
                    <a href="/disclaimer" className="text-red-300 underline ml-1 hover:text-red-200">Lees onze disclaimer →</a>
                  </p>
                </div>
              </div>
            </div>

            {/* Input Section */}
            <div className="bg-[#24242d] border border-white/[0.06] rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Schrijf hier je prompt:</h3>
              <textarea
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                placeholder="Begin met: 'Je bent een ervaren recruiter...' en schrijf je volledige prompt hier..."
                className="w-full h-32 sm:h-40 p-4 sm:p-6 bg-[#1c1c23] border border-white/[0.06] rounded-xl text-[#f0ede8] placeholder-[#6a6a70] focus:border-[#f5a623] focus:ring-2 focus:ring-[#f5a623]/20 focus:outline-none resize-none text-sm sm:text-base transition"
              />

              <div className="flex gap-3 sm:gap-4 mt-4 sm:mt-6">
                <button
                  onClick={handleSubmit}
                  disabled={!userPrompt.trim()}
                  className="flex-1 bg-gradient-to-r from-[#f5a623] to-[#e09620] text-[#0f0f12] py-3 sm:py-4 px-4 sm:px-8 rounded-xl font-bold text-sm sm:text-lg hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#f5a623]/20 transition-all disabled:opacity-50 disabled:hover:translate-y-0 flex items-center justify-center gap-2 sm:gap-3"
                >
                  <Sparkles className="w-5 sm:w-6 h-5 sm:h-6" />
                  Check Mijn Prompt
                </button>
                {attempts > 0 && (
                  <button
                    onClick={() => {
                      setUserPrompt('');
                      setFeedback(null);
                    }}
                    className="px-4 sm:px-6 bg-[#1c1c23] border border-white/[0.06] hover:border-white/[0.12] rounded-xl transition flex items-center justify-center"
                    title="Reset"
                  >
                    <RefreshCw className="w-5 sm:w-6 h-5 sm:h-6 text-[#9a9a9f]" />
                  </button>
                )}
              </div>

              {attempts >= HINT_THRESHOLD && !showHint && (
                <button
                  onClick={() => setShowHint(true)}
                  className="w-full mt-4 bg-yellow-500/10 border border-yellow-500/20 hover:bg-yellow-500/20 text-yellow-300 py-3 rounded-xl font-semibold transition text-sm sm:text-base"
                >
                  Geef me een hint
                </button>
              )}
            </div>

            {/* Hints Section */}
            {showHint && (
              <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl p-4 sm:p-8 mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-bold text-yellow-300 mb-4 sm:mb-6 flex items-center gap-2">
                  Hints om je te helpen:
                </h3>
                <div className="grid gap-3 sm:gap-4">
                  {currentLevelData.hints.map((hint, idx) => (
                    <div key={idx} className="bg-[#1c1c23] rounded-lg p-3 sm:p-4 border-l-4 border-yellow-500">
                      <p className="text-[#f0ede8] text-sm sm:text-base">{hint}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Template Button */}
          {unlockedTemplates.length > 0 && (
            <div className="text-center">
              <button
                onClick={() => setShowTemplate(true)}
                className="bg-gradient-to-r from-[#f5a623] to-[#e09620] text-[#0f0f12] px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-lg hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#f5a623]/20 transition-all flex items-center justify-center gap-2 sm:gap-3 mx-auto"
              >
                <Book className="w-5 sm:w-6 h-5 sm:h-6" />
                Bekijk Mijn Templates ({unlockedTemplates.length})
              </button>
            </div>
          )}
        </div>

        {/* Feedback Panel */}
        {feedback && (
          <FeedbackPanel
            feedback={feedback}
            currentLevel={currentLevelData}
            isLastLevel={currentLevel >= levels.length - 1}
            onNextLevel={handleNextLevel}
            onRetry={() => setFeedback(null)}
          />
        )}
      </div>

      {/* Sticky Footer CTA */}
      <StickyFooterCTA variant="game" />

      {/* Template Modal - Dark Mode */}
      {showTemplate && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#1c1c23] border border-white/[0.06] rounded-[28px] max-w-4xl w-full max-h-[90vh] overflow-y-auto p-4 sm:p-8 relative">
            <div className="absolute top-0 left-10 right-10 h-0.5 bg-gradient-to-r from-transparent via-[#f5a623] to-transparent" />

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl sm:text-2xl font-bold">Template Library</h2>
              <button
                onClick={() => setShowTemplate(false)}
                className="p-2 hover:bg-white/10 rounded-full transition"
              >
                <X className="w-6 h-6 text-[#9a9a9f]" />
              </button>
            </div>

            <div className="space-y-8">
              {unlockedTemplates.map((templates, idx) => (
                <div key={idx} className="border-b border-white/[0.06] pb-8">
                  <h3 className="text-lg sm:text-xl font-bold text-[#f5a623] mb-4">
                    Level {idx + 1}: {levels[idx]?.title}
                  </h3>

                  <div className="mb-6 bg-[#24242d] rounded-xl p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row justify-between mb-3 gap-2">
                      <h4 className="font-bold text-sm sm:text-base">{templates.basis.title}</h4>
                      <button
                        onClick={() => copyTemplate(templates.basis.prompt)}
                        className="flex items-center gap-2 text-sm bg-[#f5a623] text-[#0f0f12] px-3 py-1.5 rounded-lg self-start hover:bg-[#e09620] transition font-semibold"
                      >
                        <Copy className="w-4 h-4" />
                        Copy
                      </button>
                    </div>
                    <pre className="text-xs bg-[#1c1c23] p-4 rounded-lg overflow-x-auto whitespace-pre-wrap text-[#9a9a9f] border border-white/[0.06]">
                      {templates.basis.prompt}
                    </pre>
                  </div>

                  <div className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-500/20 rounded-xl p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row justify-between mb-3 gap-2">
                      <h4 className="font-bold text-sm sm:text-base">{templates.uitgebreid.title}</h4>
                      <button
                        onClick={() => copyTemplate(templates.uitgebreid.prompt)}
                        className="flex items-center gap-2 text-sm bg-purple-500 text-white px-3 py-1.5 rounded-lg self-start hover:bg-purple-600 transition font-semibold"
                      >
                        <Copy className="w-4 h-4" />
                        Copy
                      </button>
                    </div>
                    <pre className="text-xs bg-[#1c1c23] p-4 rounded-lg overflow-x-auto whitespace-pre-wrap text-[#9a9a9f] border border-white/[0.06]">
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
