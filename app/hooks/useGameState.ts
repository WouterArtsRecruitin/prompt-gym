'use client';

import { useState, useEffect, useCallback } from 'react';
import { GameState, Templates } from '../types';

const STORAGE_KEY = 'prompt-gym-progress';

const initialState: GameState = {
  currentLevel: 0,
  score: 0,
  unlockedTemplates: [],
  perfectStreak: 0,
  gameComplete: false,
};

export function useGameState() {
  const [state, setState] = useState<GameState>(initialState);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setState(parsed);
      }
    } catch (error) {
      console.error('Failed to load game state:', error);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage on state change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (error) {
        console.error('Failed to save game state:', error);
      }
    }
  }, [state, isLoaded]);

  const updateScore = useCallback((points: number) => {
    setState(prev => ({ ...prev, score: prev.score + points }));
  }, []);

  const nextLevel = useCallback((totalLevels: number) => {
    setState(prev => {
      if (prev.currentLevel < totalLevels - 1) {
        return { ...prev, currentLevel: prev.currentLevel + 1 };
      }
      return { ...prev, gameComplete: true };
    });
  }, []);

  const unlockTemplate = useCallback((templates: Templates) => {
    setState(prev => ({
      ...prev,
      unlockedTemplates: [...prev.unlockedTemplates, templates]
    }));
  }, []);

  const updatePerfectStreak = useCallback((isPerfect: boolean) => {
    setState(prev => ({
      ...prev,
      perfectStreak: isPerfect ? prev.perfectStreak + 1 : 0
    }));
  }, []);

  const resetGame = useCallback(() => {
    setState(initialState);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const setGameComplete = useCallback((complete: boolean) => {
    setState(prev => ({ ...prev, gameComplete: complete }));
  }, []);

  return {
    ...state,
    isLoaded,
    updateScore,
    nextLevel,
    unlockTemplate,
    updatePerfectStreak,
    resetGame,
    setGameComplete,
  };
}
