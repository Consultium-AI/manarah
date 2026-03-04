import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { getStaticProjects } from '../data/projects'
import { useTranslation } from '../hooks/useTranslation'

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
  const { t } = useTranslation()

  // Mapping van slugs naar land codes en informatie
  const countryData = {
    'sudan': {
      code: 'SD',
      name: 'Sudan',
      image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1920&h=1080&fit=crop',
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
    'palestina': {
      code: 'PS',
      name: 'Palestina',
      image: `${import.meta.env.BASE_URL}assets/Al_Aqsa.jpg`,
      context: [
        'Stichting Manarah voert humanitaire hulpcampagnes uit in Palestina, met bijzondere aandacht voor het ondersteunen van getroffen families die geconfronteerd worden met moeilijke humanitaire omstandigheden door conflicten, gedwongen ontheemding en een tekort aan basisvoorzieningen.',
        'Ons doel is om een echte steun te zijn voor getroffen families en hen een helpende hand te bieden die hun waardigheid bewaart en hun dagelijks lijden verlicht. Onze campagnes omvatten: het voorzien van schoon drinkwater, het uitdelen van voedselpakketten, het bieden van financiële noodhulp, het aanschaffen van noodonderdak voor families die hun huizen zijn kwijtgeraakt, en maandelijkse ondersteuning van families die hun inkomensbronnen hebben verloren.',
        'Tijdens de heilige maand Ramadan organiseren wij iftar-campagnes om warmte te brengen aan de tafels van vastenden en de geest van solidariteit te versterken. Deze initiatieven zijn niet slechts tijdelijke hulp, maar een boodschap van solidariteit en hoop.'
      ],
      activities: [
        {
          title: 'Schoon drinkwater',
          description: 'We voorzien families van schoon drinkwater via watercampagnes voor gezinnen die te kampen hebben met waterschaarste.',
          icon: 'droplet'
        },
        {
          title: 'Voedselpakketten',
          description: 'We verdelen essentiële voedselpakketten om honger en voedselonzekerheid tegen te gaan bij getroffen families.',
          icon: 'utensils'
        },
        {
          title: 'Financiële noodhulp',
          description: 'We bieden financiële steun aan families om in hun noodzakelijke behoeften te voorzien.',
          icon: 'emergency'
        },
        {
          title: 'Noodonderdak',
          description: 'We voorzien families die hun huizen zijn kwijtgeraakt van tenten en onderdak om hen te beschermen tegen de moeilijke omstandigheden.',
          icon: 'home'
        }
      ]
    },
    'syrie': {
      code: 'SY',
      name: 'Syrië',
      image: 'https://images.unsplash.com/photo-1659781044995-1c68c81dcc67?w=1920&h=1080&fit=crop',
      context: [
        'Na meer dan een decennium van conflict heeft Syrië te maken met een van de grootste humanitaire crises ter wereld. Miljoenen mensen zijn ontheemd en hebben dringend hulp nodig.',
        'Veel gezinnen hebben alles verloren en zijn afhankelijk van humanitaire hulp om te overleven. De infrastructuur is grotendeels verwoest, waardoor toegang tot basisvoorzieningen zoals water, gezondheidszorg en onderwijs zeer beperkt is.',
        'We werken aan het bieden van noodhulp en het ondersteunen van wederopbouw, met focus op het helpen van de meest kwetsbare gemeenschappen. Doneren is mogelijk via de volgende <a href="https://betaalverzoek.rabobank.nl/betaalverzoek/?id=AWZYa7itRfygou-rc7v5zw" target="_blank" rel="noopener noreferrer" style="color: #2563EB; text-decoration: underline; font-weight: 600;">link</a>.'
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
    },
    'jemen': {
      code: 'YE',
      name: 'Jemen',
      image: 'https://images.unsplash.com/photo-1574246604907-db69e30ddb97?w=1920&h=1080&fit=crop',
      context: [
        'Vanuit onze humanitaire missie om de meest kwetsbare groepen te ondersteunen, heeft Stichting Manarah programma\'s uitgevoerd in Jemen gericht op het bijstaan van families die hun inkomensbronnen zijn kwijtgeraakt en niet in staat zijn hun basisbehoeften te voorzien vanwege de moeilijke economische en humanitaire omstandigheden.',
        'Onze inspanningen omvatten maandelijkse bijstand aan gezinnen door het dekken van huurkosten en het voorzien in basislevensbehoeften, om hun bestaanszekerheid te waarborgen en hen in waardigheid te laten leven.',
        'Vanuit ons geloof dat duurzaamheid de basis is van echt humanitair werk, heeft de stichting gewerkt aan het economisch empoweren van families die kunnen werken, zodat zij zelfredzaam worden in plaats van afhankelijk van voortdurende hulp. Dit omvat het verstrekken van gereedschap en werkmiddelen, zoals naaimachines voor mensen met naaivaardigheid.'
      ],
      activities: [
        {
          title: 'Maandelijkse gezinsbijstand',
          description: 'We dekken huurkosten en basislevensbehoeften voor families die hun inkomen zijn kwijtgeraakt.',
          icon: 'home'
        },
        {
          title: 'Economische empowerment',
          description: 'We voorzien families van gereedschap en middelen om een eigen inkomen op te bouwen, zoals naaimachines.',
          icon: 'handshake'
        },
        {
          title: 'Voedselsteun',
          description: 'We bieden voedselhulp aan gezinnen die niet in staat zijn hun dagelijkse maaltijden te voorzien.',
          icon: 'utensils'
        }
      ]
    },
    'nederland': {
      code: 'NL',
      name: 'Nederland',
      image: 'https://images.unsplash.com/photo-1558551649-e44c8f992010?w=1920&h=1080&fit=crop',
      context: [
        'In Nederland richt Stichting Manarah zich op het helpen van mensen bij het integreren in de Nederlandse samenleving. We bieden ondersteuning bij taalcursussen, culturele oriëntatie en het opbouwen van een nieuw bestaan.',
        'Daarnaast organiseren wij activiteiten voor jongeren om hen te verbinden met elkaar en met de samenleving. Door middel van sport, educatie en sociale evenementen creëren we een veilige omgeving waar jongeren zich kunnen ontwikkelen.',
        'Ons doel is om bruggen te bouwen tussen gemeenschappen en bij te dragen aan een inclusieve samenleving waarin iedereen de kans krijgt om te groeien en bij te dragen.'
      ],
      activities: [
        {
          title: 'Integratieondersteuning',
          description: 'We helpen nieuwkomers bij het integreren in de Nederlandse samenleving door taalcursussen en culturele begeleiding.',
          icon: 'handshake'
        },
        {
          title: 'Jongerenactiviteiten',
          description: 'We organiseren sport, educatie en sociale evenementen voor jongeren om hen te verbinden en te versterken.',
          icon: 'book'
        },
        {
          title: 'Gemeenschapsopbouw',
          description: 'We bouwen bruggen tussen gemeenschappen door dialoog, samenwerking en gezamenlijke activiteiten te faciliteren.',
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

  const countryProjects = getStaticProjects(t).filter(p => p.country_code === country.code)

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
          <div className="container" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 className="country-hero-title" style={{ textAlign: 'center', width: '100%' }} dangerouslySetInnerHTML={{ __html: t('land.hero-title', { name: country.name }) }} />
            <p className="country-hero-intro" style={{ textAlign: 'center' }} dangerouslySetInnerHTML={{ __html: t('land.hero-intro') }} />
            <a href="https://betaalverzoek.rabobank.nl/betaalverzoek/?id=AWZYa7itRfygou-rc7v5zw" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-hero-cta">
              {t('land.donate-for', { name: country.name })}
            </a>
          </div>
        </div>
      </section>

      {/* Context Section */}
      <section className="country-context">
        <div className="container" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="context-content" style={{ textAlign: 'center', width: '100%' }}>
            <h2 className="section-title" style={{ textAlign: 'center', width: '100%' }}>{t('land.context-title')}</h2>
            {country.context.map((paragraph, index) => (
              <p key={index} className="context-paragraph" style={{ textAlign: 'center' }} dangerouslySetInnerHTML={{ __html: paragraph }} />
            ))}
          </div>
        </div>
      </section>

      {/* Activities Section */}
      {country.activities.length > 0 && (
        <section className="country-activities">
          <div className="container" style={{ textAlign: 'center' }}>
            <h2 className="section-title" style={{ textAlign: 'center', width: '100%' }}>{t('land.activities-title')}</h2>
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
          <div className="container" style={{ textAlign: 'center' }}>
            <h2 className="section-title" style={{ textAlign: 'center', width: '100%' }}>{t('land.projects-title', { name: country.name })}</h2>
            <div className="country-projects-grid">
              {countryProjects.map(project => (
                <article key={project.id} className="country-project-card">
                  <div className="country-project-content">
                    <h3 className="country-project-title">{project.name}</h3>
                    <p className="country-project-description">{project.description}</p>
                    <div className="country-project-footer">
                      <Link to={`/project/${project.id}`} className="btn btn-outline">
                        {t('common.read-more')}
                      </Link>
                      {(project.status === 'active' || project.status === 'paused') && (
                        <a href="https://betaalverzoek.rabobank.nl/betaalverzoek/?id=AWZYa7itRfygou-rc7v5zw" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                          {t('hero.donate')}
                        </a>
                      )}
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
        <div className="container" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="country-donation-content" style={{ textAlign: 'center', width: '100%' }}>
            <h2 className="country-donation-title" style={{ textAlign: 'center', width: '100%' }}>{t('land.cta-title', { name: country.name })}</h2>
            <p className="country-donation-description" style={{ textAlign: 'center' }} dangerouslySetInnerHTML={{ __html: t('land.cta-text') }} />
            <div className="country-donation-actions" style={{ justifyContent: 'center' }}>
              <a href="https://betaalverzoek.rabobank.nl/betaalverzoek/?id=AWZYa7itRfygou-rc7v5zw" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-large">
                {t('hero.donate')}
              </a>
              <Link to="/projecten" className="btn btn-secondary">
                {t('land.view-all-projects')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandDetail
