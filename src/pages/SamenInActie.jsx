import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const SamenInActie = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const actionTypes = [
    {
      icon: '💝',
      title: 'Word donateur',
      description: 'Steun structureel met een maandelijkse bijdrage en maak een blijvend verschil voor mensen in nood.',
      details: 'Als donateur geef je maandelijks een vast bedrag. Dit geeft ons de zekerheid om langetermijnprojecten te plannen en duurzame impact te maken.'
    },
    {
      icon: '🤝',
      title: 'Word vrijwilliger',
      description: 'Zet je tijd en talenten in voor onze missie en help direct mee aan projecten.',
      details: 'Vrijwilligers zijn onmisbaar voor ons werk. Je kunt helpen met evenementen, fondsenwerving, administratie of andere taken die bij jouw vaardigheden passen.'
    },
    {
      icon: '🏫',
      title: 'Actie met school/kerk',
      description: 'Organiseer een actie met je gemeenschap en betrek anderen bij ons werk.',
      details: 'Scholen en kerken zijn belangrijke partners. Samen kunnen we bewustwording creëren en fondsen werven voor specifieke projecten.'
    },
    {
      icon: '📋',
      title: 'Eigen actie starten',
      description: 'Begin je eigen fundraising actie en inspireer anderen om te geven.',
      details: 'Organiseer een sponsorloop, verkoop, of andere creatieve actie. Wij helpen je met materialen en promotie.'
    },
    {
      icon: '💼',
      title: 'Grote gift',
      description: 'Maak een substantiële bijdrage mogelijk en verander levens op grote schaal.',
      details: 'Grote giften maken het mogelijk om hele projecten te financieren of nieuwe initiatieven te starten. Neem contact op voor persoonlijk advies.'
    },
    {
      icon: '📜',
      title: 'Nalaten',
      description: 'Steun onze missie in je testament en zorg voor blijvende impact.',
      details: 'Door ons op te nemen in je testament, zorg je ervoor dat je steun ook na je overlijden doorwerkt. Wij helpen je graag met informatie en advies.'
    }
  ]

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Simuleer formulier verzending (in productie zou dit naar een API endpoint gaan)
    setTimeout(() => {
      setSubmitted(true)
      setLoading(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        interest: '',
        message: ''
      })
    }, 1000)
  }

  return (
    <div>
      <section className="samen-actie-hero">
        <div className="container">
          <h1 className="samen-actie-hero-title">Samen in actie</h1>
          <p className="samen-actie-hero-subtitle">
            Er zijn verschillende manieren om mee te doen en impact te maken. Ontdek hoe jij kunt bijdragen aan ons werk.
          </p>
        </div>
      </section>

      <section className="samen-actie-intro">
        <div className="container">
          <div className="samen-actie-intro-content">
            <h2 className="section-title">Waarom jouw steun belangrijk is</h2>
            <p className="samen-actie-intro-text">
              Wij geloven dat iedereen een verschil kan maken. Of je nu tijd, geld of expertise geeft – elke bijdrage telt. 
              Samen kunnen we levens veranderen, gemeenschappen versterken en hoop brengen waar het hard nodig is.
            </p>
            <p className="samen-actie-intro-text">
              Door samen te werken met lokale partners en gemeenschappen, zorgen we ervoor dat hulp daar komt waar het 
              het meest nodig is. Jouw steun maakt dit mogelijk.
            </p>
          </div>
        </div>
      </section>

      <section className="samen-actie-types">
        <div className="container">
          <h2 className="section-title">Hoe kun je helpen?</h2>
          <div className="samen-actie-grid">
            {actionTypes.map((action, index) => (
              <div key={index} className="samen-actie-card">
                <div className="samen-actie-icon">{action.icon}</div>
                <h3 className="samen-actie-card-title">{action.title}</h3>
                <p className="samen-actie-card-description">{action.description}</p>
                <details className="samen-actie-details">
                  <summary className="samen-actie-summary">Meer informatie</summary>
                  <p className="samen-actie-details-text">{action.details}</p>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="samen-actie-contact">
        <div className="container">
          <div className="samen-actie-contact-wrapper">
            <div className="samen-actie-contact-info">
              <h2 className="section-title">Neem contact op</h2>
              <p className="samen-actie-contact-text">
                Wil je meer weten over hoe je kunt helpen? Of heb je een specifieke vraag? 
                Vul het contactformulier in en wij nemen zo snel mogelijk contact met je op.
              </p>
              <div className="samen-actie-contact-details">
                <div className="contact-detail-item">
                  <span className="contact-detail-icon">📧</span>
                  <div>
                    <strong>Email</strong>
                    <p>info@stichting.nl</p>
                  </div>
                </div>
                <div className="contact-detail-item">
                  <span className="contact-detail-icon">📞</span>
                  <div>
                    <strong>Telefoon</strong>
                    <p>+31 (0)20 123 4567</p>
                  </div>
                </div>
                <div className="contact-detail-item">
                  <span className="contact-detail-icon">📍</span>
                  <div>
                    <strong>Adres</strong>
                    <p>Straatnaam 123<br />1234 AB Amsterdam</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="samen-actie-contact-form-wrapper">
              {submitted ? (
                <div className="form-success-message">
                  <div className="form-success-icon">✓</div>
                  <h3>Bedankt voor je bericht!</h3>
                  <p>We hebben je bericht ontvangen en nemen zo snel mogelijk contact met je op.</p>
                  <button
                    className="btn btn-outline"
                    onClick={() => setSubmitted(false)}
                  >
                    Nieuw bericht versturen
                  </button>
                </div>
              ) : (
                <form className="samen-actie-contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Naam *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-input"
                      placeholder="Je volledige naam"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">E-mailadres *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-input"
                      placeholder="jouw@email.nl"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">Telefoonnummer</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="form-input"
                      placeholder="+31 6 12345678"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="interest" className="form-label">Ik ben geïnteresseerd in *</label>
                    <select
                      id="interest"
                      name="interest"
                      className="form-input"
                      value={formData.interest}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Selecteer een optie</option>
                      <option value="donateur">Word donateur</option>
                      <option value="vrijwilliger">Word vrijwilliger</option>
                      <option value="school-kerk">Actie met school/kerk</option>
                      <option value="eigen-actie">Eigen actie starten</option>
                      <option value="grote-gift">Grote gift</option>
                      <option value="nalaten">Nalaten</option>
                      <option value="anders">Iets anders</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="form-label">Bericht *</label>
                    <textarea
                      id="message"
                      name="message"
                      className="form-input form-textarea"
                      placeholder="Vertel ons meer over je interesse of vraag..."
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-large"
                    disabled={loading}
                  >
                    {loading ? 'Verzenden...' : 'Verstuur bericht'}
                  </button>

                  <p className="form-note">
                    * Verplichte velden. We behandelen je gegevens vertrouwelijk volgens ons privacybeleid.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="samen-actie-cta">
        <div className="container">
          <div className="samen-actie-cta-content">
            <h2 className="samen-actie-cta-title">Klaar om direct te helpen?</h2>
            <p className="samen-actie-cta-text">
              Je kunt ook direct doneren zonder contactformulier. Elke bijdrage maakt een verschil.
            </p>
            <div className="samen-actie-cta-buttons">
              <Link to="/doneren" className="btn btn-primary btn-cta-large">
                Doneer nu
              </Link>
              <Link to="/projecten" className="btn btn-secondary">
                Bekijk onze projecten
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SamenInActie

