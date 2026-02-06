import React from 'react'
import Reveal from '../Reveal'
import { useTranslation } from '../../hooks/useTranslation'

const About = () => {
  const { t } = useTranslation()

  return (
    <section className="about-manarah" id="about">
      <div className="container">
        <div className="about-manarah-content">
          {/* Pretitle */}
          <Reveal>
            <p className="about-pretitle">
              {t('about.pretitle')}
            </p>
          </Reveal>

          {/* Title */}
          <Reveal delay={0.1}>
            <h2 className="about-manarah-title">
              <span className="about-highlight">{t('about.title')}</span>
              {t('about.title-suffix')}
            </h2>
          </Reveal>

          {/* Body */}
          <Reveal delay={0.2}>
            <div className="about-manarah-text">
              <p>{t('about.text1')}</p>
              <p>{t('about.text2')}</p>
              <p>{t('about.text3')}</p>
              <p className="about-highlight-text">
                <strong>{t('about.highlight')}</strong>
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default About
