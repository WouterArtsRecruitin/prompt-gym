'use client';

import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
  hasSavedProgress?: boolean;
  onContinue?: () => void;
}

export function WelcomeScreen({ onStart, hasSavedProgress, onContinue }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-w-5xl w-full">
        <div className="text-center mb-6">
          {/* Animated Recruitin Logo */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-12 h-12 bg-orange-500 rounded-full animate-pulse flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full animate-bounce"></div>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3 hover:scale-105 transition-transform duration-300">
            THE PROMPT GYM
          </h1>
          <p className="text-lg sm:text-xl text-orange-500 font-medium mb-2">by Recruitin</p>
          <div className="text-sm sm:text-base text-gray-600">
            Train je AI prompt skills - <span className="text-orange-500 font-medium">the right prompts, right now</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6">
          <div className="text-center">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-white text-sm">🎯</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2">Wat ga je leren?</h3>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-700">
              <li>✓ Effectieve CV prompts</li>
              <li>✓ Aantrekkelijke vacatures</li>
              <li>✓ AI sourcing strategies</li>
              <li>✓ Ready-to-use templates</li>
            </ul>
          </div>

          <div className="text-center">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-white text-sm">🏋️</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2">Hoe werkt het?</h3>
            <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-700">
              <div>1. Lees scenario & challenge</div>
              <div>2. Schrijf je prompt</div>
              <div>3. Krijg directe feedback</div>
              <div>4. Unlock templates</div>
            </div>
          </div>

          <div className="text-center sm:col-span-2 md:col-span-1">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-white text-sm">🎖️</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2">3 Levels</h3>
            <div className="space-y-1 text-xs sm:text-sm text-gray-700">
              <div>🥉 <span className="font-medium">Prompt Padawan</span></div>
              <div>⚡ <span className="font-medium">Vacature Virtuoso</span></div>
              <div>🔍 <span className="font-medium">Sourcing Sorcerer</span></div>
            </div>
          </div>
        </div>

        <div className="text-center space-y-3">
          {hasSavedProgress && onContinue ? (
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={onContinue}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 sm:px-10 py-3 rounded-2xl font-bold text-base sm:text-lg hover:scale-105 transform transition-all duration-300 hover:shadow-lg flex items-center gap-3 justify-center group"
              >
                <Sparkles className="w-5 h-5" />
                Ga Verder
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={onStart}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-8 sm:px-10 py-3 rounded-2xl font-bold text-base sm:text-lg hover:scale-105 transform transition-all duration-300 flex items-center gap-3 justify-center"
              >
                Begin Opnieuw
              </button>
            </div>
          ) : (
            <button
              onClick={onStart}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 sm:px-10 py-3 rounded-2xl font-bold text-base sm:text-lg hover:scale-105 transform transition-all duration-300 hover:shadow-lg flex items-center gap-3 mx-auto group"
            >
              <Sparkles className="w-5 h-5" />
              Start Training
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
          <p className="text-xs sm:text-sm text-gray-500">~10-15 minuten</p>
        </div>
      </div>
    </div>
  );
}
