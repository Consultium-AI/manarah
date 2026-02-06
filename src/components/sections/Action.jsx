import React from 'react'
import { Link } from 'react-router-dom'

const Action = () => {
  const actions = [
    { title: 'Word donateur', description: 'Steun structureel met een maandelijkse bijdrage' },
    { title: 'Word vrijwilliger', description: 'Zet je tijd en talenten in voor onze missie' },
    { title: 'Actie in onderwijs', description: 'Organiseer een actie met je gemeenschap' },
    { title: 'Eigen actie starten', description: 'Begin je eigen fundraising actie' },
    { title: 'Grote gift', description: 'Maak een substantiële bijdrage mogelijk' },
    { title: 'Nalaten', description: 'Steun onze missie in je testament' }
  ]

  return (
    <section className="action-section">
      <div className="container">
        <h2 className="section-title">Help mee</h2>
        <p className="section-subtitle">Er zijn verschillende manieren om mee te doen en impact te maken</p>
        <div className="action-grid">
          {actions.map((action, index) => (
            <div key={index} className="action-card">
              <h3 className="action-title">{action.title}</h3>
              <p className="action-description">{action.description}</p>
              <Link to="/samen-in-actie" className="btn btn-outline">Meer info</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Action




