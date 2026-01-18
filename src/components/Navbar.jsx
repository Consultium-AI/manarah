import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { getAuthToken, getUser, logout } from '../utils/auth'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const token = getAuthToken()
    const userData = getUser()
    setIsLoggedIn(!!token)
    setUser(userData)
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

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <Link to="/">
            <img 
              src="https://via.placeholder.com/120x40/ffffff/000000?text=LOGO" 
              alt="Foundation Logo" 
              className="logo-img"
            />
          </Link>
        </div>
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`} id="navMenu">
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
            <Link to="/projecten" className={`nav-link ${isActive('/projecten')}`}>Projecten</Link>
          </li>
          <li className="nav-item">
            <Link to="/samen-in-actie" className={`nav-link ${isActive('/samen-in-actie')}`}>Samen in actie</Link>
          </li>
          <li className="nav-item">
            <Link to="/doneren" className={`nav-link ${isActive('/doneren')}`}>Doneren</Link>
          </li>
          {isLoggedIn && (
            <li className="nav-item">
              <Link to="/mijn-donaties" className={`nav-link ${isActive('/mijn-donaties')}`}>
                Mijn Donaties
              </Link>
            </li>
          )}
          {!isLoggedIn ? (
            <li className="nav-item">
              <Link to="/inloggen" className={`nav-link ${isActive('/inloggen')}`}>
                Inloggen/Registreren
              </Link>
            </li>
          ) : (
            <li className="nav-item user-menu">
              <span className="user-name">{user?.name || user?.email}</span>
              <button className="btn-logout" onClick={handleLogout}>
                Uitloggen
              </button>
            </li>
          )}
        </ul>
        <Link to="/doneren" className="btn-donate-nav">
          Doneer nu
        </Link>
        <div 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`} 
          onClick={toggleMenu}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

