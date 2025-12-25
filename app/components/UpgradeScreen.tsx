'use client';

import React, { useState } from 'react';
import { Trophy, Rocket, Mail, Clock, Users, CheckCircle, ArrowRight } from 'lucide-react';
import { trackEmailSignup } from '../lib/analytics';

interface UpgradeScreenProps {
  score: number;
  onContinueFree: (email: string) => void;
}

export function UpgradeScreen({ score, onContinueFree }: UpgradeScreenProps) {
  const [email, setEmail] = useState('');
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      // Send to Pipedrive
      const PIPEDRIVE_FORM_URL = process.env.NEXT_PUBLIC_PIPEDRIVE_FORM_URL;

      try {
        if (PIPEDRIVE_FORM_URL) {
          const formBody = new FormData();
          formBody.append('email', email);
          formBody.append('source', 'Game Unlock - Level 2');
          formBody.append('lead_type', 'game_player');
          formBody.append('score', String(score));

          await fetch(PIPEDRIVE_FORM_URL, {
            method: 'POST',
            body: formBody,
            mode: 'no-cors',
          });
        }

        // Track in GA4
        trackEmailSignup('game_unlock');
      } catch (error) {
        console.error('Failed to send to Pipedrive:', error);
      }

      setEmailSubmitted(true);
      setTimeout(() => {
        onContinueFree(email);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white p-4 sm:p-8 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <Trophy className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
            Level 1 voltooid! 🎉
          </h1>
          <p className="text-lg text-gray-600">
            Je hebt <span className="font-bold text-orange-600">{score} punten</span> behaald
          </p>
        </div>

        {/* Workshop Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 mb-6 border-2 border-orange-200">
          <div className="flex items-center gap-2 mb-4">
            <Rocket className="w-6 h-6 text-orange-500" />
            <span className="bg-orange-100 text-orange-700 text-sm font-bold px-3 py-1 rounded-full">
              Aanbevolen
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
            AI Recruitment Workshop
          </h2>

          <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>2 uur live training</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>Kleine groepen</span>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Alle 3 levels + extra geavanceerde oefeningen</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">20+ kant-en-klare prompt templates</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Live feedback op jouw prompts</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Q&A met AI recruitment expert</span>
            </div>
          </div>

          <a
            href="/workshop"
            className="block w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 px-6 rounded-xl font-bold text-lg text-center hover:scale-105 transition shadow-lg"
          >
            Bekijk Workshop Details →
          </a>

          <p className="text-center text-sm text-gray-500 mt-3">
            Ook beschikbaar als in-company training
          </p>
        </div>

        {/* Free Option */}
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
          {!showEmailForm && !emailSubmitted && (
            <>
              <h3 className="font-bold text-gray-700 mb-2">
                Liever eerst gratis verder?
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Laat je email achter en krijg toegang tot level 2 & 3
              </p>
              <button
                onClick={() => setShowEmailForm(true)}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 px-6 rounded-xl font-semibold transition flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Gratis verdergaan met email
              </button>
            </>
          )}

          {showEmailForm && !emailSubmitted && (
            <form onSubmit={handleEmailSubmit}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Je email adres
              </label>
              <div className="flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="naam@bedrijf.nl"
                  required
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold transition flex items-center gap-2"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                We sturen je ook handige AI recruitment tips
              </p>
            </form>
          )}

          {emailSubmitted && (
            <div className="text-center py-4">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <p className="text-green-700 font-bold">Gelukt! Je gaat door naar level 2...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
