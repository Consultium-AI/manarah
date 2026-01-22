/**
 * API Client for backend communication
 */

import axios from 'axios'
import { getAuthToken, logout } from './auth'

// API URL configuration
// For GitHub Pages, use external backend URL
// For local development, use relative path or localhost
const getApiBaseUrl = () => {
  // If environment variable is set, use it
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL
  }
  
  // Check if we're on GitHub Pages
  if (typeof window !== 'undefined' && window.location.hostname.includes('github.io')) {
    // Use external backend URL (you'll need to host backend separately)
    // For now, return empty string - backend will need to be hosted separately
    return 'https://stichting-manarah-api.onrender.com/api' // Update this with your backend URL
  }
  
  // Local development - use relative path (works with Vite proxy)
  return '/api'
}

const API_BASE_URL = getApiBaseUrl()

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      logout()
      window.location.href = '/inloggen'
    }
    return Promise.reject(error)
  }
)

// Auth API
export const authAPI = {
  adminLogin: (email, password) => 
    api.post('/auth/admin/login', { email, password }),
  
  login: (email, password) => 
    api.post('/auth/login', { email, password }),
  
  register: (name, email, password, newsletter = false) => 
    api.post('/auth/register', { name, email, password, newsletter }),
  
  verifyEmail: (token) => 
    api.get('/auth/verify-email', { params: { token } }),
  
  resendVerification: (email) => 
    api.post('/auth/resend-verification', { email }),
  
  getGoogleAuthUrl: () => 
    api.get('/auth/google/url'),
  
  googleCallback: (code) => 
    api.post('/auth/google/callback', { code }),
  
  getFacebookAuthUrl: () => 
    api.get('/auth/facebook/url'),
  
  facebookCallback: (code) => 
    api.post('/auth/facebook/callback', { code })
}

// Donations API
export const donationsAPI = {
  create: (donationData) => 
    api.post('/donations', donationData),
  
  getMy: () => 
    api.get('/donations/my'),
  
  getAll: (limit = 50, offset = 0) => 
    api.get(`/donations?limit=${limit}&offset=${offset}`),
  
  getStats: () => 
    api.get('/donations/stats')
}

// Projects API
export const projectsAPI = {
  getAll: () => 
    api.get('/projects'),
  
  getById: (id) => 
    api.get(`/projects/${id}`)
}

// Users API
export const usersAPI = {
  getAll: (limit = 50, offset = 0) => 
    api.get(`/users?limit=${limit}&offset=${offset}`)
}

export default api

