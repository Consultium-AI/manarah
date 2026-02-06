import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from '../hooks/useTranslation'

const SamenInActie = () => {
  const { t } = useTranslation()
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
      title: t('help.type-donor'),
      description: t('help.type-donor-desc'),
      details: t('help.type-donor-details')
    },
    {
      title: t('help.type-volunteer'),
      description: t('help.type-volunteer-desc'),
      details: t('help.type-volunteer-details')
    },
    {
      title: t('help.type-education'),
      description: t('help.type-education-desc'),
      details: t('help.type-education-details')
    },
    {
      title: t('help.type-fundraiser'),
      description: t('help.type-fundraiser-desc'),
      details: t('help.type-fundraiser-details')
    },
    {
      title: t('help.type-major'),
      description: t('help.type-major-desc'),
      details: t('help.type-major-details')
    },
    {
      title: t('help.type-legacy'),
      description: t('help.type-legacy-desc'),
      details: t('help.type-legacy-details')
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
          <h1 className="samen-actie-hero-title">{t('help.title')}</h1>
          <p className="samen-actie-hero-subtitle">
            {t('help.subtitle')}
          </p>
        </div>
      </section>

      <section className="samen-actie-intro">
        <div className="container">
          <div className="samen-actie-intro-content">
            <h2 className="section-title">{t('help.intro-title')}</h2>
            <p className="samen-actie-intro-text">
              {t('help.intro-text1')}
            </p>
            <p className="samen-actie-intro-text">
              {t('help.intro-text2')}
            </p>
          </div>
        </div>
      </section>

      <section className="samen-actie-types">
        <div className="container">
          <h2 className="section-title">{t('help.types-title')}</h2>
          <div className="samen-actie-grid">
            {actionTypes.map((action, index) => (
              <div key={index} className="samen-actie-card">
                <h3 className="samen-actie-card-title">{action.title}</h3>
                <p className="samen-actie-card-description">{action.description}</p>
                <details className="samen-actie-details">
                  <summary className="samen-actie-summary">{t('help.more-info')}</summary>
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
              <h2 className="section-title">{t('help.contact-title')}</h2>
              <p className="samen-actie-contact-text">
                {t('help.contact-text')}
              </p>
              <div className="samen-actie-contact-details">
                <div className="contact-detail-item">
                  <span className="contact-detail-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </span>
                  <div>
                    <strong>Email</strong>
                    <p>info@stichting.nl</p>
                  </div>
                </div>
                <div className="contact-detail-item">
                  <span className="contact-detail-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </span>
                  <div>
                    <strong>Telefoon</strong>
                    <p>+31 (0)20 123 4567</p>
                  </div>
                </div>
                <div className="contact-detail-item">
                  <span className="contact-detail-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </span>
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
                  <div className="form-success-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M9 12l2 2 4-4"/>
                    </svg>
                  </div>
                  <h3>{t('help.form-success-title')}</h3>
                  <p>{t('help.form-success-text')}</p>
                  <button
                    className="btn btn-outline"
                    onClick={() => setSubmitted(false)}
                  >
                    {t('help.form-success-new')}
                  </button>
                </div>
              ) : (
                <form className="samen-actie-contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">{t('help.form-name')}</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-input"
                      placeholder={t('help.form-name-placeholder')}
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">{t('help.form-email')}</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-input"
                      placeholder={t('help.form-email-placeholder')}
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">{t('help.form-phone')}</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="form-input"
                      placeholder={t('help.form-phone-placeholder')}
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="interest" className="form-label">{t('help.form-interest')}</label>
                    <select
                      id="interest"
                      name="interest"
                      className="form-input"
                      value={formData.interest}
                      onChange={handleChange}
                      required
                    >
                      <option value="">{t('help.form-interest-placeholder')}</option>
                      <option value="donateur">{t('help.form-interest-donor')}</option>
                      <option value="vrijwilliger">{t('help.form-interest-volunteer')}</option>
                      <option value="onderwijs">{t('help.form-interest-education')}</option>
                      <option value="eigen-actie">{t('help.form-interest-fundraiser')}</option>
                      <option value="grote-gift">{t('help.form-interest-major')}</option>
                      <option value="nalaten">{t('help.form-interest-legacy')}</option>
                      <option value="anders">{t('help.form-interest-other')}</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="form-label">{t('help.form-message')}</label>
                    <textarea
                      id="message"
                      name="message"
                      className="form-input form-textarea"
                      placeholder={t('help.form-message-placeholder')}
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
                    {loading ? t('help.form-submitting') : t('help.form-submit')}
                  </button>

                  <p className="form-note">
                    {t('help.form-note')}
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
            <h2 className="samen-actie-cta-title">{t('help.cta-title')}</h2>
            <p className="samen-actie-cta-text">
              {t('help.cta-text')}
            </p>
            <div className="samen-actie-cta-buttons">
              <Link to="/doneren" className="btn btn-primary btn-cta-large">
                {t('nav.doneer-nu')}
              </Link>
              <Link to="/projecten" className="btn btn-secondary">
                {t('help.cta-projects')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SamenInActie
