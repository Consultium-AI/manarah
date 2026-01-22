import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import WieZijnWij from './pages/WieZijnWij'
import WaarWeWerken from './pages/WaarWeWerken'
import LandDetail from './pages/LandDetail'
import Inloggen from './pages/Inloggen'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import MijnDonaties from './pages/MijnDonaties'
import VerifyEmail from './pages/VerifyEmail'
import OAuthCallback from './pages/OAuthCallback'
import Bedankt from './pages/Bedankt'
import Doneren from './pages/Doneren'
import Projecten from './pages/Projecten'
import ProjectDetail from './pages/ProjectDetail'
import SamenInActie from './pages/SamenInActie'
import './App.css'

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div className="App">
        <ScrollToTop />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/wie-zijn-wij" element={<WieZijnWij />} />
            <Route path="/waar-we-werken" element={<WaarWeWerken />} />
            <Route path="/land/:countrySlug" element={<LandDetail />} />
            <Route path="/inloggen" element={<Inloggen />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/mijn-donaties" element={<MijnDonaties />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/auth/google/callback" element={<OAuthCallback />} />
            <Route path="/auth/facebook/callback" element={<OAuthCallback />} />
            <Route path="/doneren" element={<Doneren />} />
            <Route path="/bedankt" element={<Bedankt />} />
            <Route path="/projecten" element={<Projecten />} />
            <Route path="/project/:projectId" element={<ProjectDetail />} />
            <Route path="/samen-in-actie" element={<SamenInActie />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

