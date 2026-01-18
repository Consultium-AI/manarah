/**
 * API Client for backend communication
 */

import axios from 'axios'
import { getAuthToken, logout } from './auth'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

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

