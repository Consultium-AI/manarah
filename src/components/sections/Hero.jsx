import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from '../../hooks/useTranslation'

const Hero = () => {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger animations after mount
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    })
  }

  return (
    <section className="hero-pro">
      {/* Background Image with Ken Burns effect */}
      <div className="hero-pro-bg">
        <div 
          className="hero-pro-bg-image" 
          style={{ backgroundImage: `url('${import.meta.env.BASE_URL}assets/almanarah.jpg')` }}
        />
      </div>
      
      {/* Gradient Overlays */}
      <div className="hero-pro-overlay" />
      <div className="hero-pro-gradient" />
      
      {/* Main Content */}
      <div className="hero-pro-content">
        <div className="hero-pro-container">
          
          {/* Left side - Main content */}
          <div className={`hero-pro-main ${isVisible ? 'visible' : ''}`}>
            
            {/* Badge/Tag */}
            <div className="hero-pro-badge">
              <span className="hero-pro-badge-dot" />
              <span>{t('hero.badge')}</span>
            </div>
            
            {/* Main Title */}
            <h1 className="hero-pro-title">
              {t('hero.title')}
              <span className="hero-pro-title-accent">{t('hero.year')}</span>
            </h1>
            
            {/* Description */}
            <p className="hero-pro-description" dangerouslySetInnerHTML={{ __html: t('hero.description') }} />
            
            {/* CTA Buttons */}
            <div className="hero-pro-actions">
              <Link to="/doneren" className="hero-pro-btn-primary">
                <span>{t('hero.donate')}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
              <Link to="/projecten" className="hero-pro-btn-secondary">
                <span>{t('hero.view-projects')}</span>
              </Link>
            </div>

          </div>
          
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <button className="hero-pro-scroll" onClick={scrollToContent} aria-label="Scroll naar beneden">
        <span className="hero-pro-scroll-text">{t('hero.scroll')}</span>
        <span className="hero-pro-scroll-line">
          <span className="hero-pro-scroll-dot" />
        </span>
      </button>
      
      {/* Bottom gradient fade */}
      <div className="hero-pro-bottom-fade" />
    </section>
  )
}

export default Hero
