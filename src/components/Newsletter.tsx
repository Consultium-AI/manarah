import Reveal from './Reveal';

export default function Newsletter() {
  return (
    <section className="mt-20">
      <div className="py-16">
        <div className="container-max text-center">
          <Reveal>
            <h3 className="text-4xl sm:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              <span className="inline-block bg-sky-200 px-3 py-2 rounded-md mr-2 text-blue-800">Doe mee</span>
              met Stichting Manarah
            </h3>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-gray-800 text-xl sm:text-2xl max-w-5xl mx-auto">
              Samen kunnen we meer bereiken. Sluit je aan bij ons werk via onze WhatsApp-community. Andere opties worden binnenkort beschikbaar!
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex items-center justify-center gap-5 flex-wrap">
              <a
                href="https://stichtingmanarah.nl/nieuwsbrief.php"
                className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-xl font-bold shadow text-xl"
              >
                Nieuwsbrief
              </a>
              <a
                href="https://chat.whatsapp.com/GKb3l0Fi67H4YhayEDnBLX"
                className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-xl font-bold shadow text-xl"
                target="_blank" rel="noreferrer"
              >
                WhatsApp-groep
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}


