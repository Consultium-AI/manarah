import React from 'react'
import Hero from '../components/sections/Hero'
import Stories from '../components/sections/Stories'
import Impact from '../components/sections/Impact'
import Quote from '../components/sections/Quote'
import Action from '../components/sections/Action'
import Donor from '../components/sections/Donor'
import Newsletter from '../components/sections/Newsletter'

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <Stories />
      <Impact />
      <Quote />
      <Action />
      <Donor />
      <Newsletter />
    </div>
  )
}

export default Home

