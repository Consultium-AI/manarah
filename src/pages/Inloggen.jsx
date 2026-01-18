import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authAPI } from '../utils/api'
import { setAuthToken, setUser } from '../utils/auth'

const Inloggen = () => {
  const [activeTab, setActiveTab] = useState('login')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // Login form state
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [showVerificationPrompt, setShowVerificationPrompt] = useState(false)
  const [verificationEmail, setVerificationEmail] = useState('')

  // Register form state
  const [registerName, setRegisterName] = useState('')
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [registerPasswordConfirm, setRegisterPasswordConfirm] = useState('')
  const [registerTerms, setRegisterTerms] = useState(false)
  const [registerNewsletter, setRegisterNewsletter] = useState(false)
  const [registerError, setRegisterError] = useState('')
  const [registerSuccess, setRegisterSuccess] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setLoginError('')
    setShowVerificationPrompt(false)

    try {
      const response = await authAPI.login(loginEmail, loginPassword)
      if (response.data.success) {
        setAuthToken(response.data.token)
        setUser(response.data.user)
        alert('Succesvol ingelogd!')
        navigate('/')
      }
    } catch (error) {
      const errorData = error.response?.data
      if (errorData?.requiresVerification) {
        setShowVerificationPrompt(true)
        setVerificationEmail(errorData.email || loginEmail)
        setLoginError('Je emailadres is nog niet geverifieerd. Controleer je inbox of vraag een nieuwe verificatie email aan.')
      } else {
        setLoginError(errorData?.error || 'Inloggen mislukt')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleResendVerification = async () => {
    try {
      await authAPI.resendVerification(verificationEmail)
      alert('Verificatie email opnieuw verzonden! Controleer je inbox.')
    } catch (error) {
      alert(error.response?.data?.error || 'Kon verificatie email niet verzenden')
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setRegisterError('')
    setRegisterSuccess(false)

    if (registerPassword !== registerPasswordConfirm) {
      setRegisterError('De wachtwoorden komen niet overeen.')
      return
    }

    if (registerPassword.length < 8) {
      setRegisterError('Het wachtwoord moet minimaal 8 tekens lang zijn.')
      return
    }

    if (!registerTerms) {
      setRegisterError('Je moet akkoord gaan met de algemene voorwaarden.')
      return
    }

    setLoading(true)

    try {
      const response = await authAPI.register(
        registerName,
        registerEmail,
        registerPassword,
        registerNewsletter
      )
      if (response.data.success) {
        if (response.data.requiresVerification) {
          setRegisterSuccess(true)
          alert('Account aangemaakt! Controleer je email om je account te verifiëren voordat je kunt inloggen.')
        } else {
          setAuthToken(response.data.token)
          setUser(response.data.user)
          alert('Account succesvol aangemaakt! Je bent nu ingelogd.')
          navigate('/')
        }
      }
    } catch (error) {
      setRegisterError(error.response?.data?.error || 'Registratie mislukt')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleAuth = async () => {
    try {
      const response = await authAPI.getGoogleAuthUrl()
      window.location.href = response.data.url
    } catch (error) {
      alert('Kon niet verbinden met Google. Probeer het later opnieuw.')
    }
  }

  const handleFacebookAuth = async () => {
    try {
      const response = await authAPI.getFacebookAuthUrl()
      window.location.href = response.data.url
    } catch (error) {
      alert('Kon niet verbinden met Facebook. Probeer het later opnieuw.')
    }
  }

  return (
    <section className="auth-section">
      <div className="container">
        <div className="auth-container">
          <div className="auth-tabs">
            <button 
              className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => setActiveTab('login')}
            >
              Inloggen
            </button>
            <button 
              className={`auth-tab ${activeTab === 'register' ? 'active' : ''}`}
              onClick={() => setActiveTab('register')}
            >
              Registreren
            </button>
          </div>

          {activeTab === 'login' ? (
            <div className="auth-form-container active">
              <h2 className="auth-title">Welkom terug</h2>
              <p className="auth-subtitle">Log in op je account om door te gaan</p>
              <div className="admin-login-link">
                <a href="/admin" className="form-link">Admin login</a>
              </div>

              <div className="social-auth">
                <button className="social-btn social-btn-google" type="button" onClick={handleGoogleAuth}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span>Inloggen met Google</span>
                </button>
                <button className="social-btn social-btn-facebook" type="button" onClick={handleFacebookAuth}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Inloggen met Facebook</span>
                </button>
              </div>

              <div className="auth-divider">
                <span>of</span>
              </div>

              <form className="auth-form" onSubmit={handleLogin}>
                {loginError && (
                  <div className="form-error" style={{ display: 'block' }}>
                    {loginError}
                  </div>
                )}
                {showVerificationPrompt && (
                  <div className="verification-prompt">
                    <p>Je emailadres is nog niet geverifieerd.</p>
                    <button 
                      type="button" 
                      className="btn btn-outline btn-sm"
                      onClick={handleResendVerification}
                    >
                      Verstuur verificatie email opnieuw
                    </button>
                  </div>
                )}
                <div className="form-group">
                  <label htmlFor="loginEmail" className="form-label">E-mailadres</label>
                  <input
                    type="email"
                    id="loginEmail"
                    className="form-input"
                    placeholder="jouw@email.nl"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="loginPassword" className="form-label">Wachtwoord</label>
                  <input
                    type="password"
                    id="loginPassword"
                    className="form-input"
                    placeholder="Je wachtwoord"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                  <a href="#" className="form-link">Wachtwoord vergeten?</a>
                </div>
                <button type="submit" className="btn btn-primary btn-auth" disabled={loading}>
                  {loading ? 'Inloggen...' : 'Inloggen'}
                </button>
              </form>
            </div>
          ) : (
            <div className="auth-form-container active">
              <h2 className="auth-title">Maak een account aan</h2>
              <p className="auth-subtitle">Registreer je om toegang te krijgen tot alle functies</p>

              <div className="social-auth">
                <button className="social-btn social-btn-google" type="button" onClick={handleGoogleAuth}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span>Registreren met Google</span>
                </button>
                <button className="social-btn social-btn-facebook" type="button" onClick={handleFacebookAuth}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Registreren met Facebook</span>
                </button>
              </div>

              <div className="auth-divider">
                <span>of</span>
              </div>

              <form className="auth-form" onSubmit={handleRegister}>
                {registerError && (
                  <div className="form-error" style={{ display: 'block' }}>
                    {registerError}
                  </div>
                )}
                {registerSuccess && (
                  <div className="form-success" style={{ display: 'block' }}>
                    Account aangemaakt! Controleer je email om je account te verifiëren.
                  </div>
                )}
                <div className="form-group">
                  <label htmlFor="registerName" className="form-label">Volledige naam</label>
                  <input
                    type="text"
                    id="registerName"
                    className="form-input"
                    placeholder="Jan Jansen"
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="registerEmail" className="form-label">E-mailadres</label>
                  <input
                    type="email"
                    id="registerEmail"
                    className="form-input"
                    placeholder="jouw@email.nl"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="registerPassword" className="form-label">Wachtwoord</label>
                  <input
                    type="password"
                    id="registerPassword"
                    className="form-input"
                    placeholder="Minimaal 8 tekens"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    required
                    minLength="8"
                  />
                  <small className="form-help">Minimaal 8 tekens, inclusief hoofdletter en cijfer</small>
                </div>
                <div className="form-group">
                  <label htmlFor="registerPasswordConfirm" className="form-label">Bevestig wachtwoord</label>
                  <input
                    type="password"
                    id="registerPasswordConfirm"
                    className="form-input"
                    placeholder="Herhaal je wachtwoord"
                    value={registerPasswordConfirm}
                    onChange={(e) => setRegisterPasswordConfirm(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group form-checkbox">
                  <input
                    type="checkbox"
                    id="registerTerms"
                    checked={registerTerms}
                    onChange={(e) => setRegisterTerms(e.target.checked)}
                    required
                  />
                  <label htmlFor="registerTerms" className="checkbox-label">
                    Ik ga akkoord met de <a href="#" className="form-link">algemene voorwaarden</a> en het <a href="#" className="form-link">privacybeleid</a>
                  </label>
                </div>
                <div className="form-group form-checkbox">
                  <input
                    type="checkbox"
                    id="registerNewsletter"
                    checked={registerNewsletter}
                    onChange={(e) => setRegisterNewsletter(e.target.checked)}
                  />
                  <label htmlFor="registerNewsletter" className="checkbox-label">
                    Ik wil graag de nieuwsbrief ontvangen met updates over projecten en impact
                  </label>
                </div>
                <button type="submit" className="btn btn-primary btn-auth" disabled={loading}>
                  {loading ? 'Account aanmaken...' : 'Account aanmaken'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Inloggen

