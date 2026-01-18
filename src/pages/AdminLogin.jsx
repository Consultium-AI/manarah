import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { authAPI } from '../utils/api'
import { setAuthToken, setUser } from '../utils/auth'

const AdminLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token = sessionStorage.getItem('authToken')
    const adminLoggedIn = sessionStorage.getItem('adminLoggedIn')
    if (token && adminLoggedIn === 'true') {
      navigate('/admin-dashboard')
    }
  }, [navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await authAPI.adminLogin(email, password)
      if (response.data.success) {
        setAuthToken(response.data.token)
        setUser(response.data.user)
        sessionStorage.setItem('adminLoggedIn', 'true')
        navigate('/admin-dashboard')
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Ongeldige e-mail of wachtwoord.')
      setPassword('')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="auth-section">
      <div className="container">
        <div className="auth-container admin-login-container">
          <div className="admin-login-header">
            <h2 className="auth-title">Admin Login</h2>
            <p className="auth-subtitle">Beheerder toegang tot het dashboard</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {error && (
              <div className="admin-error" style={{ display: 'block' }}>
                {error}
              </div>
            )}
            <div className="form-group">
              <label htmlFor="adminEmail" className="form-label">E-mailadres</label>
              <input
                type="email"
                id="adminEmail"
                className="form-input"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="adminPassword" className="form-label">Wachtwoord</label>
              <input
                type="password"
                id="adminPassword"
                className="form-input"
                placeholder="Je wachtwoord"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-auth" disabled={loading}>
              {loading ? 'Inloggen...' : 'Inloggen als Admin'}
            </button>
          </form>

          <div className="admin-login-footer">
            <a href="/inloggen" className="form-link">Terug naar gebruikers login</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AdminLogin




