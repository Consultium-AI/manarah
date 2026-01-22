import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { getAuthToken, getUser, logout } from '../utils/auth'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()
  
  // Check if we're on the homepage
  const isHomePage = location.pathname === '/'

  // Handle scroll for sticky navbar effect - transparent at top, solid when scrolled
  // Only applies to homepage; other pages always have solid navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const token = getAuthToken()
    const userData = getUser()
    setIsLoggedIn(!!token)
    setUser(userData)
  }, [location])

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  const handleLogout = () => {
    if (window.confirm('Weet je zeker dat je wilt uitloggen?')) {
      logout()
      sessionStorage.removeItem('adminLoggedIn')
      setIsLoggedIn(false)
      setUser(null)
      navigate('/')
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const isActive = (path) => {
    return location.pathname === path ? 'active' : ''
  }

  // Determine if navbar should be solid (white background with blue logo)
  // Homepage: transparent at top, solid when scrolled
  // Other pages: always solid
  const showSolidNavbar = !isHomePage || isScrolled

  return (
    <nav className={`navbar ${showSolidNavbar ? 'navbar-scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <img 
            src={showSolidNavbar ? "/assets/bluelogo.png" : "/assets/whitelogo.png"} 
            alt="Stichting Manarah" 
            className="logo-image" 
          />
        </Link>

        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/wie-zijn-wij" className={`nav-link ${isActive('/wie-zijn-wij')}`}>
              Wie zijn wij
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/waar-we-werken" className={`nav-link ${isActive('/waar-we-werken')}`}>
              Waar we werken
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/projecten" className={`nav-link ${isActive('/projecten')}`}>
              Projecten
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/samen-in-actie" className={`nav-link ${isActive('/samen-in-actie')}`}>
              Samen in actie
            </Link>
          </li>
          {isLoggedIn && (
            <li className="nav-item">
              <Link to="/mijn-donaties" className={`nav-link ${isActive('/mijn-donaties')}`}>
                Mijn donaties
              </Link>
            </li>
          )}
          
          {/* Mobile only items */}
          <li className="nav-item nav-item-mobile">
            <Link to="/doneren" className="nav-link-donate-mobile">
              Doneer nu
            </Link>
          </li>
          {!isLoggedIn ? (
            <li className="nav-item nav-item-mobile">
              <Link to="/inloggen" className="nav-link">
                Inloggen
              </Link>
            </li>
          ) : (
            <li className="nav-item nav-item-mobile">
              <button className="btn-logout-mobile" onClick={handleLogout}>
                Uitloggen
              </button>
            </li>
          )}
        </ul>

        <div className="nav-actions">
          {isLoggedIn ? (
            <div className="user-dropdown">
              <button className="user-button">
                <span className="user-avatar">
                  {(user?.name || user?.email || 'U').charAt(0).toUpperCase()}
                </span>
              </button>
              <div className="user-dropdown-menu">
                <span className="user-dropdown-name">{user?.name || user?.email}</span>
                <Link to="/mijn-donaties" className="user-dropdown-item">Mijn donaties</Link>
                <button className="user-dropdown-item" onClick={handleLogout}>Uitloggen</button>
              </div>
            </div>
          ) : (
            <Link to="/inloggen" className="btn-login-nav">
              Inloggen
            </Link>
          )}
          <Link to="/doneren" className="btn-donate-nav">
            <span>Doneer</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </Link>
        </div>

        <button 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`} 
          onClick={toggleMenu}
          aria-label="Menu"
          aria-expanded={isMenuOpen}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div className="nav-overlay" onClick={() => setIsMenuOpen(false)} />
      )}
    </nav>
  )
}

export default Navbar

