import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { authAPI } from '../utils/api'
import { setAuthToken, setUser } from '../utils/auth'

const OAuthCallback = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState('processing')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const code = searchParams.get('code')
    const provider = window.location.pathname.includes('google') ? 'google' : 'facebook'
    
    if (!code) {
      setStatus('error')
      setMessage('Geen autorisatie code ontvangen.')
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
        setMessage('Succesvol ingelogd!')
        setTimeout(() => {
          navigate('/')
        }, 1500)
      }
    } catch (error) {
      setStatus('error')
      setMessage(error.response?.data?.error || 'Inloggen mislukt.')
    }
  }

  return (
    <section className="auth-section">
      <div className="container">
        <div className="auth-container" style={{ maxWidth: '500px' }}>
          <div className="verification-status">
            {status === 'processing' && (
              <>
                <div className="verification-icon">⏳</div>
                <h2 className="auth-title">Inloggen...</h2>
                <p>Even geduld, je wordt ingelogd.</p>
              </>
            )}
            {status === 'success' && (
              <>
                <div className="verification-icon success">✅</div>
                <h2 className="auth-title">Ingelogd!</h2>
                <p>{message}</p>
              </>
            )}
            {status === 'error' && (
              <>
                <div className="verification-icon error">❌</div>
                <h2 className="auth-title">Inloggen mislukt</h2>
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

export default OAuthCallback




