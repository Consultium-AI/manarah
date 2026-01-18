import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { donationsAPI } from '../utils/api'
import { isAuthenticated } from '../utils/auth'

const Doneren = () => {
  const [donationType, setDonationType] = useState('one-time')
  const [selectedAmount, setSelectedAmount] = useState(20)
  const [customAmount, setCustomAmount] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const amounts = [20, 50, 200]

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
        setSelectedAmount(20)
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
    <section className="donate-page">
      <div className="donate-page-background">
        <img 
          src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1920&h=1080&fit=crop" 
          alt="Kinderen die hulp ontvangen" 
          className="donate-page-img"
        />
        <div className="donate-page-overlay"></div>
      </div>

      <div className="donate-page-content">
        <div className="container">
          <div className="donate-page-wrapper">
            {/* Left Side - Main Message */}
            <div className="donate-page-left">
              <h1 className="donate-page-title">
                Red <span className="highlight">levens</span> van mensen in nood
              </h1>
              <p className="donate-page-description">
                Met jouw gift kunnen wij mensenlevens redden bij rampen en geweld. Wij geven noodhulp en helpen mensen weer op eigen benen te staan. Gebruik voor een gift het formulier op deze pagina, of schrijf zelf een bedrag over naar <strong>IBAN NL 52 INGB 000 000 2091</strong> van Foundation Nederland. Hartelijk dank voor je hulp!
              </p>
              <div className="donate-page-impact">
                <div className="impact-item">
                  <span className="impact-icon">👨‍👩‍👧‍👦</span>
                  <span className="impact-text">Helpt een gezin met noodzakelijke huishoudelijke goederen na een ramp</span>
                </div>
              </div>
            </div>

            {/* Right Side - Donation Form */}
            <div className="donate-page-right">
              <div className="donate-form-card">
                {/* Steps indicator */}
                <div className="donate-steps">
                  <div className="step active">1</div>
                  <div className="step">2</div>
                  <div className="step">3</div>
                  <div className="step">4</div>
                </div>

                {/* Currency selector */}
                <div className="donate-currency">
                  <span>BE-EUR</span>
                  <a href="#" className="currency-modify">Modify</a>
                </div>

                {/* Donation Type */}
                <div className="donate-type-buttons">
                  <button
                    type="button"
                    className={`donate-type-btn ${donationType === 'one-time' ? 'active' : ''}`}
                    onClick={() => setDonationType('one-time')}
                  >
                    Give once
                    {donationType === 'one-time' && <span className="check-icon">✓</span>}
                  </button>
                  <button
                    type="button"
                    className={`donate-type-btn ${donationType === 'monthly' ? 'active' : ''}`}
                    onClick={() => setDonationType('monthly')}
                  >
                    Give monthly
                    {donationType === 'monthly' && <span className="check-icon">✓</span>}
                  </button>
                </div>

                {/* Amount Selection */}
                <form className="donate-form" onSubmit={handleSubmit}>
                  <div className="donate-amounts-grid">
                    {amounts.map(amount => (
                      <button
                        key={amount}
                        type="button"
                        className={`donate-amount-btn ${selectedAmount === amount && !customAmount ? 'active' : ''}`}
                        onClick={() => {
                          setSelectedAmount(amount)
                          setCustomAmount('')
                        }}
                      >
                        EUR {amount}
                      </button>
                    ))}
                  </div>

                  {/* Custom Amount */}
                  <div className="donate-custom-amount">
                    <label htmlFor="customDonateAmount" className="custom-amount-label">
                      Choose your amount
                    </label>
                    <div className="custom-amount-input-wrapper">
                      <span className="currency-symbol">EUR</span>
                      <input
                        type="number"
                        id="customDonateAmount"
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

                  {/* Impact Message */}
                  <div className="donate-impact-message">
                    <span className="impact-icon-small">🍽️</span>
                    <span className="impact-message-text">
                      Helpt een gezin met noodzakelijke huishoudelijke goederen na een ramp.
                    </span>
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-donate-large"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Verwerken...' : 'Volgende stap →'}
                  </button>

                  {/* Security Info */}
                  <div className="donate-security">
                    <span className="security-icon">🔒</span>
                    <span className="security-text">Payment will be made at the end via a secure portal.</span>
                  </div>

                  {/* Payment Methods */}
                  <div className="donate-payment-methods">
                    <img src="https://via.placeholder.com/40x25/1a1f71/ffffff?text=VISA" alt="VISA" />
                    <img src="https://via.placeholder.com/40x25/eb001b/ffffff?text=MC" alt="Mastercard" />
                    <img src="https://via.placeholder.com/40x25/006fcf/ffffff?text=AMEX" alt="American Express" />
                    <img src="https://via.placeholder.com/40x25/00457c/ffffff?text=BC" alt="Bancontact" />
                    <img src="https://via.placeholder.com/40x25/003087/ffffff?text=PP" alt="PayPal" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Doneren




