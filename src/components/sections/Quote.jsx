import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from '../../hooks/useTranslation'

const Quote = () => {
  const { t } = useTranslation()

  return (
    <section className="quote-section">
      <div className="quote-background">
        <img 
          src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1920&h=1080&fit=crop" 
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




