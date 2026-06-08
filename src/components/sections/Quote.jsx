import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from '../../hooks/useTranslation'
import { COUNTRY_IMAGES } from '../../constants/images'

const Quote = () => {
  const { t } = useTranslation()

  return (
    <section className="quote-section">
      <div className="quote-background">
        <img 
          src={COUNTRY_IMAGES.SD} 
          alt="Project location" 
          className="quote-img"
        />
        <div className="quote-overlay"></div>
      </div>
      <div className="quote-content">
        <div className="container">
          <blockquote className="quote-text">
            {t('quote.text')}
          </blockquote>
          <p className="quote-author">{t('quote.author')}</p>
          <Link to="/land/sudan" className="btn btn-secondary">{t('quote.button')}</Link>
        </div>
      </div>
    </section>
  )
}

export default Quote




