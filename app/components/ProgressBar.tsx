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
    <div className="mb-6 sm:mb-8">
      <div className="bg-[#1c1c23] border border-white/[0.06] rounded-2xl p-4 sm:p-5 max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-2xl sm:text-3xl font-bold text-[#f5a623]">{score}</span>
            <span className="text-xs sm:text-sm text-[#6a6a70]">punten</span>
          </div>
          <div className="text-xs sm:text-sm text-[#9a9a9f]">
            Level <span className="text-[#f5a623] font-bold">{currentLevel + 1}</span> / {levels.length}
          </div>
        </div>
        <div className="h-2 sm:h-3 bg-[#24242d] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#f5a623] to-[#e09620] transition-all duration-1000 ease-out relative"
            style={{ width: `${progressPercentage}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
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
    <div className="flex gap-2 sm:gap-3 justify-center mb-6 sm:mb-8 flex-wrap">
      {levels.map((level, idx) => (
        <div
          key={idx}
          className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl transition-all duration-500 transform border ${
            idx < currentLevel
              ? 'bg-green-500/10 border-green-500/30 text-green-400 scale-95'
              : idx === currentLevel
              ? 'bg-[#f5a623]/10 border-[#f5a623]/30 text-[#f5a623] scale-105 sm:scale-110 shadow-lg shadow-[#f5a623]/10'
              : 'bg-[#24242d] border-white/[0.06] text-[#6a6a70] scale-90'
          }`}
        >
          <span className="text-lg sm:text-xl">{level.icon}</span>
        </div>
      ))}
    </div>
  );
}
