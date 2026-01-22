import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { authAPI } from '../utils/api'
import { setAuthToken, setUser } from '../utils/auth'

const VerifyEmail = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState('verifying')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const token = searchParams.get('token')
    
    if (!token) {
      setStatus('error')
      setMessage('Geen verificatie token gevonden.')
      return
    }

    verifyEmail(token)
  }, [searchParams])

  const verifyEmail = async (token) => {
    try {
      const response = await authAPI.verifyEmail(token)
      if (response.data.success) {
        setStatus('success')
        setMessage('Je emailadres is succesvol geverifieerd! Je kunt nu inloggen.')
        setTimeout(() => {
          navigate('/inloggen')
        }, 3000)
      }
    } catch (error) {
      setStatus('error')
      setMessage(error.response?.data?.error || 'Verificatie mislukt. De link kan verlopen zijn.')
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
                <h2 className="auth-title">Email verifiëren...</h2>
                <p>Even geduld, je emailadres wordt geverifieerd.</p>
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
                <h2 className="auth-title">Email geverifieerd!</h2>
                <p>{message}</p>
                <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '1rem' }}>
                  Je wordt doorgestuurd naar de login pagina...
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
                <h2 className="auth-title">Verificatie mislukt</h2>
                <p>{message}</p>
                <div style={{ marginTop: '2rem' }}>
                  <a href="/inloggen" className="btn btn-primary">Naar login</a>
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




