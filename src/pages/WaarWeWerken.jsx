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
      image: `${import.meta.env.BASE_URL}assets/Al_Aqsa.jpg`,
      accent: '#DC2626'
    },
    {
      slug: 'syrie',
      name: t('country.SY'),
      description: t('countries.syria-desc'),
      image: 'https://images.unsplash.com/photo-1659781044995-1c68c81dcc67?w=800&h=600&fit=crop',
      accent: '#2563EB'
    },
    {
      slug: 'sudan',
      name: t('country.SD'),
      description: t('countries.sudan-desc'),
      image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&h=600&fit=crop',
      accent: '#059669'
    }
  ]

  return (
    <div>
      {/* Hero */}
      <section className="wwwork-hero">
        <div className="wwwork-hero-bg">
          <img
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&h=1080&fit=crop"
            alt=""
            className="wwwork-hero-bg-img"
          />
          <div className="wwwork-hero-overlay" />
        </div>
        <div className="wwwork-hero-content">
          <div className="container" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 className="wwwork-hero-title" style={{ textAlign: 'center', width: '100%' }}>{t('countries.hero-title')}</h1>
            <p className="wwwork-hero-subtitle" style={{ textAlign: 'center' }}>{t('countries.hero-subtitle')}</p>
          </div>
        </div>
      </section>

      {/* Countries Grid */}
      <section className="wwwork-countries">
        <div className="container">
          <div className="wwwork-grid">
            {countries.map((country, index) => (
              <Link to={`/land/${country.slug}`} key={country.slug} className="wwwork-card">
                <div className="wwwork-card-img-wrap">
                  <img src={country.image} alt={country.name} className="wwwork-card-img" />
                  <div className="wwwork-card-img-overlay" />
                  <span className="wwwork-card-number" style={{ color: country.accent }}>0{index + 1}</span>
                </div>
                <div className="wwwork-card-body">
                  <h3 className="wwwork-card-title">{country.name}</h3>
                  <p className="wwwork-card-desc">{country.description}</p>
                  <span className="wwwork-card-link" style={{ color: country.accent }}>
                    {t('countries.more-about', { name: country.name })}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="wwwork-cta">
        <div className="container" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="wwwork-cta-inner" style={{ textAlign: 'center', width: '100%' }}>
            <h2 style={{ textAlign: 'center', width: '100%' }}>{t('help.cta-title')}</h2>
            <p style={{ textAlign: 'center' }}>{t('help.cta-text')}</p>
            <div className="wwwork-cta-btns" style={{ justifyContent: 'center' }}>
              <Link to="/doneren" className="wwwork-cta-btn-primary">{t('nav.doneer-nu')}</Link>
              <Link to="/projecten" className="wwwork-cta-btn-secondary">{t('help.cta-projects')}</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default WaarWeWerken
