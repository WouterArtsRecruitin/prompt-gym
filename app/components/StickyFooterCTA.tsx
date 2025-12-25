'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, X, Sparkles } from 'lucide-react';

interface StickyFooterCTAProps {
  variant?: 'workshop' | 'game';
}

export function StickyFooterCTA({ variant = 'game' }: StickyFooterCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if dismissed this session
    const dismissed = sessionStorage.getItem('sticky-cta-dismissed');
    if (dismissed) {
      setIsDismissed(true);
      return;
    }

    // Show after scroll or delay
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      }
    };

    // Also show after 10 seconds regardless
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10000);

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem('sticky-cta-dismissed', 'true');
  };

  if (isDismissed || !isVisible) return null;

  if (variant === 'workshop') {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-[#1c1c23] to-[#24242d] border-t border-white/10 p-4 animate-slideUp">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex w-12 h-12 bg-[#f5a623]/20 rounded-xl items-center justify-center">
              <Sparkles className="w-6 h-6 text-[#f5a623]" />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-white font-bold">Klaar om AI te masteren?</p>
              <p className="text-sm text-[#9a9a9f]">Volgende workshop: <span className="text-[#f5a623]">15 januari</span> — Nog 6 plekken</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#signup"
              className="bg-[#f5a623] hover:bg-[#e09620] text-[#0f0f12] px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all hover:-translate-y-0.5"
            >
              Meld je aan
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={handleDismiss}
              className="p-2 text-[#6a6a70] hover:text-white hover:bg-white/10 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <style jsx>{`
          @keyframes slideUp {
            from {
              transform: translateY(100%);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          .animate-slideUp {
            animation: slideUp 0.4s ease-out;
          }
        `}</style>
      </div>
    );
  }

  // Game variant
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-orange-500 to-orange-600 p-4 animate-slideUp shadow-lg">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left text-white">
          <p className="font-bold">Wil je meer? Volg de complete workshop!</p>
          <p className="text-sm text-white/80">20+ templates, live training, Q&A met expert</p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/workshop"
            className="bg-white text-orange-600 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-orange-50 transition-all hover:-translate-y-0.5"
          >
            Bekijk Workshop
            <ArrowRight className="w-4 h-4" />
          </a>
          <button
            onClick={handleDismiss}
            className="p-2 text-white/70 hover:text-white hover:bg-white/20 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}
