import React, { useEffect, useRef, useState } from 'react'

const ValuesTimeline = () => {
  const [activeValue, setActiveValue] = useState(0)
  const timelineDotRef = useRef(null)
  const valueItemsRef = useRef([])
  const timelineWrapperRef = useRef(null)

  const values = [
    {
      id: 'integrity',
      title: 'Integriteit',
      description: 'We willen leven vanuit onze waarden en principes op elk niveau van onze organisatie en op elke locatie.'
    },
    {
      id: 'hope',
      title: 'Hoop',
      description: 'We komen in actie vanuit een hoopvolle houding en geven noodhulp en nieuwe hoop.'
    },
    {
      id: 'compassion',
      title: 'Meeleven',
      description: 'We voelen mee met de pijn en het verlies van anderen, en dit meeleven zet ons aan tot actie. We zien de mens achter elke situatie.'
    },
    {
      id: 'joy',
      title: 'Vreugde',
      description: 'We vinden vreugde in de kleine overwinningen en de momenten van verbinding. Deze vreugde geeft ons kracht en herinnert ons eraan waarom we dit werk doen.'
    },
    {
      id: 'accountability',
      title: 'Verantwoording',
      description: 'We zijn verantwoordelijk voor onze acties en transparant over wat we doen. We verantwoorden ons aan de gemeenschappen die we dienen, onze donateurs en onszelf.'
    },
    {
      id: 'dignity',
      title: 'Waardigheid',
      description: 'Ieder mens heeft inherente waardigheid, ongeacht hun omstandigheden. We werken eraan om deze waardigheid te erkennen, te respecteren en te herstellen.'
    },
    {
      id: 'faith',
      title: 'Geloof',
      description: 'We geloven in de kracht van mensen om hun eigen toekomst vorm te geven. We geloven in de mogelijkheid van verandering, zelfs in de moeilijkste omstandigheden.'
    }
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
          <p className="values-intro-text">
            We werken vanuit principes die <span className="text-highlight">hoop</span> en <span className="text-highlight">waardigheid</span> herstellen. Deze waarden drijven ons om elke dag klaar te staan voor mensen die het hard nodig hebben.
          </p>
        </div>
      </div>

      <div className="values-timeline-container">
        <div className="values-timeline-wrapper" ref={timelineWrapperRef}>
          {/* Left Side Text */}
          <div className="values-left-text">
            <div className="values-left-content">
              <h2 className="values-left-title">Onze waarden</h2>
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
            Onze waarden drijven ons om elke dag klaar te staan. Doe mee en geef hoop.
          </p>
          <div className="values-cta-buttons">
            <a href="/doneren" className="btn btn-primary btn-cta-large">Doneer nu</a>
            <a href="#" className="btn btn-secondary">Word vrijwilliger</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ValuesTimeline

