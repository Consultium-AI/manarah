import React from 'react'
import { useTranslation } from '../../hooks/useTranslation'

const AboutQuote = () => {
  const { t } = useTranslation()

  return (
    <section className="about-quote-section">
      <div className="container">
        <div className="about-quote-wrapper">
          <div className="quote-mark quote-mark-left">"</div>
          <blockquote className="about-quote-text">
            {t('aboutquote.text')}
          </blockquote>
          <div className="quote-mark quote-mark-right">"</div>
          <div className="about-quote-author">
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop" 
              alt="Maria" 
              className="quote-author-img"
            />
            <div className="quote-author-info">
              <p className="quote-author-name">{t('aboutquote.author-name')}</p>
              <p className="quote-author-role">{t('aboutquote.author-role')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutQuote




