import React from 'react'

const AboutImpact = () => {
  const stats = [
    { number: '1.2M+', label: 'Mensen geholpen per jaar' },
    { number: '25+', label: 'Landen waar we actief zijn' },
    { number: '500+', label: 'Medewerkers en vrijwilligers' },
    { number: '150+', label: 'Actieve projecten' }
  ]

  const impactStories = [
    {
      icon: '🏠',
      heading: 'Onderdak voor gezinnen',
      text: 'Meer dan <strong>50.000 gezinnen</strong> hebben veilige onderkomens gekregen in conflictgebieden en na natuurrampen. We bouwen niet alleen huizen, maar ook gemeenschappen.'
    },
    {
      icon: '💧',
      heading: 'Schoon water voor iedereen',
      text: 'We hebben <strong>meer dan 200 waterputten</strong> gebouwd en gerepareerd, waardoor duizenden mensen toegang hebben tot schoon drinkwater. Water is leven, en leven is hoop.'
    },
    {
      icon: '📚',
      heading: 'Onderwijs voor kinderen',
      text: 'Meer dan <strong>75.000 kinderen</strong> gaan weer naar school dankzij onze onderwijsprogramma\'s. We bouwen scholen, trainen leraren en zorgen voor lesmateriaal.'
    },
    {
      icon: '🌾',
      heading: 'Voedselzekerheid',
      text: 'We helpen <strong>meer dan 30.000 gezinnen</strong> om zelf voedsel te verbouwen door zaden, training en landbouwondersteuning. Zelfredzaamheid geeft mensen hun waardigheid terug.'
    },
    {
      icon: '🕊️',
      heading: 'Vredesopbouw',
      text: 'In <strong>meer dan 15 gemeenschappen</strong> werken we aan vredesopbouw en verzoening. We brengen mensen samen, faciliteren dialoog en bouwen bruggen tussen groepen.'
    },
    {
      icon: '⚕️',
      heading: 'Noodhulp',
      text: 'Bij acute crises reageren we snel met voedsel, water, onderdak en medische zorg. In het afgelopen jaar hebben we <strong>meer dan 200.000 mensen</strong> geholpen tijdens noodsituaties.'
    }
  ]

  return (
    <section className="impact-about-section">
      <div className="container">
        <h2 className="section-title">Onze impact</h2>
        <p className="section-subtitle">Samen maken we het verschil voor duizenden mensen wereldwijd</p>
        
        <div className="impact-stats">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="impact-stories">
          <h3 className="impact-stories-title">Verhalen van hoop</h3>
          <div className="impact-stories-grid">
            {impactStories.map((story, index) => (
              <div key={index} className="impact-story-item">
                <div className="impact-story-icon">{story.icon}</div>
                <h4 className="impact-story-heading">{story.heading}</h4>
                <p 
                  className="impact-story-text" 
                  dangerouslySetInnerHTML={{ __html: story.text }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutImpact




