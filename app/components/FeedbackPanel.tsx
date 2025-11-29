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
              className={`p-4 sm:p-6 rounded-xl border-2 ${
                detail.passed ? 'bg-green-100 border-green-300' : 'bg-white border-orange-300'
              }`}
            >
              <p className="text-sm sm:text-lg font-medium">
                {detail.passed ? '✅ Perfect!' : detail.message}
              </p>
            </div>
          ))}
        </div>

        {feedback.type === 'pass' && (
          <>
            <div className="bg-white rounded-2xl p-4 sm:p-8 mb-6 sm:mb-8 border-2 border-green-200">
              <h4 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-3">
                <Star className="w-5 sm:w-6 h-5 sm:h-6 text-yellow-500" />
                Perfecte prompt voorbeeld:
              </h4>
              <div className="bg-gray-50 p-4 sm:p-6 rounded-xl">
                <pre className="text-xs sm:text-sm whitespace-pre-wrap font-mono leading-relaxed">
                  {currentLevel.goodExample}
                </pre>
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
