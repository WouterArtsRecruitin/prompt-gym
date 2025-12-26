'use client';

import Link from 'next/link';

export default function VoorwaardenPage() {
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
        <h1 className="text-3xl font-bold mb-8">Algemene Voorwaarden</h1>
        <p className="text-gray-400 mb-8">Laatst bijgewerkt: {new Date().toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })}</p>

        <div className="space-y-8 text-gray-300 leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Artikel 1 - Definities</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Recruitin B.V.</strong>: de besloten vennootschap Recruitin B.V., gevestigd te Nederland, hierna te noemen "Recruitin", "wij" of "ons".</li>
              <li><strong>Platform</strong>: de website Prompt Gym en alle daarop aangeboden diensten, trainingen, workshops en tools.</li>
              <li><strong>Gebruiker</strong>: iedere natuurlijke of rechtspersoon die gebruik maakt van het Platform.</li>
              <li><strong>AI-tools</strong>: externe kunstmatige intelligentie systemen zoals ChatGPT, Claude, Gemini en vergelijkbare diensten.</li>
              <li><strong>Content</strong>: alle teksten, prompts, oefeningen en materialen op het Platform.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Artikel 2 - Toepasselijkheid</h2>
            <p>2.1 Deze algemene voorwaarden zijn van toepassing op elk gebruik van het Platform en alle diensten die Recruitin B.V. aanbiedt.</p>
            <p className="mt-2">2.2 Door gebruik te maken van het Platform accepteert de Gebruiker deze voorwaarden volledig en onvoorwaardelijk.</p>
            <p className="mt-2">2.3 Recruitin B.V. behoudt zich het recht voor deze voorwaarden te allen tijde te wijzigen. Wijzigingen treden in werking vanaf het moment van publicatie op het Platform.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Artikel 3 - Aard van de Diensten</h2>
            <p>3.1 Het Platform biedt educatieve content en oefenmateriaal voor het leren werken met AI-tools in een professionele context.</p>
            <p className="mt-2">3.2 De trainingen en workshops zijn uitsluitend bedoeld voor educatieve doeleinden en vormen geen professioneel advies.</p>
            <p className="mt-2">3.3 Recruitin B.V. is geen aanbieder van AI-diensten en heeft geen controle over de werking, beschikbaarheid of output van externe AI-tools.</p>
          </section>

          <section className="bg-[#1c1c23] border border-red-500/30 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-red-400 mb-4">Artikel 4 - Belangrijke Gebruiksvoorwaarden voor Data</h2>
            <p className="text-red-300 font-medium mb-4">DE GEBRUIKER VERKLAART EN GARANDEERT:</p>
            <ul className="list-disc pl-6 space-y-3">
              <li><strong>4.1 Geen persoonsgegevens:</strong> De Gebruiker zal GEEN persoonsgegevens, BSN-nummers, namen, adressen, telefoonnummers, e-mailadressen of andere identificeerbare informatie van derden invoeren in AI-tools tijdens het gebruik van het Platform.</li>
              <li><strong>4.2 Anonimiseren:</strong> Alle data die de Gebruiker invoert in AI-tools moet volledig geanonimiseerd zijn. Namen dienen vervangen te worden door fictieve namen, bedrijfsnamen door "Bedrijf X", en alle identificeerbare gegevens dienen verwijderd of gemaskeerd te worden.</li>
              <li><strong>4.3 Geen vertrouwelijke informatie:</strong> De Gebruiker zal geen bedrijfsgeheimen, vertrouwelijke bedrijfsinformatie, medische gegevens, financiële gegevens of andere gevoelige informatie invoeren in AI-tools.</li>
              <li><strong>4.4 Eigen verantwoordelijkheid:</strong> De Gebruiker is volledig verantwoordelijk voor alle data die hij/zij invoert in externe AI-tools. Recruitin B.V. heeft geen zicht op, controle over, of verantwoordelijkheid voor deze data.</li>
              <li><strong>4.5 AVG-compliance:</strong> De Gebruiker is zelf verantwoordelijk voor naleving van de Algemene Verordening Gegevensbescherming (AVG/GDPR) bij het gebruik van AI-tools.</li>
            </ul>
          </section>

          <section className="bg-[#1c1c23] border border-yellow-500/30 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-yellow-400 mb-4">Artikel 5 - Disclaimer en Aansprakelijkheid</h2>
            <p className="mb-4"><strong>5.1 Geen garanties:</strong> Het Platform en alle content worden aangeboden "as is" zonder enige garantie, expliciet of impliciet, met betrekking tot:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>De juistheid, volledigheid of actualiteit van de informatie</li>
              <li>De geschiktheid voor een bepaald doel</li>
              <li>De werking of beschikbaarheid van externe AI-tools</li>
              <li>De kwaliteit of betrouwbaarheid van AI-gegenereerde output</li>
            </ul>

            <p className="mb-4"><strong>5.2 Uitsluiting aansprakelijkheid:</strong> Recruitin B.V. is NIET aansprakelijk voor:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Directe of indirecte schade voortvloeiend uit het gebruik van het Platform</li>
              <li>Fouten, onnauwkeurigheden of hallucinaties in AI-gegenereerde content</li>
              <li>Beslissingen genomen op basis van AI-output of trainingsmateriaal</li>
              <li>Schade door het invoeren van data in externe AI-tools</li>
              <li>Datalekken bij externe AI-providers</li>
              <li>Schending van privacy of AVG door handelen van de Gebruiker</li>
              <li>Verlies van data, omzet of reputatie</li>
              <li>Claims van derden voortvloeiend uit gebruik door de Gebruiker</li>
            </ul>

            <p className="mb-4"><strong>5.3 Maximale aansprakelijkheid:</strong> Indien Recruitin B.V. ondanks het voorgaande aansprakelijk wordt gehouden, is deze aansprakelijkheid beperkt tot maximaal het bedrag dat de Gebruiker heeft betaald voor de betreffende dienst, met een maximum van €100,-.</p>

            <p><strong>5.4 Vrijwaring:</strong> De Gebruiker vrijwaart Recruitin B.V. volledig tegen alle claims, aanspraken en kosten (inclusief juridische kosten) van derden die voortvloeien uit het gebruik van het Platform door de Gebruiker, inclusief maar niet beperkt tot claims wegens schending van privacy, AVG, of intellectuele eigendomsrechten.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Artikel 6 - AI-Output en Verificatie</h2>
            <p>6.1 AI-tools kunnen onjuiste, misleidende of verzonnen informatie genereren ("hallucinaties"). De Gebruiker dient ALTIJD AI-output te verifiëren voordat deze wordt gebruikt.</p>
            <p className="mt-2">6.2 AI-gegenereerde content mag nooit zonder verificatie worden gebruikt voor:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Juridische beslissingen of adviezen</li>
              <li>Medische beslissingen of adviezen</li>
              <li>Financiële beslissingen</li>
              <li>Selectiebeslissingen over personen</li>
              <li>Publicatie zonder menselijke review</li>
            </ul>
            <p className="mt-2">6.3 De Gebruiker blijft te allen tijde eindverantwoordelijk voor alle beslissingen en handelingen, ook wanneer deze zijn gebaseerd op AI-output.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Artikel 7 - Intellectueel Eigendom</h2>
            <p>7.1 Alle content op het Platform, inclusief teksten, ontwerpen, logo's en prompts, is eigendom van Recruitin B.V. of haar licentiegevers.</p>
            <p className="mt-2">7.2 De Gebruiker verkrijgt een beperkt, niet-exclusief, niet-overdraagbaar recht om de content te gebruiken voor persoonlijke of interne bedrijfsdoeleinden.</p>
            <p className="mt-2">7.3 Het is niet toegestaan om content te kopiëren, verspreiden, verkopen of te gebruiken voor commerciële doeleinden zonder schriftelijke toestemming.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Artikel 8 - Betalingen en Abonnementen</h2>
            <p>8.1 Voor betaalde diensten gelden de op het moment van bestelling vermelde prijzen.</p>
            <p className="mt-2">8.2 Abonnementen worden automatisch verlengd tenzij tijdig opgezegd volgens de opzegvoorwaarden.</p>
            <p className="mt-2">8.3 Restitutie is alleen mogelijk binnen 14 dagen na aankoop, mits de Gebruiker nog geen substantieel gebruik heeft gemaakt van de dienst.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Artikel 9 - Beëindiging</h2>
            <p>9.1 Recruitin B.V. behoudt zich het recht voor om toegang tot het Platform te weigeren of te beëindigen bij schending van deze voorwaarden.</p>
            <p className="mt-2">9.2 Bij beëindiging vervallen alle rechten van de Gebruiker, maar blijven de bepalingen over aansprakelijkheid en vrijwaring van kracht.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Artikel 10 - Toepasselijk Recht en Geschillen</h2>
            <p>10.1 Op deze voorwaarden en alle geschillen is uitsluitend Nederlands recht van toepassing.</p>
            <p className="mt-2">10.2 Geschillen worden voorgelegd aan de bevoegde rechter in het arrondissement waar Recruitin B.V. is gevestigd.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Artikel 11 - Contact</h2>
            <p>Voor vragen over deze voorwaarden kunt u contact opnemen met:</p>
            <div className="mt-4 bg-[#1c1c23] rounded-lg p-4">
              <p><strong>Recruitin B.V.</strong></p>
              <p>E-mail: info@recruitin.nl</p>
              <p>Website: www.recruitin.nl</p>
            </div>
          </section>

        </div>

        <div className="mt-12 pt-8 border-t border-[#2a2a35]">
          <div className="flex flex-wrap gap-4 text-sm">
            <Link href="/privacy" className="text-[#f5a623] hover:text-[#ffc107]">Privacy Statement →</Link>
            <Link href="/disclaimer" className="text-[#f5a623] hover:text-[#ffc107]">Disclaimer →</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
