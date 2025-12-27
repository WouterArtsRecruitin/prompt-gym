'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Trophy,
  Flame,
  Clock,
  ChevronRight,
  Lock,
  Star,
  Gift,
  LogOut,
  Settings,
  Zap,
} from 'lucide-react';
import { createClient } from '@/app/lib/supabase/client';
import { modules, getAvailableModules, getComingSoonModules, getModuleProgress } from '@/app/data/weeks';
import { Profile, UserProgress } from '@/app/types/database';

export default function DashboardPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const [profileRes, progressRes] = await Promise.all([
          supabase.from('profiles').select('*').eq('id', user.id).single(),
          supabase.from('user_progress').select('*').eq('user_id', user.id).single(),
        ]);

        setProfile(profileRes.data);
        setProgress(progressRes.data);
      }
      setLoading(false);
    }

    loadData();
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const handleUpgrade = async () => {
    const res = await fetch('/api/stripe/create-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceType: 'monthly' }),
    });
    const { url } = await res.json();
    if (url) window.location.href = url;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f12] flex items-center justify-center">
        <div className="w-16 h-16 bg-gradient-to-br from-[#f5a623] to-[#e09620] rounded-2xl animate-pulse flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-[#0f0f12]" />
        </div>
      </div>
    );
  }

  const availableModules = getAvailableModules();
  const comingSoonModules = getComingSoonModules();
  const completedWeeks = progress?.completed_weeks || [];
  const isProSubscriber = profile?.subscription_status === 'active';

  return (
    <div className="min-h-screen bg-[#0f0f12] text-[#f0ede8] p-4 sm:p-8">
      {/* Background gradients */}
      <div className="fixed -top-[300px] -right-[200px] w-[700px] h-[700px] bg-[#f5a623]/[0.06] rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[10%] -left-[150px] w-[500px] h-[500px] bg-purple-500/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#f5a623] to-[#e09620] rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-[#0f0f12]" />
            </div>
            <div>
              <h1 className="font-bold text-xl">Prompt Gym Pro</h1>
              <p className="text-sm text-[#6a6a70]">
                Welkom, {profile?.full_name || profile?.email?.split('@')[0]}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/account"
              className="p-2 bg-[#1c1c23] border border-white/[0.06] rounded-lg hover:border-white/[0.12] transition"
            >
              <Settings className="w-5 h-5 text-[#9a9a9f]" />
            </Link>
            <button
              onClick={handleLogout}
              className="p-2 bg-[#1c1c23] border border-white/[0.06] rounded-lg hover:border-white/[0.12] transition"
            >
              <LogOut className="w-5 h-5 text-[#9a9a9f]" />
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#1c1c23] border border-white/[0.06] rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-4 h-4 text-[#f5a623]" />
              <span className="text-xs text-[#6a6a70]">Score</span>
            </div>
            <p className="text-2xl font-bold">{progress?.total_score || 0}</p>
          </div>
          <div className="bg-[#1c1c23] border border-white/[0.06] rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="text-xs text-[#6a6a70]">Streak</span>
            </div>
            <p className="text-2xl font-bold">{progress?.streak_days || 0} dagen</p>
          </div>
          <div className="bg-[#1c1c23] border border-white/[0.06] rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-purple-500" />
              <span className="text-xs text-[#6a6a70]">Voltooid</span>
            </div>
            <p className="text-2xl font-bold">{completedWeeks.length}/36</p>
          </div>
          <div className="bg-[#1c1c23] border border-white/[0.06] rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-blue-500" />
              <span className="text-xs text-[#6a6a70]">Tijd</span>
            </div>
            <p className="text-2xl font-bold">{Math.round((progress?.total_time_minutes || 0) / 60)}u</p>
          </div>
        </div>

        {/* Subscription Banner (if not subscribed) */}
        {!isProSubscriber && (
          <div className="bg-gradient-to-r from-[#f5a623]/20 to-purple-500/20 border border-[#f5a623]/30 rounded-2xl p-6 mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold mb-1 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-[#f5a623]" />
                  Upgrade naar Pro
                </h3>
                <p className="text-[#9a9a9f] text-sm">
                  Krijg toegang tot alle 36 weken training voor €49/maand
                </p>
              </div>
              <button
                onClick={handleUpgrade}
                className="bg-gradient-to-r from-[#f5a623] to-[#e09620] text-[#0f0f12] px-6 py-3 rounded-xl font-bold hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#f5a623]/20 transition-all"
              >
                Start Pro
              </button>
            </div>
          </div>
        )}

        {/* Available Modules (1-3) */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-4">Jouw Training</h2>
          <p className="text-[#6a6a70] mb-6">Maand 1-3: Pro Start</p>

          <div className="grid gap-4">
            {availableModules.map((module) => {
              const moduleProgress = getModuleProgress(completedWeeks, module.id);
              const isLocked = !isProSubscriber && module.id > 1;

              return (
                <div
                  key={module.id}
                  className={`bg-[#1c1c23] border border-white/[0.06] rounded-2xl p-6 relative overflow-hidden ${
                    isLocked ? 'opacity-60' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 bg-gradient-to-br ${module.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <span className="text-2xl font-bold text-white">{module.id}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs text-[#6a6a70]">{module.month}</span>
                          {isLocked && <Lock className="w-3 h-3 text-[#6a6a70]" />}
                        </div>
                        <h3 className="text-lg font-bold mb-1">{module.title}</h3>
                        <p className="text-[#9a9a9f] text-sm mb-3">{module.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {module.highlights?.map((h, i) => (
                            <span key={i} className="text-xs bg-white/5 text-[#9a9a9f] px-2 py-1 rounded">
                              {h}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-[#6a6a70] mb-2">{moduleProgress}%</p>
                      {!isLocked ? (
                        <Link
                          href={`/pro/week/${module.weeks[0]}`}
                          className="inline-flex items-center gap-1 text-[#f5a623] text-sm font-semibold hover:underline"
                        >
                          Ga verder
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      ) : (
                        <button
                          onClick={handleUpgrade}
                          className="text-[#f5a623] text-sm font-semibold hover:underline"
                        >
                          Unlock
                        </button>
                      )}
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="mt-4 h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${module.color} transition-all`}
                      style={{ width: `${moduleProgress}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Coming Soon Modules (4-9) */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-xl font-bold">Coming Soon</h2>
            <span className="bg-purple-500/20 text-purple-300 text-xs font-semibold px-2 py-1 rounded">
              Maand 4-9
            </span>
          </div>
          <p className="text-[#6a6a70] mb-6">
            Verleng je abonnement en krijg toegang tot geavanceerde modules
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {comingSoonModules.map((module) => (
              <div
                key={module.id}
                className="bg-[#1c1c23]/50 border border-white/[0.03] rounded-2xl p-5 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 bg-white/5 text-[#6a6a70] text-xs px-3 py-1 rounded-bl-xl">
                  {module.month}
                </div>

                <div className={`w-10 h-10 bg-gradient-to-br ${module.color} rounded-lg flex items-center justify-center mb-3 opacity-50`}>
                  <Lock className="w-5 h-5 text-white" />
                </div>

                <h3 className="font-bold mb-1">{module.title}</h3>
                <p className="text-[#6a6a70] text-sm mb-3">{module.description}</p>

                <ul className="space-y-1">
                  {module.highlights?.slice(0, 2).map((h, i) => (
                    <li key={i} className="text-xs text-[#6a6a70] flex items-center gap-2">
                      <span className="w-1 h-1 bg-[#6a6a70] rounded-full" />
                      {h}
                    </li>
                  ))}
                </ul>

                {module.bonus && (
                  <div className="mt-3 flex items-center gap-2 text-[#f5a623]">
                    <Gift className="w-4 h-4" />
                    <span className="text-xs font-semibold">{module.bonus}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-purple-500/10 to-fuchsia-500/10 border border-purple-500/20 rounded-2xl p-6 text-center">
          <h3 className="text-lg font-bold mb-2">9 Maanden = AI Recruitment Expert</h3>
          <p className="text-[#9a9a9f] text-sm mb-4">
            36 weken training • 36+ templates • Personal coaching call
          </p>
          <p className="text-[#f5a623] font-bold">
            Totale waarde: €460 lifetime
          </p>
        </div>
      </div>
    </div>
  );
}
