'use client';

import React from 'react';
import { CheckCircle2, XCircle, ArrowRight, Trophy, Star } from 'lucide-react';
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
        className={`rounded-3xl shadow-2xl p-4 sm:p-8 ${
          feedback.type === 'pass'
            ? 'bg-green-50 border-2 border-green-300'
            : 'bg-orange-50 border-2 border-orange-300'
        }`}
      >
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4">
            {feedback.type === 'pass' ? (
              <CheckCircle2 className="w-12 sm:w-16 h-12 sm:h-16 text-green-600" />
            ) : (
              <XCircle className="w-12 sm:w-16 h-12 sm:h-16 text-orange-600" />
            )}
            <div>
              <h3 className="text-xl sm:text-3xl font-bold mb-2">{feedback.message}</h3>
              <div className="text-4xl sm:text-5xl font-bold">{feedback.percentage}%</div>
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:gap-4 mb-6 sm:mb-8">
          {feedback.details.map((detail, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border-2 ${
                detail.passed ? 'bg-green-100 border-green-300' : 'bg-orange-50 border-orange-300'
              }`}
            >
              <p className="text-sm sm:text-base font-medium">
                {detail.passed ? '✅ ' : '💡 '}{detail.message}
              </p>
            </div>
          ))}
        </div>

        {feedback.type === 'pass' && (
          <>
            {/* Good vs Bad Example Comparison */}
            <div className="mb-6 sm:mb-8">
              <h4 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2">
                📚 Wat heb je geleerd?
              </h4>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Bad Example */}
                {currentLevel.badExample && (
                  <div className="bg-red-50 rounded-xl p-4 border-2 border-red-200">
                    <h5 className="font-bold text-red-700 mb-3 flex items-center gap-2 text-sm">
                      ❌ Zo niet:
                    </h5>
                    <div className="bg-white p-3 rounded-lg border border-red-200">
                      <pre className="text-xs whitespace-pre-wrap font-mono text-red-800">
                        {currentLevel.badExample}
                      </pre>
                    </div>
                    <p className="text-xs text-red-600 mt-2">
                      Te vaag, geen context of structuur
                    </p>
                  </div>
                )}

                {/* Good Example */}
                <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
                  <h5 className="font-bold text-green-700 mb-3 flex items-center gap-2 text-sm">
                    <Star className="w-4 h-4 text-yellow-500" />
                    Zo wel:
                  </h5>
                  <div className="bg-white p-3 rounded-lg border border-green-200">
                    <pre className="text-xs whitespace-pre-wrap font-mono text-green-800 leading-relaxed">
                      {currentLevel.goodExample}
                    </pre>
                  </div>
                  <p className="text-xs text-green-600 mt-2">
                    Duidelijke rol, context, taak en format
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={onNextLevel}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 sm:py-6 rounded-2xl font-bold text-lg sm:text-xl hover:scale-105 transition flex items-center justify-center gap-3"
            >
              {!isLastLevel ? (
                <>
                  🎉 Ga naar het volgende level! <ArrowRight className="w-5 sm:w-6 h-5 sm:h-6" />
                </>
              ) : (
                <>
                  🏆 Voltooi de training! <Trophy className="w-5 sm:w-6 h-5 sm:h-6" />
                </>
              )}
            </button>
          </>
        )}

        {feedback.type === 'improve' && (
          <button
            onClick={onRetry}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 sm:py-6 rounded-2xl font-bold text-lg sm:text-xl hover:scale-105 transition"
          >
            🔄 Probeer Opnieuw
          </button>
        )}
      </div>
    </div>
  );
}
