import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { projectsAPI } from '../utils/api'
import { useTranslation } from '../hooks/useTranslation'

const Projecten = () => {
  const { t } = useTranslation()
  const [projects, setProjects] = useState([])
  const [activeProjects, setActiveProjects] = useState([])
  const [completedProjects, setCompletedProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadProjects()
  }, [])

  useEffect(() => {
    filterProjects()
  }, [projects, searchTerm])

  const loadProjects = async () => {
    try {
      setLoading(true)
      setError('')
      const response = await projectsAPI.getAll()
      console.log('Projects API response:', response.data)
      if (response.data && response.data.success) {
        const projectsList = response.data.projects || []
        console.log('Loaded projects:', projectsList.length)
        setProjects(projectsList)
        if (projectsList.length === 0) {
          setError(t('projects.empty'))
        }
      } else {
        setError(t('projects.error'))
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.response?.data?.details || err.message || t('projects.error')
      setError(errorMessage)
      console.error('Error loading projects:', err)
      console.error('Error response:', err.response)
      console.error('Error details:', err.response?.data)
      // Set empty array on error so UI doesn't break
      setProjects([])
    } finally {
      setLoading(false)
    }
  }

  const filterProjects = () => {
    let filtered = [...projects]

    // Filter op zoekterm (land naam of project naam)
    if (searchTerm.trim() !== '') {
      const searchLower = searchTerm.toLowerCase()
      filtered = filtered.filter(project => {
        const projectName = (project.name || '').toLowerCase()
        const countryName = getCountryName(project.country_code).toLowerCase()
        return projectName.includes(searchLower) || countryName.includes(searchLower)
      })
    }

    // Split into active and completed projects
    const active = filtered.filter(p => p.status === 'active' || p.status === 'paused')
    const completed = filtered.filter(p => p.status === 'completed' || p.status === 'cancelled')
    
    setActiveProjects(active)
    setCompletedProjects(completed)
  }

  const getCountryName = (code) => {
    return t(`country.${code}`) || code
  }

  const getProjectImage = (project) => {
    // Gebruik project.image_url als die bestaat, anders fallback naar country image
    if (project.image_url) {
      // Als het een relatief pad is, voeg BASE_URL toe
      if (project.image_url.startsWith('/assets/')) {
        return `${import.meta.env.BASE_URL}${project.image_url.substring(1)}`
      }
      return project.image_url
    }
    // Fallback naar country image mapping
    const countryImages = {
      'PS': `${import.meta.env.BASE_URL}assets/Al_Aqsa.jpg`,
      'SD': 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1920&h=1080&fit=crop',
    }
    return countryImages[project.country_code] || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop'
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

  return (
    <div>
      <section className="projects-hero">
        <div className="container">
          <h1 className="projects-hero-title">{t('projects.title')}</h1>
          <p className="projects-hero-subtitle">
            {t('projects.subtitle')}
          </p>
        </div>
      </section>

      <section className="projects-section">
        <div className="container">
          {/* Filters */}
          <div className="projects-filters">
            <div className="projects-filter-group">
              <label htmlFor="search-filter" className="filter-label">{t('projects.search-label')}</label>
              <input
                id="search-filter"
                type="text"
                className="filter-input"
                placeholder={t('projects.search-placeholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Loading state */}
          {loading && (
            <div className="projects-loading">
              <p>{t('projects.loading')}</p>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="projects-error">
              <p>{error}</p>
            </div>
          )}

          {/* Active Projects Section */}
          {!loading && !error && activeProjects.length > 0 && (
            <div className="projects-section-group">
              <h2 className="projects-section-title">
                <span className="projects-section-icon projects-section-icon-active">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </span>
                {t('projects.active-title')}
                <span className="projects-section-count">{activeProjects.length}</span>
              </h2>
              <div className="projects-grid">
                {activeProjects.map(project => (
                  <article key={project.id} className="project-card">
                    {getProjectImage(project) && (
                      <div className="project-card-image">
                        <img 
                          src={getProjectImage(project)} 
                          alt={project.name}
                          className="project-card-img"
                        />
                      </div>
                    )}
                    <div className="project-card-header">
                      <span className={`project-status project-status-${project.status}`}>
                        {getStatusLabel(project.status)}
                      </span>
                    </div>
                    <div className="project-card-content">
                      <h3 className="project-card-title">{project.name}</h3>
                      <p className="project-card-country">
                        <span className="project-card-country-icon">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                            <circle cx="12" cy="10" r="3"/>
                          </svg>
                        </span>
                        {getCountryName(project.country_code)}
                      </p>
                      <p className="project-card-description">
                        {project.description || t('projects.no-description')}
                      </p>
                      {project.target_amount && (
                        <div className="project-card-progress">
                          <div className="project-progress-info">
                            <span className="project-progress-current">
                              {formatCurrency(project.current_amount || 0)}
                            </span>
                            <span className="project-progress-target">
                              {t('projects.of-target', { target: formatCurrency(project.target_amount) })}
                            </span>
                          </div>
                          <div className="project-progress-bar">
                            <div
                              className="project-progress-fill"
                              style={{
                                width: `${getProgressPercentage(project.current_amount, project.target_amount)}%`
                              }}
                            ></div>
                          </div>
                        </div>
                      )}
                      <div className="project-card-stats">
                        <span className="project-stat">
                          <strong>{project.donation_count || 0}</strong> {t('projects.donations')}
                        </span>
                        {project.total_sent > 0 && (
                          <span className="project-stat">
                            <strong>{formatCurrency(project.total_sent)}</strong> {t('projects.paid-out')}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="project-card-footer">
                      <Link to={`/project/${project.id}`} className="btn btn-outline">
                        {t('common.read-more')}
                      </Link>
                      <Link to="/doneren" className="btn btn-primary">
                        {t('nav.doneer-nu')}
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* Completed Projects Section */}
          {!loading && !error && completedProjects.length > 0 && (
            <div className="projects-section-group projects-section-completed">
              <h2 className="projects-section-title">
                <span className="projects-section-icon projects-section-icon-completed">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </span>
                {t('projects.completed-title')}
                <span className="projects-section-count">{completedProjects.length}</span>
              </h2>
              <div className="projects-grid">
                {completedProjects.map(project => (
                  <article key={project.id} className="project-card project-card-completed">
                    {getProjectImage(project) && (
                      <div className="project-card-image">
                        <img 
                          src={getProjectImage(project)} 
                          alt={project.name}
                          className="project-card-img"
                        />
                        <div className="project-card-completed-overlay">
                          <span className="project-completed-badge">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="20 6 9 17 4 12"/>
                            </svg>
                            {t('projects.status-completed')}
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="project-card-header">
                      <span className={`project-status project-status-${project.status}`}>
                        {getStatusLabel(project.status)}
                      </span>
                    </div>
                    <div className="project-card-content">
                      <h3 className="project-card-title">{project.name}</h3>
                      <p className="project-card-country">
                        <span className="project-card-country-icon">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                            <circle cx="12" cy="10" r="3"/>
                          </svg>
                        </span>
                        {getCountryName(project.country_code)}
                      </p>
                      <p className="project-card-description">
                        {project.description || t('projects.no-description')}
                      </p>
                      {project.target_amount && (
                        <div className="project-card-progress project-progress-completed">
                          <div className="project-progress-info">
                            <span className="project-progress-current">
                              {formatCurrency(project.current_amount || 0)}
                            </span>
                            <span className="project-progress-target">
                              {t('projects.of-target', { target: formatCurrency(project.target_amount) })}
                            </span>
                          </div>
                          <div className="project-progress-bar">
                            <div
                              className="project-progress-fill project-progress-fill-completed"
                              style={{
                                width: `${getProgressPercentage(project.current_amount, project.target_amount)}%`
                              }}
                            ></div>
                          </div>
                        </div>
                      )}
                      <div className="project-card-stats">
                        <span className="project-stat">
                          <strong>{project.donation_count || 0}</strong> {t('projects.donations')}
                        </span>
                        {project.total_sent > 0 && (
                          <span className="project-stat">
                            <strong>{formatCurrency(project.total_sent)}</strong> {t('projects.paid-out')}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="project-card-footer">
                      <Link to={`/project/${project.id}`} className="btn btn-outline">
                        {t('common.read-more')}
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && activeProjects.length === 0 && completedProjects.length === 0 && (
            <div className="projects-empty">
              <p>{t('projects.filter-empty')}</p>
              <button
                className="btn btn-outline"
                onClick={() => {
                  setSearchTerm('')
                }}
              >
                {t('projects.clear-filter')}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Projecten
