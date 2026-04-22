import React, { useState } from 'react'
import Reveal from '../Reveal'
import { useTranslation } from '../../hooks/useTranslation'
import { isEmailJsReady, sendSiteEmail, TO_EMAIL, EMAILJS_FORM_TITLE } from '../../utils/emailjs'

const Contact = () => {
  const { t } = useTranslation()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [feedback, setFeedback] = useState(null)

  const openMailtoFallback = () => {
    const subject = `Nieuw bericht van ${name || 'website bezoeker'}`
    const body = `${message}\n\nNaam: ${name}\nE-mail: ${email}`
    window.location.href = `mailto:${TO_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFeedback(null)
    if (!isEmailJsReady()) {
      openMailtoFallback()
      return
    }
    setSending(true)
    try {
      await sendSiteEmail({
        formName: EMAILJS_FORM_TITLE.contactHomeEnPagina,
        fromName: name,
        fromEmail: email,
        message
      })
      setFeedback('success')
      setName('')
      setEmail('')
      setMessage('')
    } catch (err) {
      console.error(err)
      setFeedback('error')
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="contact-manarah" id="contact">
      <div className="container">
        <Reveal>
          <h2 className="contact-manarah-title">
            <span className="contact-highlight">{t('contact.title')}</span>
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="contact-manarah-subtitle">
            {t('contact.subtitle')}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={handleSubmit} className="contact-manarah-form">
            {feedback === 'success' && (
              <p className="contact-form-feedback contact-form-feedback--success" role="status">
                {t('contact.success')}
              </p>
            )}
            {feedback === 'error' && (
              <p className="contact-form-feedback contact-form-feedback--error" role="alert">
                {t('contact.error')}
              </p>
            )}
            <div className="contact-form-grid">
              <div className="form-group">
                <label className="form-label">{t('contact.name')}</label>
                <input
                  type="text"
                  placeholder={t('contact.name-placeholder')}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input-manarah"
                />
              </div>
              <div className="form-group">
                <label className="form-label">{t('contact.email')}</label>
                <input
                  type="email"
                  placeholder={t('contact.email-placeholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input-manarah"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">{t('contact.message')} <span className="required">{t('contact.required')}</span></label>
              <textarea
                required
                placeholder={t('contact.message-placeholder')}
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="form-input-manarah form-textarea"
              />
            </div>

            <div className="contact-form-actions">
              <button type="submit" className="btn-contact-submit" disabled={sending}>
                {sending ? t('contact.sending') : t('contact.submit')}
              </button>
              <span className="contact-email-note">
                {t('contact.or-email')}{' '}
                <a href={`mailto:${TO_EMAIL}`}>{TO_EMAIL}</a>
              </span>
            </div>

            <p className="contact-privacy-note">
              {t('contact.privacy')}{' '}
              <a href="https://stichtingmanarah.nl/assets/docs/privacyverklaring.pdf" target="_blank" rel="noreferrer">
                {t('contact.privacy-link')}
              </a>.
            </p>
          </form>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="contact-whatsapp">
            <p className="contact-whatsapp-text">{t('contact.whatsapp')}</p>
            <a
              href="https://wa.me/31103602862"
              target="_blank"
              rel="noreferrer"
              className="btn-whatsapp"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="whatsapp-svg">
                <path d="M20.52 3.48A11.78 11.78 0 0 0 12.01 0C5.38.01.02 5.38.01 12.01c0 2.12.56 4.19 1.62 6.01L0 24l6.14-1.6a11.9 11.9 0 0 0 5.86 1.53h.01c6.63 0 12.01-5.37 12.01-12s-5.36-8.45-3.5-8.45Z"/>
              </svg>
              {t('contact.whatsapp-button')}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default Contact
