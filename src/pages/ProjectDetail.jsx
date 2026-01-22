import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { projectsAPI } from '../utils/api'

const ProjectDetail = () => {
  const { projectId } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Mapping van land codes naar landnamen
  const getCountryName = (code) => {
    const countryNames = {
      'BF': 'Burkina Faso',
      'SY': 'Syrië',
      'SD': 'Sudan',
      'UA': 'Oekraïne',
      'YE': 'Jemen',
      'ET': 'Ethiopië',
      'SO': 'Somalië',
      'AF': 'Afghanistan',
      'IQ': 'Irak',
      'MM': 'Myanmar',
      'BD': 'Bangladesh',
      'PK': 'Pakistan',
      'NG': 'Nigeria',
      'CD': 'Congo',
      'KE': 'Kenia',
      'UG': 'Oeganda',
      'TZ': 'Tanzania',
      'RW': 'Rwanda',
      'HT': 'Haïti',
      'CO': 'Colombia',
      'VE': 'Venezuela',
      'GT': 'Guatemala',
      'HN': 'Honduras',
    }
    return countryNames[code] || code
  }

  const getCountryImage = (code) => {
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
        setError('Kon project niet laden.')
      }
    } catch (err) {
      setError('Kon project niet laden. Probeer het later opnieuw.')
      console.error('Error loading project:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="project-detail-loading">
        <div className="container">
          <p>Project laden...</p>
        </div>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="project-detail-error">
        <div className="container">
          <p>{error || 'Project niet gevonden'}</p>
          <Link to="/projecten" className="btn btn-primary">Terug naar projecten</Link>
        </div>
      </div>
    )
  }

  const countryName = getCountryName(project.country_code)
  const countryImage = getCountryImage(project.country_code)

  return (
    <div>
      {/* Hero Section */}
      <section className="project-detail-hero">
        <div className="project-detail-hero-background">
          <img 
            src={countryImage}
            alt={countryName}
            className="project-detail-hero-img"
          />
          <div className="project-detail-hero-overlay"></div>
        </div>
        <div className="project-detail-hero-content">
          <div className="container">
            <div className="project-detail-breadcrumb">
              <Link to="/projecten">Projecten</Link>
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
                Doneer nu voor dit project
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
              <h2 className="project-detail-section-title">Over dit project</h2>
              <div className="project-detail-content">
                <p className="project-detail-text">
                  {project.description}
                </p>
                
                <h3 className="project-detail-subtitle">Waarom dit project belangrijk is</h3>
                <p className="project-detail-text">
                  In {countryName} zijn veel mensen afhankelijk van hulp om te overleven. 
                  Dit project richt zich op het bieden van directe ondersteuning aan de meest kwetsbare gemeenschappen. 
                  Door samen te werken met lokale partners zorgen we ervoor dat hulp daar komt waar het het hardst nodig is.
                </p>

                <h3 className="project-detail-subtitle">Wat we doen</h3>
                <ul className="project-detail-list">
                  <li>Directe hulp aan gezinnen en gemeenschappen in nood</li>
                  <li>Samenwerking met lokale partners voor duurzame oplossingen</li>
                  <li>Monitoring en evaluatie om de impact te meten</li>
                  <li>Transparante rapportage over het gebruik van donaties</li>
                </ul>

                <h3 className="project-detail-subtitle">Onze impact</h3>
                <p className="project-detail-text">
                  Met dit project helpen we duizenden mensen in {countryName}. 
                  Elke donatie maakt een verschil en draagt bij aan het verbeteren van levensomstandigheden 
                  en het bieden van hoop voor de toekomst.
                </p>
              </div>
            </div>

            <div className="project-detail-sidebar">
              <div className="project-detail-card">
                <h3 className="project-detail-card-title">Project status</h3>
                <div className="project-detail-status">
                  <span className={`project-status-badge project-status-${project.status}`}>
                    {project.status === 'active' ? 'Actief' : 
                     project.status === 'completed' ? 'Voltooid' :
                     project.status === 'paused' ? 'Gepauzeerd' : 'Geannuleerd'}
                  </span>
                </div>
              </div>

              {project.target_amount && (
                <div className="project-detail-card">
                  <h3 className="project-detail-card-title">Financiering</h3>
                  <div className="project-detail-funding">
                    <div className="project-detail-funding-amounts">
                      <div className="project-detail-funding-item">
                        <span className="project-detail-funding-label">Doelbedrag</span>
                        <span className="project-detail-funding-value">{formatCurrency(project.target_amount)}</span>
                      </div>
                      <div className="project-detail-funding-item">
                        <span className="project-detail-funding-label">Opgehaald</span>
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
                        {getProgressPercentage(project.current_amount, project.target_amount).toFixed(1)}% gefinancierd
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="project-detail-card">
                <h3 className="project-detail-card-title">Statistieken</h3>
                <div className="project-detail-stats">
                  <div className="project-detail-stat-item">
                    <span className="project-detail-stat-label">Donaties</span>
                    <span className="project-detail-stat-value">{project.donation_count || 0}</span>
                  </div>
                  {project.total_sent > 0 && (
                    <div className="project-detail-stat-item">
                      <span className="project-detail-stat-label">Uitgekeerd</span>
                      <span className="project-detail-stat-value">{formatCurrency(project.total_sent)}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="project-detail-card">
                <h3 className="project-detail-card-title">Help mee</h3>
                <p className="project-detail-card-text">
                  Elke bijdrage helpt. Doneer nu om dit project te ondersteunen en levens te veranderen.
                </p>
                <Link to="/doneren" className="btn btn-primary btn-block">
                  Doneer nu
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="project-detail-cta">
        <div className="container">
          <div className="project-detail-cta-content">
            <h2 className="project-detail-cta-title">Maak het verschil</h2>
            <p className="project-detail-cta-text">
              Jouw steun maakt dit werk mogelijk. Samen kunnen we levens veranderen en hoop brengen waar het hard nodig is.
            </p>
            <div className="project-detail-cta-buttons">
              <Link to="/doneren" className="btn btn-primary btn-large">
                Doneer nu
              </Link>
              <Link to="/projecten" className="btn btn-secondary">
                Bekijk andere projecten
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProjectDetail

