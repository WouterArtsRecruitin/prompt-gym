'use client';

import Link from 'next/link';

export default function PrivacyPage() {
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
        <h1 className="text-3xl font-bold mb-4">Privacy Statement</h1>
        <p className="text-gray-400 mb-8">Laatst bijgewerkt: {new Date().toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })}</p>

        <div className="bg-[#1c1c23] border border-[#f5a623]/30 rounded-lg p-6 mb-8">
          <p className="text-[#f5a623]">
            Recruitin B.V. respecteert uw privacy en verwerkt persoonsgegevens in overeenstemming met de Algemene Verordening Gegevensbescherming (AVG/GDPR).
          </p>
        </div>

        <div className="space-y-8 text-gray-300 leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">1. Wie zijn wij?</h2>
            <div className="bg-[#1c1c23] rounded-lg p-4">
              <p><strong>Recruitin B.V.</strong></p>
              <p>Verantwoordelijke voor de verwerking van persoonsgegevens</p>
              <p className="mt-2">E-mail: privacy@recruitin.nl</p>
              <p>Website: www.recruitin.nl</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">2. Welke gegevens verzamelen wij?</h2>

            <h3 className="text-lg font-medium text-white mt-4 mb-2">2.1 Gegevens die u aan ons verstrekt:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Contactgegevens:</strong> naam, e-mailadres (bij aanmelding voor workshops, nieuwsbrief of account)</li>
              <li><strong>Bedrijfsgegevens:</strong> bedrijfsnaam, functie (optioneel, bij workshop aanmelding)</li>
              <li><strong>Communicatie:</strong> inhoud van berichten die u ons stuurt</li>
            </ul>

            <h3 className="text-lg font-medium text-white mt-4 mb-2">2.2 Gegevens die automatisch worden verzameld:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Analytische gegevens:</strong> paginabezoeken, klikgedrag, sessieduur (via Google Analytics)</li>
              <li><strong>Technische gegevens:</strong> IP-adres (geanonimiseerd), browsertype, apparaattype</li>
              <li><strong>Voortgang:</strong> game-voortgang in Prompt Gym (lokaal opgeslagen in uw browser)</li>
            </ul>

            <div className="bg-[#1c1c23] border border-green-500/30 rounded-lg p-4 mt-4">
              <p className="text-green-400 font-medium">Wat wij NIET verzamelen:</p>
              <ul className="list-disc pl-6 mt-2 text-green-300">
                <li>Wij verzamelen GEEN inhoud van prompts die u in AI-tools invoert</li>
                <li>Wij hebben GEEN toegang tot uw AI-conversaties</li>
                <li>Wij slaan GEEN oefenantwoorden op onze servers op</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">3. Waarvoor gebruiken wij uw gegevens?</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#2a2a35]">
                  <th className="text-left py-2 text-white">Doel</th>
                  <th className="text-left py-2 text-white">Grondslag</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2a2a35]">
                <tr>
                  <td className="py-3">Leveren van workshops en trainingen</td>
                  <td className="py-3">Uitvoering overeenkomst</td>
                </tr>
                <tr>
                  <td className="py-3">Versturen van bevestigingen en updates</td>
                  <td className="py-3">Uitvoering overeenkomst</td>
                </tr>
                <tr>
                  <td className="py-3">Nieuwsbrief en marketing (alleen met toestemming)</td>
                  <td className="py-3">Toestemming</td>
                </tr>
                <tr>
                  <td className="py-3">Verbeteren van onze diensten</td>
                  <td className="py-3">Gerechtvaardigd belang</td>
                </tr>
                <tr>
                  <td className="py-3">Websiteanalyse en optimalisatie</td>
                  <td className="py-3">Gerechtvaardigd belang</td>
                </tr>
                <tr>
                  <td className="py-3">Beantwoorden van vragen</td>
                  <td className="py-3">Uitvoering overeenkomst</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">4. Hoe lang bewaren wij uw gegevens?</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#2a2a35]">
                  <th className="text-left py-2 text-white">Type gegevens</th>
                  <th className="text-left py-2 text-white">Bewaartermijn</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2a2a35]">
                <tr>
                  <td className="py-3">Accountgegevens</td>
                  <td className="py-3">Tot 2 jaar na laatste activiteit</td>
                </tr>
                <tr>
                  <td className="py-3">Workshop aanmeldingen</td>
                  <td className="py-3">2 jaar na de workshop</td>
                </tr>
                <tr>
                  <td className="py-3">Nieuwsbrief abonnees</td>
                  <td className="py-3">Tot uitschrijving + 30 dagen</td>
                </tr>
                <tr>
                  <td className="py-3">Analytische gegevens</td>
                  <td className="py-3">14 maanden (GA4 standaard)</td>
                </tr>
                <tr>
                  <td className="py-3">Facturen en betalingen</td>
                  <td className="py-3">7 jaar (wettelijke verplichting)</td>
                </tr>
                <tr>
                  <td className="py-3">E-mailcorrespondentie</td>
                  <td className="py-3">1 jaar na laatste contact</td>
                </tr>
              </tbody>
            </table>
            <p className="mt-4 text-sm">Na afloop van de bewaartermijn worden gegevens veilig verwijderd of geanonimiseerd.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">5. Met wie delen wij uw gegevens?</h2>
            <p className="mb-4">Wij delen uw gegevens alleen met:</p>

            <h3 className="text-lg font-medium text-white mt-4 mb-2">5.1 Verwerkers (met verwerkersovereenkomst):</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Pipedrive</strong> - CRM systeem voor leadbeheer (EU servers)</li>
              <li><strong>Google Analytics 4</strong> - Websiteanalyse (geanonimiseerde IP)</li>
              <li><strong>Vercel</strong> - Website hosting (EU/VS met SCCs)</li>
              <li><strong>E-mail provider</strong> - Voor transactionele e-mails</li>
            </ul>

            <h3 className="text-lg font-medium text-white mt-4 mb-2">5.2 Wij delen NOOIT:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Gegevens met derden voor marketingdoeleinden</li>
              <li>Gegevens zonder verwerkersovereenkomst</li>
              <li>Gegevens buiten de EU/EER zonder passende waarborgen</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">6. Cookies en Tracking</h2>

            <h3 className="text-lg font-medium text-white mt-4 mb-2">6.1 Noodzakelijke cookies:</h3>
            <p>Deze zijn nodig voor de werking van de website en kunnen niet worden uitgeschakeld.</p>

            <h3 className="text-lg font-medium text-white mt-4 mb-2">6.2 Analytische cookies (met toestemming):</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Google Analytics 4:</strong> Meet websitegebruik, IP-adressen worden geanonimiseerd</li>
            </ul>

            <h3 className="text-lg font-medium text-white mt-4 mb-2">6.3 Lokale opslag:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>localStorage:</strong> Slaat uw game-voortgang en voorkeuren lokaal op in uw browser. Deze gegevens verlaten nooit uw apparaat.</li>
            </ul>

            <p className="mt-4">U kunt uw cookievoorkeuren wijzigen via de cookie-instellingen onderaan de pagina.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">7. Uw Rechten</h2>
            <p className="mb-4">Op grond van de AVG heeft u de volgende rechten:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Recht op inzage:</strong> U kunt opvragen welke gegevens wij van u hebben</li>
              <li><strong>Recht op rectificatie:</strong> U kunt onjuiste gegevens laten corrigeren</li>
              <li><strong>Recht op verwijdering:</strong> U kunt vragen uw gegevens te verwijderen</li>
              <li><strong>Recht op beperking:</strong> U kunt vragen de verwerking te beperken</li>
              <li><strong>Recht op overdraagbaarheid:</strong> U kunt uw gegevens opvragen in een gangbaar formaat</li>
              <li><strong>Recht van bezwaar:</strong> U kunt bezwaar maken tegen verwerking op basis van gerechtvaardigd belang</li>
              <li><strong>Recht om toestemming in te trekken:</strong> U kunt eerder gegeven toestemming altijd intrekken</li>
            </ul>

            <div className="bg-[#1c1c23] rounded-lg p-4 mt-4">
              <p><strong>Een verzoek indienen?</strong></p>
              <p className="mt-2">Stuur een e-mail naar <a href="mailto:privacy@recruitin.nl" className="text-[#f5a623]">privacy@recruitin.nl</a> met een kopie van uw ID (met foto en BSN afgedekt). Wij reageren binnen 30 dagen.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">8. Beveiliging</h2>
            <p>Wij nemen passende technische en organisatorische maatregelen om uw gegevens te beschermen:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>SSL/TLS-encryptie voor alle dataoverdracht</li>
              <li>Toegangsbeperking tot persoonsgegevens</li>
              <li>Regelmatige beveiligingsupdates</li>
              <li>Verwerkersovereenkomsten met alle verwerkers</li>
            </ul>
          </section>

          <section className="bg-[#1c1c23] border border-red-500/30 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-red-400 mb-4">9. Belangrijke Waarschuwing: AI-tools</h2>
            <p className="mb-4">Wanneer u AI-tools gebruikt (zoals ChatGPT, Claude, etc.) tijdens onze trainingen:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Deze tools worden beheerd door derden, niet door Recruitin B.V.</li>
              <li>Data die u invoert in deze tools valt onder HUN privacybeleid</li>
              <li>Wij hebben geen controle over hoe zij uw gegevens verwerken</li>
              <li><strong className="text-red-300">Voer NOOIT persoonsgegevens in bij AI-tools</strong></li>
              <li><strong className="text-red-300">Anonimiseer ALTIJD alle data voordat u deze invoert</strong></li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">10. Klachten</h2>
            <p>Bent u niet tevreden over hoe wij met uw gegevens omgaan? Neem dan eerst contact met ons op via <a href="mailto:privacy@recruitin.nl" className="text-[#f5a623]">privacy@recruitin.nl</a>.</p>
            <p className="mt-4">U heeft ook het recht om een klacht in te dienen bij de toezichthouder:</p>
            <div className="bg-[#1c1c23] rounded-lg p-4 mt-4">
              <p><strong>Autoriteit Persoonsgegevens</strong></p>
              <p>Website: <a href="https://autoriteitpersoonsgegevens.nl" target="_blank" rel="noopener noreferrer" className="text-[#f5a623]">autoriteitpersoonsgegevens.nl</a></p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">11. Wijzigingen</h2>
            <p>Dit privacy statement kan worden gewijzigd. Bij belangrijke wijzigingen informeren wij u via e-mail of een melding op de website. Controleer regelmatig deze pagina voor de meest recente versie.</p>
          </section>

        </div>

        <div className="mt-12 pt-8 border-t border-[#2a2a35]">
          <div className="flex flex-wrap gap-4 text-sm">
            <Link href="/voorwaarden" className="text-[#f5a623] hover:text-[#ffc107]">Algemene Voorwaarden →</Link>
            <Link href="/disclaimer" className="text-[#f5a623] hover:text-[#ffc107]">Disclaimer →</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
