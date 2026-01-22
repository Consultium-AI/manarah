export default function CTA() {
  return (
    <section className="mt-16 bg-blue-50 border border-blue-100 rounded-xl p-6 sm:p-8 max-w-3xl mx-auto shadow">
      <h3 className="text-2xl font-bold mb-4 text-center text-blue-800">🌟 Doe mee met Stichting Manarah</h3>
      <p className="text-center mb-6 text-gray-700 text-sm sm:text-base leading-relaxed">
        Samen kunnen we meer bereiken. Sluit je aan bij ons werk via onze WhatsApp-community.
        Andere opties worden binnenkort beschikbaar!
      </p>
      <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4">
        <a href="https://stichtingmanarah.nl/doneren.php" className="bg-blue-600 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-blue-700 transition flex items-center gap-2 shadow">
          Doneer nu
        </a>
        <a href="https://stichtingmanarah.nl/nieuwsbrief.php" className="bg-violet-700 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-violet-800 transition flex items-center gap-2 shadow">
          Nieuwsbrief
        </a>
        <a href="https://chat.whatsapp.com/GKb3l0Fi67H4YhayEDnBLX" target="_blank" rel="noreferrer" className="bg-green-600 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-green-700 transition flex items-center gap-2 shadow">
          WhatsApp-groep
        </a>
      </div>
    </section>
  );
}


