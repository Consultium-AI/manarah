import React from 'react'
import { Link } from 'react-router-dom'

const AboutCTA = () => {
  return (
    <section className="cta-about-section">
      <div className="container">
        <div className="cta-about-content">
          <h2 className="cta-about-title">Doe mee en maak het verschil</h2>
          <p className="cta-about-description">
            Dit werk kunnen we niet alleen doen. We hebben jouw steun nodig om mensen te helpen die het moeilijk hebben, om gemeenschappen te versterken en om hoop te brengen waar het hard nodig is. <strong>Elke bijdrage, hoe klein ook, maakt een verschil.</strong> Samen kunnen we levens veranderen en een betere toekomst bouwen voor mensen die dat het hardst nodig hebben.
          </p>
          <div className="cta-about-buttons">
            <Link to="/doneren" className="btn btn-primary btn-cta-large">Doneer nu</Link>
            <Link to="/projecten" className="btn btn-secondary">Lees meer over onze projecten</Link>
            <Link to="/samen-in-actie" className="btn btn-outline">Word vrijwilliger</Link>
          </div>
          <p className="cta-about-note">
            <em>Donaties zijn hard nodig om dit werk voort te zetten. Met jouw steun kunnen we meer mensen helpen, meer projecten starten en meer impact maken.</em>
          </p>
        </div>
      </div>
    </section>
  )
}

export default AboutCTA

