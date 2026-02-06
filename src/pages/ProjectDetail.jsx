import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { projectsAPI } from '../utils/api'
import { useTranslation } from '../hooks/useTranslation'
import ProjectComments from '../components/ProjectComments'

const ProjectDetail = () => {
  const { t } = useTranslation()
  const { projectId } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Mapping van land codes naar landnamen
  const getCountryName = (code) => {
    return t(`country.${code}`) || code
  }

  const getProjectImage = (proj) => {
    // Gebruik project.image_url als die bestaat
    if (proj && proj.image_url) {
      // Als het een relatief pad is, voeg BASE_URL toe
      if (proj.image_url.startsWith('/assets/')) {
        return `${import.meta.env.BASE_URL}${proj.image_url.substring(1)}`
      }
      return proj.image_url
    }
    // Fallback naar country image mapping
    const code = proj?.country_code
    const countryImages = {
      'BF': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop',
      'SY': 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&h=1080&fit=crop',
      'SS': 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=1920&h=1080&fit=crop',
      'UA': 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1920&h=1080&fit=crop',
      'YE': 'https://images.unsplash.com/photo-1516026672322-bc52e61b55b5?w=1920&h=1080&fit=crop',
      'ET': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop',
      'SO': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop',
      'AF': 'https://images.unsplash.com/photo-1516026672322-bc52e61b55b5?w=1920&h=1080&fit=crop',
      'IQ': 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&h=1080&fit=crop',
      'MM': 'https://images.unsplash.com/photo-1516026672322-bc52e61b55b5?w=1920&h=1080&fit=crop',
      'BD': 'https://images.unsplash.com/photo-1516026672322-bc52e61b55b5?w=1920&h=1080&fit=crop',
      'PK': 'https://images.unsplash.com/photo-1516026672322-bc52e61b55b5?w=1920&h=1080&fit=crop',
      'NG': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop',
      'CD': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop',
      'KE': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop',
      'UG': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop',
      'TZ': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop',
      'RW': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop',
      'HT': 'https://images.unsplash.com/photo-1516026672322-bc52e61b55b5?w=1920&h=1080&fit=crop',
      'CO': 'https://images.unsplash.com/photo-1516026672322-bc52e61b55b5?w=1920&h=1080&fit=crop',
      'VE': 'https://images.unsplash.com/photo-1516026672322-bc52e61b55b5?w=1920&h=1080&fit=crop',
      'GT': 'https://images.unsplash.com/photo-1516026672322-bc52e61b55b5?w=1920&h=1080&fit=crop',
      'HN': 'https://images.unsplash.com/photo-1516026672322-bc52e61b55b5?w=1920&h=1080&fit=crop',
      'PS': `${import.meta.env.BASE_URL}assets/Al_Aqsa.jpg`,
    }
    return countryImages[code] || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop'
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount || 0)
  }

  const getProgressPercentage = (current, target) => {
    if (!target || target === 0) return 0
    return Math.min((current / target) * 100, 100)
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'active':
        return t('projects.status-active')
      case 'completed':
        return t('projects.status-completed')
      case 'paused':
        return t('projects.status-paused')
      case 'cancelled':
        return t('projects.status-cancelled')
      default:
        return status
    }
  }

  useEffect(() => {
    loadProject()
  }, [projectId])

  const loadProject = async () => {
    try {
      setLoading(true)
      setError('')
      const response = await projectsAPI.getById(projectId)
      if (response.data && response.data.success) {
        setProject(response.data.project)
      } else {
        setError(t('project.error'))
      }
    } catch (err) {
      setError(t('project.error'))
      console.error('Error loading project:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="project-detail-loading">
        <div className="container">
          <p>{t('project.loading')}</p>
        </div>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="project-detail-error">
        <div className="container">
          <p>{error || t('project.not-found')}</p>
          <Link to="/projecten" className="btn btn-primary">{t('project.back')}</Link>
        </div>
      </div>
    )
  }

  const countryName = getCountryName(project.country_code)
  const projectImage = getProjectImage(project)

  return (
    <div>
      {/* Hero Section */}
      <section className="project-detail-hero">
        <div className="project-detail-hero-background">
          <img 
            src={projectImage}
            alt={countryName}
            className="project-detail-hero-img"
          />
          <div className="project-detail-hero-overlay"></div>
        </div>
        <div className="project-detail-hero-content">
          <div className="container">
            <div className="project-detail-breadcrumb">
              <Link to="/projecten">{t('nav.projecten')}</Link>
              <span> / </span>
              <span>{countryName}</span>
            </div>
            <h1 className="project-detail-hero-title">{project.name}</h1>
            <p className="project-detail-hero-location">
              <span className="project-detail-location-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </span>
              {countryName}
            </p>
            <p className="project-detail-hero-description">
              {project.description}
            </p>
            <div className="project-detail-hero-actions">
              <Link to="/doneren" className="btn btn-primary btn-large">
                {t('project.donate-now')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Project Info Section */}
      <section className="project-detail-info">
        <div className="container">
          <div className="project-detail-info-grid">
            <div className="project-detail-main">
              <h2 className="project-detail-section-title">{t('project.about')}</h2>
              <div className="project-detail-content">
                <p className="project-detail-text">
                  {project.description}
                </p>
                
                <h3 className="project-detail-subtitle">{t('project.why-important')}</h3>
                <p className="project-detail-text">
                  {t('project.why-text', { country: countryName })}
                </p>

                <h3 className="project-detail-subtitle">{t('project.what-we-do')}</h3>
                <ul className="project-detail-list">
                  <li>{t('project.what-1')}</li>
                  <li>{t('project.what-2')}</li>
                  <li>{t('project.what-3')}</li>
                  <li>{t('project.what-4')}</li>
                </ul>

                <h3 className="project-detail-subtitle">{t('project.our-impact')}</h3>
                <p className="project-detail-text">
                  {t('project.impact-text', { country: countryName })}
                </p>
              </div>
            </div>

            <div className="project-detail-sidebar">
              <div className="project-detail-card">
                <h3 className="project-detail-card-title">{t('project.status')}</h3>
                <div className="project-detail-status">
                  <span className={`project-status-badge project-status-${project.status}`}>
                    {getStatusLabel(project.status)}
                  </span>
                </div>
              </div>

              {project.target_amount && (
                <div className="project-detail-card">
                  <h3 className="project-detail-card-title">{t('project.funding')}</h3>
                  <div className="project-detail-funding">
                    <div className="project-detail-funding-amounts">
                      <div className="project-detail-funding-item">
                        <span className="project-detail-funding-label">{t('project.target')}</span>
                        <span className="project-detail-funding-value">{formatCurrency(project.target_amount)}</span>
                      </div>
                      <div className="project-detail-funding-item">
                        <span className="project-detail-funding-label">{t('project.raised')}</span>
                        <span className="project-detail-funding-value project-detail-funding-current">
                          {formatCurrency(project.current_amount || 0)}
                        </span>
                      </div>
                    </div>
                    <div className="project-detail-progress">
                      <div className="project-detail-progress-bar">
                        <div
                          className="project-detail-progress-fill"
                          style={{
                            width: `${getProgressPercentage(project.current_amount, project.target_amount)}%`
                          }}
                        ></div>
                      </div>
                      <p className="project-detail-progress-text">
                        {t('project.funded', { percent: getProgressPercentage(project.current_amount, project.target_amount).toFixed(1) })}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="project-detail-card">
                <h3 className="project-detail-card-title">{t('project.stats')}</h3>
                <div className="project-detail-stats">
                  <div className="project-detail-stat-item">
                    <span className="project-detail-stat-label">{t('projects.donations')}</span>
                    <span className="project-detail-stat-value">{project.donation_count || 0}</span>
                  </div>
                  {project.total_sent > 0 && (
                    <div className="project-detail-stat-item">
                      <span className="project-detail-stat-label">{t('projects.paid-out')}</span>
                      <span className="project-detail-stat-value">{formatCurrency(project.total_sent)}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="project-detail-card">
                <h3 className="project-detail-card-title">{t('project.help')}</h3>
                <p className="project-detail-card-text">
                  {t('project.help-text')}
                </p>
                <Link to="/doneren" className="btn btn-primary btn-block">
                  {t('nav.doneer-nu')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comments Section */}
      <section className="project-detail-comments">
        <div className="container">
          <ProjectComments projectId={projectId} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="project-detail-cta">
        <div className="container">
          <div className="project-detail-cta-content">
            <h2 className="project-detail-cta-title">{t('project.cta-title')}</h2>
            <p className="project-detail-cta-text">
              {t('project.cta-text')}
            </p>
            <div className="project-detail-cta-buttons">
              <Link to="/doneren" className="btn btn-primary btn-large">
                {t('nav.doneer-nu')}
              </Link>
              <Link to="/projecten" className="btn btn-secondary">
                {t('project.view-other')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProjectDetail
