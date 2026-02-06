import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from '../hooks/useTranslation'

const WaarWeWerken = () => {
  const { t } = useTranslation()

  const countries = [
    {
      slug: 'palestina',
      name: t('country.PS'),
      description: t('countries.palestine-desc'),
      image: `${import.meta.env.BASE_URL}assets/Al_Aqsa.jpg`
    },
    {
      slug: 'syrie',
      name: t('country.SY'),
      description: t('countries.syria-desc'),
      image: 'https://images.unsplash.com/photo-1658159788721-78e4e057c9aa?w=600&h=400&fit=crop'
    },
    {
      slug: 'sudan',
      name: t('country.SD'),
      description: t('countries.sudan-desc'),
      image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&h=400&fit=crop'
    }
  ]

  return (
    <div>
      <section className="countries-hero">
        <div className="container">
          <h1 className="countries-hero-title">{t('countries.hero-title')}</h1>
          <p className="countries-hero-subtitle">
            {t('countries.hero-subtitle')}
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
                    {t('countries.more-about', { name: country.name })}
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




