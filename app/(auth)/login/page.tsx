'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Sparkles, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { createClient } from '@/app/lib/supabase/client';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message === 'Invalid login credentials'
        ? 'Onjuiste email of wachtwoord'
        : error.message);
      setLoading(false);
      return;
    }

    router.push(redirect);
    router.refresh();
  };

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

        {/* Login Card */}
        <div className="bg-[#1c1c23] border border-white/[0.06] rounded-[28px] p-8 relative overflow-hidden">
          <div className="absolute top-0 left-10 right-10 h-0.5 bg-gradient-to-r from-transparent via-[#f5a623] to-transparent" />

          <h2 className="text-2xl font-bold text-[#f0ede8] mb-2">Welkom terug</h2>
          <p className="text-[#6a6a70] mb-6">Log in om verder te gaan met je training</p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
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
                  placeholder="Je wachtwoord"
                  required
                  minLength={6}
                  className="w-full pl-12 pr-4 py-3 bg-[#24242d] border border-white/[0.06] rounded-xl text-[#f0ede8] placeholder-[#6a6a70] focus:border-[#f5a623] focus:ring-2 focus:ring-[#f5a623]/20 focus:outline-none transition"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Link
                href="/reset-password"
                className="text-sm text-[#f5a623] hover:underline"
              >
                Wachtwoord vergeten?
              </Link>
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
                  Inloggen
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[#6a6a70]">
              Nog geen account?{' '}
              <Link href="/signup" className="text-[#f5a623] font-semibold hover:underline">
                Start gratis
              </Link>
            </p>
          </div>
        </div>

        {/* Back to game link */}
        <div className="mt-6 text-center">
          <Link href="/game" className="text-[#6a6a70] hover:text-[#f0ede8] transition text-sm">
            Of probeer eerst de gratis oefenlevels
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0f0f12] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#f5a623]/30 border-t-[#f5a623] rounded-full animate-spin" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
