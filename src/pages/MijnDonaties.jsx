import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { donationsAPI } from '../utils/api'
import { isAuthenticated } from '../utils/auth'
import { useTranslation } from '../hooks/useTranslation'

const MijnDonaties = () => {
  const { t } = useTranslation()
  const [donations, setDonations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/inloggen')
      return
    }

    loadDonations()
  }, [navigate])

  const loadDonations = async () => {
    try {
      setLoading(true)
      const response = await donationsAPI.getMy()
      
      if (response.data.success) {
        setDonations(response.data.donations || [])
      }
    } catch (err) {
      console.error('Error loading donations:', err)
      setError(err.response?.data?.error || t('donations.error'))
    } finally {
      setLoading(false)
    }
  }

  const calculateSummary = () => {
    const completed = donations.filter(d => d.status === 'completed')
    const total = completed.reduce((sum, d) => sum + parseFloat(d.amount || 0), 0)
    const count = donations.length
    const lastDonation = donations.length > 0 ? donations[0] : null
    
    return { total, count, lastDonation }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('nl-NL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const { total, count, lastDonation } = calculateSummary()

  const getTypeLabel = (type) => {
    switch (type) {
      case 'one-time':
        return t('donate.frequency-once')
      case 'monthly':
        return t('donate.frequency-monthly')
      default:
        return type
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'completed':
        return t('donations.status-completed')
      case 'pending':
        return t('donations.status-pending')
      case 'failed':
        return t('donations.status-failed')
      default:
        return status
    }
  }

  const statusColors = {
    'completed': 'var(--color-primary)',
    'pending': 'var(--color-secondary)',
    'failed': '#dc3545',
    'cancelled': 'var(--color-text-light)'
  }

  if (loading) {
    return (
      <section className="my-donations-section">
        <div className="container">
          <div className="donations-loading">
            <p>{t('common.loading')}</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="my-donations-section">
        <div className="container">
          <div className="donations-error">
            <p>{error}</p>
            <Link to="/inloggen" className="btn btn-primary">{t('nav.inloggen')}</Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="my-donations-section">
      <div className="container">
        <div className="my-donations-header">
          <h1 className="my-donations-title">{t('donations.title')}</h1>
          <p className="my-donations-subtitle">{t('donations.subtitle')}</p>
        </div>

        {donations.length === 0 ? (
          <div className="donations-empty">
            <div className="empty-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
            <h2 className="empty-title">{t('donations.empty')}</h2>
            <Link to="/doneren" className="btn btn-primary">{t('donations.start')}</Link>
          </div>
        ) : (
          <>
            <div className="donations-summary">
              <div className="summary-card">
                <div className="summary-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M16 8h-5a3 3 0 0 0 0 6h2a3 3 0 0 1 0 6H7"/>
                    <line x1="12" y1="2" x2="12" y2="6"/>
                    <line x1="12" y1="18" x2="12" y2="22"/>
                  </svg>
                </div>
                <div className="summary-content">
                  <h3 className="summary-label">{t('donations.total')}</h3>
                  <p className="summary-value">€{total.toFixed(2)}</p>
                </div>
              </div>
              <div className="summary-card">
                <div className="summary-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10"/>
                    <line x1="12" y1="20" x2="12" y2="4"/>
                    <line x1="6" y1="20" x2="6" y2="14"/>
                  </svg>
                </div>
                <div className="summary-content">
                  <h3 className="summary-label">{t('donations.count')}</h3>
                  <p className="summary-value">{count}</p>
                </div>
              </div>
              <div className="summary-card">
                <div className="summary-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                </div>
                <div className="summary-content">
                  <h3 className="summary-label">{t('donations.date')}</h3>
                  <p className="summary-value">
                    {lastDonation ? formatDate(lastDonation.created_at) : '-'}
                  </p>
                </div>
              </div>
            </div>

            <div className="donations-list-container">
              <h2 className="donations-list-title">{t('donations.subtitle')}</h2>
              <div className="donations-grid">
                {donations.map(donation => (
                  <div key={donation.id} className="donation-card">
                    <div className="donation-card-header">
                      <div className="donation-amount">
                        €{parseFloat(donation.amount).toFixed(2)}
                      </div>
                      <span 
                        className="donation-status"
                        style={{
                          backgroundColor: `${statusColors[donation.status]}20`,
                          color: statusColors[donation.status]
                        }}
                      >
                        {getStatusLabel(donation.status)}
                      </span>
                    </div>
                    <div className="donation-card-body">
                      <div className="donation-info">
                        <div className="donation-info-item">
                          <span className="donation-info-label">{t('donations.type-label')}:</span>
                          <span className="donation-info-value">
                            {getTypeLabel(donation.donation_type)}
                          </span>
                        </div>
                        <div className="donation-info-item">
                          <span className="donation-info-label">{t('donations.date')}:</span>
                          <span className="donation-info-value">
                            {formatDate(donation.created_at)}
                          </span>
                        </div>
                        {donation.project_name && (
                          <div className="donation-info-item">
                            <span className="donation-info-label">{t('donations.project-label')}:</span>
                            <span className="donation-info-value">{donation.project_name}</span>
                          </div>
                        )}
                        {donation.project_country && (
                          <div className="donation-info-item">
                            <span className="donation-info-label">{t('nav.waar-we-werken')}:</span>
                            <span className="donation-info-value">{donation.project_country}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default MijnDonaties
