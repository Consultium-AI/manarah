import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { authAPI } from '../utils/api'
import { setAuthToken, setUser } from '../utils/auth'
import { useTranslation } from '../hooks/useTranslation'

const OAuthCallback = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [status, setStatus] = useState('processing')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const code = searchParams.get('code')
    const provider = window.location.pathname.includes('google') ? 'google' : 'facebook'
    
    if (!code) {
      setStatus('error')
      setMessage(t('oauth.no-code'))
      return
    }

    handleOAuthCallback(provider, code)
  }, [searchParams, navigate])

  const handleOAuthCallback = async (provider, code) => {
    try {
      let response
      if (provider === 'google') {
        response = await authAPI.googleCallback(code)
      } else {
        response = await authAPI.facebookCallback(code)
      }

      if (response.data.success) {
        setAuthToken(response.data.token)
        setUser(response.data.user)
        setStatus('success')
        setMessage(t('oauth.success-text'))
        setTimeout(() => {
          navigate('/')
        }, 1500)
      }
    } catch (error) {
      setStatus('error')
      setMessage(error.response?.data?.error || t('oauth.error-text'))
    }
  }

  return (
    <section className="auth-section">
      <div className="container">
        <div className="auth-container" style={{ maxWidth: '500px' }}>
          <div className="verification-status">
            {status === 'processing' && (
              <>
                <div className="verification-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <h2 className="auth-title">{t('oauth.processing-title')}</h2>
                <p>{t('oauth.processing-text')}</p>
              </>
            )}
            {status === 'success' && (
              <>
                <div className="verification-icon success">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M9 12l2 2 4-4"/>
                  </svg>
                </div>
                <h2 className="auth-title">{t('oauth.success-title')}</h2>
                <p>{message}</p>
              </>
            )}
            {status === 'error' && (
              <>
                <div className="verification-icon error">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                  </svg>
                </div>
                <h2 className="auth-title">{t('oauth.error-title')}</h2>
                <p>{message}</p>
                <div style={{ marginTop: '2rem' }}>
                  <a href="/inloggen" className="btn btn-primary">{t('oauth.to-login')}</a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default OAuthCallback




