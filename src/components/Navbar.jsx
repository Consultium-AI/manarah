import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { getAuthToken, getUser, logout } from '../utils/auth'
import LanguageSwitcher from './LanguageSwitcher'
import { useTranslation } from '../hooks/useTranslation'

const Navbar = () => {
  const { t } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchInputRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()
  
  const isHomePage = location.pathname === '/'

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

  useEffect(() => {
    setIsMenuOpen(false)
    setSearchOpen(false)
    setSearchQuery('')
  }, [location])

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [searchOpen])

  const handleLogout = () => {
    if (window.confirm(t('logout.confirm'))) {
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

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/projecten?search=${encodeURIComponent(searchQuery)}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  const showSolidNavbar = !isHomePage || isScrolled

  return (
    <nav className={`navbar ${showSolidNavbar ? 'navbar-scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <img 
            src={showSolidNavbar ? `${import.meta.env.BASE_URL}assets/bluelogo.png` : `${import.meta.env.BASE_URL}assets/whitelogo.png`} 
            alt="Stichting Manarah" 
            className="logo-image" 
          />
        </Link>

        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/wie-zijn-wij" className={`nav-link ${isActive('/wie-zijn-wij')}`}>
              {t('nav.wie-zijn-wij')}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/waar-we-werken" className={`nav-link ${isActive('/waar-we-werken')}`}>
              {t('nav.waar-we-werken')}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/projecten" className={`nav-link ${isActive('/projecten')}`}>
              {t('nav.projecten')}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/samen-in-actie" className={`nav-link ${isActive('/samen-in-actie')}`}>
              {t('nav.help-mee')}
            </Link>
          </li>
          {isLoggedIn && (
            <li className="nav-item">
              <Link to="/mijn-donaties" className={`nav-link ${isActive('/mijn-donaties')}`}>
                {t('nav.mijn-donaties')}
              </Link>
            </li>
          )}
          
          {/* Mobile search */}
          <li className="nav-item nav-item-mobile">
            <form onSubmit={handleSearch} className="nav-search-mobile">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                type="text"
                placeholder={t('hero.search-placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </li>

          <li className="nav-item nav-item-mobile">
            <div className="nav-donate-group-mobile">
              <LanguageSwitcher />
              <Link to="/doneren" className="nav-link-donate-mobile">
                {t('nav.doneer-nu')}
              </Link>
            </div>
          </li>
          {!isLoggedIn ? (
            <li className="nav-item nav-item-mobile">
              <Link to="/inloggen" className="nav-link">
                {t('nav.inloggen')}
              </Link>
            </li>
          ) : (
            <li className="nav-item nav-item-mobile">
              <button className="btn-logout-mobile" onClick={handleLogout}>
                {t('nav.uitloggen')}
              </button>
            </li>
          )}
        </ul>

        <div className="nav-actions">
          {/* Compact search */}
          <div className={`nav-search ${searchOpen ? 'nav-search-open' : ''}`}>
            {searchOpen ? (
              <form onSubmit={handleSearch} className="nav-search-form">
                <input
                  ref={searchInputRef}
                  type="text"
                  className="nav-search-input"
                  placeholder={t('hero.search-placeholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onBlur={() => { if (!searchQuery) setSearchOpen(false) }}
                />
                <button type="button" className="nav-search-close" onClick={() => { setSearchOpen(false); setSearchQuery('') }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </form>
            ) : (
              <button className="nav-search-toggle" onClick={() => setSearchOpen(true)} aria-label="Zoeken">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </button>
            )}
          </div>

          {isLoggedIn ? (
            <div className="user-dropdown">
              <button className="user-button">
                <span className="user-avatar">
                  {(user?.name || user?.email || 'U').charAt(0).toUpperCase()}
                </span>
              </button>
              <div className="user-dropdown-menu">
                <span className="user-dropdown-name">{user?.name || user?.email}</span>
                <Link to="/mijn-donaties" className="user-dropdown-item">{t('nav.mijn-donaties')}</Link>
                <button className="user-dropdown-item" onClick={handleLogout}>{t('nav.uitloggen')}</button>
              </div>
            </div>
          ) : (
            <Link to="/inloggen" className="btn-login-nav">
              {t('nav.inloggen')}
            </Link>
          )}
          <div className="nav-donate-group">
            <LanguageSwitcher />
            <Link to="/doneren" className="btn-donate-nav">
              <span>{t('nav.doneer')}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </Link>
          </div>
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

      {isMenuOpen && (
        <div className="nav-overlay" onClick={() => setIsMenuOpen(false)} />
      )}
    </nav>
  )
}

export default Navbar
