import React, { useState, useEffect } from 'react'
import { getCurrentLanguage, setCurrentLanguage } from '../utils/i18n'

const LanguageSwitcher = () => {
  const [currentLang, setCurrentLang] = useState(getCurrentLanguage())
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleLanguageChange = () => {
      setCurrentLang(getCurrentLanguage())
    }
    
    window.addEventListener('languagechange', handleLanguageChange)
    return () => window.removeEventListener('languagechange', handleLanguageChange)
  }, [])

  const languages = [
    { code: 'nl', name: 'Nederlands', flagImage: `${import.meta.env.BASE_URL}assets/flags/dutch_flag.svg` },
    { code: 'ar', name: 'العربية', flagImage: `${import.meta.env.BASE_URL}assets/flags/saudia_Arabia_flag.jpg` },
    { code: 'en', name: 'English', flagImage: `${import.meta.env.BASE_URL}assets/flags/UK_Flag.jpg` },
    { code: 'fr', name: 'Français', flagImage: `${import.meta.env.BASE_URL}assets/flags/Frensh_Flag.jpg` }
  ]

  const handleLanguageSelect = (langCode) => {
    setCurrentLanguage(langCode)
    setCurrentLang(langCode)
    setIsOpen(false)
  }

  const currentLanguage = languages.find(lang => lang.code === currentLang) || languages[0]

  return (
    <div className="language-switcher">
      <button
        className="language-switcher-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <img 
          src={currentLanguage.flagImage} 
          alt={currentLanguage.name}
          className="language-flag-img"
        />
        <svg 
          width="12" 
          height="12" 
          viewBox="0 0 12 12" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
          className={`language-arrow ${isOpen ? 'open' : ''}`}
        >
          <path d="M3 4.5L6 7.5L9 4.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      
      {isOpen && (
        <>
          <div className="language-overlay" onClick={() => setIsOpen(false)} />
          <div className="language-dropdown">
            {languages.map(lang => (
              <button
                key={lang.code}
                className={`language-option ${currentLang === lang.code ? 'active' : ''}`}
                onClick={() => handleLanguageSelect(lang.code)}
              >
                <img 
                  src={lang.flagImage} 
                  alt={lang.name}
                  className="language-flag-img"
                />
                <span className="language-name">{lang.name}</span>
                {currentLang === lang.code && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default LanguageSwitcher
