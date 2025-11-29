'use client';

import React, { useState, useCallback } from 'react';
import { Sparkles, RefreshCw, Target, Book } from 'lucide-react';

// Components
import { WelcomeScreen } from './WelcomeScreen';
import { GameCompleteScreen } from './GameCompleteScreen';
import { ProgressBar, LevelIndicators } from './ProgressBar';
import { FeedbackPanel } from './FeedbackPanel';
import { Confetti } from './Confetti';

// Data & Utils
import { levels } from '../data/levels';
import { useGameState } from '../hooks/useGameState';
import { checkPrompt, calculatePoints, PASS_THRESHOLD, HINT_THRESHOLD } from '../utils/promptChecker';
import { Feedback } from '../types';

const PromptGym = () => {
  const [showWelcome, setShowWelcome] = useState(true);
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
    isLoaded,
    updateScore,
    nextLevel,
    unlockTemplate,
    updatePerfectStreak,
    resetGame,
    setGameComplete,
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

      setFeedback({
        type: 'pass',
        percentage: result.percentage,
        message: attempts === 0 ? "🎉 PERFECT! Eerste poging raak!" : "✅ Yes! Je hebt het door!",
        details: result.results,
        pointsEarned,
      });
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      setFeedback({
        type: 'improve',
        percentage: result.percentage,
        message: result.percentage >= 50 ? "⚠️ Bijna!" : "❌ Not quite.",
        details: result.results,
      });
      if (attempts >= HINT_THRESHOLD) setShowHint(true);
    }
  }, [userPrompt, currentLevel, attempts, updateScore, unlockTemplate, updatePerfectStreak]);

  const handleNextLevel = useCallback(() => {
    if (currentLevel < levels.length - 1) {
      nextLevel(levels.length);
      setUserPrompt('');
      setFeedback(null);
      setAttempts(0);
      setShowHint(false);
    } else {
      setGameComplete(true);
    }
  }, [currentLevel, nextLevel, setGameComplete]);

  const handleStart = useCallback(() => {
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

  // Loading state
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-12 h-12 bg-orange-500 rounded-full animate-pulse flex items-center justify-center">
          <span className="text-white font-bold">R</span>
        </div>
      </div>
    );
  }

  // Welcome screen
  if (showWelcome) {
    return (
      <WelcomeScreen
        onStart={handleStart}
        hasSavedProgress={hasSavedProgress}
        onContinue={hasSavedProgress ? handleContinue : undefined}
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

  // Main game screen
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      {showConfetti && <Confetti />}

      <div className="max-w-6xl mx-auto">
        <ProgressBar currentLevel={currentLevel} score={score} levels={levels} />
        <LevelIndicators currentLevel={currentLevel} levels={levels} />

        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          {/* Level Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-4 sm:p-8">
            <div className="text-center mb-6 sm:mb-8">
              <div className={`inline-flex items-center gap-3 sm:gap-4 bg-gradient-to-r ${currentLevelData.color} text-white px-4 sm:px-8 py-3 sm:py-4 rounded-2xl mb-4 sm:mb-6`}>
                <div className="text-2xl sm:text-4xl">{currentLevelData.icon}</div>
                <div className="text-left">
                  <h2 className="text-lg sm:text-2xl font-bold">{currentLevelData.title}</h2>
                  <p className="text-white/90 text-xs sm:text-base">{currentLevelData.description}</p>
                </div>
              </div>
            </div>

            {/* Challenge Section */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 sm:p-8 mb-6 sm:mb-8">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-7 sm:w-8 h-7 sm:h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <Target className="w-3 sm:w-4 h-3 sm:h-4 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Jouw Opdracht</h3>
              </div>
              <div className="bg-white rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
                <h4 className="font-bold text-gray-700 mb-2 sm:mb-3 text-sm sm:text-base">📋 Scenario:</h4>
                <p className="text-gray-700 text-sm sm:text-lg leading-relaxed">{currentLevelData.scenario}</p>
              </div>
              <div className="bg-gradient-to-r from-orange-100 to-gray-100 rounded-xl p-4 sm:p-6">
                <h4 className="font-bold text-orange-600 mb-2 sm:mb-3 text-sm sm:text-base">🎯 Challenge:</h4>
                <p className="text-purple-800 text-sm sm:text-lg font-medium leading-relaxed">{currentLevelData.challenge}</p>
              </div>
            </div>

            {/* Input Section */}
            <div className="bg-gray-50 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">✏️ Schrijf hier je prompt:</h3>
              <textarea
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                placeholder="Begin met: 'Je bent een ervaren recruiter...' en schrijf je volledige prompt hier..."
                className="w-full h-32 sm:h-40 p-4 sm:p-6 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none resize-none text-sm sm:text-lg"
              />

              <div className="flex gap-3 sm:gap-4 mt-4 sm:mt-6">
                <button
                  onClick={handleSubmit}
                  disabled={!userPrompt.trim()}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 sm:py-4 px-4 sm:px-8 rounded-xl font-bold text-sm sm:text-lg hover:scale-105 transition disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2 sm:gap-3"
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
                    className="px-4 sm:px-6 bg-gray-100 hover:bg-gray-200 rounded-xl transition flex items-center justify-center"
                    title="Reset"
                  >
                    <RefreshCw className="w-5 sm:w-6 h-5 sm:h-6" />
                  </button>
                )}
              </div>

              {attempts >= HINT_THRESHOLD && !showHint && (
                <button
                  onClick={() => setShowHint(true)}
                  className="w-full mt-4 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 py-3 rounded-xl font-semibold transition text-sm sm:text-base"
                >
                  💡 Geef me een hint
                </button>
              )}
            </div>

            {/* Hints Section */}
            {showHint && (
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-2xl p-4 sm:p-8 mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-bold text-yellow-800 mb-4 sm:mb-6 flex items-center gap-2">
                  💡 Hints om je te helpen:
                </h3>
                <div className="grid gap-3 sm:gap-4">
                  {currentLevelData.hints.map((hint, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-3 sm:p-4 border-l-4 border-yellow-400">
                      <p className="text-gray-800 text-sm sm:text-base">{hint}</p>
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
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-lg hover:scale-105 transition flex items-center justify-center gap-2 sm:gap-3 mx-auto"
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

      {/* Template Modal */}
      {showTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-4 sm:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl sm:text-2xl font-bold">📚 Template Library</h2>
              <button
                onClick={() => setShowTemplate(false)}
                className="text-2xl hover:bg-gray-100 rounded-full p-2"
              >
                ×
              </button>
            </div>

            <div className="space-y-8">
              {unlockedTemplates.map((templates, idx) => (
                <div key={idx} className="border-b pb-8">
                  <h3 className="text-lg sm:text-xl font-bold text-orange-600 mb-4">
                    Level {idx + 1}: {levels[idx]?.title}
                  </h3>

                  <div className="mb-6 bg-gray-50 rounded-xl p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row justify-between mb-3 gap-2">
                      <h4 className="font-bold text-sm sm:text-base">{templates.basis.title}</h4>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(templates.basis.prompt);
                          alert('✅ Template gekopieerd!');
                        }}
                        className="flex items-center gap-2 text-sm bg-orange-500 text-white px-3 py-1 rounded-lg self-start"
                      >
                        Copy
                      </button>
                    </div>
                    <pre className="text-xs bg-white p-4 rounded-lg overflow-x-auto whitespace-pre-wrap">
                      {templates.basis.prompt}
                    </pre>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row justify-between mb-3 gap-2">
                      <h4 className="font-bold text-sm sm:text-base">{templates.uitgebreid.title}</h4>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(templates.uitgebreid.prompt);
                          alert('✅ Template gekopieerd!');
                        }}
                        className="flex items-center gap-2 text-sm bg-indigo-600 text-white px-3 py-1 rounded-lg self-start"
                      >
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
