'use client';

import React from 'react';
import { CheckCircle2, XCircle, ArrowRight, Trophy, Star, Sparkles } from 'lucide-react';
import { Feedback, Level } from '../types';

interface FeedbackPanelProps {
  feedback: Feedback;
  currentLevel: Level;
  isLastLevel: boolean;
  onNextLevel: () => void;
  onRetry: () => void;
}

export function FeedbackPanel({
  feedback,
  currentLevel,
  isLastLevel,
  onNextLevel,
  onRetry,
}: FeedbackPanelProps) {
  return (
    <div className="max-w-4xl mx-auto mt-6 sm:mt-8">
      <div
        className={`rounded-[28px] p-4 sm:p-8 border relative overflow-hidden ${
          feedback.type === 'pass'
            ? 'bg-green-500/10 border-green-500/30'
            : 'bg-orange-500/10 border-orange-500/30'
        }`}
      >
        {/* Top gradient line */}
        <div className={`absolute top-0 left-10 right-10 h-0.5 bg-gradient-to-r from-transparent ${
          feedback.type === 'pass' ? 'via-green-500' : 'via-orange-500'
        } to-transparent`} />

        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4">
            {feedback.type === 'pass' ? (
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-500/20 rounded-2xl flex items-center justify-center">
                <CheckCircle2 className="w-10 sm:w-12 h-10 sm:h-12 text-green-400" />
              </div>
            ) : (
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-orange-500/20 rounded-2xl flex items-center justify-center">
                <XCircle className="w-10 sm:w-12 h-10 sm:h-12 text-orange-400" />
              </div>
            )}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">{feedback.message}</h3>
              <div className={`text-4xl sm:text-5xl font-bold ${
                feedback.type === 'pass' ? 'text-green-400' : 'text-orange-400'
              }`}>
                {feedback.percentage}%
              </div>
            </div>
          </div>

          {feedback.type === 'pass' && feedback.pointsEarned && (
            <div className="inline-flex items-center gap-2 bg-[#f5a623]/10 border border-[#f5a623]/30 text-[#f5a623] px-4 py-2 rounded-full">
              <Sparkles className="w-4 h-4" />
              <span className="font-bold">+{feedback.pointsEarned} punten</span>
            </div>
          )}
        </div>

        <div className="grid gap-3 sm:gap-4 mb-6 sm:mb-8">
          {feedback.details.map((detail, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border ${
                detail.passed
                  ? 'bg-green-500/10 border-green-500/20'
                  : 'bg-orange-500/10 border-orange-500/20'
              }`}
            >
              <p className={`text-sm sm:text-base font-medium flex items-center gap-2 ${
                detail.passed ? 'text-green-300' : 'text-orange-300'
              }`}>
                {detail.passed ? (
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                ) : (
                  <span className="text-lg">💡</span>
                )}
                {detail.message}
              </p>
            </div>
          ))}
        </div>

        {feedback.type === 'pass' && (
          <>
            {/* Good vs Bad Example Comparison */}
            <div className="mb-6 sm:mb-8">
              <h4 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2 text-white">
                📚 Wat heb je geleerd?
              </h4>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Bad Example */}
                {currentLevel.badExample && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                    <h5 className="font-bold text-red-300 mb-3 flex items-center gap-2 text-sm">
                      ❌ Zo niet:
                    </h5>
                    <div className="bg-[#1c1c23] p-3 rounded-lg border border-red-500/20">
                      <pre className="text-xs whitespace-pre-wrap font-mono text-red-300">
                        {currentLevel.badExample}
                      </pre>
                    </div>
                    <p className="text-xs text-red-400 mt-2">
                      Te vaag, geen context of structuur
                    </p>
                  </div>
                )}

                {/* Good Example */}
                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                  <h5 className="font-bold text-green-300 mb-3 flex items-center gap-2 text-sm">
                    <Star className="w-4 h-4 text-yellow-400" />
                    Zo wel:
                  </h5>
                  <div className="bg-[#1c1c23] p-3 rounded-lg border border-green-500/20">
                    <pre className="text-xs whitespace-pre-wrap font-mono text-green-300 leading-relaxed">
                      {currentLevel.goodExample}
                    </pre>
                  </div>
                  <p className="text-xs text-green-400 mt-2">
                    Duidelijke rol, context, taak en format
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={onNextLevel}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 sm:py-5 rounded-xl font-bold text-lg sm:text-xl hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-500/20 transition-all flex items-center justify-center gap-3"
            >
              {!isLastLevel ? (
                <>
                  Ga naar het volgende level!
                  <ArrowRight className="w-5 sm:w-6 h-5 sm:h-6" />
                </>
              ) : (
                <>
                  Voltooi de training!
                  <Trophy className="w-5 sm:w-6 h-5 sm:h-6" />
                </>
              )}
            </button>
          </>
        )}

        {feedback.type === 'improve' && (
          <button
            onClick={onRetry}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 sm:py-5 rounded-xl font-bold text-lg sm:text-xl hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/20 transition-all flex items-center justify-center gap-2"
          >
            <ArrowRight className="w-5 h-5 rotate-180" />
            Probeer Opnieuw
          </button>
        )}
      </div>
    </div>
  );
}
