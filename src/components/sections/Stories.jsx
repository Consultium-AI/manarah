import React from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../Reveal'

const Stories = () => {
  const stories = [
    {
      title: 'Hoe onderwijs levens verandert in Syrië',
      excerpt: 'In vluchtelingenkampen bieden we kinderen de kans om te leren en te dromen van een betere toekomst.',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=400&fit=crop',
      label: 'Verhaal'
    },
    {
      title: 'Noodhulp in Oekraïne: eerste resultaten',
      excerpt: 'Onze teams hebben al duizenden gezinnen bereikt met voedsel, onderdak en medische zorg.',
      image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&h=400&fit=crop',
      label: 'Nieuws'
    },
    {
      title: 'Waterputten brengen hoop in Sudan',
      excerpt: 'Dankzij nieuwe waterputten hebben dorpen nu toegang tot schoon drinkwater, wat levens redt.',
      image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=600&h=400&fit=crop',
      label: 'Verhaal'
    }
  ]

  return (
    <section className="stories-manarah">
      <div className="container">
        <Reveal>
          <h2 className="stories-manarah-title">
            <span className="stories-highlight">Verhalen</span>
            & Nieuws
          </h2>
        </Reveal>
        <div className="stories-manarah-grid">
          {stories.map((story, index) => (
            <Reveal key={index} delay={0.1 * index}>
              <article className="story-card-manarah">
                <div className="story-image-manarah">
                  <img src={story.image} alt={story.title} />
                  <span className={`story-label-manarah ${story.label === 'Nieuws' ? 'story-label-news' : ''}`}>
                    {story.label}
                  </span>
                </div>
                <div className="story-content-manarah">
                  <h3 className="story-title-manarah">{story.title}</h3>
                  <p className="story-excerpt-manarah">{story.excerpt}</p>
                  <Link to="/projecten" className="story-link-manarah">Lees meer →</Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.4}>
          <div className="stories-manarah-more">
            <Link to="/projecten" className="btn-stories-more">Meer nieuws →</Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default Stories




