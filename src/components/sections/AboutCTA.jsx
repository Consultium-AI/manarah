import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from '../../hooks/useTranslation'

const AboutCTA = () => {
  const { t } = useTranslation()

  return (
    <section className="cta-about-section">
      <div className="container">
        <div className="cta-about-content">
          <h2 className="cta-about-title">{t('aboutcta.title')}</h2>
          <p className="cta-about-description" dangerouslySetInnerHTML={{ __html: t('aboutcta.text') }} />
          <div className="cta-about-buttons">
            <Link to="/doneren" className="btn btn-primary btn-cta-large">{t('hero.donate')}</Link>
            <Link to="/projecten" className="btn btn-secondary">{t('aboutcta.projects')}</Link>
            <Link to="/samen-in-actie" className="btn btn-outline">{t('aboutcta.volunteer')}</Link>
          </div>
          <p className="cta-about-note" dangerouslySetInnerHTML={{ __html: t('aboutcta.note') }} />
        </div>
      </div>
    </section>
  )
}

export default AboutCTA

