import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from '../../hooks/useTranslation'

const DonateBanner = () => {
  const { t } = useTranslation()
  const [frequency, setFrequency] = useState('eenmalig')
  const [selectedAmount, setSelectedAmount] = useState(25)
  const [customAmount, setCustomAmount] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [street, setStreet] = useState('')
  const [postcode, setPostcode] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  const frequencies = ['eenmalig', 'maandelijks', 'jaarlijks']
  const amounts = [25, 50, 75]

  // Intersection Observer for reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const getFrequencyLabel = (freq) => {
    switch (freq) {
      case 'eenmalig':
        return t('donate-banner.frequency.once')
      case 'maandelijks':
        return t('donate-banner.frequency.monthly')
      case 'jaarlijks':
        return t('donate-banner.frequency.yearly')
      default:
        return freq
    }
  }

  return (
    <section className="donate-banner" id="donate" ref={sectionRef}>
      <div className="container">
        {/* Title */}
        <div className={`donate-banner-header reveal-left ${isVisible ? 'revealed' : ''}`}>
          <h2 className="donate-banner-title">
            <span className="donate-banner-highlight">{t('donate-banner.title')}</span>
            {t('donate-banner.subtitle')}
          </h2>
        </div>

        {/* Subcopy */}
        <div className={`reveal-left delay-1 ${isVisible ? 'revealed' : ''}`}>
          <p className="donate-banner-subtitle">
            {t('donate-banner.subtitle2')}
          </p>
        </div>

        {/* Frequency Selection */}
        <div className={`donate-banner-frequency reveal-left delay-2 ${isVisible ? 'revealed' : ''}`}>
          {frequencies.map((freq) => (
            <button
              key={freq}
              type="button"
              className={`frequency-option ${frequency === freq ? 'active' : ''}`}
              onClick={() => setFrequency(freq)}
            >
              {getFrequencyLabel(freq)}
            </button>
          ))}
        </div>

        {/* Amount Selection */}
        <div className={`donate-banner-amounts reveal-left delay-3 ${isVisible ? 'revealed' : ''}`}>
          {amounts.map((amount) => (
            <button
              key={amount}
              type="button"
              className={`amount-option ${selectedAmount === amount && !customAmount ? 'active' : ''}`}
              onClick={() => {
                setSelectedAmount(amount)
                setCustomAmount('')
              }}
            >
              € {amount}
            </button>
          ))}
          <input
            type="number"
            inputMode="decimal"
            placeholder="1"
            value={customAmount}
            onChange={(e) => {
              setCustomAmount(e.target.value)
              if (e.target.value) setSelectedAmount(null)
            }}
            className="amount-custom-input"
          />
        </div>

        {/* Form Fields */}
        <div className={`donate-banner-form reveal-left delay-4 ${isVisible ? 'revealed' : ''}`}>
          <div className="donate-banner-checkbox">
            <label className="checkbox-label checkbox-bg">
              <input type="checkbox" />
              {t('donate-banner.transaction-costs')}
            </label>
          </div>

          <div className="donate-banner-fields-4">
            <div className="field-group">
              <label className="field-label">{t('donate-banner.name')}</label>
              <input
                type="text"
                placeholder={t('donate-banner.name-placeholder')}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="donate-field-input"
              />
            </div>
            <div className="field-group">
              <label className="field-label">{t('donate-banner.email')}</label>
              <input
                type="email"
                placeholder={t('donate-banner.email-placeholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="donate-field-input"
              />
            </div>
            <div className="field-group">
              <label className="field-label">{t('donate-banner.street')}</label>
              <input
                type="text"
                placeholder={t('donate-banner.street-placeholder')}
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="donate-field-input"
              />
            </div>
            <div className="field-group">
              <label className="field-label">{t('donate-banner.postcode')}</label>
              <input
                type="text"
                placeholder={t('donate-banner.postcode-placeholder')}
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                className="donate-field-input"
              />
            </div>
          </div>

          <div className="donate-banner-terms">
            <label className="checkbox-label">
              <input type="checkbox" />
              {t('donate-banner.terms')}{' '}
              <a href="https://stichtingmanarah.nl/assets/docs/privacyverklaring.pdf" target="_blank" rel="noreferrer">
                {t('donate-banner.privacy')}
              </a>,{' '}
              <a href="https://stichtingmanarah.nl/assets/docs/voorwaarden.pdf" target="_blank" rel="noreferrer">
                {t('donate-banner.terms-link')}
              </a>,{' '}
              <a href="https://stichtingmanarah.nl/assets/docs/donatiebeleid.pdf" target="_blank" rel="noreferrer">
                {t('donate-banner.policy')}
              </a>.
            </label>
          </div>

          <Link to="/doneren" className="donate-banner-btn">
            {t('nav.doneer-nu')}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default DonateBanner
