export default function AuthCodeErrorPage() {
  return (
    <div className="min-h-screen bg-[#0f0f12] text-[#f0ede8] flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Inloggen mislukt</h1>
        <p className="text-[#9a9a9f] mb-8">
          Er ging iets mis bij het verwerken van je login. Probeer het opnieuw.
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="/login"
            className="bg-[#f5a623] text-[#0f0f12] px-6 py-3 rounded-xl font-semibold hover:bg-[#e09620] transition"
          >
            Opnieuw inloggen
          </a>
          <a
            href="/"
            className="border border-white/[0.1] px-6 py-3 rounded-xl font-semibold hover:bg-[#1c1c23] transition"
          >
            Naar home
          </a>
        </div>
      </div>
    </div>
  );
}
