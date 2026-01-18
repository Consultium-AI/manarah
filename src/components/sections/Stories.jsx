import React from 'react'
import { Link } from 'react-router-dom'

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
      title: 'Waterputten brengen hoop in Zuid-Soedan',
      excerpt: 'Dankzij nieuwe waterputten hebben dorpen nu toegang tot schoon drinkwater, wat levens redt.',
      image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=600&h=400&fit=crop',
      label: 'Verhaal'
    }
  ]

  return (
    <section className="stories-section">
      <div className="container">
        <h2 className="section-title">Verhalen & Nieuws</h2>
        <div className="stories-grid">
          {stories.map((story, index) => (
            <article key={index} className="story-card">
              <div className="story-image">
                <img src={story.image} alt={story.title} />
                <span className={`story-label ${story.label === 'Nieuws' ? 'story-label-news' : ''}`}>
                  {story.label}
                </span>
              </div>
              <div className="story-content">
                <h3 className="story-title">{story.title}</h3>
                <p className="story-excerpt">{story.excerpt}</p>
                <Link to="/projecten" className="story-link">Lees meer →</Link>
              </div>
            </article>
          ))}
        </div>
        <div className="stories-more">
          <Link to="/projecten" className="link-more">Meer nieuws →</Link>
        </div>
      </div>
    </section>
  )
}

export default Stories




