import React from 'react'
import Reveal from '../Reveal'

const Newsletter = () => {
  return (
    <section className="newsletter-manarah">
      <div className="container">
        <div className="newsletter-manarah-content">
          <Reveal>
            <h2 className="newsletter-manarah-title">
              <span className="newsletter-highlight">Doe mee</span>
              met Stichting Manarah
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="newsletter-manarah-text">
              Samen kunnen we meer bereiken. Sluit je aan bij ons werk via onze WhatsApp-community. 
              Andere opties worden binnenkort beschikbaar!
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="newsletter-manarah-buttons">
              <a
                href="https://stichtingmanarah.nl/nieuwsbrief.php"
                className="btn-newsletter"
              >
                Nieuwsbrief
              </a>
              <a
                href="https://chat.whatsapp.com/GKb3l0Fi67H4YhayEDnBLX"
                className="btn-newsletter"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp-groep
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default Newsletter




