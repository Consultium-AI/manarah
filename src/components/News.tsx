import { motion } from 'framer-motion';

const news = [
  {
    title: 'Nieuwe hulpactie gestart',
    excerpt: 'We starten een noodhulpactie om families direct te ondersteunen met voedsel en basisbehoeften.',
    image: '/assets/1747484031_5.jpeg',
    href: '#'
  },
  {
    title: 'Vrijwilligers gezocht',
    excerpt: 'Help mee met logistiek, communicatie en lokale acties. Meld je aan als vrijwilliger.',
    image: '/assets/1747484031_5.jpeg',
    href: '#'
  },
  {
    title: 'Transparant jaarverslag',
    excerpt: 'Lees hoe we donaties hebben ingezet en welke impact is bereikt dankzij jouw steun.',
    image: '/assets/1747484031_5.jpeg',
    href: '#'
  }
];

export default function News() {
  return (
    <section className="container-max mt-16">
      <div className="flex items-baseline justify-between mb-6">
        <h2 className="text-2xl font-extrabold">Laatste nieuws</h2>
        <a href="#" className="text-blue-700 hover:text-blue-800 font-semibold text-sm">Alles bekijken →</a>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((n) => (
          <article key={n.title} className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
            <img src={n.image} alt={n.title} className="w-full h-44 object-cover" />
            <div className="p-5">
              <h3 className="text-lg font-bold mb-2">{n.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{n.excerpt}</p>
              <a href={n.href} className="text-blue-700 hover:text-blue-800 font-semibold text-sm">Lees meer →</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}


