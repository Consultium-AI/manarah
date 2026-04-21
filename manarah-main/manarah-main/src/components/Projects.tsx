import { motion } from 'framer-motion';
import Reveal from './Reveal';

type ProjectCard = {
  title: string;
  category: string;
  badge?: string;
  description?: string;
  href: string;
  image: string;
};

const currentProjects: ProjectCard[] = [];

const completedProjects: ProjectCard[] = [
  {
    title: 'Ramadan Project 2026',
    category: 'AFGEROND',
    badge: 'VOLDAAN',
    description:
      'Alhamdulillah! Met jullie steun is dit project afgerond: €1.900 opgehaald en 675 warme familiemaaltijden uitgedeeld tijdens de gezegende maand Ramadan. Jazakum Allahu khayran!',
    href: 'https://stichtingmanarah.nl/project.php?slug=ramadan-2025',
    image: 'assets/almanarahi.jpg',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="bg-white py-16">
      <div className="container-max">
        {/* Actuele projecten */}
        <Reveal>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Actuele projecten</h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="text-gray-600 mb-8">
            De lopende projecten worden binnenkort bekendgemaakt.
          </p>
        </Reveal>

        {currentProjects.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center">
            <p className="text-gray-700 text-lg font-medium">
              Momenteel zijn er geen actuele projecten.
            </p>
            <p className="text-gray-500 mt-2">
              Houd deze pagina in de gaten voor nieuwe campagnes, in shaa Allah.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {currentProjects.map((p) => (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35 }}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden"
              >
                <div className="relative">
                  <img src={p.image} className="w-full h-56 object-cover" alt={p.title} />
                  {p.badge && (
                    <span className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold tracking-wide px-4 py-1 rounded-full shadow">
                      {p.badge}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <p className="text-xs font-bold tracking-[.15em] uppercase text-blue-700 mb-2">{p.category}</p>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{p.title}</h3>
                  <a
                    href={p.href}
                    className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-800 font-semibold"
                  >
                    Lees meer
                    <span className="transition-transform group-hover:translate-x-0.5">→</span>
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* Afgeronde projecten */}
        <Reveal>
          <h2 className="text-3xl font-extrabold text-gray-900 mt-20 mb-3">Afgeronde projecten</h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="text-gray-600 mb-8">
            Dankzij jullie steun zijn deze projecten succesvol afgerond.
          </p>
        </Reveal>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {completedProjects.map((p) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35 }}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden"
            >
              <div className="relative">
                <img src={p.image} className="w-full h-56 object-cover" alt={p.title} />
                {p.badge && (
                  <span className="absolute top-4 right-4 bg-emerald-600 text-white text-xs font-bold tracking-wide px-4 py-1 rounded-full shadow">
                    {p.badge}
                  </span>
                )}
              </div>
              <div className="p-6">
                <p className="text-xs font-bold tracking-[.15em] uppercase text-emerald-700 mb-2">{p.category}</p>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{p.title}</h3>
                {p.description && (
                  <p className="text-gray-700 mb-4 leading-relaxed">{p.description}</p>
                )}
                <a
                  href={p.href}
                  className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-800 font-semibold"
                >
                  Lees meer
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://stichtingmanarah.nl/doneren.php"
            className="bg-blue-600 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-blue-700 transition"
          >
            Doneer ook
          </a>
        </div>
      </div>
    </section>
  );
}
