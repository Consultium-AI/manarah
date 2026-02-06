import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from '../../hooks/useTranslation'

const Impact = () => {
  const { t } = useTranslation()

  return (
    <section className="impact-section">
      <div className="container">
        <div className="impact-content">
          <div className="impact-text">
            <h2 className="section-title">{t('impact.title')}</h2>
            <p className="impact-description" dangerouslySetInnerHTML={{ __html: t('impact.text') }} />
            <Link to="/waar-we-werken" className="btn btn-primary">{t('impact.button')}</Link>
          </div>
          <div className="impact-visual">
            <div className="world-map">
              <svg viewBox="0 0 1000 500" xmlns="http://www.w3.org/2000/svg">
                <circle cx="250" cy="200" r="8" fill="#e63946"/>
                <circle cx="350" cy="200" r="8" fill="#e63946"/>
                <circle cx="450" cy="250" r="8" fill="#e63946"/>
                <circle cx="550" cy="300" r="8" fill="#e63946"/>
                <circle cx="650" cy="280" r="8" fill="#e63946"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Impact

