import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { donationsAPI, projectsAPI } from '../utils/api'
import { isAuthenticated, getUser } from '../utils/auth'
import { useTranslation } from '../hooks/useTranslation'
import { 
  HeartIcon, GlobeIcon, ClipboardIcon, CheckIcon, 
  LockIcon, MailIcon, HomeIcon, DropletIcon, BookIcon, 
  UtensilsIcon, PinIcon 
} from '../components/icons/SimpleIcons'

const Doneren = () => {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const [donationType, setDonationType] = useState('one-time')
  const [selectedAmount, setSelectedAmount] = useState(20)
  const [customAmount, setCustomAmount] = useState('')
  const [selectedProject, setSelectedProject] = useState('global')
  const [projects, setProjects] = useState([])
  const [loadingProjects, setLoadingProjects] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState('global')
  
  // Guest donor info
  const [guestName, setGuestName] = useState('')
  const [guestEmail, setGuestEmail] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  const navigate = useNavigate()
  
  // Check if user is logged in
  useEffect(() => {
    setIsLoggedIn(isAuthenticated())
    if (isAuthenticated()) {
      const user = getUser()
      if (user) {
        setGuestName(user.name || '')
        setGuestEmail(user.email || '')
      }
    }
  }, [])

  const amounts = [10, 20, 50, 100]

  // Load projects on mount
  useEffect(() => {
    loadProjects()
    
    // Check if project is specified in URL
    const projectId = searchParams.get('project')
    if (projectId) {
      setSelectedProject(projectId)
      setActiveTab('project')
    }
  }, [searchParams])

  const loadProjects = async () => {
    try {
      setLoadingProjects(true)
      const response = await projectsAPI.getAll()
      if (response.data && response.data.success) {
        setProjects(response.data.projects || [])
      }
    } catch (err) {
      console.error('Error loading projects:', err)
    } finally {
      setLoadingProjects(false)
    }
  }

  const getCountryName = (code) => {
    return t(`country.${code}`) || code
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0
    }).format(amount || 0)
  }

  const getProgressPercentage = (current, target) => {
    if (!target || target === 0) return 0
    return Math.min((current / target) * 100, 100)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const amount = customAmount ? parseFloat(customAmount) : selectedAmount

    if (!amount || amount <= 0) {
      alert('Selecteer een bedrag of voer een bedrag in.')
      return
    }

    // Validate guest info if not logged in
    if (!isLoggedIn) {
      if (!guestName.trim()) {
        alert('Vul je naam in.')
        return
      }
      if (!guestEmail.trim() || !guestEmail.includes('@')) {
        alert('Vul een geldig e-mailadres in.')
        return
      }
    }

    setIsSubmitting(true)

    try {
      const donationData = {
        amount,
        donation_type: donationType,
        currency: 'EUR'
      }
      
      // Add guest info if not logged in
      if (!isLoggedIn) {
        donationData.guest_name = guestName.trim()
        donationData.guest_email = guestEmail.trim()
      }
      
      // Add project_id if donating to specific project
      if (activeTab === 'project' && selectedProject !== 'global') {
        donationData.project_id = parseInt(selectedProject)
      }

      const result = await donationsAPI.create(donationData)

      if (result.data.success) {
        const projectName = selectedProject !== 'global' 
          ? projects.find(p => p.id === parseInt(selectedProject))?.name || ''
          : ''
        navigate(`/bedankt?amount=${amount}&type=${donationType}&project=${encodeURIComponent(projectName)}`)
        setSelectedAmount(20)
        setCustomAmount('')
        setGuestName('')
        setGuestEmail('')
      }
    } catch (error) {
      console.error('Donation error:', error)
      alert(error.response?.data?.error || 'Er is een fout opgetreden bij het verwerken van je donatie.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getImpactMessage = (amount) => {
    const amt = customAmount ? parseFloat(customAmount) : amount
    if (amt >= 100) return t('donate.impact-100')
    if (amt >= 50) return t('donate.impact-50')
    if (amt >= 20) return t('donate.impact-20')
    if (amt >= 10) return t('donate.impact-10')
    return t('donate.impact-default')
  }

  return (
    <div className="donate-page-new">
      {/* Hero Section */}
      <section className="donate-hero">
        <div className="donate-hero-bg">
          <img 
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&h=800&fit=crop" 
            alt="Kinderen die hulp ontvangen"
          />
          <div className="donate-hero-overlay"></div>
        </div>
        <div className="container">
          <div className="donate-hero-content">
            <h1 className="donate-hero-title">
              {t('donate.hero-title')} <span className="highlight">{t('donate.hero-highlight')}</span>
            </h1>
            <p className="donate-hero-subtitle">
              {t('donate.hero-subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="donate-main">
        <div className="container">
          <div className="donate-layout">
            {/* Left: Donation Form */}
            <div className="donate-form-section">
              <div className="donate-card">
                {/* Tab Selection */}
                <div className="donate-tabs">
                  <button 
                    className={`donate-tab ${activeTab === 'global' ? 'active' : ''}`}
                    onClick={() => {
                      setActiveTab('global')
                      setSelectedProject('global')
                    }}
                  >
                    <span className="tab-icon"><GlobeIcon size={18} /></span>
                    {t('donate.tab-global')}
                  </button>
                  <button 
                    className={`donate-tab ${activeTab === 'project' ? 'active' : ''}`}
                    onClick={() => setActiveTab('project')}
                  >
                    <span className="tab-icon"><ClipboardIcon size={18} /></span>
                    {t('donate.tab-project')}
                  </button>
                </div>

                {/* Project Selection (if project tab active) */}
                {activeTab === 'project' && (
                  <div className="project-selector">
                    <label className="project-selector-label">{t('donate.select-project')}</label>
                    {loadingProjects ? (
                      <div className="project-loading">{t('donate.projects-loading')}</div>
                    ) : projects.length === 0 ? (
                      <div className="project-empty">{t('donate.projects-empty')}</div>
                    ) : (
                      <div className="project-grid">
                        {projects.filter(p => p.status === 'active').map(project => (
                          <div 
                            key={project.id}
                            className={`project-option ${selectedProject === String(project.id) ? 'selected' : ''}`}
                            onClick={() => setSelectedProject(String(project.id))}
                          >
                            <div className="project-option-header">
                              <span className="project-option-country">
                                <PinIcon size={14} /> {getCountryName(project.country_code)}
                              </span>
                              {selectedProject === String(project.id) && (
                                <span className="project-check"><CheckIcon size={16} /></span>
                              )}
                            </div>
                            <h4 className="project-option-name">{project.name}</h4>
                            {project.target_amount && (
                              <div className="project-option-progress">
                                <div className="progress-bar-mini">
                                  <div 
                                    className="progress-fill-mini"
                                    style={{ width: `${getProgressPercentage(project.current_amount, project.target_amount)}%` }}
                                  ></div>
                                </div>
                                <span className="progress-text-mini">
                                  {formatCurrency(project.current_amount || 0)} / {formatCurrency(project.target_amount)}
                                </span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Donation Type Toggle */}
                <div className="donation-frequency">
                  <button
                    type="button"
                    className={`frequency-btn ${donationType === 'one-time' ? 'active' : ''}`}
                    onClick={() => setDonationType('one-time')}
                  >
                    {t('donate.frequency-once')}
                  </button>
                  <button
                    type="button"
                    className={`frequency-btn ${donationType === 'monthly' ? 'active' : ''}`}
                    onClick={() => setDonationType('monthly')}
                  >
                    {t('donate.frequency-monthly')}
                  </button>
                </div>

                {/* Amount Selection */}
                <form className="donate-form" onSubmit={handleSubmit}>
                  <div className="amount-grid">
                    {amounts.map(amount => (
                      <button
                        key={amount}
                        type="button"
                        className={`amount-btn ${selectedAmount === amount && !customAmount ? 'active' : ''}`}
                        onClick={() => {
                          setSelectedAmount(amount)
                          setCustomAmount('')
                        }}
                      >
                        <span className="amount-value">€{amount}</span>
                        {donationType === 'monthly' && <span className="amount-period">{t('donate.per-month')}</span>}
                      </button>
                    ))}
                  </div>

                  {/* Custom Amount */}
                  <div className="custom-amount-section">
                    <label className="custom-label">{t('donate.custom-label')}</label>
                    <div className="custom-input-wrapper">
                      <span className="euro-sign">€</span>
                      <input
                        type="number"
                        className="custom-input"
                        placeholder={t('donate.custom-placeholder')}
                        min="1"
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value)
                          if (e.target.value) setSelectedAmount(null)
                        }}
                      />
                      {donationType === 'monthly' && (
                        <span className="period-suffix">{t('donate.per-month')}</span>
                      )}
                    </div>
                  </div>

                  {/* Guest Info - Only show if not logged in */}
                  <div className="donor-info-section">
                    <label className="donor-info-label">
                      {isLoggedIn ? t('donate.donor-info') : t('donate.donor-info-guest')}
                    </label>
                    <div className="donor-info-fields">
                      <div className="donor-field">
                        <input
                          type="text"
                          className="donor-input"
                          placeholder={t('donate.name-placeholder')}
                          value={guestName}
                          onChange={(e) => setGuestName(e.target.value)}
                          disabled={isLoggedIn}
                          required={!isLoggedIn}
                        />
                      </div>
                      <div className="donor-field">
                        <input
                          type="email"
                          className="donor-input"
                          placeholder={t('donate.email-placeholder')}
                          value={guestEmail}
                          onChange={(e) => setGuestEmail(e.target.value)}
                          disabled={isLoggedIn}
                          required={!isLoggedIn}
                        />
                      </div>
                    </div>
                    {!isLoggedIn && (
                      <p className="donor-info-note">
                        {t('donate.guest-note')}
                      </p>
                    )}
                  </div>

                  {/* Impact Preview */}
                  <div className="impact-preview">
                    <div className="impact-icon-wrapper">
                      <span className="impact-icon-large"><HeartIcon size={32} /></span>
                    </div>
                    <p className="impact-text-large">
                      {getImpactMessage(selectedAmount)}
                    </p>
                  </div>

                  {/* Submit */}
                  <button 
                    type="submit" 
                    className="donate-submit-btn"
                    disabled={isSubmitting || (activeTab === 'project' && selectedProject === 'global')}
                  >
                    {isSubmitting ? (
                      <span className="loading-spinner">{t('donate.processing')}</span>
                    ) : (
                      <>
                        {t('donate.submit', { amount: customAmount || selectedAmount })}
                        {donationType === 'monthly' ? t('donate.submit-monthly') : ''}
                        <span className="btn-arrow">→</span>
                      </>
                    )}
                  </button>

                  {/* Trust Indicators */}
                  <div className="trust-section">
                    <div className="trust-item">
                      <span className="trust-icon"><LockIcon size={16} /></span>
                      <span>{t('donate.trust-secure')}</span>
                    </div>
                    <div className="trust-item">
                      <span className="trust-icon"><MailIcon size={16} /></span>
                      <span>{t('donate.trust-confirm')}</span>
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div className="payment-methods">
                    <span className="payment-label">{t('donate.payment-methods')}</span>
                    <div className="payment-icons">
                      <span className="payment-method">iDEAL</span>
                      <span className="payment-method">Creditcard</span>
                      <span className="payment-method">PayPal</span>
                      <span className="payment-method">Bancontact</span>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Right: Info Section */}
            <div className="donate-info-section">
              {/* Stats */}
              <div className="donate-stats-card">
                <h3 className="stats-title">{t('donate.stats-title')}</h3>
                <div className="stats-grid">
                  <div className="stat-item">
                    <span className="stat-number">1.2M+</span>
                    <span className="stat-label">{t('donate.stats-people')}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">25+</span>
                    <span className="stat-label">{t('donate.stats-countries')}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">150+</span>
                    <span className="stat-label">{t('donate.stats-projects')}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">92%</span>
                    <span className="stat-label">{t('donate.stats-percentage')}</span>
                  </div>
                </div>
              </div>

              {/* Why Donate */}
              <div className="why-donate-card">
                <h3 className="why-title">{t('donate.why-title')}</h3>
                <ul className="why-list">
                  <li>
                    <span className="why-icon"><HomeIcon size={24} /></span>
                    <div>
                      <strong>{t('donate.why-shelter')}</strong>
                      <p>{t('donate.why-shelter-text')}</p>
                    </div>
                  </li>
                  <li>
                    <span className="why-icon"><DropletIcon size={24} /></span>
                    <div>
                      <strong>{t('donate.why-water')}</strong>
                      <p>{t('donate.why-water-text')}</p>
                    </div>
                  </li>
                  <li>
                    <span className="why-icon"><BookIcon size={24} /></span>
                    <div>
                      <strong>{t('donate.why-education')}</strong>
                      <p>{t('donate.why-education-text')}</p>
                    </div>
                  </li>
                  <li>
                    <span className="why-icon"><UtensilsIcon size={24} /></span>
                    <div>
                      <strong>{t('donate.why-food')}</strong>
                      <p>{t('donate.why-food-text')}</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Bank Transfer Info */}
              <div className="bank-info-card">
                <h3 className="bank-title">{t('donate.bank-title')}</h3>
                <p className="bank-text">
                  {t('donate.bank-text')}
                </p>
                <div className="bank-details">
                  <div className="bank-row">
                    <span className="bank-label">{t('donate.bank-iban')}</span>
                    <span className="bank-value">NL52 INGB 0000 0020 91</span>
                  </div>
                  <div className="bank-row">
                    <span className="bank-label">{t('donate.bank-name')}</span>
                    <span className="bank-value">Stichting Manarah</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Doneren
