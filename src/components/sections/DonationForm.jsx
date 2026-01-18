import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { donationsAPI } from '../../utils/api'
import { isAuthenticated } from '../../utils/auth'

const DonationForm = () => {
  const [donationType, setDonationType] = useState('one-time')
  const [selectedAmount, setSelectedAmount] = useState(100)
  const [customAmount, setCustomAmount] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const amounts = [25, 50, 100, 250, 500]

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!isAuthenticated()) {
      if (window.confirm('Je moet ingelogd zijn om te doneren. Wil je naar de login pagina?')) {
        navigate('/inloggen')
      }
      return
    }

    const amount = customAmount ? parseFloat(customAmount) : selectedAmount

    if (!amount || amount <= 0) {
      alert('Selecteer een bedrag of voer een bedrag in.')
      return
    }

    setIsSubmitting(true)

    try {
      const result = await donationsAPI.create({
        amount,
        donation_type: donationType,
        currency: 'EUR'
      })

      if (result.data.success) {
        // Redirect to thank you page
        navigate(`/bedankt?amount=${amount}&type=${donationType}`)
        
        // Reset form
        setSelectedAmount(100)
        setCustomAmount('')
      }
    } catch (error) {
      console.error('Donation error:', error)
      alert(error.response?.data?.error || 'Er is een fout opgetreden bij het verwerken van je donatie.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="donation-section" id="donatie-formulier">
      <div className="container">
        <h2 className="section-title">Doneer nu</h2>
        <p className="section-subtitle">Kies een bedrag en help mee om levens te veranderen</p>
        <div className="donation-form-container">
          <form className="donation-form" onSubmit={handleSubmit}>
            <div className="donation-type">
              <label className="donation-type-option">
                <input 
                  type="radio" 
                  name="donationType" 
                  value="one-time" 
                  checked={donationType === 'one-time'}
                  onChange={(e) => setDonationType(e.target.value)}
                />
                <span>Eenmalig</span>
              </label>
              <label className="donation-type-option">
                <input 
                  type="radio" 
                  name="donationType" 
                  value="monthly"
                  checked={donationType === 'monthly'}
                  onChange={(e) => setDonationType(e.target.value)}
                />
                <span>Maandelijks</span>
              </label>
              <label className="donation-type-option">
                <input 
                  type="radio" 
                  name="donationType" 
                  value="yearly"
                  checked={donationType === 'yearly'}
                  onChange={(e) => setDonationType(e.target.value)}
                />
                <span>Jaarlijks</span>
              </label>
            </div>
            <div className="donation-amounts">
              {amounts.map(amount => (
                <button
                  key={amount}
                  type="button"
                  className={`amount-btn ${selectedAmount === amount && !customAmount ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedAmount(amount)
                    setCustomAmount('')
                  }}
                >
                  €{amount}
                </button>
              ))}
            </div>
            <div className="donation-custom">
              <label htmlFor="customAmount" className="custom-label">
                Of kies een ander bedrag:
              </label>
              <div className="custom-input-wrapper">
                <span className="currency">€</span>
                <input
                  type="number"
                  id="customAmount"
                  className="custom-amount-input"
                  placeholder="0"
                  min="1"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value)
                    if (e.target.value) {
                      setSelectedAmount(null)
                    }
                  }}
                />
              </div>
            </div>
            <button 
              type="submit" 
              className="btn btn-primary btn-donate-large"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Verwerken...' : 'Doneren'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default DonationForm

