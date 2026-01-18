import React from 'react'

const Donor = () => {
  return (
    <section className="donor-section">
      <div className="container">
        <div className="donor-content">
          <div className="donor-image">
            <img 
              src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800&h=600&fit=crop" 
              alt="Hulpverlener" 
              className="donor-img"
            />
          </div>
          <div className="donor-text">
            <h2 className="section-title">Waarom structureel doneren?</h2>
            <p className="donor-description">
              Structurele donaties geven ons de zekerheid om langetermijnprojecten te plannen en uit te voeren. Met jouw maandelijkse bijdrage kunnen we:
            </p>
            <ul className="donor-list">
              <li>Voorspelbare hulp bieden aan gemeenschappen in nood</li>
              <li>Onderwijsprogramma's opzetten die jaren duren</li>
              <li>Water- en sanitatieprojecten realiseren</li>
              <li>Vredesopbouw initiatieven ondersteunen</li>
              <li>Sneller reageren bij nieuwe crises</li>
            </ul>
            <a href="/doneren" className="btn btn-primary">Word donateur</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Donor

