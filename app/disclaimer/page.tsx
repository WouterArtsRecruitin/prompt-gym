'use client';

import Link from 'next/link';

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-[#0f0f12] text-white">
      {/* Header */}
      <header className="bg-[#1c1c23] border-b border-[#2a2a35]">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link href="/" className="text-[#f5a623] hover:text-[#ffc107] transition-colors">
            ← Terug naar home
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-4">Disclaimer</h1>
        <p className="text-gray-400 mb-8">Laatst bijgewerkt: {new Date().toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })}</p>

        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 mb-8">
          <p className="text-red-400 font-semibold text-lg">
            LEES DEZE DISCLAIMER ZORGVULDIG VOORDAT U GEBRUIK MAAKT VAN PROMPT GYM EN GERELATEERDE DIENSTEN.
          </p>
        </div>

        <div className="space-y-8 text-gray-300 leading-relaxed">

          <section className="bg-[#1c1c23] border border-red-500/50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-red-400 mb-4">1. Geen Garantie op AI-Output</h2>
            <p className="mb-4">Recruitin B.V. geeft <strong>GEEN enkele garantie</strong> met betrekking tot:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>De juistheid, volledigheid of betrouwbaarheid van AI-gegenereerde content</li>
              <li>De geschiktheid van AI-output voor enig specifiek doel</li>
              <li>De afwezigheid van fouten, hallucinaties of misleidende informatie in AI-output</li>
              <li>De resultaten die u behaalt door het toepassen van geleerde technieken</li>
            </ul>
            <p className="mt-4 text-red-300 font-medium">
              AI-systemen kunnen en zullen fouten maken. Verifieer ALTIJD alle AI-output voordat u hierop beslissingen baseert.
            </p>
          </section>

          <section className="bg-[#1c1c23] border border-yellow-500/50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-yellow-400 mb-4">2. Educatief Doel</h2>
            <p className="mb-4">Alle content op dit platform is <strong>uitsluitend voor educatieve doeleinden</strong>:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>De trainingen en workshops zijn geen vervanging voor professioneel advies</li>
              <li>Wij geven geen juridisch, financieel, medisch of HR-advies</li>
              <li>De getoonde voorbeelden en prompts dienen ter illustratie en inspiratie</li>
              <li>Resultaten kunnen variëren afhankelijk van de gebruikte AI-tool en context</li>
            </ul>
          </section>

          <section className="bg-[#1c1c23] border border-red-500/50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-red-400 mb-4">3. Persoonsgegevens en AVG - KRITIEKE WAARSCHUWING</h2>
            <div className="bg-red-500/20 border border-red-500 rounded p-4 mb-4">
              <p className="text-red-300 font-bold text-lg">⚠️ VOER NOOIT PERSOONSGEGEVENS IN BIJ AI-TOOLS</p>
            </div>
            <p className="mb-4">Bij het gebruik van onze trainingen en het werken met AI-tools:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>GEEN echte namen</strong> van kandidaten, medewerkers of klanten invoeren</li>
              <li><strong>GEEN contactgegevens</strong> (telefoonnummers, e-mailadressen, adressen)</li>
              <li><strong>GEEN BSN-nummers</strong> of andere identificatienummers</li>
              <li><strong>GEEN CV's of sollicitatiebrieven</strong> met identificeerbare informatie</li>
              <li><strong>GEEN bedrijfsvertrouwelijke informatie</strong></li>
              <li><strong>GEEN medische of financiële gegevens</strong></li>
            </ul>
            <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded">
              <p className="text-green-400 font-medium">Wat u WEL kunt doen:</p>
              <ul className="list-disc pl-6 mt-2 text-green-300">
                <li>Gebruik fictieve namen (bijv. "Jan de Vries", "Kandidaat A")</li>
                <li>Vervang bedrijfsnamen door "Bedrijf X" of "Klant Y"</li>
                <li>Gebruik gegeneraliseerde functietitels en vaardigheden</li>
                <li>Maak data volledig anoniem voordat u deze invoert</li>
              </ul>
            </div>
            <p className="mt-4 text-red-300">
              <strong>Recruitin B.V. is niet verantwoordelijk voor AVG-overtredingen</strong> die voortvloeien uit het invoeren van persoonsgegevens in externe AI-tools door gebruikers.
            </p>
          </section>

          <section className="bg-[#1c1c23] border border-orange-500/50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-orange-400 mb-4">4. Externe AI-Tools</h2>
            <p className="mb-4">Onze trainingen maken gebruik van externe AI-tools zoals ChatGPT, Claude, Gemini en anderen:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Deze tools worden beheerd door derden (OpenAI, Anthropic, Google, etc.)</li>
              <li>Recruitin B.V. heeft <strong>geen controle</strong> over deze tools</li>
              <li>Wij zijn <strong>niet verantwoordelijk</strong> voor:
                <ul className="list-circle pl-6 mt-2 space-y-1">
                  <li>De beschikbaarheid of werking van deze tools</li>
                  <li>Wijzigingen in functionaliteit of prijzen</li>
                  <li>Hoe deze partijen uw data verwerken</li>
                  <li>Datalekken of beveiligingsincidenten bij deze partijen</li>
                </ul>
              </li>
              <li>U bent zelf verantwoordelijk voor het lezen en accepteren van hun voorwaarden</li>
            </ul>
          </section>

          <section className="bg-[#1c1c23] border border-yellow-500/50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-yellow-400 mb-4">5. Besluitvorming en Recruitment</h2>
            <p className="mb-4">Bij het gebruik van AI in recruitment processen:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>AI mag nooit</strong> de enige factor zijn in selectiebeslissingen</li>
              <li>Alle AI-suggesties moeten door een mens worden beoordeeld</li>
              <li>U bent verantwoordelijk voor het voorkomen van discriminatie en bias</li>
              <li>Controleer AI-output op vooroordelen voordat u deze gebruikt</li>
              <li>Documenteer hoe AI wordt gebruikt in uw processen</li>
            </ul>
            <p className="mt-4 text-yellow-300">
              <strong>Recruitin B.V. is niet aansprakelijk</strong> voor selectiebeslissingen of discriminatieclaims die voortvloeien uit het gebruik van AI door gebruikers.
            </p>
          </section>

          <section className="bg-[#1c1c23] rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">6. Uitsluiting van Aansprakelijkheid</h2>
            <p className="mb-4">Recruitin B.V. sluit, voor zover wettelijk toegestaan, alle aansprakelijkheid uit voor:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Directe schade:</strong> verlies van data, omzet of winst</li>
              <li><strong>Indirecte schade:</strong> gevolgschade, reputatieschade, gederfde kansen</li>
              <li><strong>Schade door derden:</strong> claims van kandidaten, klanten of toezichthouders</li>
              <li><strong>AVG-boetes:</strong> opgelegd vanwege handelen van de gebruiker</li>
              <li><strong>Technische problemen:</strong> downtime, dataverlies, of bugs</li>
              <li><strong>AI-fouten:</strong> onjuiste, onvolledige of misleidende AI-output</li>
            </ul>
            <p className="mt-4">
              <strong>Maximale aansprakelijkheid:</strong> Indien aansprakelijkheid toch wordt vastgesteld, is deze beperkt tot maximaal het bedrag dat u heeft betaald voor de betreffende dienst, met een absoluut maximum van €100,-.
            </p>
          </section>

          <section className="bg-[#1c1c23] rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">7. Vrijwaring</h2>
            <p>U vrijwaart Recruitin B.V., haar bestuurders, medewerkers en partners volledig tegen:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Alle claims van derden voortvloeiend uit uw gebruik van het platform</li>
              <li>Kosten (inclusief juridische kosten) gerelateerd aan dergelijke claims</li>
              <li>Schade veroorzaakt door schending van deze voorwaarden door u</li>
              <li>Gevolgen van het invoeren van persoonsgegevens in AI-tools</li>
            </ul>
          </section>

          <section className="bg-[#1c1c23] rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">8. Eigen Verantwoordelijkheid</h2>
            <p className="mb-4">Door gebruik te maken van onze diensten erkent u dat:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>U zelf verantwoordelijk bent voor het naleven van wet- en regelgeving</li>
              <li>U AI-output altijd verifieert voordat u hierop handelt</li>
              <li>U data anonimiseert voordat u deze in AI-tools invoert</li>
              <li>U de volledige verantwoordelijkheid draagt voor uw beslissingen</li>
              <li>U deze disclaimer heeft gelezen en begrepen</li>
            </ul>
          </section>

          <section className="bg-[#1c1c23] rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">9. Wijzigingen</h2>
            <p>Recruitin B.V. behoudt zich het recht voor deze disclaimer te allen tijde te wijzigen. Controleer deze pagina regelmatig. Voortgezet gebruik na wijzigingen betekent acceptatie van de nieuwe voorwaarden.</p>
          </section>

          <section className="bg-[#1c1c23] rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">10. Contact</h2>
            <p>Heeft u vragen over deze disclaimer?</p>
            <div className="mt-4">
              <p><strong>Recruitin B.V.</strong></p>
              <p>E-mail: <a href="mailto:info@recruitin.nl" className="text-[#f5a623]">info@recruitin.nl</a></p>
            </div>
          </section>

        </div>

        <div className="mt-12 pt-8 border-t border-[#2a2a35]">
          <p className="text-sm text-gray-500 mb-4">
            Door gebruik te maken van Prompt Gym en gerelateerde diensten van Recruitin B.V. verklaart u deze disclaimer te hebben gelezen, begrepen en geaccepteerd.
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <Link href="/voorwaarden" className="text-[#f5a623] hover:text-[#ffc107]">Algemene Voorwaarden →</Link>
            <Link href="/privacy" className="text-[#f5a623] hover:text-[#ffc107]">Privacy Statement →</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
