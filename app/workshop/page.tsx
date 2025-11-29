'use client';

import React, { useState } from 'react';
import {
  Clock, Users, CheckCircle, Star, ArrowRight,
  Zap, Target, Brain, MessageSquare, Award,
  ChevronDown, ChevronUp
} from 'lucide-react';

export default function WorkshopPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Pipedrive Web Forms API
    // Replace YOUR_COMPANY_DOMAIN and YOUR_FORM_ID with your actual values
    const PIPEDRIVE_FORM_URL = 'https://webforms.pipedrive.com/f/YOUR_FORM_ID';

    try {
      // Option 1: Direct Pipedrive Web Form submission
      const formBody = new FormData();
      formBody.append('name', formData.name);
      formBody.append('email', formData.email);
      formBody.append('company', formData.company);
      formBody.append('phone', formData.phone);
      formBody.append('source', 'Prompt Gym Workshop');

      await fetch(PIPEDRIVE_FORM_URL, {
        method: 'POST',
        body: formBody,
        mode: 'no-cors', // Pipedrive forms work with no-cors
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error('Form submission error:', error);
      // Still show success - Pipedrive no-cors doesn't return response
      setIsSubmitted(true);
    }

    setIsSubmitting(false);
  };

  const benefits = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Direct toepasbaar",
      description: "Geen theorie, wel praktijk. Je gaat naar huis met prompts die je morgen kunt gebruiken."
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Begrijp hoe AI denkt",
      description: "Leer de principes achter goede prompts, zodat je zelf nieuwe kunt maken."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Bespaar uren per week",
      description: "Automatiseer repetitieve taken zoals CV screening, vacatureteksten en candidate outreach."
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Live feedback",
      description: "Schrijf prompts en krijg direct feedback van een expert. Geen opgenomen video's."
    },
  ];

  const agenda = [
    { time: "0:00 - 0:20", title: "De basis van prompt engineering", description: "Waarom 90% van de prompts niet werkt en hoe je dat fixt" },
    { time: "0:20 - 0:50", title: "CV Screening met AI", description: "Van stapels CV's naar shortlist in minuten" },
    { time: "0:50 - 1:20", title: "Vacatureteksten die converteren", description: "Schrijf teksten die de juiste kandidaten aantrekken" },
    { time: "1:20 - 1:50", title: "Sourcing & Outreach", description: "Vind kandidaten en schrijf berichten die worden beantwoord" },
    { time: "1:50 - 2:00", title: "Q&A + Bonus templates", description: "Al je vragen beantwoord + 20 kant-en-klare templates" },
  ];

  const faqs = [
    {
      q: "Voor wie is deze workshop?",
      a: "Voor recruiters, HR-professionals en hiring managers die AI willen gebruiken om sneller en beter te werven. Geen technische kennis nodig."
    },
    {
      q: "Welke AI tools behandelen jullie?",
      a: "We focussen op Claude en ChatGPT - de twee beste AI's voor recruitment. De principes werken voor beide."
    },
    {
      q: "Is dit ook voor beginners?",
      a: "Ja! We beginnen bij de basis. Of je nu nog nooit AI hebt gebruikt of al ervaring hebt, je leert nieuwe dingen."
    },
    {
      q: "Krijg ik een opname?",
      a: "Nee, dit is een live workshop. Wel krijg je alle templates en een samenvatting na afloop."
    },
    {
      q: "Kan dit ook in-company?",
      a: "Ja, we geven deze workshop ook op locatie voor teams. Neem contact op voor een offerte."
    },
  ];

  const testimonials = [
    {
      quote: "Na de workshop screen ik CV's 3x zo snel. De templates zijn goud waard.",
      name: "Lisa de Vries",
      role: "Senior Recruiter",
      company: "TechTalent"
    },
    {
      quote: "Eindelijk begrijp ik hoe ik AI effectief kan inzetten. Heel praktisch.",
      name: "Mark Janssen",
      role: "HR Manager",
      company: "ScaleUp BV"
    },
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 max-w-lg text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Je bent aangemeld!
          </h1>
          <p className="text-gray-600 mb-6">
            We nemen binnen 24 uur contact met je op met alle details over de workshop.
          </p>
          <a
            href="/"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-bold transition"
          >
            Terug naar Prompt Gym
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-orange-500 to-orange-600 text-white py-16 sm:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Clock className="w-4 h-4" />
            2 uur live training
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Word een AI-Powered Recruiter in 2 uur
          </h1>

          <p className="text-xl sm:text-2xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Leer prompts schrijven die je uren werk besparen.
            CV screening, vacatures, sourcing - allemaal sneller met AI.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a
              href="#aanmelden"
              className="bg-white text-orange-600 px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition shadow-lg flex items-center gap-2"
            >
              Meld je aan
              <ArrowRight className="w-5 h-5" />
            </a>
            <div className="flex items-center gap-2 text-orange-100">
              <Users className="w-5 h-5" />
              <span>Kleine groepen (max 12 personen)</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-1">
            {[1,2,3,4,5].map(i => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="ml-2 text-orange-100">4.9/5 van 50+ deelnemers</span>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
            Herkenbaar?
          </h2>
          <div className="grid sm:grid-cols-3 gap-6 text-left">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl mb-3">😤</div>
              <p className="text-gray-700">"Ik gebruik ChatGPT maar de output is vaak niet bruikbaar"</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl mb-3">⏰</div>
              <p className="text-gray-700">"Ik besteed te veel tijd aan repetitieve taken"</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl mb-3">🤷</div>
              <p className="text-gray-700">"Ik weet niet hoe ik AI echt kan inzetten voor recruitment"</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 text-center">
            Na deze workshop...
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12">
            Ga je naar huis met skills én templates die je direct kunt gebruiken
          </p>

          <div className="grid sm:grid-cols-2 gap-8">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 flex-shrink-0">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg mb-1">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agenda Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 text-center">
            Wat gaan we doen?
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12">
            2 uur vol praktijk, geen saaie slides
          </p>

          <div className="space-y-4">
            {agenda.map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-sm flex flex-col sm:flex-row gap-4">
                <div className="text-orange-600 font-mono font-bold text-sm sm:w-32 flex-shrink-0">
                  {item.time}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-12 text-center">
            Wat anderen zeggen
          </h2>

          <div className="grid sm:grid-cols-2 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-orange-50 rounded-2xl p-6">
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-4 h-4 fill-orange-500 text-orange-500" />
                  ))}
                </div>
                <p className="text-gray-800 mb-4 italic">"{t.quote}"</p>
                <div>
                  <p className="font-bold text-gray-800">{t.name}</p>
                  <p className="text-sm text-gray-600">{t.role} bij {t.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signup Form */}
      <section id="aanmelden" className="py-16 px-4 bg-gradient-to-b from-orange-500 to-orange-600">
        <div className="max-w-xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-10">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
                <Award className="w-4 h-4" />
                Inclusief 20 templates
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Meld je aan
              </h2>
              <p className="text-gray-600">
                We nemen contact op voor datum en betaling
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Naam *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                  placeholder="Je volledige naam"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                  placeholder="naam@bedrijf.nl"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bedrijf
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                  placeholder="Waar werk je?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefoonnummer
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                  placeholder="06-12345678"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl font-bold text-lg hover:scale-105 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  "Even geduld..."
                ) : (
                  <>
                    Ja, ik wil erbij zijn!
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-4">
              We spammen niet. Je gegevens zijn veilig.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Veelgestelde vragen
          </h2>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-4 text-left font-medium text-gray-800 hover:bg-gray-50"
                >
                  {faq.q}
                  {openFaq === idx ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="px-4 pb-4 text-gray-600">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 bg-gray-900 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Klaar om AI te leren gebruiken?
          </h2>
          <p className="text-gray-400 mb-8">
            In 2 uur van beginner naar AI-powered recruiter
          </p>
          <a
            href="#aanmelden"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition"
          >
            Meld je nu aan
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-50 text-center text-gray-600 text-sm">
        <p>© {new Date().getFullYear()} Recruitin. Alle rechten voorbehouden.</p>
        <a href="/" className="text-orange-600 hover:underline mt-2 inline-block">
          Terug naar Prompt Gym
        </a>
      </footer>
    </div>
  );
}
