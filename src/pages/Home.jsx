import React from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import DonateBanner from '../components/sections/DonateBanner'
import Contact from '../components/sections/Contact'
import Newsletter from '../components/sections/Newsletter'
import { useTranslation } from '../hooks/useTranslation'

const Home = () => {
  const { t } = useTranslation()

  return (
    <div className="home-page">
      <Hero />
      <About />

      {/* Ramadan Campaign */}
      <section className="ramadan-campaign">
        <div className="container" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="ramadan-icon" style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>🌙</div>
          <h2 style={{ textAlign: 'center', width: '100%', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 700, color: '#111827', marginBottom: '1.5rem' }}>
            {t('home.ramadan-title')}
          </h2>
          <p style={{ textAlign: 'center', maxWidth: '700px', fontSize: '1.0625rem', lineHeight: 1.8, color: '#4B5563', marginBottom: '2rem' }}>
            {t('home.ramadan-text')}
          </p>
          <Link to="/doneren" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.875rem 2.5rem', background: 'linear-gradient(135deg, #2563EB, #1D4ED8)',
            color: 'white', fontWeight: 600, fontSize: '1rem', borderRadius: '12px',
            textDecoration: 'none', transition: 'all 0.2s ease',
            boxShadow: '0 4px 15px rgba(37, 99, 235, 0.3)'
          }}>
            {t('home.ramadan-btn')}
          </Link>
        </div>
      </section>

      <DonateBanner />
      <Contact />
      <Newsletter />
    </div>
  )
}

export default Home
