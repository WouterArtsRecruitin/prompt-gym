'use client';

import React, { useState } from 'react';
import { Mail, ArrowRight, X, Sparkles, CheckCircle } from 'lucide-react';

interface EmailPreCaptureProps {
  onContinue: (email?: string) => void;
  onSkip: () => void;
}

export function EmailPreCapture({ onContinue, onSkip }: EmailPreCaptureProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);

    // Store email for later use
    localStorage.setItem('prompt-gym-precapture-email', email);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    setIsSubmitting(false);
    onContinue(email);
  };

  return (
    <div className="min-h-screen bg-[#0f0f12] flex items-center justify-center p-4">
      {/* Gradient orbs */}
      <div className="fixed -top-[300px] -right-[200px] w-[700px] h-[700px] bg-[#f5a623]/[0.08] rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[10%] -left-[150px] w-[500px] h-[500px] bg-orange-500/[0.06] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-md w-full relative z-10">
        <div className="bg-[#1c1c23] border border-white/[0.06] rounded-[28px] p-8 sm:p-10 relative overflow-hidden">
          {/* Top gradient line */}
          <div className="absolute top-0 left-10 right-10 h-0.5 bg-gradient-to-r from-transparent via-[#f5a623] to-transparent" />

          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-[#f5a623] to-[#e09620] rounded-2xl flex items-center justify-center shadow-lg shadow-[#f5a623]/20">
                <Sparkles className="w-8 h-8 text-[#0f0f12]" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#1c1c23] animate-pulse" />
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-white text-center mb-3">
            Welkom bij Prompt Gym
          </h1>

          <p className="text-[#9a9a9f] text-center mb-8 leading-relaxed">
            Train je AI prompt skills in 15 minuten. Wil je je voortgang opslaan en exclusieve tips ontvangen?
          </p>

          {/* Benefits */}
          <div className="space-y-3 mb-8">
            <div className="flex items-center gap-3 text-sm text-[#f0ede8]">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span>Je voortgang wordt automatisch opgeslagen</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-[#f0ede8]">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span>Ontvang exclusieve AI recruitment tips</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-[#f0ede8]">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span>Krijg toegang tot bonus templates</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6a6a70]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jouw@email.nl"
                className="w-full pl-12 pr-4 py-4 bg-[#24242d] border border-white/[0.06] rounded-xl text-white placeholder-[#6a6a70] focus:border-[#f5a623] focus:ring-2 focus:ring-[#f5a623]/20 focus:outline-none transition"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !email.trim()}
              className="w-full bg-gradient-to-r from-[#f5a623] to-[#e09620] text-[#0f0f12] py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#f5a623]/20 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:hover:translate-y-0"
            >
              {isSubmitting ? 'Even geduld...' : (
                <>
                  Start met opslaan
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <button
            onClick={onSkip}
            className="w-full mt-4 text-[#6a6a70] hover:text-[#9a9a9f] py-3 rounded-xl font-medium transition text-sm"
          >
            Nee bedankt, start zonder opslaan
          </button>

          <p className="text-xs text-[#6a6a70] text-center mt-6">
            We respecteren je privacy. Geen spam, alleen waarde.
          </p>
        </div>

        {/* Stats below */}
        <div className="mt-6 flex justify-center gap-8 text-center">
          <div>
            <div className="text-2xl font-bold text-[#f5a623]">847+</div>
            <div className="text-xs text-[#6a6a70]">Recruiters getraind</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#f5a623]">4.9/5</div>
            <div className="text-xs text-[#6a6a70]">Gemiddelde rating</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#f5a623]">15 min</div>
            <div className="text-xs text-[#6a6a70]">Training duur</div>
          </div>
        </div>
      </div>
    </div>
  );
}
