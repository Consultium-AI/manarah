import React from 'react'
import { useTranslation } from '../../hooks/useTranslation'

const AboutImpact = () => {
  const { t } = useTranslation()

  const stats = [
    { number: '1.2M+', label: t('aboutimpact.stat1') },
    { number: '3+', label: t('aboutimpact.stat2') },
    { number: '500+', label: t('aboutimpact.stat3') },
    { number: '150+', label: t('aboutimpact.stat4') }
  ]

  const impactStories = [
    {
      heading: t('aboutimpact.shelter'),
      text: t('aboutimpact.shelter-text')
    },
    {
      heading: t('aboutimpact.water'),
      text: t('aboutimpact.water-text')
    },
    {
      heading: t('aboutimpact.education'),
      text: t('aboutimpact.education-text')
    },
    {
      heading: t('aboutimpact.food'),
      text: t('aboutimpact.food-text')
    },
    {
      heading: t('aboutimpact.peace'),
      text: t('aboutimpact.peace-text')
    },
    {
      heading: t('aboutimpact.emergency'),
      text: t('aboutimpact.emergency-text')
    }
  ]

  return (
    <section className="impact-about-section">
      <div className="container">
        <h2 className="section-title">{t('aboutimpact.title')}</h2>
        <p className="section-subtitle">{t('aboutimpact.subtitle')}</p>
        
        <div className="impact-stats">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="impact-stories">
          <h3 className="impact-stories-title">{t('aboutimpact.stories-title')}</h3>
          <div className="impact-stories-grid">
            {impactStories.map((story, index) => (
              <div key={index} className="impact-story-item">
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




