'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { X, Download, Mail, CheckCircle, Sparkles } from 'lucide-react';

interface ExitIntentPopupProps {
  onEmailCapture?: (email: string) => void;
}

export function ExitIntentPopup({ onEmailCapture }: ExitIntentPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    // Only trigger when mouse leaves from top of page
    if (e.clientY <= 0 && !hasShown) {
      const dismissed = localStorage.getItem('exit-popup-dismissed');
      const captured = localStorage.getItem('prompt-gym-email-captured');

      if (!dismissed && !captured) {
        setIsVisible(true);
        setHasShown(true);
      }
    }
  }, [hasShown]);

  useEffect(() => {
    // Check if already dismissed or captured
    const dismissed = localStorage.getItem('exit-popup-dismissed');
    const captured = localStorage.getItem('prompt-gym-email-captured');

    if (dismissed || captured) {
      setHasShown(true);
      return;
    }

    // Add delay before enabling exit intent
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 5000); // 5 second delay

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseLeave]);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('exit-popup-dismissed', 'true');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) return;

    // Store email
    localStorage.setItem('prompt-gym-email-captured', email);

    // Send to backend (Pipedrive or your email service)
    try {
      // You can integrate with your email service here
      console.log('Exit intent email captured:', email);
    } catch (error) {
      console.error('Failed to send email:', error);
    }

    setIsSubmitted(true);
    onEmailCapture?.(email);

    // Close after success message
    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-[#1c1c23] border border-white/10 rounded-3xl max-w-lg w-full p-8 shadow-2xl animate-fadeInScale">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition p-2 hover:bg-white/10 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <>
            {/* Icon */}
            <div className="w-16 h-16 bg-gradient-to-br from-[#f5a623] to-[#e09620] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#f5a623]/20">
              <Download className="w-8 h-8 text-[#0f0f12]" />
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-3">
              Wacht! Gratis Cheatsheet
            </h2>

            {/* Description */}
            <p className="text-[#9a9a9f] text-center mb-6 leading-relaxed">
              Download de <span className="text-[#f5a623] font-semibold">AI Prompt Cheatsheet voor Recruiters</span> met de 10 beste prompts die je direct kunt gebruiken.
            </p>

            {/* Benefits */}
            <div className="bg-[#24242d] rounded-xl p-4 mb-6 space-y-2">
              <div className="flex items-center gap-3 text-sm text-[#f0ede8]">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>CV screening prompt die 3x sneller werkt</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#f0ede8]">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>Vacaturetekst generator met SEO tips</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#f0ede8]">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>Boolean search strings voor LinkedIn</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6a6a70]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jouw@email.nl"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-[#24242d] border border-white/10 rounded-xl text-white placeholder-[#6a6a70] focus:border-[#f5a623] focus:ring-2 focus:ring-[#f5a623]/20 focus:outline-none transition"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#f5a623] to-[#e09620] text-[#0f0f12] py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#f5a623]/20 hover:-translate-y-0.5 transition-all"
              >
                <Sparkles className="w-5 h-5" />
                Download Gratis Cheatsheet
              </button>
            </form>

            <p className="text-xs text-[#6a6a70] text-center mt-4">
              We respecteren je privacy. Geen spam, alleen waarde.
            </p>
          </>
        ) : (
          /* Success State */
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              Check je inbox!
            </h3>
            <p className="text-[#9a9a9f]">
              De cheatsheet is onderweg naar {email}
            </p>
          </div>
        )}

        {/* Decorative gradient */}
        <div className="absolute top-0 left-10 right-10 h-0.5 bg-gradient-to-r from-transparent via-[#f5a623] to-transparent" />
      </div>

      <style jsx>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeInScale {
          animation: fadeInScale 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
