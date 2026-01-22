export default function Footer() {
  return (
    <footer className="mt-16 text-sm">
      {/* Dark layout like reference, content unchanged */}
      <div className="bg-neutral-800 text-neutral-100">
        <div className="container-max py-20 grid md:grid-cols-12 gap-10 md:gap-16 text-lg items-start">
          {/* Contact */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-3xl font-extrabold mb-4">Contact</h4>
            <p className="leading-relaxed">
              <a href="mailto:info@stichtingmanarah.nl" className="hover:underline">info@stichtingmanarah.nl</a>
            </p>
            <p className="leading-relaxed">
              <a href="https://wa.me/31103602862" target="_blank" rel="noreferrer" className="hover:underline">+31 10 360 2862</a>
            </p>
          </div>

          {/* Stichtinggegevens */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-3xl font-extrabold mb-4">Stichtinggegevens</h4>
            <p className="leading-relaxed">KvK: 97004332</p>
            <p className="leading-relaxed">RSIN: 86780667</p>
            <p className="leading-relaxed">Gevestigd in Rotterdam</p>
          </div>

          {/* Doneren */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-3xl font-extrabold mb-4">Doneren</h4>
            <p className="leading-relaxed">IBAN: <span className="font-mono">NL17RABO0141712287</span></p>
            <p className="leading-relaxed">t.n.v. Stichting Manarah</p>
            <p className="pt-1">
              <a href="https://stichtingmanarah.nl/doneren.php" className="text-blue-400 hover:underline font-medium">Online doneren →</a>
            </p>
          </div>
        </div>
      </div>

      {/* Legal row */}
      <div className="bg-neutral-900 text-neutral-400 border-t border-neutral-700">
        <div className="container-max py-6 text-center text-sm space-y-3">
          <p>© 2025 Stichting Manarah. Alle rechten voorbehouden.</p>
          <p className="flex flex-wrap justify-center gap-x-2 gap-y-1">
            <a href="https://stichtingmanarah.nl/assets/docs/beleidsplan.pdf" target="_blank" rel="noreferrer" className="hover:underline">Beleidsplan</a>
            <a href="https://stichtingmanarah.nl/assets/docs/privacyverklaring.pdf" target="_blank" rel="noreferrer" className="hover:underline">Privacyverklaring</a>
            <a href="https://stichtingmanarah.nl/assets/docs/voorwaarden.pdf" target="_blank" rel="noreferrer" className="hover:underline">Algemene voorwaarden</a>
            <a href="https://stichtingmanarah.nl/assets/docs/contactverklaring.pdf" target="_blank" rel="noreferrer" className="hover:underline">Contactverklaring</a>
            <a href="https://stichtingmanarah.nl/assets/docs/donatiebeleid.pdf" target="_blank" rel="noreferrer" className="hover:underline">Donatiebeleid</a>
          </p>
        </div>
      </div>
    </footer>
  );
}


