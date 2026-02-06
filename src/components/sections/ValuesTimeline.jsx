import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from '../../hooks/useTranslation'

const ValuesTimeline = () => {
  const { t } = useTranslation()
  const [activeValue, setActiveValue] = useState(0)
  const timelineDotRef = useRef(null)
  const valueItemsRef = useRef([])
  const timelineWrapperRef = useRef(null)

  const values = [
    { id: 'integrity', title: t('values.integrity'), description: t('values.integrity-desc') },
    { id: 'hope', title: t('values.hope'), description: t('values.hope-desc') },
    { id: 'compassion', title: t('values.compassion'), description: t('values.compassion-desc') },
    { id: 'joy', title: t('values.joy'), description: t('values.joy-desc') },
    { id: 'accountability', title: t('values.accountability'), description: t('values.accountability-desc') },
    { id: 'dignity', title: t('values.dignity'), description: t('values.dignity-desc') },
    { id: 'faith', title: t('values.faith'), description: t('values.faith-desc') },
  ]

  useEffect(() => {
    const valueItems = valueItemsRef.current.filter(Boolean)
    const timelineDot = timelineDotRef.current
    const timelineWrapper = timelineWrapperRef.current

    if (!valueItems.length || !timelineDot || !timelineWrapper) return

    const updateDotPosition = (activeItem) => {
      if (!activeItem) return

      const wrapperRect = timelineWrapper.getBoundingClientRect()
      const itemContent = activeItem.querySelector('.value-item-content')
      
      if (itemContent) {
        const contentRect = itemContent.getBoundingClientRect()
        const contentTop = contentRect.top - wrapperRect.top
        timelineDot.style.top = `${contentTop + 7}px`
      }
    }

    // Set up Intersection Observer
    if ('IntersectionObserver' in window) {
      const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -30% 0px',
        threshold: 0.5
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = valueItems.findIndex(item => item === entry.target)
            if (index !== -1) {
              setActiveValue(index)
              updateDotPosition(entry.target)
            }
          }
        })
      }, observerOptions)

      valueItems.forEach(item => {
        if (item) observer.observe(item)
      })

      // Set initial active item
      if (valueItems[0]) {
        valueItems[0].classList.add('active')
        updateDotPosition(valueItems[0])
      }

      return () => {
        valueItems.forEach(item => {
          if (item) observer.unobserve(item)
        })
      }
    }
  }, [])

  useEffect(() => {
    const valueItems = valueItemsRef.current
    valueItems.forEach((item, index) => {
      if (item) {
        if (index === activeValue) {
          item.classList.add('active')
        } else {
          item.classList.remove('active')
        }
      }
    })
  }, [activeValue])

  return (
    <section className="interactive-values-section">
      <div className="values-intro">
        <div className="container">
          <p className="values-intro-text" dangerouslySetInnerHTML={{ __html: t('values.intro') }} />
        </div>
      </div>

      <div className="values-timeline-container">
        <div className="values-timeline-wrapper" ref={timelineWrapperRef}>
          {/* Left Side Text */}
          <div className="values-left-text">
            <div className="values-left-content">
              <h2 className="values-left-title">{t('values.title')}</h2>
            </div>
          </div>

          {/* Timeline Line */}
          <div className="values-timeline-line"></div>
          
          {/* Timeline Dot (moves with scroll) */}
          <div className="values-timeline-dot" ref={timelineDotRef}></div>

          {/* Values List */}
          <div className="values-list">
            {values.map((value, index) => (
              <div
                key={value.id}
                className={`value-item ${index === activeValue ? 'active' : ''}`}
                ref={el => valueItemsRef.current[index] = el}
                data-value={value.id}
              >
                <div className="value-item-content">
                  <h3 className="value-item-title">{value.title}</h3>
                  <p className="value-item-description">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="values-cta">
        <div className="container">
          <p className="values-cta-text">
            {t('values.cta-text')}
          </p>
          <div className="values-cta-buttons">
            <a href="/doneren" className="btn btn-primary btn-cta-large">{t('hero.donate')}</a>
            <a href="#" className="btn btn-secondary">{t('values.volunteer')}</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ValuesTimeline

