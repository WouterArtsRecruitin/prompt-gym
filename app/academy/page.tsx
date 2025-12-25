'use client';

import React, { useState, useEffect } from 'react';
import {
  ArrowRight, CheckCircle, Star, Users, Clock, BookOpen,
  Video, MessageSquare, Award, Zap, Shield, Play,
  Calendar, Download, Mail, ChevronDown, Lock
} from 'lucide-react';
import { ExitIntentPopup } from '../components/ExitIntentPopup';
import { trackEmailSignup } from '../lib/analytics';

export default function AcademyPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [membersCount, setMembersCount] = useState(127);

  // Simulate member count increasing
  useEffect(() => {
    const timer = setInterval(() => {
      setMembersCount(prev => {
        if (Math.random() > 0.8) {
          return prev + 1;
        }
        return prev;
      });
    }, 45000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const PIPEDRIVE_FORM_URL = process.env.NEXT_PUBLIC_PIPEDRIVE_FORM_URL;

    try {
      if (PIPEDRIVE_FORM_URL) {
        const formBody = new FormData();
        formBody.append('email', email);
        formBody.append('source', 'AI Academy Waitlist');
        formBody.append('lead_type', 'academy_waitlist');

        await fetch(PIPEDRIVE_FORM_URL, {
          method: 'POST',
          body: formBody,
          mode: 'no-cors',
        });
      }

      trackEmailSignup('academy_waitlist');
      setIsSubmitted(true);
    } catch (error) {
      console.error('Form submission error:', error);
      setIsSubmitted(true);
    }

    setIsSubmitting(false);
  };

  const weeklyModules = [
    {
      week: '1-4',
      title: 'Foundations',
      lessons: [
        'Prompt Engineering Masterclass',
        'CV Screening met AI',
        'Vacaturetekst Optimalisatie',
        'Boolean & Sourcing Strategies'
      ],
      icon: '🎯'
    },
    {
      week: '5-8',
      title: 'Advanced',
      lessons: [
        'LinkedIn Content met AI',
        'Candidate Outreach Templates',
        'Interview Prep Automation',
        'Reporting & Analytics met AI'
      ],
      icon: '🚀'
    },
    {
      week: '9-12',
      title: 'Expert',
      lessons: [
        'AI Tool Stacking & Workflows',
        'Automation zonder Code',
        'Custom GPTs Bouwen',
        'Team Implementatie'
      ],
      icon: '⭐'
    }
  ];

  const features = [
    {
      icon: Video,
      title: 'Wekelijkse Video Les',
      description: '15-20 minuten praktijkgerichte training, elke week een nieuw onderwerp.'
    },
    {
      icon: BookOpen,
      title: 'Template Bibliotheek',
      description: '50+ kant-en-klare prompts die je direct kunt kopiëren en aanpassen.'
    },
    {
      icon: Download,
      title: 'Praktijkopdrachten',
      description: 'Elke week een opdracht om het geleerde direct toe te passen in je werk.'
    },
    {
      icon: MessageSquare,
      title: 'Community Access',
      description: 'Slack community met 100+ recruiters. Stel vragen, deel tips, leer van elkaar.'
    },
    {
      icon: Calendar,
      title: 'Maandelijkse Live Q&A',
      description: 'Stel je vragen direct aan de expert. Replays beschikbaar voor iedereen.'
    },
    {
      icon: Award,
      title: 'Certificering',
      description: 'Ontvang een certificaat na het voltooien van alle modules.'
    }
  ];

  const testimonials = [
    {
      initials: 'MV',
      name: 'Marieke Vermeer',
      role: 'Senior Recruiter',
      text: 'Eindelijk een training die niet over AI praat, maar je laat DOEN. Na 4 weken screen ik CV\'s 3x zo snel.',
      rating: 5
    },
    {
      initials: 'PJ',
      name: 'Peter Jansen',
      role: 'Talent Acquisition Manager',
      text: 'De wekelijkse opdrachten zijn goud. Je leert door te doen, niet door te kijken. Mijn hele team is nu lid.',
      rating: 5
    },
    {
      initials: 'LB',
      name: 'Laura de Boer',
      role: 'HR Business Partner',
      text: 'De community is fantastisch. Altijd iemand die je vraag kan beantwoorden. Voelt als een team.',
      rating: 5
    }
  ];

  const faqs = [
    {
      q: 'Hoeveel tijd kost het per week?',
      a: 'Gemiddeld 1-2 uur per week. De video\'s zijn 15-20 minuten, en de praktijkopdracht kun je in je dagelijkse werk toepassen.'
    },
    {
      q: 'Ik ben een beginner met AI. Is dit geschikt voor mij?',
      a: 'Absoluut! We beginnen bij de basis en bouwen stap voor stap op. Je hoeft geen technische achtergrond te hebben.'
    },
    {
      q: 'Kan ik de lessen terugkijken?',
      a: 'Ja, alle video\'s blijven beschikbaar zolang je lid bent. Je kunt in je eigen tempo door de content.'
    },
    {
      q: 'Wat als ik een maand wil pauzeren?',
      a: 'Je kunt op elk moment je abonnement pauzeren of opzeggen. Geen lange contracten, geen gedoe.'
    },
    {
      q: 'Is er een geld-terug-garantie?',
      a: 'Ja, 14 dagen. Als je niet tevreden bent, krijg je je geld terug. Geen vragen.'
    }
  ];

  const comparisonData = [
    { feature: 'Wekelijkse nieuwe content', free: false, academy: true },
    { feature: 'Template bibliotheek', free: '3 templates', academy: '50+ templates' },
    { feature: 'Community access', free: false, academy: true },
    { feature: 'Live Q&A sessies', free: false, academy: true },
    { feature: 'Praktijkopdrachten', free: false, academy: true },
    { feature: 'Certificering', free: false, academy: true },
    { feature: 'Updates nieuwe AI tools', free: false, academy: true },
  ];

  return (
    <div className="min-h-screen bg-[#0f0f12] text-[#f0ede8] font-sans">
      {/* Exit Intent */}
      <ExitIntentPopup />

      {/* Gradient orbs */}
      <div className="fixed -top-[300px] -right-[200px] w-[700px] h-[700px] bg-[#f5a623]/[0.08] rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[10%] -left-[150px] w-[500px] h-[500px] bg-purple-500/[0.08] rounded-full blur-[120px] pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0f0f12]/85 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-[1140px] mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <a href="/" className="font-bold text-lg hover:text-[#f5a623] transition">recruitin</a>
            <div className="w-px h-6 bg-white/[0.06]" />
            <span className="text-[#f5a623] font-semibold text-sm">AI Academy</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="/game" className="text-sm text-[#9a9a9f] hover:text-white transition hidden sm:inline">
              Prompt Gym
            </a>
            <a href="/workshop" className="text-sm text-[#9a9a9f] hover:text-white transition hidden sm:inline">
              Workshop
            </a>
            <a href="#pricing" className="bg-[#f5a623] text-[#0f0f12] px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#e09620] transition">
              Word Lid
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative">
        <div className="max-w-[1140px] mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-[#1c1c23] border border-white/[0.06] px-4 py-2 rounded-full text-sm text-[#9a9a9f] mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              {membersCount}+ recruiters leren elke week
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
              Word een <span className="text-[#f5a623]">AI-Expert</span> in 12 weken
            </h1>

            <p className="text-lg sm:text-xl text-[#9a9a9f] mb-8 leading-relaxed max-w-2xl mx-auto">
              Elke week een nieuwe skill. Praktijkopdrachten. Community support.
              Van beginner tot AI-powered recruiter.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a href="#pricing" className="bg-[#f5a623] text-[#0f0f12] px-8 py-4 rounded-xl font-bold text-lg inline-flex items-center justify-center gap-2 hover:bg-[#e09620] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#f5a623]/20 transition-all">
                Start voor €47/maand
                <ArrowRight className="w-5 h-5" />
              </a>
              <a href="#curriculum" className="border border-white/[0.06] text-[#f0ede8] px-8 py-4 rounded-xl font-semibold hover:border-white/[0.12] hover:bg-[#1c1c23] transition-all inline-flex items-center justify-center gap-2">
                <Play className="w-5 h-5" />
                Bekijk curriculum
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#6a6a70]">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-500" />
                14 dagen geld-terug
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                1-2 uur per week
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" />
                4.9/5 rating
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-20 border-t border-white/[0.06]">
        <div className="max-w-[1140px] mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-mono text-sm text-[#f5a623] uppercase tracking-widest mb-4">Wat je krijgt</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Alles wat je nodig hebt om AI te masteren</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-[#1c1c23] border border-white/[0.06] rounded-2xl p-6 hover:border-[#f5a623]/30 transition-all group">
                <div className="w-12 h-12 bg-[#f5a623]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#f5a623]/20 transition">
                  <feature.icon className="w-6 h-6 text-[#f5a623]" />
                </div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-[#9a9a9f] text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section id="curriculum" className="py-20 bg-[#16161b] border-y border-white/[0.06]">
        <div className="max-w-[1140px] mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-mono text-sm text-[#f5a623] uppercase tracking-widest mb-4">12-Weeks Curriculum</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Van basics tot expert in 12 weken</h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {weeklyModules.map((module, idx) => (
              <div key={idx} className="bg-[#1c1c23] border border-white/[0.06] rounded-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-[#f5a623]/20 to-transparent p-6 border-b border-white/[0.06]">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{module.icon}</span>
                    <div>
                      <p className="text-sm text-[#f5a623] font-mono">Week {module.week}</p>
                      <h3 className="text-xl font-bold">{module.title}</h3>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {module.lessons.map((lesson, lidx) => (
                      <li key={lidx} className="flex items-start gap-3 text-[#9a9a9f]">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{lesson}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-[#6a6a70] mb-4">Plus: Nieuwe content wordt elke maand toegevoegd</p>
            <div className="inline-flex items-center gap-2 bg-[#24242d] px-4 py-2 rounded-full text-sm">
              <Zap className="w-4 h-4 text-[#f5a623]" />
              <span className="text-[#9a9a9f]">Komende maand: <span className="text-white">AI Agents voor Recruitment</span></span>
            </div>
          </div>
        </div>
      </section>

      {/* Weekly Format */}
      <section className="py-20">
        <div className="max-w-[900px] mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-mono text-sm text-[#f5a623] uppercase tracking-widest mb-4">Hoe het werkt</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Elke week dezelfde structuur</h2>
          </div>

          <div className="bg-[#1c1c23] border border-white/[0.06] rounded-2xl p-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#f5a623] rounded-lg flex items-center justify-center font-bold text-[#0f0f12] flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-bold mb-1">Maandag: Nieuwe Video Les</h3>
                  <p className="text-[#9a9a9f] text-sm">15-20 minuten praktijkgerichte training over één specifiek onderwerp.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#f5a623] rounded-lg flex items-center justify-center font-bold text-[#0f0f12] flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-bold mb-1">Direct: Template + Opdracht</h3>
                  <p className="text-[#9a9a9f] text-sm">Bij elke les krijg je een kant-en-klare template en een praktijkopdracht.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#f5a623] rounded-lg flex items-center justify-center font-bold text-[#0f0f12] flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-bold mb-1">Doorlopend: Community Support</h3>
                  <p className="text-[#9a9a9f] text-sm">Stel vragen in de Slack community. Krijg feedback van experts en peers.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#f5a623] rounded-lg flex items-center justify-center font-bold text-[#0f0f12] flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="font-bold mb-1">Maandelijks: Live Q&A</h3>
                  <p className="text-[#9a9a9f] text-sm">Stel je vragen direct aan de expert. Replays altijd beschikbaar.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-[#16161b] border-y border-white/[0.06]">
        <div className="max-w-[800px] mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-mono text-sm text-[#f5a623] uppercase tracking-widest mb-4">Vergelijking</p>
            <h2 className="text-3xl font-extrabold tracking-tight">Gratis vs AI Academy</h2>
          </div>

          <div className="bg-[#1c1c23] border border-white/[0.06] rounded-2xl overflow-hidden">
            <div className="grid grid-cols-3 bg-[#24242d] p-4 border-b border-white/[0.06]">
              <div className="font-semibold">Feature</div>
              <div className="text-center font-semibold">Gratis</div>
              <div className="text-center font-semibold text-[#f5a623]">Academy</div>
            </div>
            {comparisonData.map((row, idx) => (
              <div key={idx} className="grid grid-cols-3 p-4 border-b border-white/[0.06] last:border-b-0">
                <div className="text-[#9a9a9f]">{row.feature}</div>
                <div className="text-center">
                  {typeof row.free === 'boolean' ? (
                    row.free ? (
                      <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                    ) : (
                      <Lock className="w-5 h-5 text-[#6a6a70] mx-auto" />
                    )
                  ) : (
                    <span className="text-[#9a9a9f] text-sm">{row.free}</span>
                  )}
                </div>
                <div className="text-center">
                  {typeof row.academy === 'boolean' ? (
                    <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                  ) : (
                    <span className="text-[#f5a623] text-sm font-medium">{row.academy}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-[1140px] mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-mono text-sm text-[#f5a623] uppercase tracking-widest mb-4">Reviews</p>
            <h2 className="text-3xl font-extrabold tracking-tight">Wat leden zeggen</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-[#1c1c23] border border-white/[0.06] rounded-2xl p-6">
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-4 h-4 text-[#f5a623] fill-[#f5a623]" />
                  ))}
                </div>
                <p className="text-[#f0ede8] mb-6 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#4a4a4a] to-[#f5a623] rounded-full flex items-center justify-center font-bold text-sm">
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-[#6a6a70]">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-[#16161b] border-y border-white/[0.06]">
        <div className="max-w-[500px] mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-mono text-sm text-[#f5a623] uppercase tracking-widest mb-4">Pricing</p>
            <h2 className="text-3xl font-extrabold tracking-tight">Start vandaag nog</h2>
          </div>

          <div className="bg-[#1c1c23] border-2 border-[#f5a623] rounded-2xl overflow-hidden relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#f5a623] to-orange-400" />

            <div className="p-8">
              <div className="flex items-baseline justify-center gap-2 mb-2">
                <span className="text-5xl font-extrabold">€47</span>
                <span className="text-[#9a9a9f]">/maand</span>
              </div>
              <p className="text-center text-[#6a6a70] mb-8">Maandelijks opzegbaar</p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>Wekelijkse nieuwe video les</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>50+ prompt templates</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>Praktijkopdrachten met feedback</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>Slack community access</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>Maandelijkse live Q&A</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>Certificaat na voltooiing</span>
                </li>
              </ul>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6a6a70]" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jouw@email.nl"
                      required
                      className="w-full pl-12 pr-4 py-4 bg-[#24242d] border border-white/[0.06] rounded-xl text-white placeholder-[#6a6a70] focus:border-[#f5a623] focus:ring-2 focus:ring-[#f5a623]/20 focus:outline-none transition"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#f5a623] text-[#0f0f12] py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-[#e09620] transition disabled:opacity-50"
                  >
                    {isSubmitting ? 'Even geduld...' : (
                      <>
                        Word lid van de Academy
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="text-center py-4">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                  <p className="font-bold text-lg mb-2">Je staat op de wachtlijst!</p>
                  <p className="text-[#9a9a9f] text-sm">We sturen je een mail zodra de Academy opent.</p>
                </div>
              )}

              <p className="text-center text-xs text-[#6a6a70] mt-4 flex items-center justify-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                14 dagen geld-terug-garantie
              </p>
            </div>
          </div>

          {/* Team License */}
          <div className="mt-6 bg-[#1c1c23] border border-white/[0.06] rounded-2xl p-6 text-center">
            <p className="font-semibold mb-2">Team License nodig?</p>
            <p className="text-[#9a9a9f] text-sm mb-4">Vanaf €297/maand voor teams tot 10 personen.</p>
            <a href="mailto:info@recruitin.nl" className="text-[#f5a623] text-sm font-medium hover:underline">
              Neem contact op →
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-[800px] mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-mono text-sm text-[#f5a623] uppercase tracking-widest mb-4">FAQ</p>
            <h2 className="text-3xl font-extrabold">Veelgestelde vragen</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-[#1c1c23] border border-white/[0.06] rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="flex items-center justify-between w-full p-6 text-left font-semibold hover:bg-[#24242d] transition"
                >
                  {faq.q}
                  <ChevronDown className={`w-5 h-5 text-[#6a6a70] transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-6 text-[#9a9a9f] leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-b from-[#16161b] to-[#0f0f12]">
        <div className="max-w-[600px] mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            Klaar om AI te masteren?
          </h2>
          <p className="text-[#9a9a9f] text-lg mb-8">
            Sluit je aan bij {membersCount}+ recruiters die elke week beter worden met AI.
          </p>
          <a href="#pricing" className="bg-[#f5a623] text-[#0f0f12] px-8 py-4 rounded-xl font-bold text-lg inline-flex items-center gap-2 hover:bg-[#e09620] transition-all">
            Start voor €47/maand
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/[0.06]">
        <div className="max-w-[1140px] mx-auto px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-[#6a6a70] text-sm">© 2025 Recruitin B.V. — AI Academy</p>
            <div className="flex gap-6">
              <a href="/game" className="text-[#6a6a70] text-sm hover:text-[#9a9a9f] transition">Prompt Gym</a>
              <a href="/workshop" className="text-[#6a6a70] text-sm hover:text-[#9a9a9f] transition">Workshop</a>
              <a href="mailto:info@recruitin.nl" className="text-[#6a6a70] text-sm hover:text-[#9a9a9f] transition">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
