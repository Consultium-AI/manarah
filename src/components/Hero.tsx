import { motion } from 'framer-motion';
import Reveal from './Reveal';

export default function Hero() {
  return (
    <section className="relative min-h-[75vh] sm:min-h-[85vh] lg:min-h-[100vh] w-full overflow-hidden">
      {/* Background image as CSS to avoid broken image icon when missing */}
      <div
        aria-hidden
        className="absolute inset-0 bg-center bg-cover"
        style={{ backgroundImage: "url('assets/almanarahi.jpg')" }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />
      {/* Vignette gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 container-max">
        <div className="max-w-3xl pt-20 sm:pt-28 lg:pt-64 pb-24">
          <div className="flex items-center gap-4 mb-6">
            <span className="h-[3px] w-16 bg-blue-600 rounded-full" />
            <span className="text-sm font-medium text-white/80">Project</span>
          </div>
          <Reveal>
            <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-16">
              Ramadan Project – <span className="text-blue-400">2025</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-white/90 text-lg sm:text-xl leading-relaxed mb-8">
              Met jullie steun is dit project afgerond: €1.900 opgehaald en 675 warme familiemaaltijden uitgedeeld
              tijdens de gezegende maand Ramadan. Jazakum Allahu khayran!
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex items-center gap-5">
            <a
              href="#donate"
              className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-xl font-bold text-lg transition shadow"
            >
              Doneer nu
            </a>
            <a
              href="https://stichtingmanarah.nl/project.php?slug=ramadan-2025"
              className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white px-10 py-5 rounded-xl font-bold text-lg transition"
            >
              Lees meer →
            </a>
            </div>
          </Reveal>
        </div>
      </div>
      
    </section>
  );
}


