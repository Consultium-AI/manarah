import React from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { useTranslation } from '../hooks/useTranslation'

const Bedankt = () => {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const amount = searchParams.get('amount')
  const type = searchParams.get('type')

  const getTypeLabel = () => {
    switch (type) {
      case 'one-time':
        return t('thanks.type-once')
      case 'monthly':
        return t('thanks.type-monthly')
      default:
        return ''
    }
  }

  return (
    <section className="thank-you-section">
      <div className="thank-you-background">
        <img 
          src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1920&h=1080&fit=crop" 
          alt="Gelukkige kinderen" 
          className="thank-you-img"
        />
        <div className="thank-you-overlay"></div>
      </div>
      
      <div className="thank-you-content">
        <div className="container">
          <div className="thank-you-wrapper">
            {/* Left Side - Thank You Message */}
            <div className="thank-you-left">
              <div className="thank-you-icon">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <h1 className="thank-you-title">
                {t('thanks.title')}
              </h1>
              <p className="thank-you-subtitle">
                {amount && t('thanks.amount', { amount })}
                {type && ` (${getTypeLabel()})`}
              </p>
              <div className="thank-you-message">
                <p className="thank-you-text">
                  {t('thanks.message')}
                </p>
              </div>
              <div className="thank-you-actions">
                <Link to="/" className="btn btn-primary">
                  {t('thanks.back-home')}
                </Link>
                <Link to="/projecten" className="btn btn-outline">
                  {t('thanks.view-projects')}
                </Link>
              </div>
            </div>

            {/* Right Side - Additional Info */}
            <div className="thank-you-right">
              <div className="thank-you-card">
                <h3 className="thank-you-card-title">{t('donate.stats-title')}</h3>
                <div className="thank-you-stats">
                  <div className="thank-you-stat">
                    <div className="stat-icon">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                          <circle cx="9" cy="7" r="4"/>
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                      </div>
                    <div className="stat-content">
                      <div className="stat-number">+1</div>
                      <div className="stat-label">{t('donate.stats-people')}</div>
                    </div>
                  </div>
                  <div className="thank-you-stat">
                    <div className="stat-icon">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
                        </svg>
                      </div>
                    <div className="stat-content">
                      <div className="stat-number">+10</div>
                      <div className="stat-label">{t('donate.why-water')}</div>
                    </div>
                  </div>
                  <div className="thank-you-stat">
                    <div className="stat-icon">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                        </svg>
                      </div>
                    <div className="stat-content">
                      <div className="stat-number">+1</div>
                      <div className="stat-label">{t('donate.why-education')}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="thank-you-card">
                <h3 className="thank-you-card-title">{t('newsletter.title')}</h3>
                <p className="thank-you-card-text">
                  {t('newsletter.text')}
                </p>
                <Link to="/#newsletter" className="btn btn-secondary btn-block">
                  {t('newsletter.button')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Bedankt
