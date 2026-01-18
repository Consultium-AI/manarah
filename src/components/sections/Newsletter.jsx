import React, { useState } from 'react'

const Newsletter = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Implement newsletter subscription
    alert('Bedankt voor je aanmelding! Je ontvangt binnenkort onze nieuwsbrief.')
    setEmail('')
  }

  return (
    <section className="newsletter-section">
      <div className="container">
        <div className="newsletter-content">
          <h2 className="newsletter-title">Blijf op de hoogte</h2>
          <p className="newsletter-description">
            Schrijf je in voor onze nieuwsbrief en ontvang updates over onze projecten en impact
          </p>
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Je e-mailadres"
              className="newsletter-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary">Inschrijven</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Newsletter




