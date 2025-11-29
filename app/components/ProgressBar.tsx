'use client';

import React from 'react';
import { Level } from '../types';

interface ProgressBarProps {
  currentLevel: number;
  score: number;
  levels: Level[];
}

export function ProgressBar({ currentLevel, score, levels }: ProgressBarProps) {
  const progressPercentage = (currentLevel / levels.length) * 100;

  return (
    <div className="text-center mb-6 sm:mb-8">
      {/* Animated Mini Logo */}
      <div className="flex justify-center mb-4">
        <div className="w-10 sm:w-12 h-10 sm:h-12 bg-orange-500 rounded-full animate-pulse flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-base sm:text-lg">R</span>
        </div>
      </div>

      <h1 className="text-3xl sm:text-5xl font-bold text-gray-800 mb-2 sm:mb-4">
        THE PROMPT GYM
      </h1>
      <p className="text-orange-500 text-sm sm:text-lg font-medium">by Recruitin - the right prompts, right now</p>

      <div className="mt-4 sm:mt-6 bg-white rounded-2xl shadow-lg p-3 sm:p-4 max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-xl sm:text-2xl font-bold text-orange-600">{score}</span>
            <span className="text-xs sm:text-sm text-gray-500">points</span>
          </div>
          <div className="text-xs sm:text-sm text-gray-600">Level {currentLevel + 1}/{levels.length}</div>
        </div>
        <div className="h-2 sm:h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-orange-500 transition-all duration-1000 ease-out relative"
            style={{ width: `${progressPercentage}%` }}
          >
            <div className="absolute inset-0 bg-orange-400 opacity-50 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface LevelIndicatorsProps {
  currentLevel: number;
  levels: Level[];
}

export function LevelIndicators({ currentLevel, levels }: LevelIndicatorsProps) {
  return (
    <div className="flex gap-2 justify-center mb-6 sm:mb-8 flex-wrap">
      {levels.map((level, idx) => (
        <div
          key={idx}
          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all duration-500 transform ${
            idx < currentLevel
              ? 'bg-green-100 text-green-700 scale-95'
              : idx === currentLevel
              ? 'bg-orange-500 text-white scale-105 sm:scale-110 animate-pulse shadow-lg'
              : 'bg-gray-100 text-gray-400 scale-90'
          }`}
        >
          <span className="text-lg sm:text-xl">{level.icon}</span>
        </div>
      ))}
    </div>
  );
}
