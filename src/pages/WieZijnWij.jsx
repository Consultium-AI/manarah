import React from 'react'
import ValuesTimeline from '../components/sections/ValuesTimeline'
import AboutCTA from '../components/sections/AboutCTA'
import { useTranslation } from '../hooks/useTranslation'
import { VOLUNTEER_IMAGE } from '../constants/images'

const WieZijnWij = () => {
  const { t } = useTranslation()

  return (
    <div>
      <section className="about-hero">
        <div className="about-hero-background">
          <img 
            src={VOLUNTEER_IMAGE} 
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
      <AboutCTA />
    </div>
  )
}

export default WieZijnWij

