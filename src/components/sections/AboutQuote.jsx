import React from 'react'

const AboutQuote = () => {
  return (
    <section className="about-quote-section">
      <div className="container">
        <div className="about-quote-wrapper">
          <div className="quote-mark quote-mark-left">"</div>
          <blockquote className="about-quote-text">
            Ik heb gezien hoe een simpele waterput een heel dorp transformeerde. Niet alleen omdat mensen nu schoon water hebben, maar omdat het hen hoop gaf. Hoop dat er een toekomst is. Hoop dat ze zelf iets kunnen veranderen. Dat is waarom ik hier ben – om die hoop te delen en te versterken.
          </blockquote>
          <div className="quote-mark quote-mark-right">"</div>
          <div className="about-quote-author">
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop" 
              alt="Maria" 
              className="quote-author-img"
            />
            <div className="quote-author-info">
              <p className="quote-author-name">Maria van der Berg</p>
              <p className="quote-author-role">Projectcoördinator Sudan</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutQuote




