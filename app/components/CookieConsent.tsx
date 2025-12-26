'use client';

import React, { useState, useEffect } from 'react';
import { X, Cookie, Shield } from 'lucide-react';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Check if consent was already given
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Small delay to not show immediately on page load
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('cookie-consent', JSON.stringify({
      necessary: true,
      analytics: true,
      timestamp: new Date().toISOString(),
    }));
    setIsVisible(false);
    // Reload to enable analytics
    window.location.reload();
  };

  const handleAcceptNecessary = () => {
    localStorage.setItem('cookie-consent', JSON.stringify({
      necessary: true,
      analytics: false,
      timestamp: new Date().toISOString(),
    }));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] p-4 sm:p-6 animate-slideUp">
      <div className="max-w-4xl mx-auto bg-[#1c1c23] border border-white/[0.1] rounded-2xl shadow-2xl shadow-black/50 overflow-hidden">
        {/* Gradient top line */}
        <div className="h-1 bg-gradient-to-r from-[#f5a623] to-orange-500" />

        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-[#f5a623]/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Cookie className="w-6 h-6 text-[#f5a623]" />
            </div>

            <div className="flex-1">
              <h3 className="font-bold text-lg text-white mb-2">
                We respecteren je privacy
              </h3>
              <p className="text-[#9a9a9f] text-sm leading-relaxed mb-4">
                We gebruiken cookies om je een betere ervaring te bieden en om te begrijpen hoe je onze site gebruikt.
                {' '}
                <a href="/privacy" className="text-[#f5a623] hover:underline">
                  Lees ons privacy statement
                </a>
              </p>

              {showDetails && (
                <div className="bg-[#24242d] rounded-xl p-4 mb-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-500/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Shield className="w-3 h-3 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-white">Noodzakelijke cookies</p>
                      <p className="text-xs text-[#6a6a70]">
                        Vereist voor de werking van de website. Slaat je voorkeuren en voortgang op.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-blue-500/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Cookie className="w-3 h-3 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-white">Analytische cookies (optioneel)</p>
                      <p className="text-xs text-[#6a6a70]">
                        Google Analytics 4 met geanonimiseerde IP. Helpt ons begrijpen hoe de site wordt gebruikt.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleAcceptAll}
                  className="bg-[#f5a623] text-[#0f0f12] px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#e09620] transition"
                >
                  Accepteer alles
                </button>
                <button
                  onClick={handleAcceptNecessary}
                  className="bg-[#24242d] text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#2a2a35] transition border border-white/[0.06]"
                >
                  Alleen noodzakelijk
                </button>
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="text-[#9a9a9f] text-sm hover:text-white transition px-3"
                >
                  {showDetails ? 'Minder details' : 'Meer details'}
                </button>
              </div>
            </div>

            <button
              onClick={handleAcceptNecessary}
              className="p-2 hover:bg-white/5 rounded-lg transition flex-shrink-0"
              aria-label="Sluiten"
            >
              <X className="w-5 h-5 text-[#6a6a70]" />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
