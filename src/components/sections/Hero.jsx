import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-background">
        <img 
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&h=1080&fit=crop" 
          alt="Hero background" 
          className="hero-img"
        />
        <div className="hero-overlay"></div>
      </div>
      <div className="hero-content">
        <div className="container">
          <h1 className="hero-title">
            Samen zorgen we voor <span className="highlight">veiligheid</span>, 
            <span className="highlight">onderwijs</span> en 
            <span className="highlight">hoop</span> in crisisgebieden wereldwijd
          </h1>
          <p className="hero-subtitle">
            Met jouw steun helpen we jaarlijks meer dan 1 miljoen mensen die getroffen zijn door conflict, rampen en armoede.
          </p>
          <div className="hero-buttons">
            <Link to="/doneren" className="btn btn-primary">
              Doneer nu
            </Link>
            <Link to="/wie-zijn-wij" className="btn btn-secondary">
              Lees meer
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

