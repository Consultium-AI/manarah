import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from '../../hooks/useTranslation'

const Action = () => {
  const { t } = useTranslation()

  const actions = [
    { title: t('action.donor'), description: t('action.donor-desc') },
    { title: t('action.volunteer'), description: t('action.volunteer-desc') },
    { title: t('action.education'), description: t('action.education-desc') },
    { title: t('action.fundraiser'), description: t('action.fundraiser-desc') },
    { title: t('action.major'), description: t('action.major-desc') },
    { title: t('action.legacy'), description: t('action.legacy-desc') }
  ]

  return (
    <section className="action-section">
      <div className="container">
        <h2 className="section-title">{t('action.title')}</h2>
        <p className="section-subtitle">{t('action.subtitle')}</p>
        <div className="action-grid">
          {actions.map((action, index) => (
            <div key={index} className="action-card">
              <h3 className="action-title">{action.title}</h3>
              <p className="action-description">{action.description}</p>
              <Link to="/samen-in-actie" className="btn btn-outline">{t('action.more-info')}</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Action




