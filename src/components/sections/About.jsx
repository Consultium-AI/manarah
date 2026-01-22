import React from 'react'
import Reveal from '../Reveal'

const About = () => {
  return (
    <section className="about-manarah" id="about">
      <div className="container">
        <div className="about-manarah-content">
          {/* Pretitle */}
          <Reveal>
            <p className="about-pretitle">
              Solidariteit · Naastenliefde · Betrokkenheid
            </p>
          </Reveal>

          {/* Title */}
          <Reveal delay={0.1}>
            <h2 className="about-manarah-title">
              <span className="about-highlight">Wie zijn wij</span>
              als stichting
            </h2>
          </Reveal>

          {/* Body */}
          <Reveal delay={0.2}>
            <div className="about-manarah-text">
              <p>
                Stichting Manarah is een onafhankelijke, non-profit liefdadigheidsorganisatie gevestigd in Nederland. 
                Wij zetten ons in voor het ondersteunen van kwetsbare mensen: armen, wezen en mensen met een beperking 
                – zowel binnen Nederland als in noodlijdende gemeenschappen wereldwijd.
              </p>
              <p>
                Er zijn mensen die wachten op een warme maaltijd, een beetje aandacht of een liefdevol woord. 
                Met jouw steun kunnen wij hen hoop bieden, hun pijn verzachten en een glimlach terugbrengen 
                op gezichten die gebukt gaan onder armoede.
              </p>
              <p>
                Samen kunnen we levens veranderen.
              </p>
              <p className="about-highlight-text">
                <strong>
                  Wees een bron van licht. Een reden voor hoop. En een verschil in het leven van een ander.
                </strong>
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default About
