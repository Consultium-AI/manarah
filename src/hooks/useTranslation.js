import { useState, useEffect } from 'react'
import { getCurrentLanguage, t as translate } from '../utils/i18n'

export const useTranslation = () => {
  const [lang, setLang] = useState(getCurrentLanguage())

  useEffect(() => {
    const handleLanguageChange = () => {
      setLang(getCurrentLanguage())
    }
    
    window.addEventListener('languagechange', handleLanguageChange)
    return () => window.removeEventListener('languagechange', handleLanguageChange)
  }, [])

  const t = (key, params = {}) => {
    return translate(key, params, lang)
  }

  return { t, lang }
}

