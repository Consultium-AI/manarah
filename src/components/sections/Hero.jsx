import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from '../../hooks/useTranslation'

const HERO_IMAGES = [
  'syrie-2025-3.jpeg',
  'huidig-project-foto.jpeg',
  'almanarah.jpg',
]

const Hero = () => {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)
  const [slideIndex, setSlideIndex] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % HERO_IMAGES.length)
    }, 7000)
    return () => clearInterval(interval)
  }, [])

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    })
  }

  const baseUrl = import.meta.env.BASE_URL

  return (
    <section className="hero-pro">
      {/* Slideshow Background */}
      <div className="hero-pro-bg hero-pro-slideshow">
        {HERO_IMAGES.map((img, i) => (
          <div
            key={img}
            className={`hero-pro-bg-image hero-pro-slide ${i === slideIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url('${baseUrl}assets/${img}')` }}
          />
        ))}
      </div>
      
      {/* Slide indicators */}
      <div className="hero-pro-dots" aria-hidden="true">
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`hero-pro-dot ${i === slideIndex ? 'active' : ''}`}
            onClick={() => setSlideIndex(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
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
              <a href="https://betaalverzoek.rabobank.nl/betaalverzoek/?id=AWZYa7itRfygou-rc7v5zw" target="_blank" rel="noopener noreferrer" className="hero-pro-btn-primary">
                <span>{t('hero.donate')}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
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
