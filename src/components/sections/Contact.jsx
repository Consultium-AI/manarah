import React, { useState } from 'react'
import Reveal from '../Reveal'

const Contact = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = `Nieuw bericht van ${name || 'website bezoeker'}`
    const body = `${message}\n\nNaam: ${name}\nE-mail: ${email}`
    window.location.href = `mailto:info@stichtingmanarah.nl?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <section className="contact-manarah" id="contact">
      <div className="container">
        <Reveal>
          <h2 className="contact-manarah-title">
            <span className="contact-highlight">Neem contact op</span>
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="contact-manarah-subtitle">
            Heb je vragen, suggesties of wil je samenwerken? Laat een bericht achter.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={handleSubmit} className="contact-manarah-form">
            <div className="contact-form-grid">
              <div className="form-group">
                <label className="form-label">Naam</label>
                <input
                  type="text"
                  placeholder="Jouw naam"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input-manarah"
                />
              </div>
              <div className="form-group">
                <label className="form-label">E-mailadres</label>
                <input
                  type="email"
                  placeholder="naam@voorbeeld.nl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input-manarah"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Bericht <span className="required">*</span></label>
              <textarea
                required
                placeholder="Stel hier je vraag..."
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="form-input-manarah form-textarea"
              />
            </div>

            <div className="contact-form-actions">
              <button type="submit" className="btn-contact-submit">
                Versturen
              </button>
              <span className="contact-email-note">
                of stuur direct een mail naar{' '}
                <a href="mailto:info@stichtingmanarah.nl">info@stichtingmanarah.nl</a>
              </span>
            </div>

            <p className="contact-privacy-note">
              Door dit formulier te verzenden, ga je akkoord met onze verwerking van persoonsgegevens zoals uitgelegd in onze{' '}
              <a href="https://stichtingmanarah.nl/assets/docs/privacyverklaring.pdf" target="_blank" rel="noreferrer">
                privacyverklaring
              </a>.
            </p>
          </form>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="contact-whatsapp">
            <p className="contact-whatsapp-text">Of neem direct contact op via WhatsApp</p>
            <a
              href="https://wa.me/31103602862"
              target="_blank"
              rel="noreferrer"
              className="btn-whatsapp"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="whatsapp-svg">
                <path d="M20.52 3.48A11.78 11.78 0 0 0 12.01 0C5.38.01.02 5.38.01 12.01c0 2.12.56 4.19 1.62 6.01L0 24l6.14-1.6a11.9 11.9 0 0 0 5.86 1.53h.01c6.63 0 12.01-5.37 12.01-12s-5.36-8.45-3.5-8.45Z"/>
              </svg>
              WhatsApp Nu
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default Contact
