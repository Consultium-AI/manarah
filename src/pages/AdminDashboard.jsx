import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { donationsAPI } from '../utils/api'
import { isAuthenticated, getUser, logout } from '../utils/auth'

const AdminDashboard = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const user = getUser()

  useEffect(() => {
    if (!isAuthenticated() || user?.role !== 'admin') {
      navigate('/admin')
      return
    }

    loadStats()
  }, [navigate, user])

  const loadStats = async () => {
    try {
      const response = await donationsAPI.getStats()
      if (response.data.success) {
        setStats(response.data.stats)
      }
    } catch (error) {
      console.error('Error loading stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    if (window.confirm('Weet je zeker dat je wilt uitloggen?')) {
      logout()
      sessionStorage.removeItem('adminLoggedIn')
      navigate('/admin')
    }
  }

  return (
    <section className="admin-dashboard-section">
      <div className="container">
        <div className="admin-dashboard-header">
          <h1 className="admin-dashboard-title">Admin Dashboard</h1>
          <p className="admin-dashboard-subtitle">Welkom terug, {user?.email}</p>
        </div>

        {loading ? (
          <p>Laden...</p>
        ) : stats && (
          <div className="admin-stats-grid">
            <div className="admin-stat-card">
              <div className="admin-stat-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M16 8h-5a3 3 0 0 0 0 6h2a3 3 0 0 1 0 6H7"/>
                  <line x1="12" y1="2" x2="12" y2="6"/>
                  <line x1="12" y1="18" x2="12" y2="22"/>
                </svg>
              </div>
              <div className="admin-stat-content">
                <h3 className="admin-stat-title">Donaties</h3>
                <p className="admin-stat-number">€{parseFloat(stats.total_amount || 0).toFixed(2)}</p>
                <p className="admin-stat-change">Totaal ontvangen</p>
              </div>
            </div>
            <div className="admin-stat-card">
              <div className="admin-stat-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="20" x2="18" y2="10"/>
                  <line x1="12" y1="20" x2="12" y2="4"/>
                  <line x1="6" y1="20" x2="6" y2="14"/>
                </svg>
              </div>
              <div className="admin-stat-content">
                <h3 className="admin-stat-title">Aantal</h3>
                <p className="admin-stat-number">{stats.total_donations || 0}</p>
                <p className="admin-stat-change">Totaal donaties</p>
              </div>
            </div>
            <div className="admin-stat-card">
              <div className="admin-stat-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <div className="admin-stat-content">
                <h3 className="admin-stat-title">In behandeling</h3>
                <p className="admin-stat-number">€{parseFloat(stats.pending_amount || 0).toFixed(2)}</p>
                <p className="admin-stat-change">Wachtend</p>
              </div>
            </div>
            <div className="admin-stat-card">
              <div className="admin-stat-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </div>
              <div className="admin-stat-content">
                <h3 className="admin-stat-title">Maandelijks</h3>
                <p className="admin-stat-number">€{parseFloat(stats.monthly_amount || 0).toFixed(2)}</p>
                <p className="admin-stat-change">Recurring</p>
              </div>
            </div>
          </div>
        )}

        <div className="admin-actions">
          <h2 className="admin-section-title">Snelle acties</h2>
          <div className="admin-actions-grid">
            <a href="#" className="admin-action-card">
              <div className="admin-action-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"/>
                  <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
              </div>
              <h3 className="admin-action-title">Nieuw project</h3>
              <p className="admin-action-description">Voeg een nieuw project toe</p>
            </a>
            <a href="#" className="admin-action-card">
              <div className="admin-action-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <h3 className="admin-action-title">Gebruiker beheren</h3>
              <p className="admin-action-description">Bekijk en beheer gebruikers</p>
            </a>
            <a href="#" className="admin-action-card">
              <div className="admin-action-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="20" x2="18" y2="10"/>
                  <line x1="12" y1="20" x2="12" y2="4"/>
                  <line x1="6" y1="20" x2="6" y2="14"/>
                </svg>
              </div>
              <h3 className="admin-action-title">Rapporten</h3>
              <p className="admin-action-description">Bekijk statistieken en rapporten</p>
            </a>
            <a href="#" className="admin-action-card">
              <div className="admin-action-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                </svg>
              </div>
              <h3 className="admin-action-title">Instellingen</h3>
              <p className="admin-action-description">Beheer website instellingen</p>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AdminDashboard




