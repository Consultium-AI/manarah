import React from 'react'
import ValuesTimeline from '../components/sections/ValuesTimeline'
import AboutQuote from '../components/sections/AboutQuote'
import AboutImpact from '../components/sections/AboutImpact'
import AboutCTA from '../components/sections/AboutCTA'
import { useTranslation } from '../hooks/useTranslation'

const WieZijnWij = () => {
  const { t } = useTranslation()

  return (
    <div>
      <section className="about-hero">
        <div className="about-hero-background">
          <img 
            src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=1920&h=1080&fit=crop" 
            alt="Medewerker met lokale persoon" 
            className="about-hero-img"
          />
          <div className="about-hero-overlay"></div>
        </div>
        <div className="about-hero-content">
          <div className="container">
            <h1 className="about-hero-title" dangerouslySetInnerHTML={{ __html: t('whoarewe.hero-title') }} />
            <p className="about-hero-description">
              {t('whoarewe.hero-desc')}
            </p>
          </div>
        </div>
      </section>

      <section className="story-section">
        <div className="container">
          <h2 className="section-title">{t('whoarewe.origin-title')}</h2>
          <div className="story-content">
            <div className="story-text">
              <p className="story-paragraph" dangerouslySetInnerHTML={{ __html: t('whoarewe.origin-p1') }} />
              <p className="story-paragraph" dangerouslySetInnerHTML={{ __html: t('whoarewe.origin-p2') }} />
              <p className="story-paragraph" dangerouslySetInnerHTML={{ __html: t('whoarewe.origin-p3') }} />
            </div>
          </div>
        </div>
      </section>

      <ValuesTimeline />
      <AboutQuote />
      <AboutImpact />
      <AboutCTA />
    </div>
  )
}

export default WieZijnWij

