'use client';

import React, { useState, useEffect } from 'react';
import {
  ArrowRight, Play, BookOpen, GraduationCap, Star,
  Users, Clock, CheckCircle, Zap, Award, TrendingUp,
  ChevronRight, Sparkles
} from 'lucide-react';
import { ExitIntentPopup } from './components/ExitIntentPopup';
import { ClientLogos } from './components/SocialProofBar';

export default function HomePage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [stats, setStats] = useState({ players: 847, workshops: 52, rating: 4.9 });

  // Rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Simulate live stats
  useEffect(() => {
    const timer = setInterval(() => {
      if (Math.random() > 0.7) {
        setStats(prev => ({ ...prev, players: prev.players + 1 }));
      }
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  const products = [
    {
      id: 'game',
      title: 'Prompt Gym',
      subtitle: 'Gratis Starten',
      description: 'Test je AI skills in een interactieve game. Level 1 gratis, daarna email voor meer.',
      price: 'Gratis',
      priceNote: 'Level 1',
      href: '/game',
      icon: Play,
      color: 'from-green-500 to-emerald-600',
      features: [
        'Level 1 gratis',
        'Directe feedback',
        'Email voor level 2-3',
        '15 minuten'
      ],
      cta: 'Start Level 1',
      popular: false
    },
    {
      id: 'workshop',
      title: 'Live Workshop',
      subtitle: 'Meest Gekozen',
      description: 'Word een AI-powered recruiter in 2 uur. Live training met expert en 20+ templates.',
      price: '€297',
      priceNote: 'Eenmalig',
      href: '/workshop',
      icon: BookOpen,
      color: 'from-[#f5a623] to-orange-500',
      features: [
        '2 uur live training',
        '20+ prompt templates',
        'Live Q&A met expert',
        'Certificaat'
      ],
      cta: 'Bekijk Workshop',
      popular: true
    },
    {
      id: 'academy',
      title: 'AI Academy',
      subtitle: 'Voor Teams',
      description: 'Doorlopende training met wekelijkse lessen, community en nieuwe content.',
      price: '€47',
      priceNote: '/maand',
      href: '/academy',
      icon: GraduationCap,
      color: 'from-purple-500 to-violet-600',
      features: [
        'Wekelijkse video\'s',
        '50+ templates',
        'Slack community',
        'Maandelijkse Q&A'
      ],
      cta: 'Word Lid',
      popular: false
    }
  ];

  const testimonials = [
    {
      text: "Na de workshop screen ik CV's 3x zo snel. De templates zijn goud waard.",
      name: 'Lisa de Vries',
      role: 'Senior Recruiter',
      product: 'Workshop'
    },
    {
      text: "De Prompt Gym was de perfecte start. Daarna direct de workshop geboekt.",
      name: 'Mark Janssen',
      role: 'HR Manager',
      product: 'Prompt Gym → Workshop'
    },
    {
      text: "Mijn hele team zit nu in de Academy. Elke week leren we iets nieuws.",
      name: 'Sophie Bakker',
      role: 'Talent Acquisition Lead',
      product: 'AI Academy'
    }
  ];

  const useCases = [
    { icon: '📄', title: 'CV Screening', desc: '3x sneller screenen met AI' },
    { icon: '✍️', title: 'Vacatureteksten', desc: 'Teksten die converteren' },
    { icon: '🔍', title: 'Sourcing', desc: 'Vind kandidaten sneller' },
    { icon: '💬', title: 'Outreach', desc: 'Berichten die werken' },
  ];

  return (
    <div className="min-h-screen bg-[#0f0f12] text-[#f0ede8] font-sans">
      {/* Exit Intent */}
      <ExitIntentPopup />

      {/* Gradient orbs */}
      <div className="fixed -top-[300px] -right-[200px] w-[700px] h-[700px] bg-[#f5a623]/[0.08] rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[20%] -left-[200px] w-[600px] h-[600px] bg-purple-500/[0.06] rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed top-[40%] right-[10%] w-[400px] h-[400px] bg-green-500/[0.04] rounded-full blur-[100px] pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0f0f12]/85 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/" className="font-bold text-xl hover:text-[#f5a623] transition">
            recruitin
          </a>
          <div className="hidden md:flex items-center gap-8">
            <a href="/game" className="text-sm text-[#9a9a9f] hover:text-white transition">Prompt Gym</a>
            <a href="/workshop" className="text-sm text-[#9a9a9f] hover:text-white transition">Workshop</a>
            <a href="/academy" className="text-sm text-[#9a9a9f] hover:text-white transition">Academy</a>
          </div>
          <a href="/game" className="bg-[#f5a623] text-[#0f0f12] px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#e09620] transition">
            Start Gratis
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            {/* Live badge */}
            <div className="inline-flex items-center gap-2 bg-[#1c1c23] border border-white/[0.06] px-4 py-2 rounded-full text-sm text-[#9a9a9f] mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              {stats.players}+ recruiters getraind
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
              Word een{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f5a623] to-orange-400">
                AI-Powered
              </span>
              {' '}Recruiter
            </h1>

            <p className="text-lg sm:text-xl text-[#9a9a9f] mb-10 leading-relaxed max-w-2xl mx-auto">
              Leer AI effectief inzetten voor CV screening, vacatureteksten en sourcing.
              Van gratis game tot complete training.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a href="/game" className="bg-[#f5a623] text-[#0f0f12] px-8 py-4 rounded-xl font-bold text-lg inline-flex items-center justify-center gap-2 hover:bg-[#e09620] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#f5a623]/20 transition-all">
                <Play className="w-5 h-5" />
                Probeer Gratis
              </a>
              <a href="#products" className="border border-white/[0.06] text-[#f0ede8] px-8 py-4 rounded-xl font-semibold hover:border-white/[0.12] hover:bg-[#1c1c23] transition-all inline-flex items-center justify-center gap-2">
                Bekijk Alle Trainingen
                <ChevronRight className="w-5 h-5" />
              </a>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-[#6a6a70]">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span>{stats.rating}/5 rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{stats.players}+ recruiters</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>{stats.workshops} workshops gegeven</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Strip */}
      <section className="py-12 border-y border-white/[0.06] bg-[#16161b]/50">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {useCases.map((uc, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl mb-2">{uc.icon}</div>
                <h3 className="font-semibold mb-1">{uc.title}</h3>
                <p className="text-sm text-[#6a6a70]">{uc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-mono text-sm text-[#f5a623] uppercase tracking-widest mb-4">Kies je pad</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Van beginner tot AI expert
            </h2>
            <p className="text-[#9a9a9f] max-w-xl mx-auto">
              Start gratis met de Prompt Gym, of duik direct in onze trainingen.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className={`relative bg-[#1c1c23] border rounded-2xl overflow-hidden transition-all hover:-translate-y-1 ${
                  product.popular
                    ? 'border-[#f5a623] shadow-lg shadow-[#f5a623]/10'
                    : 'border-white/[0.06] hover:border-white/[0.12]'
                }`}
              >
                {product.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-[#f5a623] to-orange-500 text-[#0f0f12] text-center text-xs font-bold py-1.5">
                    MEEST GEKOZEN
                  </div>
                )}

                <div className={`p-8 ${product.popular ? 'pt-12' : ''}`}>
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${product.color} flex items-center justify-center mb-6`}>
                    <product.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Title */}
                  <p className="text-sm text-[#6a6a70] mb-1">{product.subtitle}</p>
                  <h3 className="text-2xl font-bold mb-3">{product.title}</h3>
                  <p className="text-[#9a9a9f] text-sm leading-relaxed mb-6">
                    {product.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-3xl font-extrabold">{product.price}</span>
                    <span className="text-[#6a6a70] text-sm">{product.priceNote}</span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-[#9a9a9f]">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href={product.href}
                    className={`block w-full py-3.5 rounded-xl font-semibold text-center transition-all ${
                      product.popular
                        ? 'bg-[#f5a623] text-[#0f0f12] hover:bg-[#e09620]'
                        : 'bg-[#24242d] text-white hover:bg-[#2a2a35]'
                    }`}
                  >
                    {product.cta}
                    <ArrowRight className="w-4 h-4 inline-block ml-2" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <ClientLogos />

      {/* How It Works */}
      <section className="py-24 bg-[#16161b] border-y border-white/[0.06]">
        <div className="max-w-[900px] mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-mono text-sm text-[#f5a623] uppercase tracking-widest mb-4">Hoe het werkt</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Jouw pad naar AI mastery
            </h2>
          </div>

          <div className="relative">
            {/* Connection line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 via-[#f5a623] to-purple-500 hidden md:block" />

            <div className="space-y-12">
              {/* Step 1 */}
              <div className="flex gap-8 items-start">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 relative z-10">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Start met de Prompt Gym</h3>
                  <p className="text-[#9a9a9f] mb-3">
                    Leer de basics in 15 minuten. Gratis, interactief, en je krijgt direct bruikbare templates.
                  </p>
                  <a href="/game" className="text-green-500 font-medium text-sm inline-flex items-center gap-1 hover:underline">
                    Start nu gratis <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-8 items-start">
                <div className="w-12 h-12 bg-[#f5a623] rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 relative z-10 text-[#0f0f12]">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Volg de Live Workshop</h3>
                  <p className="text-[#9a9a9f] mb-3">
                    Verdiep je kennis in 2 uur. Live training, 20+ templates, en directe Q&A met een expert.
                  </p>
                  <a href="/workshop" className="text-[#f5a623] font-medium text-sm inline-flex items-center gap-1 hover:underline">
                    Bekijk workshop details <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-8 items-start">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 relative z-10">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Blijf Leren met de Academy</h3>
                  <p className="text-[#9a9a9f] mb-3">
                    Wekelijks nieuwe content, community support, en altijd up-to-date met de laatste AI tools.
                  </p>
                  <a href="/academy" className="text-purple-400 font-medium text-sm inline-flex items-center gap-1 hover:underline">
                    Word lid van de Academy <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-24">
        <div className="max-w-[800px] mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-mono text-sm text-[#f5a623] uppercase tracking-widest mb-4">Ervaringen</p>
            <h2 className="text-3xl font-extrabold tracking-tight">
              Wat recruiters zeggen
            </h2>
          </div>

          <div className="bg-[#1c1c23] border border-white/[0.06] rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-[#f5a623] to-purple-500" />

            <Sparkles className="w-8 h-8 text-[#f5a623] mx-auto mb-6" />

            <p className="text-xl md:text-2xl font-medium mb-8 leading-relaxed">
              "{testimonials[activeTestimonial].text}"
            </p>

            <div className="mb-6">
              <p className="font-semibold">{testimonials[activeTestimonial].name}</p>
              <p className="text-sm text-[#6a6a70]">{testimonials[activeTestimonial].role}</p>
              <p className="text-xs text-[#f5a623] mt-1">{testimonials[activeTestimonial].product}</p>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === activeTestimonial ? 'bg-[#f5a623] w-6' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-b from-[#16161b] to-[#0f0f12]">
        <div className="max-w-[600px] mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            Start in minder dan 1 minuut
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            Klaar om AI te masteren?
          </h2>
          <p className="text-[#9a9a9f] text-lg mb-8">
            Begin vandaag nog met de gratis Prompt Gym en ontdek hoeveel tijd je kunt besparen.
          </p>

          <a href="/game" className="bg-[#f5a623] text-[#0f0f12] px-10 py-4 rounded-xl font-bold text-lg inline-flex items-center gap-2 hover:bg-[#e09620] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#f5a623]/20 transition-all">
            <Play className="w-5 h-5" />
            Start Level 1 Gratis
          </a>

          <p className="text-sm text-[#6a6a70] mt-4">
            Direct starten • Level 1 gratis • Email voor meer
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">recruitin</h3>
              <p className="text-sm text-[#6a6a70] leading-relaxed">
                AI training voor recruiters. Van beginner tot expert.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Producten</h4>
              <ul className="space-y-2 text-sm text-[#6a6a70]">
                <li><a href="/game" className="hover:text-white transition">Prompt Gym</a></li>
                <li><a href="/workshop" className="hover:text-white transition">Workshop</a></li>
                <li><a href="/academy" className="hover:text-white transition">AI Academy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-[#6a6a70]">
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Templates</a></li>
                <li><a href="#" className="hover:text-white transition">AI Tools Vergelijking</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-[#6a6a70]">
                <li><a href="mailto:info@recruitin.nl" className="hover:text-white transition">info@recruitin.nl</a></li>
                <li><a href="#" className="hover:text-white transition">LinkedIn</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[#6a6a70]">© 2025 Recruitin B.V.</p>
            <div className="flex gap-6 text-sm text-[#6a6a70]">
              <a href="#" className="hover:text-white transition">Privacy</a>
              <a href="#" className="hover:text-white transition">Voorwaarden</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
