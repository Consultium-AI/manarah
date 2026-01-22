import { useState } from 'react';
import Reveal from './Reveal';

type Frequency = 'eenmalig' | 'maandelijks' | 'jaarlijks';
const presetAmounts = [25, 50, 75];

export default function Donate() {
  const [frequency, setFrequency] = useState<Frequency>('eenmalig');
  const [selected, setSelected] = useState<number | null>(25);
  const [custom, setCustom] = useState<string>('');

  return (
    <section id="donate" className="mt-20">
      <div className="bg-blue-700 text-white">
        <div className="container-max py-16">
          {/* Title */}
          <Reveal direction="left">
            <h3 className="text-3xl sm:text-5xl font-extrabold leading-tight mb-6">
              <span className="inline-block bg-white text-blue-700 px-3 py-2 rounded-md mr-2">Doneer</span>
              en help mensen in nood op eigen benen te staan
            </h3>
          </Reveal>

          {/* Subcopy */}
          <Reveal direction="left" delay={0.1}>
            <p className="text-white/90 max-w-3xl mb-8">
              Je kunt ook als kerk of organisatie doneren.
            </p>
          </Reveal>

          {/* Frequency */}
          <Reveal direction="left" delay={0.15}>
            <div className="flex flex-wrap gap-4 mb-6">
            {(['eenmalig', 'maandelijks', 'jaarlijks'] as Frequency[]).map((f) => (
              <button
                key={f}
                onClick={() => setFrequency(f)}
                className={`min-w-[180px] px-6 py-4 rounded-lg font-semibold border transition ${
                  frequency === f ? 'bg-white text-blue-700 border-transparent' : 'bg-blue-600/40 text-white border-white/20 hover:bg-blue-600/60'
                }`}
              >
                {f === 'eenmalig' ? 'Eenmalig' : f === 'maandelijks' ? 'Maandelijks' : 'Jaarlijks'}
              </button>
            ))}
            </div>
          </Reveal>

          {/* Amounts */}
          <Reveal direction="left" delay={0.2}>
            <div className="flex flex-wrap gap-4 mb-6">
            {presetAmounts.map((amt) => (
              <button
                key={amt}
                onClick={() => { setSelected(amt); setCustom(''); }}
                className={`w-40 px-6 py-4 rounded-lg font-bold border transition ${
                  selected === amt ? 'bg-white text-blue-700 border-transparent' : 'bg-blue-600/40 text-white border-white/20 hover:bg-blue-600/60'
                }`}
              >
                € {amt}
              </button>
            ))}
            <input
              inputMode="decimal"
              placeholder="1"
              value={custom}
              onChange={(e) => { setCustom(e.target.value); setSelected(null); }}
              className="w-40 px-6 py-4 rounded-lg font-bold border bg-blue-600/20 text-white placeholder-white/70 border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
            />
            </div>
          </Reveal>

          {/* CTA */}
          <Reveal direction="left" delay={0.25}>
            <div className="flex flex-col gap-6">
              <div className="grid md:grid-cols-2 gap-4">
                <label className="flex items-center gap-3 text-white/90 bg-blue-600/20 rounded-xl px-4 py-3 border border-white/20">
                  <input type="checkbox" className="accent-white" />
                  Ik wil de transactiekosten van Mollie meebetalen (optioneel).
                </label>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-white/90 mb-1">Naam</div>
                  <input className="w-full rounded-xl border border-white/20 bg-blue-600/10 text-white placeholder-white/70 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/40" placeholder="Jouw naam" />
                </div>
                <div>
                  <div className="text-white/90 mb-1">E-mailadres</div>
                  <input className="w-full rounded-xl border border-white/20 bg-blue-600/10 text-white placeholder-white/70 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/40" placeholder="naam@voorbeeld.nl" />
                </div>
                <div>
                  <div className="text-white/90 mb-1">Straat + huisnr (factuur)</div>
                  <input className="w-full rounded-xl border border-white/20 bg-blue-600/10 text-white placeholder-white/70 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/40" placeholder="Straat 1" />
                </div>
                <div>
                  <div className="text-white/90 mb-1">Postcode + woonplaats</div>
                  <input className="w-full rounded-xl border border-white/20 bg-blue-600/10 text-white placeholder-white/70 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/40" placeholder="1234 AB, Rotterdam" />
                </div>
              </div>

              <label className="flex items-center gap-3 text-white/90">
                <input type="checkbox" className="accent-white" />
                Ik ga akkoord met <a className="underline ml-1" href="https://stichtingmanarah.nl/assets/docs/privacyverklaring.pdf" target="_blank" rel="noreferrer">Privacyverklaring</a>, <a className="underline" href="https://stichtingmanarah.nl/assets/docs/voorwaarden.pdf" target="_blank" rel="noreferrer">Algemene voorwaarden</a>, <a className="underline" href="https://stichtingmanarah.nl/assets/docs/donatiebeleid.pdf" target="_blank" rel="noreferrer">Donatiebeleid</a>.
              </label>

              <a
                href="https://stichtingmanarah.nl/doneren.php"
                className="inline-flex items-center justify-center gap-3 bg-white text-blue-700 hover:bg-blue-50 px-8 py-4 rounded-lg font-bold"
              >
                Doneer veilig via Mollie <span className="text-xl">💝</span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}


