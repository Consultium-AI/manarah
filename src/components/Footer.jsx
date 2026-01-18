import React from 'react'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <h3 className="footer-title">Onze specialisaties</h3>
            <ul className="footer-links">
              <li><a href="#">Water & Sanitatie</a></li>
              <li><a href="#">Onderwijs</a></li>
              <li><a href="#">Vredesopbouw</a></li>
              <li><a href="#">Onderdak</a></li>
              <li><a href="#">Voedselzekerheid</a></li>
              <li><a href="#">Klimaatweerbaarheid</a></li>
              <li><a href="#">Noodhulp</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3 className="footer-title">Doe mee</h3>
            <ul className="footer-links">
              <li><a href="#">Donateur worden</a></li>
              <li><a href="#">Vrijwilliger worden</a></li>
              <li><a href="#">Eigen actie starten</a></li>
              <li><a href="#">Acties met school/kerk</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3 className="footer-title">Contact & Info</h3>
            <ul className="footer-links">
              <li><a href="#">Contact</a></li>
              <li><a href="#">Wijziging doorgeven</a></li>
              <li><a href="#">Privacy statement</a></li>
              <li><a href="#">Cookie settings</a></li>
              <li><a href="#">IBAN: NL12 ABCD 1234 5678 90</a></li>
            </ul>
          </div>
          <div className="footer-column footer-social">
            <h3 className="footer-title">Volg ons</h3>
            <div className="social-icons">
              <a href="#" className="social-icon" aria-label="Facebook">📘</a>
              <a href="#" className="social-icon" aria-label="Twitter">🐦</a>
              <a href="#" className="social-icon" aria-label="Instagram">📷</a>
              <a href="#" className="social-icon" aria-label="LinkedIn">💼</a>
            </div>
            <div className="footer-badges">
              <img 
                src="https://via.placeholder.com/100x60/ffffff/000000?text=CBF" 
                alt="CBF Keurmerk" 
                className="badge-img"
              />
              <img 
                src="https://via.placeholder.com/100x60/ffffff/000000?text=ANBI" 
                alt="ANBI" 
                className="badge-img"
              />
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Foundation. Alle rechten voorbehouden.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer




