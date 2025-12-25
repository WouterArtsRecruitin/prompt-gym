'use client';

import React from 'react';
import { Sparkles, ArrowRight, CheckCircle, Users, Clock, Star } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
  hasSavedProgress?: boolean;
  onContinue?: () => void;
}

export function WelcomeScreen({ onStart, hasSavedProgress, onContinue }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-[#0f0f12] p-4 flex items-center justify-center relative overflow-hidden">
      {/* Gradient orbs */}
      <div className="fixed -top-[300px] -right-[200px] w-[700px] h-[700px] bg-[#f5a623]/[0.08] rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[10%] -left-[150px] w-[500px] h-[500px] bg-purple-500/[0.06] rounded-full blur-[120px] pointer-events-none" />

      <div className="bg-[#1c1c23] border border-white/[0.06] rounded-[28px] p-6 sm:p-10 max-w-4xl w-full relative z-10">
        {/* Top gradient line */}
        <div className="absolute top-0 left-10 right-10 h-0.5 bg-gradient-to-r from-transparent via-[#f5a623] to-transparent" />

        <div className="text-center mb-8">
          {/* Animated Recruitin Logo */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-[#f5a623] to-[#e09620] rounded-2xl flex items-center justify-center shadow-lg shadow-[#f5a623]/20">
                <Sparkles className="w-8 h-8 text-[#0f0f12]" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse border-2 border-[#1c1c23]"></div>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
            THE PROMPT GYM
          </h1>
          <p className="text-lg sm:text-xl text-[#f5a623] font-medium mb-2">by Recruitin</p>
          <p className="text-sm sm:text-base text-[#9a9a9f]">
            Train je AI prompt skills - <span className="text-[#f5a623] font-medium">the right prompts, right now</span>
          </p>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-8 mb-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-[#f5a623]">
              <Users className="w-4 h-4" />
              <span className="text-xl font-bold">847+</span>
            </div>
            <p className="text-xs text-[#6a6a70]">Recruiters</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-[#f5a623]">
              <Star className="w-4 h-4" />
              <span className="text-xl font-bold">4.9/5</span>
            </div>
            <p className="text-xs text-[#6a6a70]">Rating</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-[#f5a623]">
              <Clock className="w-4 h-4" />
              <span className="text-xl font-bold">15 min</span>
            </div>
            <p className="text-xs text-[#6a6a70]">Training</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
          <div className="bg-[#24242d] border border-white/[0.06] rounded-xl p-5 text-center">
            <div className="w-12 h-12 bg-[#f5a623]/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="font-bold text-white mb-3">Wat leer je?</h3>
            <ul className="space-y-2 text-sm text-[#9a9a9f]">
              <li className="flex items-center gap-2 justify-center">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Effectieve CV prompts
              </li>
              <li className="flex items-center gap-2 justify-center">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Aantrekkelijke vacatures
              </li>
              <li className="flex items-center gap-2 justify-center">
                <CheckCircle className="w-4 h-4 text-green-500" />
                AI sourcing strategies
              </li>
              <li className="flex items-center gap-2 justify-center">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Ready-to-use templates
              </li>
            </ul>
          </div>

          <div className="bg-[#24242d] border border-white/[0.06] rounded-xl p-5 text-center">
            <div className="w-12 h-12 bg-[#f5a623]/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🏋️</span>
            </div>
            <h3 className="font-bold text-white mb-3">Hoe werkt het?</h3>
            <div className="space-y-2 text-sm text-[#9a9a9f]">
              <div className="flex items-center gap-2 justify-center">
                <span className="w-5 h-5 bg-[#f5a623] rounded-full text-[#0f0f12] text-xs font-bold flex items-center justify-center">1</span>
                Lees scenario & challenge
              </div>
              <div className="flex items-center gap-2 justify-center">
                <span className="w-5 h-5 bg-[#f5a623] rounded-full text-[#0f0f12] text-xs font-bold flex items-center justify-center">2</span>
                Schrijf je prompt
              </div>
              <div className="flex items-center gap-2 justify-center">
                <span className="w-5 h-5 bg-[#f5a623] rounded-full text-[#0f0f12] text-xs font-bold flex items-center justify-center">3</span>
                Krijg directe feedback
              </div>
              <div className="flex items-center gap-2 justify-center">
                <span className="w-5 h-5 bg-[#f5a623] rounded-full text-[#0f0f12] text-xs font-bold flex items-center justify-center">4</span>
                Unlock templates
              </div>
            </div>
          </div>

          <div className="bg-[#24242d] border border-white/[0.06] rounded-xl p-5 text-center sm:col-span-2 md:col-span-1">
            <div className="w-12 h-12 bg-[#f5a623]/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🎖️</span>
            </div>
            <h3 className="font-bold text-white mb-3">3 Levels</h3>
            <div className="space-y-2 text-sm">
              <div className="bg-[#1c1c23] rounded-lg px-3 py-2 text-[#f0ede8]">
                🎯 <span className="font-medium">De Basis</span>
              </div>
              <div className="bg-[#1c1c23] rounded-lg px-3 py-2 text-[#f0ede8]">
                👑 <span className="font-medium">Context is King</span>
              </div>
              <div className="bg-[#1c1c23] rounded-lg px-3 py-2 text-[#f0ede8]">
                🎨 <span className="font-medium">Output Sturen</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center space-y-4">
          {hasSavedProgress && onContinue ? (
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={onContinue}
                className="bg-gradient-to-r from-[#f5a623] to-[#e09620] text-[#0f0f12] px-8 sm:px-10 py-4 rounded-xl font-bold text-base sm:text-lg hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#f5a623]/20 transition-all flex items-center gap-3 justify-center"
              >
                <Sparkles className="w-5 h-5" />
                Ga Verder
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={onStart}
                className="bg-[#24242d] border border-white/[0.06] hover:border-white/[0.12] text-[#9a9a9f] px-8 sm:px-10 py-4 rounded-xl font-bold text-base sm:text-lg transition-all flex items-center gap-3 justify-center"
              >
                Begin Opnieuw
              </button>
            </div>
          ) : (
            <button
              onClick={onStart}
              className="bg-gradient-to-r from-[#f5a623] to-[#e09620] text-[#0f0f12] px-8 sm:px-10 py-4 rounded-xl font-bold text-base sm:text-lg hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#f5a623]/20 transition-all flex items-center gap-3 mx-auto"
            >
              <Sparkles className="w-5 h-5" />
              Start Training
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
          <p className="text-xs sm:text-sm text-[#6a6a70]">~10-15 minuten • Gratis • Geen account nodig</p>
        </div>
      </div>
    </div>
  );
}
