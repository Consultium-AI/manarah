import React from 'react'
import { Link } from 'react-router-dom'

const Quote = () => {
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
            "Elke dag zie ik hoe onze hulp levens verandert. Kinderen die weer naar school kunnen, families die toegang krijgen tot schoon water, en gemeenschappen die samenwerken aan vrede. Dit is waarom ik hier ben."
          </blockquote>
          <p className="quote-author">— Sarah, Hulpverlener in Sudan</p>
          <Link to="/land/sudan" className="btn btn-secondary">Lees meer over de hulp in Sudan</Link>
        </div>
      </div>
    </section>
  )
}

export default Quote




