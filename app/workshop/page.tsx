'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, Shield, Clock, Users, CheckCircle, Star, Zap, Award, Mail, Building, ChevronDown } from 'lucide-react';
import { CountdownTimer } from '../components/CountdownTimer';
import { StatsBar, ClientLogos } from '../components/SocialProofBar';
import { StickyFooterCTA } from '../components/StickyFooterCTA';
import { ExitIntentPopup } from '../components/ExitIntentPopup';
import { trackWorkshopSignup } from '../lib/analytics';

export default function WorkshopPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    experience: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [spotsLeft, setSpotsLeft] = useState(6);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Next workshop date (set to 3 weeks from now)
  const nextWorkshopDate = new Date();
  nextWorkshopDate.setDate(nextWorkshopDate.getDate() + 21);
  nextWorkshopDate.setHours(10, 0, 0, 0);

  // Scroll reveal effect
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
      reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const revealTop = el.getBoundingClientRect().top;
        const revealPoint = 120;

        if (revealTop < windowHeight - revealPoint) {
          el.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('load', revealOnScroll);
    revealOnScroll();

    return () => {
      window.removeEventListener('scroll', revealOnScroll);
      window.removeEventListener('load', revealOnScroll);
    };
  }, []);

  // Simulate spots decreasing (social proof)
  useEffect(() => {
    const timer = setInterval(() => {
      setSpotsLeft(prev => {
        if (prev > 3 && Math.random() > 0.7) {
          return prev - 1;
        }
        return prev;
      });
    }, 30000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Pipedrive form URL from environment variable
    const PIPEDRIVE_FORM_URL = process.env.NEXT_PUBLIC_PIPEDRIVE_FORM_URL;

    try {
      if (PIPEDRIVE_FORM_URL) {
        const formBody = new FormData();
        formBody.append('name', `${formData.firstName} ${formData.lastName}`);
        formBody.append('email', formData.email);
        formBody.append('company', formData.company);
        formBody.append('phone', formData.phone);
        formBody.append('experience', formData.experience);
        formBody.append('source', 'Prompt Gym Workshop');
        formBody.append('spots_at_signup', String(spotsLeft));

        await fetch(PIPEDRIVE_FORM_URL, {
          method: 'POST',
          body: formBody,
          mode: 'no-cors',
        });
      }

      // Track conversion in GA4
      trackWorkshopSignup();

      // Store conversion locally
      localStorage.setItem('workshop-signup', JSON.stringify({
        email: formData.email,
        date: new Date().toISOString(),
      }));

      setIsSubmitted(true);
    } catch (error) {
      console.error('Form submission error:', error);
      setIsSubmitted(true);
    }

    setIsSubmitting(false);
  };

  const painPoints = [
    { icon: '🤖', text: 'Ik gebruik ChatGPT maar de output is vaak niet bruikbaar voor mijn werk' },
    { icon: '⏰', text: 'Ik besteed te veel tijd aan repetitieve recruitment taken' },
    { icon: '🎯', text: 'Ik weet niet hoe ik AI écht effectief kan inzetten voor recruitment' },
  ];

  const features = [
    { num: '01', title: 'Prompt Fundamentals', desc: 'Waarom 90% van de prompts niet werkt — en hoe je dat fixt met bewezen frameworks.', icon: Zap },
    { num: '02', title: 'CV Screening met AI', desc: 'Van stapels CV\'s naar shortlist in minuten. Objectieve, consistente screening die tijd bespaart.', icon: CheckCircle },
    { num: '03', title: 'Vacatureteksten die werken', desc: 'Schrijf teksten die de juiste kandidaten aantrekken — inclusief SEO optimalisatie.', icon: Star },
    { num: '04', title: 'Sourcing & Outreach', desc: 'Vind kandidaten sneller en schrijf berichten die daadwerkelijk worden beantwoord.', icon: Users },
    { num: '05', title: 'Live Q&A met Expert', desc: 'Al je vragen beantwoord door iemand die dagelijks AI inzet voor recruitment.', icon: Award },
    { num: '06', title: 'Template Bibliotheek', desc: '20+ kant-en-klare templates die je direct kunt kopiëren en aanpassen voor jouw situatie.', icon: Building },
  ];

  const testimonials = [
    {
      initials: 'LV',
      name: 'Lisa de Vries',
      role: 'Senior Recruiter bij TechTalent',
      text: 'Na de workshop screen ik CV\'s 3x zo snel. De templates zijn goud waard — ik gebruik ze dagelijks.',
      rating: 5,
    },
    {
      initials: 'MJ',
      name: 'Mark Janssen',
      role: 'HR Manager bij ScaleUp BV',
      text: 'Eindelijk begrijp ik hoe ik AI effectief kan inzetten. Heel praktisch en direct toepasbaar.',
      rating: 5,
    },
    {
      initials: 'SB',
      name: 'Sophie Bakker',
      role: 'Corporate Recruiter bij Consultancy NL',
      text: 'De ROI was binnen een week terugverdiend. Mijn vacatureteksten converteren nu veel beter.',
      rating: 5,
    },
    {
      initials: 'TK',
      name: 'Thomas Kok',
      role: 'Talent Acquisition Lead',
      text: 'Perfect niveau. Niet te technisch, wel heel praktisch. Mijn hele team volgt nu deze workshop.',
      rating: 5,
    },
  ];

  const stats = [
    { value: '3x', label: 'Sneller CV\'s screenen' },
    { value: '2u', label: 'Tijdsbesparing per week' },
    { value: '20+', label: 'Kant-en-klare templates' },
    { value: '100%', label: 'Praktijk, geen theorie' },
  ];

  const faqs = [
    {
      q: 'Voor wie is deze workshop geschikt?',
      a: 'Voor recruiters, HR-professionals en hiring managers die AI willen inzetten om efficiënter te werken. Geen technische kennis vereist.'
    },
    {
      q: 'Wat als ik nog nooit ChatGPT heb gebruikt?',
      a: 'Geen probleem! We beginnen bij de basis en bouwen stap voor stap op. Na de workshop kun je direct aan de slag.'
    },
    {
      q: 'Krijg ik de templates ook na de workshop?',
      a: 'Ja, je krijgt toegang tot alle 20+ templates die je direct kunt kopiëren en aanpassen voor jouw situatie.'
    },
    {
      q: 'Is er een geld-terug-garantie?',
      a: 'Absoluut. Als je na de workshop niet tevreden bent, krijg je je geld volledig terug. Geen vragen.'
    },
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#0f0f12] flex items-center justify-center p-4">
        <div className="bg-[#1c1c23] border border-white/[0.06] rounded-[28px] p-8 sm:p-12 max-w-lg text-center">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-[#f0ede8] mb-4">
            Je bent aangemeld!
          </h1>
          <p className="text-[#9a9a9f] mb-6">
            We sturen je binnen 24 uur een bevestiging met alle details over de workshop naar <span className="text-[#f5a623]">{formData.email}</span>.
          </p>
          <div className="bg-[#24242d] rounded-xl p-4 mb-6 text-left">
            <p className="text-sm text-[#6a6a70] mb-2">Wat je kunt verwachten:</p>
            <ul className="space-y-2 text-sm text-[#f0ede8]">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Bevestigingsmail met datum & tijd
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Zoom link 1 dag voor de workshop
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Voorbereidingsmateriaal
              </li>
            </ul>
          </div>
          <a
            href="/"
            className="inline-block bg-[#f5a623] hover:bg-[#e09620] text-[#0f0f12] px-8 py-3 rounded-xl font-bold transition"
          >
            Speel ondertussen de Prompt Gym
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f12] text-[#f0ede8] font-sans relative overflow-x-hidden">
      {/* Exit Intent Popup */}
      <ExitIntentPopup />

      {/* Gradient orbs */}
      <div className="fixed -top-[300px] -right-[200px] w-[700px] h-[700px] bg-[#f5a623]/[0.08] rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[10%] -left-[150px] w-[500px] h-[500px] bg-[#4a4a4a]/[0.12] rounded-full blur-[120px] pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0f0f12]/85 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-[1140px] mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <a href="/" className="font-bold text-lg hover:text-[#f5a623] transition">recruitin</a>
            <div className="w-px h-6 bg-white/[0.06]" />
            <span className="text-[#9a9a9f] font-semibold text-sm">Prompt Gym Workshop</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-sm text-[#f5a623]">
              Nog {spotsLeft} plekken!
            </span>
            <a href="#signup" className="bg-[#f5a623] text-[#0f0f12] px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#e09620] transition">
              Aanmelden
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative">
        <div className="max-w-[1140px] mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_0.8fr] gap-16 items-center">
            <div className="max-w-[600px]">
              <div className="inline-flex items-center gap-2 bg-[#1c1c23] border border-white/[0.06] px-4 py-2 rounded-full text-sm text-[#9a9a9f] mb-6 animate-fadeInUp">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Live Workshop • 2 uur praktijk • {spotsLeft} plekken
              </div>

              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6 tracking-tight animate-fadeInUp animation-delay-100">
                Word een <span className="text-[#f5a623]">AI-Powered Recruiter</span> in één sessie
              </h1>

              <p className="text-lg text-[#9a9a9f] mb-8 leading-relaxed max-w-[520px] animate-fadeInUp animation-delay-200">
                Leer prompts schrijven die je uren werk besparen. CV screening, vacatureteksten, sourcing — allemaal sneller én beter met AI.
              </p>

              <div className="flex flex-wrap gap-4 animate-fadeInUp animation-delay-300">
                <a href="#signup" className="bg-[#f5a623] text-[#0f0f12] px-8 py-3.5 rounded-xl font-bold inline-flex items-center gap-2 hover:bg-[#e09620] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#f5a623]/20 transition-all">
                  Claim je plek
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a href="#features" className="border border-white/[0.06] text-[#f0ede8] px-8 py-3.5 rounded-xl font-semibold hover:border-white/[0.12] hover:bg-[#1c1c23] transition-all">
                  Bekijk het programma
                </a>
              </div>

              {/* Trust badges */}
              <div className="flex items-center gap-6 mt-8 pt-8 border-t border-white/[0.06] animate-fadeInUp animation-delay-400">
                <div className="flex items-center gap-2 text-sm text-[#6a6a70]">
                  <Shield className="w-4 h-4 text-green-500" />
                  Geld-terug-garantie
                </div>
                <div className="flex items-center gap-2 text-sm text-[#6a6a70]">
                  <Star className="w-4 h-4 text-yellow-500" />
                  4.9/5 rating
                </div>
              </div>
            </div>

            {/* Stats Card + Countdown */}
            <div className="space-y-6 animate-fadeInUp animation-delay-400">
              <CountdownTimer targetDate={nextWorkshopDate} />

              <div className="bg-[#1c1c23] border border-white/[0.06] rounded-[28px] p-8 relative">
                <div className="absolute top-0 left-10 right-10 h-0.5 bg-gradient-to-r from-transparent via-[#f5a623] to-transparent" />

                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/[0.06]">
                  <div className="w-11 h-11 bg-[#f5a623]/10 rounded-lg flex items-center justify-center text-xl">🎯</div>
                  <div>
                    <h3 className="font-semibold">Workshop Resultaten</h3>
                    <p className="text-sm text-[#6a6a70]">Gemiddelden van 847+ deelnemers</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, idx) => (
                    <div key={idx} className="bg-[#24242d] rounded-xl p-5 text-center">
                      <div className="text-3xl font-extrabold text-[#f5a623] mb-1">{stat.value}</div>
                      <div className="text-sm text-[#6a6a70]">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <StatsBar />

      {/* Pain Points */}
      <section className="py-16">
        <div className="max-w-[1140px] mx-auto px-6">
          <p className="text-center text-sm text-[#f5a623] uppercase tracking-widest mb-4">Herken je dit?</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">Je bent niet de enige...</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {painPoints.map((pain, idx) => (
              <div key={idx} className="reveal bg-[#1c1c23] border border-white/[0.06] rounded-[20px] p-8 hover:border-white/[0.12] hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 bg-[#24242d] rounded-lg flex items-center justify-center text-2xl mb-6">
                  {pain.icon}
                </div>
                <p className="text-[#9a9a9f] leading-relaxed">
                  <span className="text-[#f5a623] text-xl font-bold">"</span>
                  {pain.text}
                  <span className="text-[#f5a623] text-xl font-bold">"</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <ClientLogos />

      {/* Features */}
      <section id="features" className="py-20">
        <div className="max-w-[1140px] mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-mono text-sm text-[#f5a623] uppercase tracking-widest mb-4">Het Programma</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight">Skills én templates die je direct kunt gebruiken</h2>
            <p className="text-[#9a9a9f] text-lg max-w-[560px] mx-auto">Geen saaie theorie, wel praktijk. Je gaat naar huis met prompts die je morgen al gebruikt.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, idx) => (
              <div key={idx} className="reveal bg-[#16161b] border border-white/[0.06] rounded-[20px] p-8 flex gap-6 hover:border-[#f5a623] hover:bg-[#1c1c23] transition-all group">
                <div className="font-mono text-sm text-[#f5a623] bg-[#f5a623]/10 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 font-semibold group-hover:bg-[#f5a623] group-hover:text-[#0f0f12] transition-all">
                  {feature.num}
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1.5">{feature.title}</h3>
                  <p className="text-[#9a9a9f] leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[#16161b] border-y border-white/[0.06]">
        <div className="max-w-[1140px] mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-mono text-sm text-[#f5a623] uppercase tracking-widest mb-4">Ervaringen</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Wat 847+ recruiters zeggen</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((t, idx) => (
              <div key={idx} className="reveal bg-[#1c1c23] border border-white/[0.06] rounded-[20px] p-8 hover:border-[#f5a623]/30 transition-all">
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-5 h-5 text-[#f5a623] fill-[#f5a623]" />
                  ))}
                </div>
                <p className="text-[#f0ede8] text-lg leading-relaxed mb-6">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 bg-gradient-to-br from-[#4a4a4a] to-[#f5a623] rounded-full flex items-center justify-center font-bold text-sm">
                    {t.initials}
                  </div>
                  <div>
                    <h4 className="font-semibold">{t.name}</h4>
                    <p className="text-sm text-[#6a6a70]">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-[800px] mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-mono text-sm text-[#f5a623] uppercase tracking-widest mb-4">FAQ</p>
            <h2 className="text-3xl font-extrabold">Veelgestelde vragen</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="reveal bg-[#1c1c23] border border-white/[0.06] rounded-xl overflow-hidden">
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

      {/* CTA / Signup Form */}
      <section id="signup" className="py-20">
        <div className="max-w-[1140px] mx-auto px-6">
          <div className="bg-[#1c1c23] border border-white/[0.06] rounded-[28px] p-8 sm:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#4a4a4a] via-[#f5a623] to-[#4a4a4a]" />

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left: Value proposition */}
              <div>
                <div className="inline-flex items-center gap-2 bg-red-500/10 text-red-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  Nog {spotsLeft} plekken beschikbaar
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">In 2 uur van beginner naar AI-powered recruiter</h2>
                <p className="text-[#9a9a9f] text-lg mb-8">De complete workshop voor €297 (excl. BTW)</p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-[#f0ede8]">2 uur live interactieve training</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-[#f0ede8]">20+ kant-en-klare prompt templates</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-[#f0ede8]">Live feedback op jouw prompts</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-[#f0ede8]">Q&A met AI recruitment expert</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-[#f0ede8]">Certificaat van deelname</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-[#f0ede8]">100% geld-terug-garantie</span>
                  </div>
                </div>

                <div className="bg-[#24242d] rounded-xl p-4 flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#f5a623]/20 rounded-full flex items-center justify-center text-xl">
                    👨‍🏫
                  </div>
                  <div>
                    <p className="font-semibold text-white">Gegeven door Wouter Arts</p>
                    <p className="text-sm text-[#6a6a70]">AI & Recruitment specialist • 10+ jaar ervaring</p>
                  </div>
                </div>
              </div>

              {/* Right: Form */}
              <div className="bg-[#24242d] rounded-2xl p-6 sm:p-8">
                <h3 className="text-xl font-bold mb-6 text-center">Meld je nu aan</h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-[#9a9a9f] mb-1.5 font-medium">Voornaam *</label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        className="w-full px-4 py-3.5 bg-[#1c1c23] border border-white/[0.06] rounded-lg text-[#f0ede8] placeholder-[#6a6a70] focus:border-[#f5a623] focus:ring-2 focus:ring-[#f5a623]/20 focus:outline-none transition"
                        placeholder="Jouw voornaam"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-[#9a9a9f] mb-1.5 font-medium">Achternaam *</label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        className="w-full px-4 py-3.5 bg-[#1c1c23] border border-white/[0.06] rounded-lg text-[#f0ede8] placeholder-[#6a6a70] focus:border-[#f5a623] focus:ring-2 focus:ring-[#f5a623]/20 focus:outline-none transition"
                        placeholder="Jouw achternaam"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-[#9a9a9f] mb-1.5 font-medium">E-mailadres *</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6a6a70]" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full pl-12 pr-4 py-3.5 bg-[#1c1c23] border border-white/[0.06] rounded-lg text-[#f0ede8] placeholder-[#6a6a70] focus:border-[#f5a623] focus:ring-2 focus:ring-[#f5a623]/20 focus:outline-none transition"
                        placeholder="naam@bedrijf.nl"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-[#9a9a9f] mb-1.5 font-medium">Telefoonnummer</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3.5 bg-[#1c1c23] border border-white/[0.06] rounded-lg text-[#f0ede8] placeholder-[#6a6a70] focus:border-[#f5a623] focus:ring-2 focus:ring-[#f5a623]/20 focus:outline-none transition"
                      placeholder="06-12345678"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-[#9a9a9f] mb-1.5 font-medium">Bedrijf</label>
                    <div className="relative">
                      <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6a6a70]" />
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        className="w-full pl-12 pr-4 py-3.5 bg-[#1c1c23] border border-white/[0.06] rounded-lg text-[#f0ede8] placeholder-[#6a6a70] focus:border-[#f5a623] focus:ring-2 focus:ring-[#f5a623]/20 focus:outline-none transition"
                        placeholder="Waar werk je?"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-[#9a9a9f] mb-1.5 font-medium">Ervaring met AI</label>
                    <select
                      value={formData.experience}
                      onChange={(e) => setFormData({...formData, experience: e.target.value})}
                      className="w-full px-4 py-3.5 bg-[#1c1c23] border border-white/[0.06] rounded-lg text-[#f0ede8] focus:border-[#f5a623] focus:ring-2 focus:ring-[#f5a623]/20 focus:outline-none transition appearance-none cursor-pointer"
                      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236a6a70' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center' }}
                    >
                      <option value="">Selecteer je niveau</option>
                      <option value="none">Nog nooit gebruikt</option>
                      <option value="beginner">Beginner - soms ChatGPT</option>
                      <option value="intermediate">Gemiddeld - regelmatig AI</option>
                      <option value="advanced">Gevorderd - dagelijks AI</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#f5a623] text-[#0f0f12] py-4 rounded-xl font-bold text-lg inline-flex items-center justify-center gap-2 hover:bg-[#e09620] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#f5a623]/20 transition-all disabled:opacity-50 disabled:hover:translate-y-0"
                  >
                    {isSubmitting ? 'Even geduld...' : (
                      <>
                        Aanmelden voor €297
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <p className="text-xs text-[#6a6a70] text-center flex items-center justify-center gap-1.5">
                    <Shield className="w-3.5 h-3.5" />
                    100% geld-terug-garantie • Beveiligde betaling
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/[0.06]">
        <div className="max-w-[1140px] mx-auto px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-[#6a6a70] text-sm">© 2025 Recruitin B.V. — Prompt Gym Workshop</p>
            <div className="flex gap-6">
              <a href="#" className="text-[#6a6a70] text-sm hover:text-[#9a9a9f] transition">Privacy</a>
              <a href="#" className="text-[#6a6a70] text-sm hover:text-[#9a9a9f] transition">Voorwaarden</a>
              <a href="mailto:info@recruitin.nl" className="text-[#6a6a70] text-sm hover:text-[#9a9a9f] transition">Contact</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Sticky Footer CTA */}
      <StickyFooterCTA variant="workshop" />

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease forwards;
        }
        .animation-delay-100 { animation-delay: 0.1s; opacity: 0; }
        .animation-delay-200 { animation-delay: 0.2s; opacity: 0; }
        .animation-delay-300 { animation-delay: 0.3s; opacity: 0; }
        .animation-delay-400 { animation-delay: 0.4s; opacity: 0; }
        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
        select option {
          background: #1c1c23;
          color: #f0ede8;
        }
      `}</style>
    </div>
  );
}
