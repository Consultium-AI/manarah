import React from 'react'
import { useSearchParams, Link } from 'react-router-dom'

const Bedankt = () => {
  const [searchParams] = useSearchParams()
  const amount = searchParams.get('amount')
  const type = searchParams.get('type')

  const typeLabels = {
    'one-time': 'eenmalige',
    'monthly': 'maandelijkse',
    'yearly': 'jaarlijkse'
  }

  return (
    <section className="thank-you-section">
      <div className="thank-you-background">
        <img 
          src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1920&h=1080&fit=crop" 
          alt="Gelukkige kinderen" 
          className="thank-you-img"
        />
        <div className="thank-you-overlay"></div>
      </div>
      
      <div className="thank-you-content">
        <div className="container">
          <div className="thank-you-wrapper">
            {/* Left Side - Thank You Message */}
            <div className="thank-you-left">
              <div className="thank-you-icon">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <h1 className="thank-you-title">
                Bedankt voor je <span className="highlight">gift</span>
              </h1>
              <p className="thank-you-subtitle">
                Met jouw {amount ? `donatie van €${amount}` : 'donatie'} kunnen wij mensenlevens redden bij rampen en geweld.
              </p>
              <div className="thank-you-message">
                <p className="thank-you-text">
                  Jouw {type ? typeLabels[type] || 'donatie' : 'donatie'} maakt een enorm verschil. Wij geven noodhulp en helpen mensen weer op eigen benen te staan. 
                  <strong> Je gift wordt direct ingezet voor:</strong>
                </p>
                <ul className="thank-you-impact">
                  <li>Noodhulp voor gezinnen in crisisgebieden</li>
                  <li>Onderwijs voor kinderen die alles hebben verloren</li>
                  <li>Schoon water en voedsel voor gemeenschappen</li>
                  <li>Onderdak en veiligheid voor vluchtelingen</li>
                </ul>
                <p className="thank-you-text">
                  <strong>We beloven je dat elke euro op de beste manier wordt besteed.</strong> We werken direct met lokale gemeenschappen en zorgen ervoor dat jouw steun daar komt waar het het hardst nodig is.
                </p>
                <p className="thank-you-text">
                  Je ontvangt binnenkort een bevestiging per email met meer informatie over hoe jouw donatie wordt gebruikt.
                </p>
              </div>
              <div className="thank-you-actions">
                <Link to="/" className="btn btn-primary">
                  Terug naar homepage
                </Link>
                <Link to="/mijn-donaties" className="btn btn-outline">
                  Bekijk mijn donaties
                </Link>
              </div>
            </div>

            {/* Right Side - Additional Info */}
            <div className="thank-you-right">
              <div className="thank-you-card">
                <h3 className="thank-you-card-title">Jouw impact</h3>
                <div className="thank-you-stats">
                  <div className="thank-you-stat">
                    <div className="stat-icon">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                          <circle cx="9" cy="7" r="4"/>
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                      </div>
                    <div className="stat-content">
                      <div className="stat-number">+1</div>
                      <div className="stat-label">Gezin geholpen</div>
                    </div>
                  </div>
                  <div className="thank-you-stat">
                    <div className="stat-icon">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
                        </svg>
                      </div>
                    <div className="stat-content">
                      <div className="stat-number">+10</div>
                      <div className="stat-label">Liter schoon water</div>
                    </div>
                  </div>
                  <div className="thank-you-stat">
                    <div className="stat-icon">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                        </svg>
                      </div>
                    <div className="stat-content">
                      <div className="stat-number">+1</div>
                      <div className="stat-label">Kind naar school</div>
                    </div>
                  </div>
                </div>
                <p className="thank-you-card-text">
                  Samen met andere donateurs helpen we duizenden mensen per jaar. Jouw bijdrage is onderdeel van iets groters.
                </p>
              </div>

              <div className="thank-you-card">
                <h3 className="thank-you-card-title">Blijf op de hoogte</h3>
                <p className="thank-you-card-text">
                  Ontvang updates over hoe jouw donatie wordt gebruikt en verhalen van mensen die we helpen.
                </p>
                <Link to="/#newsletter" className="btn btn-secondary btn-block">
                  Schrijf je in voor updates
                </Link>
              </div>

              <div className="thank-you-card">
                <h3 className="thank-you-card-title">Deel je impact</h3>
                <p className="thank-you-card-text">
                  Help anderen om ook het verschil te maken. Deel deze pagina en inspireer vrienden en familie.
                </p>
                <div className="thank-you-share">
                  <button className="share-btn share-facebook">
                    📘 Facebook
                  </button>
                  <button className="share-btn share-twitter">
                    🐦 Twitter
                  </button>
                  <button className="share-btn share-whatsapp">
                    💬 WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Bedankt




