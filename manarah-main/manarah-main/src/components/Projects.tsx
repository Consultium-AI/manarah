import { motion } from 'framer-motion';
import Reveal from './Reveal';

type ProjectCard = {
  title: string;
  category: string;
  badge?: string;
  href: string;
  image: string;
};

const projects: ProjectCard[] = [
  {
    title: 'Voedselpakketten voor gezinnen in nood',
    category: 'PROJECT',
    badge: 'ACTUEEL',
    href: 'https://stichtingmanarah.nl/projecten.php',
    image: 'assets/1747484031_5.jpeg',
  },
  {
    title: '5 feiten over de schrijnende crisis in Sudan',
    category: 'PROJECT',
    badge: 'ACTUEEL',
    href: 'https://stichtingmanarah.nl/projecten.php',
    image: 'assets/1747484031_5.jpeg',
  },
  {
    title: 'Herstel van onderwijs voor weeskinderen',
    category: 'PROJECT',
    href: 'https://stichtingmanarah.nl/projecten.php',
    image: 'assets/1747484031_5.jpeg',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="bg-white py-16">
      <div className="container-max">
        <Reveal>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Onze projecten</h2>
        </Reveal>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
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

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://stichtingmanarah.nl/projecten.php"
            className="bg-blue-600 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-blue-700 transition"
          >
            Alle projecten bekijken
          </a>
          <a
            href="https://stichtingmanarah.nl/doneren.php"
            className="bg-blue-50 text-blue-800 px-6 py-3 rounded-full text-sm font-semibold hover:bg-blue-100 transition border border-blue-200"
          >
            Doneer ook
          </a>
        </div>
      </div>
    </section>
  );
}


