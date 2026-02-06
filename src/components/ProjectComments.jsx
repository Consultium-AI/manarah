import React, { useState, useEffect } from 'react'
import { projectsAPI } from '../utils/api'
import { isAuthenticated, getUser } from '../utils/auth'
import { useTranslation } from '../hooks/useTranslation'

const ProjectComments = ({ projectId }) => {
  const { t } = useTranslation()
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  
  // Form state
  const [comment, setComment] = useState('')
  const [guestName, setGuestName] = useState('')
  const [guestEmail, setGuestEmail] = useState('')
  
  const isLoggedIn = isAuthenticated()
  const user = isLoggedIn ? getUser() : null

  useEffect(() => {
    loadComments()
  }, [projectId])

  const loadComments = async () => {
    try {
      setLoading(true)
      const response = await projectsAPI.getComments(projectId)
      if (response.data && response.data.success) {
        setComments(response.data.comments || [])
      }
    } catch (err) {
      console.error('Error loading comments:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!comment.trim()) {
      setError(t('comments.error-empty'))
      return
    }

    if (!isLoggedIn && !guestName.trim()) {
      setError(t('comments.error-name'))
      return
    }

    setSubmitting(true)

    try {
      let response
      if (isLoggedIn) {
        response = await projectsAPI.addComment(projectId, comment.trim())
      } else {
        response = await projectsAPI.addGuestComment(
          projectId, 
          guestName.trim(), 
          guestEmail.trim(), 
          comment.trim()
        )
      }

      if (response.data && response.data.success) {
        // Add the new comment to the list
        setComments([response.data.comment, ...comments])
        setComment('')
        setGuestName('')
        setGuestEmail('')
        setSuccess(t('comments.success'))
        
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(''), 3000)
      }
    } catch (err) {
      console.error('Error submitting comment:', err)
      setError(err.response?.data?.error || t('comments.error-submit'))
    } finally {
      setSubmitting(false)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('nl-NL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getInitials = (name) => {
    if (!name) return '?'
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
  }

  return (
    <section className="project-comments">
      <div className="project-comments-header">
        <h2 className="project-comments-title">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          {t('comments.title')}
          <span className="comments-count">({comments.length})</span>
        </h2>
      </div>

      {/* Comment Form */}
      <div className="comment-form-wrapper">
        <h3 className="comment-form-title">{t('comments.leave-comment')}</h3>
        
        <form onSubmit={handleSubmit} className="comment-form">
          {!isLoggedIn && (
            <div className="comment-form-guest-fields">
              <div className="form-group">
                <label htmlFor="guestName" className="form-label">
                  {t('comments.name')} *
                </label>
                <input
                  type="text"
                  id="guestName"
                  className="form-input"
                  placeholder={t('comments.name-placeholder')}
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  required={!isLoggedIn}
                />
              </div>
              <div className="form-group">
                <label htmlFor="guestEmail" className="form-label">
                  {t('comments.email')} ({t('comments.optional')})
                </label>
                <input
                  type="email"
                  id="guestEmail"
                  className="form-input"
                  placeholder={t('comments.email-placeholder')}
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                />
              </div>
            </div>
          )}

          {isLoggedIn && (
            <div className="comment-form-user-info">
              <div className="comment-user-avatar">
                {getInitials(user?.name)}
              </div>
              <span className="comment-user-name">
                {t('comments.posting-as')} <strong>{user?.name}</strong>
              </span>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="comment" className="form-label">
              {t('comments.your-comment')} *
            </label>
            <textarea
              id="comment"
              className="form-input form-textarea"
              placeholder={t('comments.comment-placeholder')}
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              maxLength={1000}
            />
            <span className="form-help">{comment.length}/1000</span>
          </div>

          {error && (
            <div className="comment-error">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {error}
            </div>
          )}

          {success && (
            <div className="comment-success">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9 12l2 2 4-4"/>
              </svg>
              {success}
            </div>
          )}

          <button 
            type="submit" 
            className="btn btn-primary comment-submit-btn"
            disabled={submitting}
          >
            {submitting ? (
              <>
                <span className="spinner-small"></span>
                {t('comments.submitting')}
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
                {t('comments.submit')}
              </>
            )}
          </button>
        </form>
      </div>

      {/* Comments List */}
      <div className="comments-list">
        {loading ? (
          <div className="comments-loading">
            <p>{t('common.loading')}</p>
          </div>
        ) : comments.length === 0 ? (
          <div className="comments-empty">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <p>{t('comments.empty')}</p>
            <span>{t('comments.be-first')}</span>
          </div>
        ) : (
          <>
            {comments.map((comment) => (
              <div key={comment.id} className="comment-item">
                <div className="comment-avatar">
                  {getInitials(comment.name)}
                </div>
                <div className="comment-content">
                  <div className="comment-header">
                    <span className="comment-author">{comment.name}</span>
                    <span className="comment-date">{formatDate(comment.created_at)}</span>
                  </div>
                  <p className="comment-text">{comment.comment}</p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </section>
  )
}

export default ProjectComments

