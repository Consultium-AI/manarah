/**
 * Authentication utilities
 */

export const getAuthToken = () => {
  return sessionStorage.getItem('authToken')
}

export const getUser = () => {
  const userStr = sessionStorage.getItem('user')
  return userStr ? JSON.parse(userStr) : null
}

export const setAuthToken = (token) => {
  sessionStorage.setItem('authToken', token)
}

export const setUser = (user) => {
  sessionStorage.setItem('user', JSON.stringify(user))
}

export const logout = () => {
  sessionStorage.removeItem('authToken')
  sessionStorage.removeItem('user')
  sessionStorage.removeItem('adminLoggedIn')
}

export const isAuthenticated = () => {
  return !!getAuthToken()
}

export const isAdmin = () => {
  const user = getUser()
  return user?.role === 'admin'
}




