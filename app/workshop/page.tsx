'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, Shield } from 'lucide-react';

export default function WorkshopPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    experience: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    revealOnScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', revealOnScroll);
      window.removeEventListener('load', revealOnScroll);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const PIPEDRIVE_FORM_URL = 'https://webforms.pipedrive.com/f/YOUR_FORM_ID';

    try {
      const formBody = new FormData();
      formBody.append('name', `${formData.firstName} ${formData.lastName}`);
      formBody.append('email', formData.email);
      formBody.append('company', formData.company);
      formBody.append('experience', formData.experience);
      formBody.append('source', 'Prompt Gym Workshop');

      await fetch(PIPEDRIVE_FORM_URL, {
        method: 'POST',
        body: formBody,
        mode: 'no-cors',
      });

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
    { num: '01', title: 'Prompt Fundamentals', desc: 'Waarom 90% van de prompts niet werkt — en hoe je dat fixt met bewezen frameworks.' },
    { num: '02', title: 'CV Screening met AI', desc: 'Van stapels CV\'s naar shortlist in minuten. Objectieve, consistente screening die tijd bespaart.' },
    { num: '03', title: 'Vacatureteksten die werken', desc: 'Schrijf teksten die de juiste kandidaten aantrekken — inclusief SEO optimalisatie.' },
    { num: '04', title: 'Sourcing & Outreach', desc: 'Vind kandidaten sneller en schrijf berichten die daadwerkelijk worden beantwoord.' },
    { num: '05', title: 'Live Q&A met Expert', desc: 'Al je vragen beantwoord door iemand die dagelijks AI inzet voor recruitment.' },
    { num: '06', title: 'Template Bibliotheek', desc: '20+ kant-en-klare templates die je direct kunt kopiëren en aanpassen voor jouw situatie.' },
  ];

  const testimonials = [
    { initials: 'LV', name: 'Lisa de Vries', role: 'Senior Recruiter bij TechTalent', text: 'Na de workshop screen ik CV\'s 3x zo snel. De templates zijn goud waard — ik gebruik ze dagelijks.' },
    { initials: 'MJ', name: 'Mark Janssen', role: 'HR Manager bij ScaleUp BV', text: 'Eindelijk begrijp ik hoe ik AI effectief kan inzetten. Heel praktisch en direct toepasbaar.' },
  ];

  const stats = [
    { value: '3x', label: 'Sneller CV\'s screenen' },
    { value: '2u', label: 'Tijdsbesparing per week' },
    { value: '20+', label: 'Kant-en-klare templates' },
    { value: '100%', label: 'Praktijk, geen theorie' },
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#0f0f12] flex items-center justify-center p-4">
        <div className="bg-[#1c1c23] border border-white/[0.06] rounded-[28px] p-8 sm:p-12 max-w-lg text-center">
          <div className="w-20 h-20 bg-[#f5a623]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">✓</span>
          </div>
          <h1 className="text-3xl font-bold text-[#f0ede8] mb-4">
            Je bent aangemeld!
          </h1>
          <p className="text-[#9a9a9f] mb-6">
            We nemen binnen 24 uur contact met je op met alle details over de workshop.
          </p>
          <a
            href="/"
            className="inline-block bg-[#f5a623] hover:bg-[#e09620] text-[#0f0f12] px-8 py-3 rounded-xl font-bold transition"
          >
            Terug naar Prompt Gym
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f12] text-[#f0ede8] font-sans relative overflow-x-hidden">
      {/* Gradient orbs */}
      <div className="fixed -top-[300px] -right-[200px] w-[700px] h-[700px] bg-[#f5a623]/[0.08] rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[10%] -left-[150px] w-[500px] h-[500px] bg-[#4a4a4a]/[0.12] rounded-full blur-[120px] pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0f0f12]/85 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-[1140px] mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="font-bold text-lg">recruitin</span>
            <div className="w-px h-6 bg-white/[0.06]" />
            <span className="text-[#9a9a9f] font-semibold text-sm">Prompt Gym</span>
          </div>
          <a href="#signup" className="bg-[#f5a623] text-[#0f0f12] px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#e09620] transition">
            Aanmelden
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative">
        <div className="max-w-[1140px] mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_0.8fr] gap-16 items-center">
            <div className="max-w-[600px]">
              <div className="inline-flex items-center gap-2 bg-[#1c1c23] border border-white/[0.06] px-4 py-2 rounded-full text-sm text-[#9a9a9f] mb-6 animate-fadeInUp">
                <span className="w-2 h-2 bg-[#f5a623] rounded-full animate-pulse" />
                Live Workshop • 2 uur praktijk
              </div>

              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6 tracking-tight animate-fadeInUp animation-delay-100">
                Word een <span className="text-[#f5a623]">AI-Powered Recruiter</span> in één sessie
              </h1>

              <p className="text-lg text-[#9a9a9f] mb-8 leading-relaxed max-w-[520px] animate-fadeInUp animation-delay-200">
                Leer prompts schrijven die je uren werk besparen. CV screening, vacatureteksten, sourcing — allemaal sneller én beter met AI.
              </p>

              <div className="flex flex-wrap gap-4 animate-fadeInUp animation-delay-300">
                <a href="#signup" className="bg-[#f5a623] text-[#0f0f12] px-8 py-3.5 rounded-xl font-bold inline-flex items-center gap-2 hover:bg-[#e09620] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#f5a623]/20 transition-all">
                  Meld je aan
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a href="#features" className="border border-white/[0.06] text-[#f0ede8] px-8 py-3.5 rounded-xl font-semibold hover:border-white/[0.12] hover:bg-[#1c1c23] transition-all">
                  Bekijk het programma
                </a>
              </div>
            </div>

            {/* Stats Card */}
            <div className="animate-fadeInUp animation-delay-400">
              <div className="bg-[#1c1c23] border border-white/[0.06] rounded-[28px] p-8 relative">
                <div className="absolute top-0 left-10 right-10 h-0.5 bg-gradient-to-r from-transparent via-[#f5a623] to-transparent" />

                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/[0.06]">
                  <div className="w-11 h-11 bg-[#f5a623]/10 rounded-lg flex items-center justify-center text-xl">🎯</div>
                  <div>
                    <h3 className="font-semibold">Workshop Resultaten</h3>
                    <p className="text-sm text-[#6a6a70]">Gemiddelden van deelnemers</p>
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

      {/* Pain Points */}
      <section className="py-16">
        <div className="max-w-[1140px] mx-auto px-6">
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
              <div key={idx} className="reveal bg-[#16161b] border border-white/[0.06] rounded-[20px] p-8 flex gap-6 hover:border-[#f5a623] hover:bg-[#1c1c23] transition-all">
                <div className="font-mono text-sm text-[#f5a623] bg-[#f5a623]/10 w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 font-semibold">
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
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Wat eerdere deelnemers zeggen</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((t, idx) => (
              <div key={idx} className="reveal bg-[#1c1c23] border border-white/[0.06] rounded-[20px] p-8">
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(i => (
                    <span key={i} className="text-[#f5a623]">★</span>
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

      {/* CTA / Signup Form */}
      <section id="signup" className="py-20">
        <div className="max-w-[1140px] mx-auto px-6">
          <div className="bg-[#1c1c23] border border-white/[0.06] rounded-[28px] p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#4a4a4a] via-[#f5a623] to-[#4a4a4a]" />

            <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">In 2 uur van beginner naar AI-powered recruiter</h2>
            <p className="text-[#9a9a9f] text-lg mb-10">Meld je aan en we nemen contact op voor datum en betaling</p>

            <form onSubmit={handleSubmit} className="max-w-[480px] mx-auto">
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div className="text-left">
                  <label className="block text-sm text-[#9a9a9f] mb-1.5 font-medium">Voornaam</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="w-full px-4 py-3.5 bg-[#24242d] border border-white/[0.06] rounded-lg text-[#f0ede8] placeholder-[#6a6a70] focus:border-[#f5a623] focus:ring-2 focus:ring-[#f5a623]/20 focus:outline-none transition"
                    placeholder="Jouw voornaam"
                  />
                </div>
                <div className="text-left">
                  <label className="block text-sm text-[#9a9a9f] mb-1.5 font-medium">Achternaam</label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="w-full px-4 py-3.5 bg-[#24242d] border border-white/[0.06] rounded-lg text-[#f0ede8] placeholder-[#6a6a70] focus:border-[#f5a623] focus:ring-2 focus:ring-[#f5a623]/20 focus:outline-none transition"
                    placeholder="Jouw achternaam"
                  />
                </div>
              </div>

              <div className="mb-4 text-left">
                <label className="block text-sm text-[#9a9a9f] mb-1.5 font-medium">E-mailadres</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3.5 bg-[#24242d] border border-white/[0.06] rounded-lg text-[#f0ede8] placeholder-[#6a6a70] focus:border-[#f5a623] focus:ring-2 focus:ring-[#f5a623]/20 focus:outline-none transition"
                  placeholder="naam@bedrijf.nl"
                />
              </div>

              <div className="mb-4 text-left">
                <label className="block text-sm text-[#9a9a9f] mb-1.5 font-medium">Bedrijf</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  className="w-full px-4 py-3.5 bg-[#24242d] border border-white/[0.06] rounded-lg text-[#f0ede8] placeholder-[#6a6a70] focus:border-[#f5a623] focus:ring-2 focus:ring-[#f5a623]/20 focus:outline-none transition"
                  placeholder="Waar werk je?"
                />
              </div>

              <div className="mb-6 text-left">
                <label className="block text-sm text-[#9a9a9f] mb-1.5 font-medium">Ervaring met AI</label>
                <select
                  value={formData.experience}
                  onChange={(e) => setFormData({...formData, experience: e.target.value})}
                  className="w-full px-4 py-3.5 bg-[#24242d] border border-white/[0.06] rounded-lg text-[#f0ede8] focus:border-[#f5a623] focus:ring-2 focus:ring-[#f5a623]/20 focus:outline-none transition appearance-none cursor-pointer"
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
                className="w-full bg-[#f5a623] text-[#0f0f12] py-4 rounded-xl font-bold text-lg inline-flex items-center justify-center gap-2 hover:bg-[#e09620] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#f5a623]/20 transition-all disabled:opacity-50"
              >
                {isSubmitting ? 'Even geduld...' : (
                  <>
                    Aanmelden voor de workshop
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              <p className="text-xs text-[#6a6a70] mt-4 flex items-center justify-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                We spammen niet. Je gegevens zijn veilig en worden alleen voor deze workshop gebruikt.
              </p>
            </form>
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
              <a href="#" className="text-[#6a6a70] text-sm hover:text-[#9a9a9f] transition">Contact</a>
            </div>
          </div>
        </div>
      </footer>

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
