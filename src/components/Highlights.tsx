import { motion } from 'framer-motion';
import Reveal from './Reveal';

const items = [
  {
    title: 'Voedselprogramma',
    image: 'assets/1747484031_5.jpeg',
    href: 'https://stichtingmanarah.nl/projecten.php'
  },
  {
    title: 'Onderwijs & Wezen',
    image: 'assets/1747484031_5.jpeg',
    href: 'https://stichtingmanarah.nl/projecten.php'
  },
  {
    title: 'Noodhulp',
    image: 'assets/1747484031_5.jpeg',
    href: 'https://stichtingmanarah.nl/doneren.php'
  },
];

export default function Highlights() {
  return (
    <section className="container-max mt-12">
      <Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((it) => (
          <a key={it.title} href={it.href} className="group relative rounded-xl overflow-hidden shadow hover:shadow-lg transition">
            <img src={it.image} alt={it.title} className="w-full h-56 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <motion.h3
              initial={{ y: 16, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35 }}
              className="absolute bottom-4 left-4 right-4 text-white text-xl font-bold"
            >
              {it.title}
            </motion.h3>
          </a>
        ))}
        </div>
      </Reveal>
    </section>
  );
}


