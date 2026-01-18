import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { projectsAPI } from '../utils/api'

const Projecten = () => {
  const [projects, setProjects] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedContinent, setSelectedContinent] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Mapping van land codes naar continenten
  const countryToContinent = {
    'BF': 'Afrika', // Burkina Faso
    'SY': 'Azië', // Syrië
    'SS': 'Afrika', // Zuid-Soedan
    'UA': 'Europa', // Oekraïne
    'YE': 'Azië', // Jemen
    'ET': 'Afrika', // Ethiopië
    'SO': 'Afrika', // Somalië
    'AF': 'Azië', // Afghanistan
    'IQ': 'Azië', // Irak
    'MM': 'Azië', // Myanmar
    'BD': 'Azië', // Bangladesh
    'PK': 'Azië', // Pakistan
    'NG': 'Afrika', // Nigeria
    'CD': 'Afrika', // Congo
    'KE': 'Afrika', // Kenia
    'UG': 'Afrika', // Oeganda
    'TZ': 'Afrika', // Tanzania
    'RW': 'Afrika', // Rwanda
    'HT': 'Amerika', // Haïti
    'CO': 'Amerika', // Colombia
    'VE': 'Amerika', // Venezuela
    'GT': 'Amerika', // Guatemala
    'HN': 'Amerika', // Honduras
  }

  const continents = ['all', 'Afrika', 'Azië', 'Europa', 'Amerika']

  useEffect(() => {
    loadProjects()
  }, [])

  useEffect(() => {
    filterProjects()
  }, [projects, selectedContinent, searchTerm])

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
          setError('Er zijn nog geen projecten beschikbaar.')
        }
      } else {
        setError('Kon projecten niet laden. Probeer het later opnieuw.')
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.response?.data?.details || err.message || 'Kon projecten niet laden. Probeer het later opnieuw.'
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

    // Filter op continent
    if (selectedContinent !== 'all') {
      filtered = filtered.filter(project => {
        const continent = countryToContinent[project.country_code] || 'Overig'
        return continent === selectedContinent
      })
    }

    // Filter op zoekterm (land naam of project naam)
    if (searchTerm.trim() !== '') {
      const searchLower = searchTerm.toLowerCase()
      filtered = filtered.filter(project => {
        const projectName = (project.name || '').toLowerCase()
        const countryName = getCountryName(project.country_code).toLowerCase()
        return projectName.includes(searchLower) || countryName.includes(searchLower)
      })
    }

    setFilteredProjects(filtered)
  }

  const getCountryName = (code) => {
    const countryNames = {
      'BF': 'Burkina Faso',
      'SY': 'Syrië',
      'SS': 'Zuid-Soedan',
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

  const getContinent = (code) => {
    return countryToContinent[code] || 'Overig'
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

  return (
    <div>
      <section className="projects-hero">
        <div className="container">
          <h1 className="projects-hero-title">Onze projecten</h1>
          <p className="projects-hero-subtitle">
            Ontdek alle projecten waarmee we wereldwijd levens veranderen en gemeenschappen versterken.
          </p>
        </div>
      </section>

      <section className="projects-section">
        <div className="container">
          {/* Filters */}
          <div className="projects-filters">
            <div className="projects-filter-group">
              <label htmlFor="continent-filter" className="filter-label">Filter op continent:</label>
              <select
                id="continent-filter"
                className="filter-select"
                value={selectedContinent}
                onChange={(e) => setSelectedContinent(e.target.value)}
              >
                {continents.map(continent => (
                  <option key={continent} value={continent}>
                    {continent === 'all' ? 'Alle continenten' : continent}
                  </option>
                ))}
              </select>
            </div>
            <div className="projects-filter-group">
              <label htmlFor="search-filter" className="filter-label">Zoek op land of project:</label>
              <input
                id="search-filter"
                type="text"
                className="filter-input"
                placeholder="Bijv. Syrië, Burkina Faso, onderwijs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Results count */}
          <div className="projects-results">
            <p className="projects-results-text">
              {loading ? (
                'Laden...'
              ) : filteredProjects.length === 0 ? (
                'Geen projecten gevonden'
              ) : (
                `${filteredProjects.length} ${filteredProjects.length === 1 ? 'project gevonden' : 'projecten gevonden'}`
              )}
            </p>
          </div>

          {/* Loading state */}
          {loading && (
            <div className="projects-loading">
              <p>Projecten laden...</p>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="projects-error">
              <p>{error}</p>
            </div>
          )}

          {/* Projects grid */}
          {!loading && !error && (
            <div className="projects-grid">
              {filteredProjects.map(project => (
                <article key={project.id} className="project-card">
                  <div className="project-card-header">
                    <span className="project-continent">{getContinent(project.country_code)}</span>
                    <span className={`project-status project-status-${project.status}`}>
                      {project.status === 'active' ? 'Actief' : 
                       project.status === 'completed' ? 'Voltooid' :
                       project.status === 'paused' ? 'Gepauzeerd' : 'Geannuleerd'}
                    </span>
                  </div>
                  <div className="project-card-content">
                    <h3 className="project-card-title">{project.name}</h3>
                    <p className="project-card-country">
                      <span className="project-card-country-icon">📍</span>
                      {getCountryName(project.country_code)}
                    </p>
                    <p className="project-card-description">
                      {project.description || 'Geen beschrijving beschikbaar.'}
                    </p>
                    {project.target_amount && (
                      <div className="project-card-progress">
                        <div className="project-progress-info">
                          <span className="project-progress-current">
                            {formatCurrency(project.current_amount || 0)}
                          </span>
                          <span className="project-progress-target">
                            van {formatCurrency(project.target_amount)} opgehaald
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
                        <strong>{project.donation_count || 0}</strong> donaties
                      </span>
                      {project.total_sent > 0 && (
                        <span className="project-stat">
                          <strong>{formatCurrency(project.total_sent)}</strong> uitgekeerd
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="project-card-footer">
                    <Link to={`/project/${project.id}`} className="btn btn-outline">
                      Lees meer
                    </Link>
                    <Link to="/doneren" className="btn btn-primary">
                      Doneer nu
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && filteredProjects.length === 0 && (
            <div className="projects-empty">
              <p>Geen projecten gevonden die voldoen aan je filters.</p>
              <button
                className="btn btn-outline"
                onClick={() => {
                  setSelectedContinent('all')
                  setSearchTerm('')
                }}
              >
                Filters wissen
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Projecten

