import React from 'react'
import { Link } from 'react-router-dom'

const WaarWeWerken = () => {
  const countries = [
    {
      slug: 'burkina-faso',
      name: 'Burkina Faso',
      description: 'In dit West-Afrikaanse land helpen we gemeenschappen die getroffen zijn door conflict, voedselonzekerheid en klimaatverandering.',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop'
    },
    {
      slug: 'syrie',
      name: 'Syrië',
      description: 'We bieden noodhulp en ondersteunen wederopbouw voor gezinnen die alles hebben verloren door jaren van conflict.',
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=400&fit=crop'
    },
    {
      slug: 'zuid-soedan',
      name: 'Zuid-Soedan',
      description: 'We werken aan voedselzekerheid, watertoegang en vredesopbouw in een van de meest kwetsbare regio\'s ter wereld.',
      image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=600&h=400&fit=crop'
    }
  ]

  return (
    <div>
      <section className="countries-hero">
        <div className="container">
          <h1 className="countries-hero-title">Waar we werken</h1>
          <p className="countries-hero-subtitle">
            We zijn actief in meer dan 25 landen wereldwijd, waar we samen met lokale gemeenschappen werken aan duurzame oplossingen voor conflict, armoede en klimaatverandering.
          </p>
        </div>
      </section>

      <section className="countries-section">
        <div className="container">
          <div className="countries-grid">
            {countries.map(country => (
              <article key={country.slug} className="country-card">
                <div className="country-card-image">
                  <img src={country.image} alt={country.name} />
                </div>
                <div className="country-card-content">
                  <h3 className="country-card-title">{country.name}</h3>
                  <p className="country-card-description">{country.description}</p>
                  <Link to={`/land/${country.slug}`} className="btn btn-outline">
                    Meer over {country.name}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default WaarWeWerken




