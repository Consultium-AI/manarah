import React, { useEffect, useRef, useState } from 'react'

const Reveal = ({ 
  children, 
  className = '', 
  delay = 0, 
  direction = 'up' 
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.12 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const getTransform = () => {
    if (direction === 'left') return 'translateX(-24px)'
    if (direction === 'right') return 'translateX(24px)'
    if (direction === 'down') return 'translateY(-24px)'
    return 'translateY(24px)' // up
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(0, 0)' : getTransform(),
        transition: `opacity 0.45s ease-out ${delay}s, transform 0.45s ease-out ${delay}s`,
        willChange: 'transform, opacity'
      }}
    >
      {children}
    </div>
  )
}

export default Reveal
