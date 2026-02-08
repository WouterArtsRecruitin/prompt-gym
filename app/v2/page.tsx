'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight, Play, BookOpen, Star,
  Users, CheckCircle, Zap, Award,
  ChevronRight, Sparkles, Brain,
  FileText, Search, MessageSquare,
  Target, Shield, BarChart3, Cpu,
  Mail, Send
} from 'lucide-react';

// ─── Animated Floating Orbs Component ────────────────────────────────────────
function FloatingOrbs({ variant = 'hero' }: { variant?: 'hero' | 'stats' | 'features' | 'newsletter' | 'footer' }) {
  const configs: Record<string, { orbs: Array<{ size: string; color: string; position: string; animation: string; blur: string }> }> = {
    hero: {
      orbs: [
        { size: 'w-[500px] h-[500px]', color: 'bg-gradient-to-br from-cyan-400/30 to-blue-600/20', position: 'top-[-100px] right-[-100px]', animation: 'animate-float-slow', blur: 'blur-[2px]' },
        { size: 'w-[350px] h-[350px]', color: 'bg-gradient-to-br from-blue-500/25 to-indigo-600/15', position: 'top-[200px] right-[150px]', animation: 'animate-float-medium', blur: 'blur-[1px]' },
        { size: 'w-[200px] h-[200px]', color: 'bg-gradient-to-br from-cyan-300/35 to-teal-500/20', position: 'top-[50px] right-[350px]', animation: 'animate-float-fast', blur: 'blur-[0.5px]' },
        { size: 'w-[120px] h-[120px]', color: 'bg-gradient-to-br from-orange-400/30 to-amber-500/20', position: 'bottom-[100px] right-[50px]', animation: 'animate-float-reverse', blur: '' },
        { size: 'w-[80px] h-[80px]', color: 'bg-gradient-to-br from-blue-400/40 to-cyan-500/25', position: 'top-[350px] right-[400px]', animation: 'animate-float-slow-reverse', blur: '' },
      ]
    },
    stats: {
      orbs: [
        { size: 'w-[400px] h-[400px]', color: 'bg-gradient-to-br from-blue-500/20 to-indigo-600/10', position: 'top-[-150px] left-[-100px]', animation: 'animate-float-medium', blur: 'blur-[2px]' },
        { size: 'w-[300px] h-[300px]', color: 'bg-gradient-to-br from-cyan-400/25 to-blue-500/15', position: 'bottom-[-100px] right-[-50px]', animation: 'animate-float-slow', blur: 'blur-[1px]' },
        { size: 'w-[150px] h-[150px]', color: 'bg-gradient-to-br from-orange-400/25 to-yellow-500/15', position: 'top-[50px] right-[200px]', animation: 'animate-float-fast', blur: '' },
      ]
    },
    features: {
      orbs: [
        { size: 'w-[450px] h-[450px]', color: 'bg-gradient-to-br from-indigo-500/20 to-purple-600/10', position: 'top-[-200px] right-[-150px]', animation: 'animate-float-slow-reverse', blur: 'blur-[3px]' },
        { size: 'w-[250px] h-[250px]', color: 'bg-gradient-to-br from-cyan-400/20 to-teal-500/10', position: 'bottom-[50px] left-[-80px]', animation: 'animate-float-medium', blur: 'blur-[1px]' },
        { size: 'w-[100px] h-[100px]', color: 'bg-gradient-to-br from-blue-400/30 to-cyan-500/20', position: 'top-[200px] left-[300px]', animation: 'animate-float-fast', blur: '' },
      ]
    },
    newsletter: {
      orbs: [
        { size: 'w-[350px] h-[350px]', color: 'bg-gradient-to-br from-cyan-400/30 to-blue-500/20', position: 'top-[-100px] left-[-50px]', animation: 'animate-float-slow', blur: 'blur-[2px]' },
        { size: 'w-[250px] h-[250px]', color: 'bg-gradient-to-br from-orange-400/25 to-amber-500/15', position: 'bottom-[-80px] right-[-30px]', animation: 'animate-float-medium', blur: 'blur-[1px]' },
        { size: 'w-[180px] h-[180px]', color: 'bg-gradient-to-br from-blue-500/25 to-indigo-500/15', position: 'top-[50px] right-[100px]', animation: 'animate-float-reverse', blur: '' },
      ]
    },
    footer: {
      orbs: [
        { size: 'w-[300px] h-[300px]', color: 'bg-gradient-to-br from-blue-500/10 to-indigo-600/5', position: 'top-[-150px] right-[20%]', animation: 'animate-float-slow', blur: 'blur-[3px]' },
        { size: 'w-[200px] h-[200px]', color: 'bg-gradient-to-br from-cyan-400/10 to-teal-500/5', position: 'bottom-[-100px] left-[10%]', animation: 'animate-float-medium', blur: 'blur-[2px]' },
      ]
    }
  };

  const config = configs[variant] || configs.hero;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {config.orbs.map((orb, i) => (
        <div
          key={i}
          className={`absolute rounded-full ${orb.size} ${orb.color} ${orb.position} ${orb.animation} ${orb.blur}`}
          style={{
            boxShadow: 'inset 0 0 60px rgba(255,255,255,0.05), 0 0 80px rgba(0,200,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        />
      ))}
    </div>
  );
}

// ─── Live Ticker Component ───────────────────────────────────────────────────
function LiveTicker() {
  const items = [
    'AI CV Screening - 3x sneller resultaat',
    'Vacaturetekst Generator - Direct betere teksten',
    'Boolean Search Builder - Vind de beste kandidaten',
    'Outreach Templates - Hogere response rates',
    'Prompt Gym Level 1 - 847+ recruiters getraind',
    'Live Workshop - Volgende sessie binnenkort',
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10 border-y border-white/[0.06] py-3">
      <div className="flex animate-ticker whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 mx-8 text-sm text-[#9a9a9f]">
            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Main V2 Page ────────────────────────────────────────────────────────────
export default function HomePageV2() {
  const [email, setEmail] = useState('');
  const [stats] = useState({ players: 847, workshops: 52, rating: 4.9, templates: 20 });
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    { icon: Brain, title: 'Multi-Level AI Training', desc: 'Stapsgewijs leren van de basis tot geavanceerde prompt engineering technieken.' },
    { icon: Cpu, title: 'Real-Time Prompt Analyse', desc: 'Directe feedback op je prompts met een geavanceerd scoring systeem.' },
    { icon: Target, title: 'Recruitment-Specifieke Scenarios', desc: 'Praktijkgerichte oefeningen voor CV screening, sourcing en outreach.' },
    { icon: Shield, title: 'Best Practices Framework', desc: 'Bewezen methodologie gebaseerd op de 4 pijlers: Rol, Taak, Context, Format.' },
    { icon: BarChart3, title: 'Voortgang & Analytics', desc: 'Track je groei met gedetailleerde scores en voortgangsindicatoren.' },
    { icon: FileText, title: 'Template Bibliotheek', desc: '20+ kant-en-klare templates die je direct kunt inzetten.' },
  ];

  const components = [
    'Interactieve Prompt Training Game',
    'Geavanceerde Rubric-Based Scoring',
    'AI-Powered Feedback Systeem',
    'Recruitment Template Generator',
    'Live Expert Workshop Module',
    'Progressie & Certificering Systeem',
  ];

  return (
    <div className="min-h-screen bg-[#080810] text-[#f0ede8] font-sans relative">
      {/* Global Styles for animations */}
      <style jsx global>{`
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(15px, -25px) scale(1.02); }
          50% { transform: translate(-10px, -40px) scale(0.98); }
          75% { transform: translate(20px, -15px) scale(1.01); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-20px, 20px) scale(1.03); }
          66% { transform: translate(15px, -30px) scale(0.97); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(-15px, 15px) scale(1.05); }
          50% { transform: translate(20px, -10px) scale(0.95); }
          75% { transform: translate(-10px, -20px) scale(1.02); }
        }
        @keyframes float-reverse {
          0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
          25% { transform: translate(25px, 15px) rotate(5deg) scale(1.03); }
          50% { transform: translate(-15px, 30px) rotate(-3deg) scale(0.98); }
          75% { transform: translate(10px, -10px) rotate(2deg) scale(1.01); }
        }
        @keyframes float-slow-reverse {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, 20px) scale(1.04); }
          66% { transform: translate(-20px, -25px) scale(0.96); }
        }
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(0, 200, 255, 0.1); }
          50% { box-shadow: 0 0 40px rgba(0, 200, 255, 0.25); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .animate-float-slow { animation: float-slow 12s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 8s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 6s ease-in-out infinite; }
        .animate-float-reverse { animation: float-reverse 10s ease-in-out infinite; }
        .animate-float-slow-reverse { animation: float-slow-reverse 14s ease-in-out infinite; }
        .animate-ticker { animation: ticker 30s linear infinite; }
        .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
        .shimmer-text {
          background: linear-gradient(90deg, #f0ede8 0%, #00d4ff 25%, #f0ede8 50%, #f5a623 75%, #f0ede8 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 6s linear infinite;
        }
        .glass-card {
          background: rgba(15, 15, 25, 0.6);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .glass-card-light {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.06);
        }
      `}</style>

      {/* ─── Navigation ──────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#080810]/80 backdrop-blur-2xl border-b border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/v2" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg">
              <span className="text-white">recruitin</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-[#9a9a9f] hover:text-cyan-400 transition">Platform</a>
            <a href="#stats" className="text-sm text-[#9a9a9f] hover:text-cyan-400 transition">Resultaten</a>
            <a href="/game" className="text-sm text-[#9a9a9f] hover:text-cyan-400 transition">Prompt Gym</a>
            <a href="/workshop" className="text-sm text-[#9a9a9f] hover:text-cyan-400 transition">Workshop</a>
          </div>

          <a href="/game" className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:shadow-lg hover:shadow-cyan-500/25 transition-all">
            Start Gratis
          </a>
        </div>
      </nav>

      {/* ─── Hero Section ────────────────────────────────────────────────── */}
      <section className="pt-32 pb-24 relative min-h-[90vh] flex items-center">
        <FloatingOrbs variant="hero" />

        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text */}
            <div>
              <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full text-sm text-cyan-400 mb-8">
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                EXPERIENCE THE POWER OF AI
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-6 tracking-tight">
                <span className="text-white">AI-Powered</span><br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Recruitment</span><br />
                <span className="text-white">Training</span>
              </h1>

              <p className="text-lg text-[#9a9a9f] mb-10 leading-relaxed max-w-lg">
                Leer AI effectief inzetten voor recruitment. Interactieve training,
                directe feedback, en kant-en-klare templates voor CV screening,
                vacatureteksten en sourcing.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <a
                  href="/game"
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg inline-flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-cyan-500/25 hover:-translate-y-0.5 transition-all"
                >
                  <Play className="w-5 h-5" />
                  Start Gratis
                </a>
                <a
                  href="/workshop"
                  className="glass-card text-[#f0ede8] px-8 py-4 rounded-xl font-semibold hover:bg-white/[0.08] transition-all inline-flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-5 h-5 text-cyan-400" />
                  Bekijk Workshop
                </a>
              </div>

              <p className="text-xs text-[#6a6a70]">
                *Al {stats.players}+ recruiters getraind. Geen creditcard nodig.
              </p>
            </div>

            {/* Right: Glass orb visual (purely CSS) */}
            <div className="hidden lg:flex items-center justify-center relative">
              <div className="relative w-[450px] h-[450px]">
                {/* Main orb */}
                <div
                  className="absolute inset-0 rounded-full animate-float-slow animate-pulse-glow"
                  style={{
                    background: 'radial-gradient(circle at 30% 30%, rgba(0, 200, 255, 0.3), rgba(59, 130, 246, 0.15), rgba(15, 15, 25, 0.5))',
                    border: '1px solid rgba(0, 200, 255, 0.15)',
                    boxShadow: 'inset 0 0 80px rgba(0, 200, 255, 0.1), 0 0 60px rgba(0, 200, 255, 0.08)',
                  }}
                />
                {/* Secondary orb */}
                <div
                  className="absolute w-[250px] h-[250px] rounded-full top-[-30px] right-[-40px] animate-float-medium"
                  style={{
                    background: 'radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.35), rgba(99, 102, 241, 0.15), transparent)',
                    border: '1px solid rgba(59, 130, 246, 0.12)',
                    boxShadow: 'inset 0 0 40px rgba(59, 130, 246, 0.08)',
                  }}
                />
                {/* Small orb */}
                <div
                  className="absolute w-[120px] h-[120px] rounded-full bottom-[20px] left-[-30px] animate-float-fast"
                  style={{
                    background: 'radial-gradient(circle at 35% 35%, rgba(0, 200, 255, 0.4), rgba(6, 182, 212, 0.15), transparent)',
                    border: '1px solid rgba(0, 200, 255, 0.15)',
                  }}
                />
                {/* Tiny accent orb */}
                <div
                  className="absolute w-[60px] h-[60px] rounded-full top-[180px] right-[-60px] animate-float-reverse"
                  style={{
                    background: 'radial-gradient(circle at 35% 35%, rgba(245, 166, 35, 0.5), rgba(245, 166, 35, 0.15), transparent)',
                    border: '1px solid rgba(245, 166, 35, 0.2)',
                  }}
                />
                {/* Center content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-cyan-200/60">
                      AI
                    </div>
                    <div className="text-sm text-cyan-400/80 font-mono tracking-widest mt-1">
                      PROMPT GYM
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Live Ticker ─────────────────────────────────────────────────── */}
      <LiveTicker />

      {/* ─── Stats Section ───────────────────────────────────────────────── */}
      <section id="stats" className="py-24 relative">
        <FloatingOrbs variant="stats" />

        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text + Stats */}
            <div>
              <p className="font-mono text-sm text-cyan-400 uppercase tracking-widest mb-4">Prompt Gym Resultaten</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
                Bewezen Impact voor Recruiters
              </h2>
              <p className="text-[#9a9a9f] mb-10 max-w-lg">
                De Prompt Gym helpt recruiters om AI effectief in te zetten.
                Van snellere CV screening tot betere vacatureteksten - de resultaten spreken voor zich.
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                    {stats.players}+
                  </div>
                  <div className="text-xs text-[#6a6a70] mt-1">Recruiters Getraind</div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                    3x
                  </div>
                  <div className="text-xs text-[#6a6a70] mt-1">Sneller Screenen</div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                    {stats.templates}+
                  </div>
                  <div className="text-xs text-[#6a6a70] mt-1">Prompt Templates</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-orange-400">
                    {stats.rating}
                  </div>
                  <div className="text-xs text-[#6a6a70] mt-1">Gemiddelde Rating</div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-orange-400">
                    {stats.workshops}
                  </div>
                  <div className="text-xs text-[#6a6a70] mt-1">Workshops Gegeven</div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-orange-400">
                    15min
                  </div>
                  <div className="text-xs text-[#6a6a70] mt-1">Training Tijd</div>
                </div>
              </div>
            </div>

            {/* Right: Visual orb composition */}
            <div className="hidden lg:flex items-center justify-center relative">
              <div className="relative w-[400px] h-[400px]">
                <div
                  className="absolute w-[320px] h-[320px] rounded-full top-[40px] left-[40px] animate-float-medium"
                  style={{
                    background: 'radial-gradient(circle at 40% 35%, rgba(0, 200, 255, 0.25), rgba(59, 130, 246, 0.1), transparent)',
                    border: '1px solid rgba(0, 200, 255, 0.1)',
                    boxShadow: 'inset 0 0 60px rgba(0, 200, 255, 0.06)',
                  }}
                />
                <div
                  className="absolute w-[200px] h-[200px] rounded-full top-[-20px] right-[20px] animate-float-slow"
                  style={{
                    background: 'radial-gradient(circle at 35% 35%, rgba(59, 130, 246, 0.3), rgba(99, 102, 241, 0.1), transparent)',
                    border: '1px solid rgba(59, 130, 246, 0.1)',
                  }}
                />
                <div
                  className="absolute w-[100px] h-[100px] rounded-full bottom-[30px] left-[10px] animate-float-fast"
                  style={{
                    background: 'radial-gradient(circle at 35% 35%, rgba(245, 166, 35, 0.35), rgba(245, 166, 35, 0.1), transparent)',
                    border: '1px solid rgba(245, 166, 35, 0.15)',
                  }}
                />
                <div
                  className="absolute w-[60px] h-[60px] rounded-full top-[60px] left-[20px] animate-float-reverse"
                  style={{
                    background: 'radial-gradient(circle at 35% 35%, rgba(0, 200, 255, 0.4), transparent)',
                    border: '1px solid rgba(0, 200, 255, 0.12)',
                  }}
                />

                {/* Stats overlay card */}
                <div className="absolute bottom-[60px] right-[-20px] glass-card rounded-2xl p-5 animate-float-slow-reverse">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                      <BarChart3 className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-semibold">Live Resultaten</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#9a9a9f]">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    {stats.players} actieve gebruikers
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Structure / Components Section ──────────────────────────────── */}
      <section id="features" className="py-24 relative border-t border-white/[0.04]">
        <FloatingOrbs variant="features" />

        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left: Orb visual */}
            <div className="hidden lg:flex items-center justify-center relative min-h-[500px]">
              <div className="relative w-full h-[500px]">
                <div
                  className="absolute w-[380px] h-[380px] rounded-full top-[60px] left-[20px] animate-float-slow"
                  style={{
                    background: 'radial-gradient(circle at 30% 30%, rgba(99, 102, 241, 0.25), rgba(59, 130, 246, 0.1), transparent)',
                    border: '1px solid rgba(99, 102, 241, 0.1)',
                    boxShadow: 'inset 0 0 80px rgba(99, 102, 241, 0.06)',
                  }}
                />
                <div
                  className="absolute w-[180px] h-[180px] rounded-full bottom-[40px] right-[80px] animate-float-medium"
                  style={{
                    background: 'radial-gradient(circle at 35% 35%, rgba(0, 200, 255, 0.3), rgba(6, 182, 212, 0.1), transparent)',
                    border: '1px solid rgba(0, 200, 255, 0.12)',
                  }}
                />
                <div
                  className="absolute w-[80px] h-[80px] rounded-full top-[30px] right-[120px] animate-float-fast"
                  style={{
                    background: 'radial-gradient(circle at 35% 35%, rgba(59, 130, 246, 0.4), transparent)',
                    border: '1px solid rgba(59, 130, 246, 0.15)',
                  }}
                />
                <div
                  className="absolute w-[50px] h-[50px] rounded-full bottom-[120px] left-[60px] animate-float-reverse"
                  style={{
                    background: 'radial-gradient(circle at 35% 35%, rgba(245, 166, 35, 0.4), transparent)',
                    border: '1px solid rgba(245, 166, 35, 0.2)',
                  }}
                />
              </div>
            </div>

            {/* Right: Components list */}
            <div>
              <p className="font-mono text-sm text-cyan-400 uppercase tracking-widest mb-4">Platform Architectuur</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
                De Prompt Gym is opgebouwd uit krachtige componenten
              </h2>
              <p className="text-[#9a9a9f] mb-10">
                Een doordacht framework dat de volgende kernonderdelen samenbrengt:
              </p>

              <div className="space-y-0">
                {components.map((comp, i) => (
                  <div
                    key={i}
                    className="group flex items-center gap-4 py-4 border-b border-white/[0.06] hover:border-cyan-400/20 transition-all cursor-default"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-500/10 border border-cyan-400/20 flex items-center justify-center flex-shrink-0 group-hover:from-cyan-400/40 group-hover:to-blue-500/20 transition-all">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                    </div>
                    <span className="text-[#c0c0c5] group-hover:text-white transition-colors font-medium">
                      {comp}
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#6a6a70] ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Features Grid ───────────────────────────────────────────────── */}
      <section className="py-24 relative border-t border-white/[0.04]">
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <p className="font-mono text-sm text-cyan-400 uppercase tracking-widest mb-4">Wat je leert</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Alles wat je nodig hebt om AI te masteren
            </h2>
            <p className="text-[#9a9a9f] max-w-xl mx-auto">
              Van de eerste prompt tot geavanceerde recruitment workflows.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="glass-card-light rounded-2xl p-6 hover:bg-white/[0.06] hover:border-cyan-400/20 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-600/10 border border-cyan-400/10 flex items-center justify-center mb-5 group-hover:from-cyan-400/30 group-hover:to-blue-600/20 transition-all">
                  <feature.icon className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-cyan-300 transition-colors">{feature.title}</h3>
                <p className="text-sm text-[#9a9a9f] leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Products / Pricing ──────────────────────────────────────────── */}
      <section className="py-24 relative border-t border-white/[0.04]">
        <div className="max-w-[900px] mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <p className="font-mono text-sm text-cyan-400 uppercase tracking-widest mb-4">Kies je pad</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Van beginner tot AI expert
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Free - Prompt Gym */}
            <div className="glass-card rounded-2xl p-8 hover:-translate-y-1 transition-all group">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-400/20 to-emerald-600/10 border border-green-400/10 flex items-center justify-center mb-6">
                <Play className="w-7 h-7 text-green-400" />
              </div>
              <p className="text-sm text-[#6a6a70] mb-1">Gratis Starten</p>
              <h3 className="text-2xl font-bold mb-3">Prompt Gym</h3>
              <p className="text-[#9a9a9f] text-sm leading-relaxed mb-6">
                Test je AI skills in een interactieve game. Leer de basis van prompt engineering in 15 minuten.
              </p>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-3xl font-extrabold text-green-400">Gratis</span>
                <span className="text-[#6a6a70] text-sm">Level 1</span>
              </div>
              <ul className="space-y-3 mb-8">
                {['Level 1 gratis spelen', 'Directe feedback op je prompts', '6 kant-en-klare templates', '15 minuten training'].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span className="text-[#9a9a9f]">{f}</span>
                  </li>
                ))}
              </ul>
              <a href="/game" className="block w-full py-3.5 rounded-xl font-semibold text-center transition-all bg-white/[0.06] text-white hover:bg-white/[0.12] border border-white/[0.06]">
                Start Gratis <ArrowRight className="w-4 h-4 inline-block ml-2" />
              </a>
            </div>

            {/* Workshop */}
            <div className="relative glass-card rounded-2xl overflow-hidden hover:-translate-y-1 transition-all group border-cyan-500/30">
              <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-center text-xs font-bold py-1.5 tracking-wider">
                MEEST GEKOZEN
              </div>
              <div className="p-8 pt-12">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-600/10 border border-cyan-400/10 flex items-center justify-center mb-6">
                  <BookOpen className="w-7 h-7 text-cyan-400" />
                </div>
                <p className="text-sm text-[#6a6a70] mb-1">Complete Training</p>
                <h3 className="text-2xl font-bold mb-3">Live Workshop</h3>
                <p className="text-[#9a9a9f] text-sm leading-relaxed mb-6">
                  Word een AI-powered recruiter in 2 uur. Live training met expert, 20+ templates en certificaat.
                </p>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">&euro;297</span>
                  <span className="text-[#6a6a70] text-sm">Eenmalig</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {['2 uur live training', '20+ prompt templates', 'Live Q&A met expert', 'Certificaat van deelname'].map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      <span className="text-[#9a9a9f]">{f}</span>
                    </li>
                  ))}
                </ul>
                <a href="/workshop" className="block w-full py-3.5 rounded-xl font-semibold text-center transition-all bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/25">
                  Bekijk Workshop <ArrowRight className="w-4 h-4 inline-block ml-2" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Newsletter / Subscribe Section ──────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <FloatingOrbs variant="newsletter" />

        <div className="max-w-[700px] mx-auto px-6 relative z-10">
          <div className="glass-card rounded-3xl p-10 md:p-14 text-center">
            <p className="font-mono text-sm text-cyan-400 uppercase tracking-widest mb-4">Nieuws | Early Access | Events</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Blijf op de hoogte
            </h2>
            <p className="text-[#9a9a9f] mb-8 max-w-md mx-auto">
              Ontvang de nieuwste AI recruitment tips, nieuwe levels, en workshop data direct in je inbox.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="*Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white/[0.06] border border-white/[0.1] rounded-xl px-5 py-3.5 text-white placeholder-[#6a6a70] focus:border-cyan-400/50 focus:outline-none transition-colors"
              />
              <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all inline-flex items-center justify-center gap-2">
                <Send className="w-4 h-4" />
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Testimonials ────────────────────────────────────────────────── */}
      <section className="py-24 relative border-t border-white/[0.04]">
        <div className="max-w-[1000px] mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <p className="font-mono text-sm text-cyan-400 uppercase tracking-widest mb-4">Ervaringen</p>
            <h2 className="text-3xl font-extrabold tracking-tight">
              Wat recruiters zeggen
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { text: "Na de workshop screen ik CV's 3x zo snel. De templates zijn goud waard.", name: 'Lisa de Vries', role: 'Senior Recruiter' },
              { text: "De Prompt Gym was de perfecte start. Daarna direct de workshop geboekt.", name: 'Mark Janssen', role: 'HR Manager' },
              { text: "Eindelijk begrijp ik hoe AI echt werkt voor recruitment. Heel praktisch!", name: 'Sophie Bakker', role: 'Talent Acquisition Lead' },
            ].map((t, i) => (
              <div key={i} className="glass-card-light rounded-2xl p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-cyan-400 fill-cyan-400" />
                  ))}
                </div>
                <p className="text-sm text-[#c0c0c5] leading-relaxed mb-6">"{t.text}"</p>
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-[#6a6a70]">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Live Ticker (bottom) ────────────────────────────────────────── */}
      <LiveTicker />

      {/* ─── Footer ──────────────────────────────────────────────────────── */}
      <footer className="py-16 relative border-t border-white/[0.04]">
        <FloatingOrbs variant="footer" />

        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="glass-card-light rounded-2xl p-6">
              <h3 className="font-bold mb-3">Privacy & Data</h3>
              <p className="text-xs text-[#6a6a70] leading-relaxed">
                Wij nemen je privacy serieus. Je prompts worden niet opgeslagen.
                Alle data wordt verwerkt conform de AVG/GDPR richtlijnen.
              </p>
            </div>
            <div className="glass-card-light rounded-2xl p-6">
              <h3 className="font-bold mb-3">AI Verantwoordelijkheid</h3>
              <p className="text-xs text-[#6a6a70] leading-relaxed">
                AI is een hulpmiddel, geen vervanging. Controleer altijd de output
                van AI-gegenereerde content en gebruik je professionele oordeel.
              </p>
            </div>
            <div className="glass-card-light rounded-2xl p-6">
              <h3 className="font-bold mb-3">Kwaliteitsgarantie</h3>
              <p className="text-xs text-[#6a6a70] leading-relaxed">
                Onze training is gebaseerd op bewezen prompt engineering methodologie&euml;n
                en wordt continu bijgewerkt met de nieuwste AI-ontwikkelingen.
              </p>
            </div>
          </div>

          {/* Footer Links */}
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                  <Zap className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="font-bold">recruitin</span>
              </div>
              <p className="text-xs text-[#6a6a70] leading-relaxed">
                AI training voor recruiters.<br />
                Van beginner tot expert.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-4">Trainingen</h4>
              <ul className="space-y-2 text-sm text-[#6a6a70]">
                <li><a href="/game" className="hover:text-cyan-400 transition">Prompt Gym (Gratis)</a></li>
                <li><a href="/workshop" className="hover:text-cyan-400 transition">Live Workshop (&euro;297)</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-4">Links</h4>
              <ul className="space-y-2 text-sm text-[#6a6a70]">
                <li><a href="/" className="hover:text-cyan-400 transition">Home (V1)</a></li>
                <li><a href="/v2" className="hover:text-cyan-400 transition">Home (V2)</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-[#6a6a70]">
                <li><a href="mailto:info@recruitin.nl" className="hover:text-cyan-400 transition">info@recruitin.nl</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-[#6a6a70]">&copy; 2025 Recruitin B.V. All rights reserved.</p>
            <div className="flex gap-6 text-xs text-[#6a6a70]">
              <a href="/privacy" className="hover:text-cyan-400 transition">Privacy</a>
              <a href="/voorwaarden" className="hover:text-cyan-400 transition">Voorwaarden</a>
              <a href="/disclaimer" className="hover:text-cyan-400 transition">Disclaimer</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
