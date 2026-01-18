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
              <div className="admin-stat-icon">💰</div>
              <div className="admin-stat-content">
                <h3 className="admin-stat-title">Donaties</h3>
                <p className="admin-stat-number">€{parseFloat(stats.total_amount || 0).toFixed(2)}</p>
                <p className="admin-stat-change">Totaal ontvangen</p>
              </div>
            </div>
            <div className="admin-stat-card">
              <div className="admin-stat-icon">📊</div>
              <div className="admin-stat-content">
                <h3 className="admin-stat-title">Aantal</h3>
                <p className="admin-stat-number">{stats.total_donations || 0}</p>
                <p className="admin-stat-change">Totaal donaties</p>
              </div>
            </div>
            <div className="admin-stat-card">
              <div className="admin-stat-icon">⏳</div>
              <div className="admin-stat-content">
                <h3 className="admin-stat-title">In behandeling</h3>
                <p className="admin-stat-number">€{parseFloat(stats.pending_amount || 0).toFixed(2)}</p>
                <p className="admin-stat-change">Wachtend</p>
              </div>
            </div>
            <div className="admin-stat-card">
              <div className="admin-stat-icon">📅</div>
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
              <div className="admin-action-icon">➕</div>
              <h3 className="admin-action-title">Nieuw project</h3>
              <p className="admin-action-description">Voeg een nieuw project toe</p>
            </a>
            <a href="#" className="admin-action-card">
              <div className="admin-action-icon">👤</div>
              <h3 className="admin-action-title">Gebruiker beheren</h3>
              <p className="admin-action-description">Bekijk en beheer gebruikers</p>
            </a>
            <a href="#" className="admin-action-card">
              <div className="admin-action-icon">📊</div>
              <h3 className="admin-action-title">Rapporten</h3>
              <p className="admin-action-description">Bekijk statistieken en rapporten</p>
            </a>
            <a href="#" className="admin-action-card">
              <div className="admin-action-icon">⚙️</div>
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




