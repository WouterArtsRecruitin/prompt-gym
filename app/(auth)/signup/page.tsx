'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Sparkles, Mail, Lock, User, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import { createClient } from '@/app/lib/supabase/client';

export default function SignupPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      if (error.message.includes('already registered')) {
        setError('Dit emailadres is al geregistreerd. Probeer in te loggen.');
      } else {
        setError(error.message);
      }
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#0f0f12] flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-[#1c1c23] border border-white/[0.06] rounded-[28px] p-8 text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-[#f0ede8] mb-2">Check je inbox!</h2>
            <p className="text-[#9a9a9f] mb-6">
              We hebben een bevestigingslink gestuurd naar <strong className="text-[#f0ede8]">{email}</strong>
            </p>
            <p className="text-sm text-[#6a6a70]">
              Klik op de link in de email om je account te activeren.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f12] flex items-center justify-center p-4">
      {/* Background gradients */}
      <div className="fixed -top-[300px] -right-[200px] w-[700px] h-[700px] bg-[#f5a623]/[0.06] rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[10%] -left-[150px] w-[500px] h-[500px] bg-purple-500/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#f5a623] to-[#e09620] rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-[#0f0f12]" />
            </div>
            <div className="text-left">
              <h1 className="font-bold text-xl text-[#f0ede8]">Prompt Gym</h1>
              <p className="text-xs text-[#6a6a70]">Pro Training</p>
            </div>
          </Link>
        </div>

        {/* Signup Card */}
        <div className="bg-[#1c1c23] border border-white/[0.06] rounded-[28px] p-8 relative overflow-hidden">
          <div className="absolute top-0 left-10 right-10 h-0.5 bg-gradient-to-r from-transparent via-[#f5a623] to-transparent" />

          <h2 className="text-2xl font-bold text-[#f0ede8] mb-2">Account aanmaken</h2>
          <p className="text-[#6a6a70] mb-6">Start je AI recruitment training</p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#9a9a9f] mb-2">
                Naam
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6a6a70]" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Je naam"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-[#24242d] border border-white/[0.06] rounded-xl text-[#f0ede8] placeholder-[#6a6a70] focus:border-[#f5a623] focus:ring-2 focus:ring-[#f5a623]/20 focus:outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#9a9a9f] mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6a6a70]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="naam@bedrijf.nl"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-[#24242d] border border-white/[0.06] rounded-xl text-[#f0ede8] placeholder-[#6a6a70] focus:border-[#f5a623] focus:ring-2 focus:ring-[#f5a623]/20 focus:outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#9a9a9f] mb-2">
                Wachtwoord
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6a6a70]" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimaal 6 karakters"
                  required
                  minLength={6}
                  className="w-full pl-12 pr-4 py-3 bg-[#24242d] border border-white/[0.06] rounded-xl text-[#f0ede8] placeholder-[#6a6a70] focus:border-[#f5a623] focus:ring-2 focus:ring-[#f5a623]/20 focus:outline-none transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#f5a623] to-[#e09620] text-[#0f0f12] py-4 px-6 rounded-xl font-bold text-lg hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#f5a623]/20 transition-all disabled:opacity-50 disabled:hover:translate-y-0 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-[#0f0f12]/30 border-t-[#0f0f12] rounded-full animate-spin" />
              ) : (
                <>
                  Account aanmaken
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <p className="mt-4 text-xs text-[#6a6a70] text-center">
            Door je aan te melden ga je akkoord met onze{' '}
            <Link href="/voorwaarden" className="text-[#f5a623] hover:underline">voorwaarden</Link>
            {' '}en{' '}
            <Link href="/privacy" className="text-[#f5a623] hover:underline">privacy policy</Link>.
          </p>

          <div className="mt-6 text-center">
            <p className="text-[#6a6a70]">
              Al een account?{' '}
              <Link href="/login" className="text-[#f5a623] font-semibold hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>

        {/* Features list */}
        <div className="mt-6 bg-[#1c1c23]/50 border border-white/[0.03] rounded-xl p-4">
          <p className="text-sm text-[#9a9a9f] mb-3">Na registratie krijg je:</p>
          <ul className="space-y-2 text-sm text-[#6a6a70]">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Gratis toegang tot Level 1-3
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Pro trial: Week 1 gratis proberen
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Voortgang wordt bewaard
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
