import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { projectsAPI } from '../utils/api'

// Simple SVG icons for activities
const ActivityIcon = ({ type }) => {
  const icons = {
    droplet: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
      </svg>
    ),
    book: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
      </svg>
    ),
    utensils: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
        <path d="M7 2v20"/>
        <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>
      </svg>
    ),
    handshake: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"/>
      </svg>
    ),
    emergency: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8v4"/>
        <path d="M12 16h.01"/>
      </svg>
    ),
    home: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    heart: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    )
  }
  return icons[type] || icons.heart
}

const LandDetail = () => {
  const { countrySlug } = useParams()
  const [countryProjects, setCountryProjects] = useState([])
  const [loading, setLoading] = useState(true)

  // Mapping van slugs naar land codes en informatie
  const countryData = {
    'sudan': {
      code: 'SD',
      name: 'Sudan',
      image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=1920&h=1080&fit=crop',
      context: [
        'Sudan is een van de meest kwetsbare landen ter wereld. Het land heeft te maken met aanhoudende conflicten, voedselonzekerheid en klimaatgerelateerde uitdagingen. Miljoenen mensen zijn afhankelijk van humanitaire hulp om te overleven.',
        'De situatie wordt verergerd door periodieke droogtes en overstromingen, die de voedselproductie verstoren en gemeenschappen dwingen om te migreren. Veel gezinnen hebben geen toegang tot basisvoorzieningen zoals schoon water, gezondheidszorg en onderwijs.',
        'Wij werken samen met lokale partners om duurzame oplossingen te bieden die gemeenschappen helpen om weerstand te bieden aan deze uitdagingen en een betere toekomst op te bouwen.'
      ],
      activities: [
        {
          title: 'Waterputten en sanitatie',
          description: 'We bouwen waterputten en voorzien gemeenschappen van sanitatievoorzieningen. Dit voorkomt ziektes en verbetert de levenskwaliteit aanzienlijk.',
          icon: 'droplet'
        },
        {
          title: 'Voedselzekerheid',
          description: 'We bieden voedselhulp aan gezinnen in nood en trainen boeren in duurzame landbouwtechnieken om voedselproductie te verbeteren.',
          icon: 'utensils'
        },
        {
          title: 'Vredesopbouw',
          description: 'We werken aan vredesopbouw en conflictresolutie door gemeenschappen samen te brengen en dialoog te faciliteren.',
          icon: 'handshake'
        },
        {
          title: 'Onderwijs',
          description: 'We zorgen voor toegang tot onderwijs voor kinderen, vooral meisjes, en bouwen scholen in afgelegen gebieden.',
          icon: 'book'
        }
      ]
    },
    'burkina-faso': {
      code: 'BF',
      name: 'Burkina Faso',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop',
      context: [
        'Burkina Faso wordt geconfronteerd met een complexe humanitaire crisis veroorzaakt door gewelddadige conflicten, voedselonzekerheid en klimaatverandering. Honderdduizenden mensen zijn ontheemd en hebben dringend hulp nodig.',
        'De situatie is bijzonder ernstig in de noordelijke en oostelijke regio\'s, waar gemeenschappen regelmatig worden getroffen door aanvallen. Veel gezinnen hebben hun huizen en bronnen van inkomsten verloren.',
        'Ons werk richt zich op het bieden van directe noodhulp, het versterken van gemeenschappen en het creëren van duurzame oplossingen voor de lange termijn.'
      ],
      activities: [
        {
          title: 'Noodhulp',
          description: 'We bieden voedsel, onderdak en medische zorg aan ontheemde gezinnen en gemeenschappen die getroffen zijn door conflict.',
          icon: 'emergency'
        },
        {
          title: 'Onderwijs',
          description: 'We zorgen voor toegang tot onderwijs voor kinderen die door conflict zijn getroffen en bouwen veilige leeromgevingen.',
          icon: 'book'
        },
        {
          title: 'Water en sanitatie',
          description: 'We bouwen waterputten en voorzien gemeenschappen van schoon drinkwater en sanitatievoorzieningen.',
          icon: 'droplet'
        }
      ]
    },
    'syrie': {
      code: 'SY',
      name: 'Syrië',
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&h=1080&fit=crop',
      context: [
        'Na meer dan een decennium van conflict heeft Syrië te maken met een van de grootste humanitaire crises ter wereld. Miljoenen mensen zijn ontheemd en hebben dringend hulp nodig.',
        'Veel gezinnen hebben alles verloren en zijn afhankelijk van humanitaire hulp om te overleven. De infrastructuur is grotendeels verwoest, waardoor toegang tot basisvoorzieningen zoals water, gezondheidszorg en onderwijs zeer beperkt is.',
        'We werken aan het bieden van noodhulp en het ondersteunen van wederopbouw, met focus op het helpen van de meest kwetsbare gemeenschappen.'
      ],
      activities: [
        {
          title: 'Noodhulp',
          description: 'We bieden voedsel, onderdak, kleding en medische zorg aan gezinnen die alles hebben verloren.',
          icon: 'emergency'
        },
        {
          title: 'Wederopbouw',
          description: 'We helpen bij het herstellen van basisvoorzieningen en het opbouwen van weerbare gemeenschappen.',
          icon: 'home'
        },
        {
          title: 'Psychosociale steun',
          description: 'We bieden counseling en psychosociale steun aan kinderen en volwassenen die trauma\'s hebben opgelopen.',
          icon: 'heart'
        }
      ]
    }
  }

  const country = countryData[countrySlug] || {
    code: '',
    name: countrySlug,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop',
    context: ['We zijn actief in dit land en werken aan verschillende projecten om gemeenschappen te helpen.'],
    activities: []
  }

  useEffect(() => {
    loadCountryProjects()
  }, [countrySlug])

  const loadCountryProjects = async () => {
    try {
      setLoading(true)
      const response = await projectsAPI.getAll()
      if (response.data && response.data.success) {
        const projects = response.data.projects || []
        // Filter projects for this country
        const filtered = projects.filter(p => p.country_code === country.code)
        setCountryProjects(filtered)
      }
    } catch (err) {
      console.error('Error loading projects:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="country-hero">
        <div className="country-hero-background">
          <img 
            src={country.image}
            alt={country.name}
            className="country-hero-img"
          />
          <div className="country-hero-overlay"></div>
        </div>
        <div className="country-hero-content">
          <div className="container">
            <h1 className="country-hero-title">
              We zijn er in <span className="highlight">{country.name}</span>
            </h1>
            <p className="country-hero-intro">
              Samen met lokale partners werken we aan <strong>duurzame oplossingen</strong> voor de meest kwetsbare gemeenschappen. 
              Ons werk richt zich op het bieden van hoop en het versterken van weerbaarheid.
            </p>
            <Link to="/doneren" className="btn btn-primary btn-hero-cta">
              Doneer nu voor {country.name}
            </Link>
          </div>
        </div>
      </section>

      {/* Context Section */}
      <section className="country-context">
        <div className="container">
          <div className="context-content">
            <h2 className="section-title">Wat is er aan de hand?</h2>
            {country.context.map((paragraph, index) => (
              <p key={index} className="context-paragraph">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Activities Section */}
      {country.activities.length > 0 && (
        <section className="country-activities">
          <div className="container">
            <h2 className="section-title">Wat doen wij?</h2>
            <div className="country-activities-grid">
              {country.activities.map((activity, index) => (
                <div key={index} className="country-activity-card">
                  <div className="country-activity-icon"><ActivityIcon type={activity.icon} /></div>
                  <h3 className="country-activity-title">{activity.title}</h3>
                  <p className="country-activity-description">{activity.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {countryProjects.length > 0 && (
        <section className="country-projects">
          <div className="container">
            <h2 className="section-title">Onze projecten in {country.name}</h2>
            <div className="country-projects-grid">
              {countryProjects.map(project => (
                <article key={project.id} className="country-project-card">
                  <div className="country-project-content">
                    <h3 className="country-project-title">{project.name}</h3>
                    <p className="country-project-description">{project.description}</p>
                    <div className="country-project-footer">
                      <Link to={`/project/${project.id}`} className="btn btn-outline">
                        Lees meer
                      </Link>
                      <Link to="/doneren" className="btn btn-primary">
                        Doneer nu
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="country-donation">
        <div className="container">
          <div className="country-donation-content">
            <h2 className="country-donation-title">Help mee in {country.name}</h2>
            <p className="country-donation-description">
              Jouw steun maakt ons werk mogelijk. Elke bijdrage helpt om levens te veranderen en hoop te brengen 
              aan gemeenschappen die het hard nodig hebben. <strong>Samen kunnen we het verschil maken.</strong>
            </p>
            <div className="country-donation-actions">
              <Link to="/doneren" className="btn btn-primary btn-large">
                Doneer nu
              </Link>
              <Link to="/projecten" className="btn btn-secondary">
                Bekijk alle projecten
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandDetail
