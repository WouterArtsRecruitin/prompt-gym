'use client';

import React, { useState } from 'react';
import { Trophy, RefreshCw, Copy } from 'lucide-react';
import { Templates, Level } from '../types';

interface GameCompleteScreenProps {
  score: number;
  perfectStreak: number;
  unlockedTemplates: Templates[];
  levels: Level[];
  onRestart: () => void;
}

export function GameCompleteScreen({
  score,
  perfectStreak,
  unlockedTemplates,
  levels,
  onRestart,
}: GameCompleteScreenProps) {
  const [showTemplate, setShowTemplate] = useState(false);

  const totalPossibleScore = levels.length * 100;
  const finalPercentage = Math.round((score / totalPossibleScore) * 100);

  let badge = "🥉 Prompt Padawan";
  if (finalPercentage >= 90) badge = "🏆 Prompt Titan";
  else if (finalPercentage >= 75) badge = "💎 Prompt Master";

  const copyTemplate = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('✅ Template gekopieerd!');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-12 text-center max-w-2xl w-full">
        <Trophy className="w-16 sm:w-24 h-16 sm:h-24 mx-auto text-yellow-500 mb-4" />
        <h1 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mb-4">
          GEFELICITEERD!
        </h1>
        <p className="text-lg sm:text-2xl text-gray-700 mb-2">Je hebt de Prompt Gym voltooid!</p>
        <div className="text-4xl sm:text-6xl font-bold text-orange-600 my-6">{badge}</div>

        <div className="bg-gradient-to-r from-orange-100 to-gray-100 rounded-2xl p-4 sm:p-6 mb-8">
          <div className="grid grid-cols-3 gap-4 sm:gap-6">
            <div>
              <div className="text-2xl sm:text-4xl font-bold text-orange-600">{score}</div>
              <div className="text-xs sm:text-sm text-gray-600">Score</div>
            </div>
            <div>
              <div className="text-2xl sm:text-4xl font-bold text-indigo-600">{finalPercentage}%</div>
              <div className="text-xs sm:text-sm text-gray-600">Success</div>
            </div>
            <div>
              <div className="text-2xl sm:text-4xl font-bold text-pink-600">{perfectStreak || '-'}</div>
              <div className="text-xs sm:text-sm text-gray-600">Streak</div>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowTemplate(true)}
          className="mb-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition w-full sm:w-auto"
        >
          📚 Bekijk Templates ({unlockedTemplates.length})
        </button>

        <div className="space-y-4">
          <button
            onClick={onRestart}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Speel Opnieuw
          </button>

          <a
            href="https://www.recruitin.nl"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-gray-600 hover:bg-gray-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition text-center"
          >
            🚀 Meer AI recruitment tools ontdekken
          </a>

          <a
            href="mailto:warts@recruitin.nl?subject=Interesse in AI Recruitment Training"
            className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-xl font-semibold transition text-center"
          >
            📧 Contact voor bedrijfstraining
          </a>
        </div>
      </div>

      {showTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-4 sm:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl sm:text-2xl font-bold">📚 Template Library</h2>
              <button onClick={() => setShowTemplate(false)} className="text-2xl hover:bg-gray-100 rounded-full p-2">×</button>
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
                        onClick={() => copyTemplate(templates.basis.prompt)}
                        className="flex items-center gap-2 text-sm bg-orange-500 text-white px-3 py-1 rounded-lg self-start"
                      >
                        <Copy className="w-4 h-4" />
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
                        onClick={() => copyTemplate(templates.uitgebreid.prompt)}
                        className="flex items-center gap-2 text-sm bg-indigo-600 text-white px-3 py-1 rounded-lg self-start"
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
