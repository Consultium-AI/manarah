import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
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
              <span>Lopend Project</span>
            </div>
            
            {/* Main Title */}
            <h1 className="hero-pro-title">
              Ramadan Project
              <span className="hero-pro-title-accent">2025</span>
            </h1>
            
            {/* Description */}
            <p className="hero-pro-description">
              Met jullie steun is dit project afgerond: <strong>€1.900</strong> opgehaald 
              en <strong>675 warme familiemaaltijden</strong> uitgedeeld tijdens de 
              gezegende maand Ramadan.
            </p>
            
            {/* CTA Buttons */}
            <div className="hero-pro-actions">
              <Link to="/doneren" className="hero-pro-btn-primary">
                <span>Doneer nu</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
              <Link to="/projecten" className="hero-pro-btn-secondary">
                <span>Bekijk projecten</span>
              </Link>
            </div>
            
            {/* Trust Indicators */}
            <div className="hero-pro-trust">
              <div className="hero-pro-trust-item">
                <span className="hero-pro-trust-value">ANBI</span>
                <span className="hero-pro-trust-label">Erkend</span>
              </div>
              <div className="hero-pro-trust-divider" />
              <div className="hero-pro-trust-item">
                <span className="hero-pro-trust-value">100%</span>
                <span className="hero-pro-trust-label">Transparant</span>
              </div>
              <div className="hero-pro-trust-divider" />
              <div className="hero-pro-trust-item">
                <span className="hero-pro-trust-value">2024</span>
                <span className="hero-pro-trust-label">Opgericht</span>
              </div>
            </div>
          </div>
          
          {/* Right side - Stats Card */}
          <div className={`hero-pro-stats ${isVisible ? 'visible' : ''}`}>
            <div className="hero-pro-stats-card">
              <div className="hero-pro-stats-header">
                <span className="hero-pro-stats-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </span>
                <span>Impact 2024</span>
              </div>
              <div className="hero-pro-stats-grid">
                <div className="hero-pro-stat">
                  <span className="hero-pro-stat-number">675+</span>
                  <span className="hero-pro-stat-label">Maaltijden</span>
                </div>
                <div className="hero-pro-stat">
                  <span className="hero-pro-stat-number">€1.9k</span>
                  <span className="hero-pro-stat-label">Opgehaald</span>
                </div>
                <div className="hero-pro-stat">
                  <span className="hero-pro-stat-number">150+</span>
                  <span className="hero-pro-stat-label">Gezinnen</span>
                </div>
                <div className="hero-pro-stat">
                  <span className="hero-pro-stat-number">3</span>
                  <span className="hero-pro-stat-label">Landen</span>
                </div>
              </div>
              <Link to="/projecten" className="hero-pro-stats-link">
                Bekijk alle resultaten
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
          </div>
          
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <button className="hero-pro-scroll" onClick={scrollToContent} aria-label="Scroll naar beneden">
        <span className="hero-pro-scroll-text">Scroll</span>
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
