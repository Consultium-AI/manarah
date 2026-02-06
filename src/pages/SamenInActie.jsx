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
  const [expandedCard, setExpandedCard] = useState(null)

  const icons = {
    donor: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    ),
    volunteer: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    education: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
      </svg>
    ),
    fundraiser: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
      </svg>
    ),
    major: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    legacy: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    )
  }

  const iconKeys = ['donor', 'volunteer', 'education', 'fundraiser', 'major', 'legacy']
  const accentColors = ['#2563EB', '#059669', '#7C3AED', '#F59E0B', '#EF4444', '#0891B2']

  const actionTypes = [
    { title: t('help.type-donor'), description: t('help.type-donor-desc'), details: t('help.type-donor-details') },
    { title: t('help.type-volunteer'), description: t('help.type-volunteer-desc'), details: t('help.type-volunteer-details') },
    { title: t('help.type-education'), description: t('help.type-education-desc'), details: t('help.type-education-details') },
    { title: t('help.type-fundraiser'), description: t('help.type-fundraiser-desc'), details: t('help.type-fundraiser-details') },
    { title: t('help.type-major'), description: t('help.type-major-desc'), details: t('help.type-major-details') },
    { title: t('help.type-legacy'), description: t('help.type-legacy-desc'), details: t('help.type-legacy-details') }
  ]

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setSubmitted(true)
      setLoading(false)
      setFormData({ name: '', email: '', phone: '', interest: '', message: '' })
    }, 1000)
  }

  return (
    <div>
      {/* Hero */}
      <section className="help-hero">
        <div className="help-hero-bg">
          <img
            src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1920&h=1080&fit=crop"
            alt=""
            className="help-hero-bg-img"
          />
          <div className="help-hero-overlay" />
        </div>
        <div className="help-hero-content">
          <div className="container" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '100%' }}>
            <h1 className="help-hero-title" style={{ textAlign: 'center', width: '100%' }}>{t('help.title')}</h1>
            <p className="help-hero-subtitle" style={{ textAlign: 'center' }}>{t('help.subtitle')}</p>
            <div className="help-hero-actions" style={{ justifyContent: 'center' }}>
              <a href="#help-ways" className="help-hero-btn-primary">
                {t('help.types-title')}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
              </a>
              <Link to="/doneren" className="help-hero-btn-secondary">{t('nav.doneer-nu')}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="help-why">
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="help-why-grid">
            <div className="help-why-text" style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
              <h2 className="help-why-title" style={{ textAlign: 'center' }}>{t('help.intro-title')}</h2>
              <p>{t('help.intro-text1')}</p>
              <p>{t('help.intro-text2')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Action Types */}
      <section className="help-ways" id="help-ways">
        <div className="container">
          <div className="help-ways-header" style={{ textAlign: 'center' }}>
            <h2 className="help-ways-title" style={{ textAlign: 'center' }}>{t('help.types-title')}</h2>
          </div>
          <div className="help-ways-grid">
            {actionTypes.map((action, index) => (
              <div
                key={index}
                className={`help-way-card ${expandedCard === index ? 'expanded' : ''}`}
                onClick={() => setExpandedCard(expandedCard === index ? null : index)}
              >
                <div className="help-way-icon" style={{ color: accentColors[index], backgroundColor: `${accentColors[index]}10` }}>
                  {icons[iconKeys[index]]}
                </div>
                <div className="help-way-content">
                  <h3 className="help-way-title">{action.title}</h3>
                  <p className="help-way-desc">{action.description}</p>
                  {expandedCard === index && (
                    <p className="help-way-details">{action.details}</p>
                  )}
                </div>
                <span className="help-way-toggle" style={{ color: accentColors[index] }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: expandedCard === index ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s ease' }}>
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="help-contact">
        <div className="container">
          <div className="help-contact-grid">
            <div className="help-contact-left">
              <h2 className="help-contact-title">{t('help.contact-title')}</h2>
              <p className="help-contact-text">{t('help.contact-text')}</p>

              <div className="help-contact-items">
                <a href="mailto:info@stichtingmanarah.nl" className="help-contact-item">
                  <div className="help-contact-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  </div>
                  <div>
                    <strong>Email</strong>
                    <span>info@stichtingmanarah.nl</span>
                  </div>
                </a>
                <a href="https://wa.me/31103602862" target="_blank" rel="noreferrer" className="help-contact-item">
                  <div className="help-contact-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  </div>
                  <div>
                    <strong>WhatsApp</strong>
                    <span>+31 10 360 2862</span>
                  </div>
                </a>
                <div className="help-contact-item">
                  <div className="help-contact-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <div>
                    <strong>Rotterdam</strong>
                    <span>Nederland</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="help-contact-form-card">
              {submitted ? (
                <div className="help-form-success">
                  <div className="help-form-success-icon">
                    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>
                  </div>
                  <h3>{t('help.form-success-title')}</h3>
                  <p>{t('help.form-success-text')}</p>
                  <button className="help-form-btn-outline" onClick={() => setSubmitted(false)}>
                    {t('help.form-success-new')}
                  </button>
                </div>
              ) : (
                <form className="help-form" onSubmit={handleSubmit}>
                  <div className="help-form-row">
                    <div className="help-form-group">
                      <label htmlFor="name">{t('help.form-name')}</label>
                      <input type="text" id="name" name="name" placeholder={t('help.form-name-placeholder')} value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="help-form-group">
                      <label htmlFor="email">{t('help.form-email')}</label>
                      <input type="email" id="email" name="email" placeholder={t('help.form-email-placeholder')} value={formData.email} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="help-form-row">
                    <div className="help-form-group">
                      <label htmlFor="phone">{t('help.form-phone')}</label>
                      <input type="tel" id="phone" name="phone" placeholder={t('help.form-phone-placeholder')} value={formData.phone} onChange={handleChange} />
                    </div>
                    <div className="help-form-group">
                      <label htmlFor="interest">{t('help.form-interest')}</label>
                      <select id="interest" name="interest" value={formData.interest} onChange={handleChange} required>
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
                  </div>
                  <div className="help-form-group">
                    <label htmlFor="message">{t('help.form-message')}</label>
                    <textarea id="message" name="message" placeholder={t('help.form-message-placeholder')} rows="4" value={formData.message} onChange={handleChange} required />
                  </div>
                  <button type="submit" className="help-form-submit" disabled={loading}>
                    {loading ? (
                      <><span className="spinner" /> {t('help.form-submitting')}</>
                    ) : (
                      <>{t('help.form-submit')} <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></>
                    )}
                  </button>
                  <p className="help-form-note">{t('help.form-note')}</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="help-cta">
        <div className="container" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="help-cta-inner" style={{ textAlign: 'center', width: '100%' }}>
            <h2 style={{ textAlign: 'center', width: '100%' }}>{t('help.cta-title')}</h2>
            <p style={{ textAlign: 'center' }}>{t('help.cta-text')}</p>
            <div className="help-cta-buttons" style={{ justifyContent: 'center' }}>
              <Link to="/doneren" className="help-cta-btn-primary">{t('nav.doneer-nu')}</Link>
              <Link to="/projecten" className="help-cta-btn-secondary">{t('help.cta-projects')}</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SamenInActie
