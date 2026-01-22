import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { donationsAPI } from '../utils/api'
import { isAuthenticated } from '../utils/auth'

const MijnDonaties = () => {
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
      setError(err.response?.data?.error || 'Kon donaties niet laden.')
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

  const typeLabels = {
    'one-time': 'Eenmalig',
    'monthly': 'Maandelijks',
    'yearly': 'Jaarlijks'
  }

  const statusLabels = {
    'completed': 'Voltooid',
    'pending': 'In behandeling',
    'failed': 'Mislukt',
    'cancelled': 'Geannuleerd'
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
            <p>Donaties laden...</p>
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
            <a href="/inloggen" className="btn btn-primary">Inloggen</a>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="my-donations-section">
      <div className="container">
        <div className="my-donations-header">
          <h1 className="my-donations-title">Mijn Donaties</h1>
          <p className="my-donations-subtitle">Overzicht van al je donaties en hun impact</p>
        </div>

        {donations.length === 0 ? (
          <div className="donations-empty">
            <div className="empty-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
            <h2 className="empty-title">Nog geen donaties</h2>
            <p className="empty-description">
              Je hebt nog geen donaties gedaan. Start met doneren en maak het verschil!
            </p>
            <a href="/doneren" className="btn btn-primary">Doneer nu</a>
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
                  <h3 className="summary-label">Totaal gedoneerd</h3>
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
                  <h3 className="summary-label">Aantal donaties</h3>
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
                  <h3 className="summary-label">Laatste donatie</h3>
                  <p className="summary-value">
                    {lastDonation ? formatDate(lastDonation.created_at) : '-'}
                  </p>
                </div>
              </div>
            </div>

            <div className="donations-list-container">
              <h2 className="donations-list-title">Donatiegeschiedenis</h2>
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
                        {statusLabels[donation.status]}
                      </span>
                    </div>
                    <div className="donation-card-body">
                      <div className="donation-info">
                        <div className="donation-info-item">
                          <span className="donation-info-label">Type:</span>
                          <span className="donation-info-value">
                            {typeLabels[donation.donation_type]}
                          </span>
                        </div>
                        <div className="donation-info-item">
                          <span className="donation-info-label">Datum:</span>
                          <span className="donation-info-value">
                            {formatDate(donation.created_at)}
                          </span>
                        </div>
                        {donation.project_name && (
                          <div className="donation-info-item">
                            <span className="donation-info-label">Project:</span>
                            <span className="donation-info-value">{donation.project_name}</span>
                          </div>
                        )}
                        {donation.project_country && (
                          <div className="donation-info-item">
                            <span className="donation-info-label">Land:</span>
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

