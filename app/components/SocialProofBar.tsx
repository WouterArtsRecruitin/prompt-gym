'use client';

import React, { useState, useEffect } from 'react';
import { Users, TrendingUp, Star, CheckCircle } from 'lucide-react';

const recentActivities = [
  { name: 'Lisa', action: 'voltooide Level 3', time: '2 min geleden' },
  { name: 'Mark', action: 'meldde zich aan voor de workshop', time: '5 min geleden' },
  { name: 'Sophie', action: 'downloadde de templates', time: '8 min geleden' },
  { name: 'Thomas', action: 'voltooide Level 2', time: '12 min geleden' },
  { name: 'Emma', action: 'startte de training', time: '15 min geleden' },
  { name: 'David', action: 'meldde zich aan voor de workshop', time: '18 min geleden' },
];

export function SocialProofBar() {
  const [currentActivity, setCurrentActivity] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show after 3 seconds
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    // Rotate activities
    const rotateTimer = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentActivity((prev) => (prev + 1) % recentActivities.length);
        setIsVisible(true);
      }, 500);
    }, 8000);

    return () => {
      clearTimeout(showTimer);
      clearInterval(rotateTimer);
    };
  }, []);

  const activity = recentActivities[currentActivity];

  return (
    <div
      className={`fixed bottom-20 left-4 z-40 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="bg-[#1c1c23] border border-white/10 rounded-xl p-4 shadow-xl max-w-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#f5a623] to-[#e09620] rounded-full flex items-center justify-center text-[#0f0f12] font-bold text-sm">
            {activity.name.charAt(0)}
          </div>
          <div className="flex-1">
            <p className="text-white text-sm font-medium">
              <span className="text-[#f5a623]">{activity.name}</span> {activity.action}
            </p>
            <p className="text-[#6a6a70] text-xs">{activity.time}</p>
          </div>
          <CheckCircle className="w-5 h-5 text-green-500" />
        </div>
      </div>
    </div>
  );
}

export function StatsBar() {
  return (
    <div className="bg-[#16161b] border-y border-white/[0.06] py-6">
      <div className="max-w-[1140px] mx-auto px-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-5 h-5 text-[#f5a623]" />
              <span className="text-2xl sm:text-3xl font-bold text-white">847+</span>
            </div>
            <span className="text-sm text-[#6a6a70]">Recruiters getraind</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <span className="text-2xl sm:text-3xl font-bold text-white">3x</span>
            </div>
            <span className="text-sm text-[#6a6a70]">Sneller CV's screenen</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-1">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="text-2xl sm:text-3xl font-bold text-white">4.9/5</span>
            </div>
            <span className="text-sm text-[#6a6a70]">Gemiddelde rating</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle className="w-5 h-5 text-[#f5a623]" />
              <span className="text-2xl sm:text-3xl font-bold text-white">20+</span>
            </div>
            <span className="text-sm text-[#6a6a70]">Templates beschikbaar</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ClientLogos() {
  const logos = [
    { name: 'TechTalent', initials: 'TT' },
    { name: 'ScaleUp BV', initials: 'SU' },
    { name: 'HR Solutions', initials: 'HR' },
    { name: 'Talent Hub', initials: 'TH' },
    { name: 'Recruit Pro', initials: 'RP' },
    { name: 'People First', initials: 'PF' },
  ];

  return (
    <div className="py-12 bg-[#0f0f12]">
      <div className="max-w-[1140px] mx-auto px-6">
        <p className="text-center text-sm text-[#6a6a70] mb-8 uppercase tracking-wider">
          Vertrouwd door recruiters bij
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
          {logos.map((logo, idx) => (
            <div
              key={idx}
              className="w-24 h-12 bg-[#1c1c23] rounded-lg flex items-center justify-center text-[#6a6a70] font-bold text-sm border border-white/[0.06]"
            >
              {logo.initials}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
