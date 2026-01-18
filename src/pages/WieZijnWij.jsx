import React from 'react'
import ValuesTimeline from '../components/sections/ValuesTimeline'
import AboutQuote from '../components/sections/AboutQuote'
import AboutImpact from '../components/sections/AboutImpact'
import AboutCTA from '../components/sections/AboutCTA'

const WieZijnWij = () => {
  return (
    <div>
      <section className="about-hero">
        <div className="about-hero-background">
          <img 
            src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=1920&h=1080&fit=crop" 
            alt="Medewerker met lokale persoon" 
            className="about-hero-img"
          />
          <div className="about-hero-overlay"></div>
        </div>
        <div className="about-hero-content">
          <div className="container">
            <h1 className="about-hero-title">
              Samen geven we <span className="highlight">hoop</span> in tijden van crisis
            </h1>
            <p className="about-hero-description">
              Wij zijn een stichting die zich inzet voor mensen die getroffen zijn door conflict, rampen en armoede. 
              Met respect, medemenselijkheid en een onwrikbaar geloof in de kracht van samenwerking, bouwen we aan een betere toekomst voor iedereen.
            </p>
          </div>
        </div>
      </section>

      <section className="story-section">
        <div className="container">
          <h2 className="section-title">Onze oorsprong</h2>
          <div className="story-content">
            <div className="story-text">
              <p className="story-paragraph">
                Het begon met een ontmoeting die alles veranderde. In 2015 reisde onze oprichter naar een vluchtelingenkamp in het Midden-Oosten, waar hij een Syrische familie ontmoette die alles had verloren. De moeder, Fatima, vertelde over haar droom om haar kinderen weer naar school te sturen. Haar verhaal raakte hem diep: <span className="text-highlight">hier waren mensen met hoop, met dromen, met moed</span> – maar zonder de middelen om hun toekomst op te bouwen.
              </p>
              <p className="story-paragraph">
                Die ontmoeting werd het begin van onze missie. We besloten niet alleen te kijken, maar te handelen. Niet alleen te luisteren, maar te helpen. <span className="text-highlight">We geloven dat iedereen recht heeft op veiligheid, onderwijs en de kans om een waardig leven op te bouwen</span>, ongeacht waar ze vandaan komen of wat ze hebben meegemaakt.
              </p>
              <p className="story-paragraph">
                Vandaag de dag werken we in meer dan twintig landen, samen met lokale gemeenschappen, partners en vrijwilligers. Ons werk is gebaseerd op het principe dat <span className="text-highlight">echte verandering van binnenuit komt</span> – door mensen de tools en kansen te geven om hun eigen toekomst vorm te geven. We zijn er niet om te redden, maar om te versterken. Niet om te geven, maar om samen te bouwen.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ValuesTimeline />
      <AboutQuote />
      <AboutImpact />
      <AboutCTA />
    </div>
  )
}

export default WieZijnWij

