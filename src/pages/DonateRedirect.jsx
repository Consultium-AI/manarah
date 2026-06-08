import { useEffect } from 'react'
import { RABOBANK_DONATE_URL } from '../constants/donate'

const DonateRedirect = () => {
  useEffect(() => {
    window.location.replace(RABOBANK_DONATE_URL)
  }, [])

  return null
}

export default DonateRedirect
