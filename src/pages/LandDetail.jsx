import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { projectsAPI } from '../utils/api'

const LandDetail = () => {
  const { countrySlug } = useParams()
  const [countryProjects, setCountryProjects] = useState([])
  const [loading, setLoading] = useState(true)

  // Mapping van slugs naar land codes en informatie
  const countryData = {
    'zuid-soedan': {
      code: 'SS',
      name: 'Zuid-Soedan',
      image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=1920&h=1080&fit=crop',
      context: [
        'Zuid-Soedan is een van de meest kwetsbare landen ter wereld. Sinds de onafhankelijkheid in 2011 heeft het land te maken met aanhoudende conflicten, voedselonzekerheid en klimaatgerelateerde uitdagingen. Miljoenen mensen zijn afhankelijk van humanitaire hulp om te overleven.',
        'De situatie wordt verergerd door periodieke droogtes en overstromingen, die de voedselproductie verstoren en gemeenschappen dwingen om te migreren. Veel gezinnen hebben geen toegang tot basisvoorzieningen zoals schoon water, gezondheidszorg en onderwijs.',
        'Wij werken samen met lokale partners om duurzame oplossingen te bieden die gemeenschappen helpen om weerstand te bieden aan deze uitdagingen en een betere toekomst op te bouwen.'
      ],
      activities: [
        {
          title: 'Waterputten en sanitatie',
          description: 'We bouwen waterputten en voorzien gemeenschappen van sanitatievoorzieningen. Dit voorkomt ziektes en verbetert de levenskwaliteit aanzienlijk.',
          icon: '💧'
        },
        {
          title: 'Voedselzekerheid',
          description: 'We bieden voedselhulp aan gezinnen in nood en trainen boeren in duurzame landbouwtechnieken om voedselproductie te verbeteren.',
          icon: '🌾'
        },
        {
          title: 'Vredesopbouw',
          description: 'We werken aan vredesopbouw en conflictresolutie door gemeenschappen samen te brengen en dialoog te faciliteren.',
          icon: '🤝'
        },
        {
          title: 'Onderwijs',
          description: 'We zorgen voor toegang tot onderwijs voor kinderen, vooral meisjes, en bouwen scholen in afgelegen gebieden.',
          icon: '📚'
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
          icon: '🚑'
        },
        {
          title: 'Onderwijs',
          description: 'We zorgen voor toegang tot onderwijs voor kinderen die door conflict zijn getroffen en bouwen veilige leeromgevingen.',
          icon: '📚'
        },
        {
          title: 'Water en sanitatie',
          description: 'We bouwen waterputten en voorzien gemeenschappen van schoon drinkwater en sanitatievoorzieningen.',
          icon: '💧'
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
          icon: '🚑'
        },
        {
          title: 'Wederopbouw',
          description: 'We helpen bij het herstellen van basisvoorzieningen en het opbouwen van weerbare gemeenschappen.',
          icon: '🏗️'
        },
        {
          title: 'Psychosociale steun',
          description: 'We bieden counseling en psychosociale steun aan kinderen en volwassenen die trauma\'s hebben opgelopen.',
          icon: '💙'
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
                  <div className="country-activity-icon">{activity.icon}</div>
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
