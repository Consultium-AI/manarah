import React from 'react'
import { Link } from 'react-router-dom'

const Impact = () => {
  return (
    <section className="impact-section">
      <div className="container">
        <div className="impact-content">
          <div className="impact-text">
            <h2 className="section-title">Wereldwijde impact</h2>
            <p className="impact-description">
              We zijn actief in crisisgebieden over de hele wereld. Met jouw steun helpen we <strong>meer dan 1 miljoen mensen per jaar</strong> met noodhulp, onderwijs, water, onderdak en vredesopbouw.
            </p>
            <Link to="/waar-we-werken" className="btn btn-primary">Bekijk wat we doen</Link>
          </div>
          <div className="impact-visual">
            <div className="world-map">
              <svg viewBox="0 0 1000 500" xmlns="http://www.w3.org/2000/svg">
                <circle cx="250" cy="200" r="8" fill="#e63946"/>
                <circle cx="350" cy="200" r="8" fill="#e63946"/>
                <circle cx="450" cy="250" r="8" fill="#e63946"/>
                <circle cx="550" cy="300" r="8" fill="#e63946"/>
                <circle cx="650" cy="280" r="8" fill="#e63946"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Impact

