import React from 'react'
import Reveal from '../Reveal'
import { useTranslation } from '../../hooks/useTranslation'

const Newsletter = () => {
  const { t } = useTranslation()

  return (
    <section className="newsletter-manarah">
      <div className="container">
        <div className="newsletter-manarah-content">
          <Reveal>
            <h2 className="newsletter-manarah-title">
              <span className="newsletter-highlight">{t('newsletter.title')}</span>
              {t('newsletter.title-suffix')}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="newsletter-manarah-text">
              {t('newsletter.text')}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="newsletter-manarah-buttons">
              <a
                href="https://stichtingmanarah.nl/nieuwsbrief.php"
                className="btn-newsletter"
              >
                {t('newsletter.button')}
              </a>
              <a
                href="https://chat.whatsapp.com/GKb3l0Fi67H4YhayEDnBLX"
                className="btn-newsletter"
                target="_blank"
                rel="noreferrer"
              >
                {t('newsletter.whatsapp')}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default Newsletter
