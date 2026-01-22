import React from 'react'
import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import Stories from '../components/sections/Stories'
import DonateBanner from '../components/sections/DonateBanner'
import Contact from '../components/sections/Contact'
import Newsletter from '../components/sections/Newsletter'

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <About />
      <Stories />
      <DonateBanner />
      <Contact />
      <Newsletter />
    </div>
  )
}

export default Home

