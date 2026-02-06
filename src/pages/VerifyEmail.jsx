import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { authAPI } from '../utils/api'
import { setAuthToken, setUser } from '../utils/auth'
import { useTranslation } from '../hooks/useTranslation'

const VerifyEmail = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [status, setStatus] = useState('verifying')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const token = searchParams.get('token')
    
    if (!token) {
      setStatus('error')
      setMessage(t('verify.no-token'))
      return
    }

    verifyEmail(token)
  }, [searchParams])

  const verifyEmail = async (token) => {
    try {
      const response = await authAPI.verifyEmail(token)
      if (response.data.success) {
        setStatus('success')
        setMessage(t('verify.success-text'))
        setTimeout(() => {
          navigate('/inloggen')
        }, 3000)
      }
    } catch (error) {
      setStatus('error')
      setMessage(error.response?.data?.error || t('verify.error-text'))
    }
  }

  return (
    <section className="auth-section">
      <div className="container">
        <div className="auth-container" style={{ maxWidth: '500px' }}>
          <div className="verification-status">
            {status === 'verifying' && (
              <>
                <div className="verification-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <h2 className="auth-title">{t('verify.verifying-title')}</h2>
                <p>{t('verify.verifying-text')}</p>
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
                <h2 className="auth-title">{t('verify.success-title')}</h2>
                <p>{message}</p>
                <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '1rem' }}>
                  {t('verify.redirect')}
                </p>
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
                <h2 className="auth-title">{t('verify.error-title')}</h2>
                <p>{message}</p>
                <div style={{ marginTop: '2rem' }}>
                  <a href="/inloggen" className="btn btn-primary">{t('verify.to-login')}</a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default VerifyEmail




