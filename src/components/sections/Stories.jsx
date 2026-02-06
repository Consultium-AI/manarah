import React from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../Reveal'
import { useTranslation } from '../../hooks/useTranslation'

const Stories = () => {
  const { t } = useTranslation()

  const stories = [
    {
      title: t('stories.story1-title'),
      excerpt: t('stories.story1-excerpt'),
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=400&fit=crop',
      label: t('stories.label-story')
    },
    {
      title: t('stories.story2-title'),
      excerpt: t('stories.story2-excerpt'),
      image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&h=400&fit=crop',
      label: t('stories.label-news')
    },
    {
      title: t('stories.story3-title'),
      excerpt: t('stories.story3-excerpt'),
      image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&h=400&fit=crop',
      label: t('stories.label-story')
    }
  ]

  return (
    <section className="stories-manarah">
      <div className="container">
        <Reveal>
          <h2 className="stories-manarah-title">
            <span className="stories-highlight">{t('stories.title-highlight')}</span>
            {t('stories.title-suffix')}
          </h2>
        </Reveal>
        <div className="stories-manarah-grid">
          {stories.map((story, index) => (
            <Reveal key={index} delay={0.1 * index}>
              <article className="story-card-manarah">
                <div className="story-image-manarah">
                  <img src={story.image} alt={story.title} />
                  <span className={`story-label-manarah ${story.label === t('stories.label-news') ? 'story-label-news' : ''}`}>
                    {story.label}
                  </span>
                </div>
                <div className="story-content-manarah">
                  <h3 className="story-title-manarah">{story.title}</h3>
                  <p className="story-excerpt-manarah">{story.excerpt}</p>
                  <Link to="/projecten" className="story-link-manarah">{t('stories.read-more')}</Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.4}>
          <div className="stories-manarah-more">
            <Link to="/projecten" className="btn-stories-more">{t('stories.more-news')}</Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default Stories




