import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { api } from '../lib/api'

const TOKEN_KEY = 'soloz_admin_token'
const USER_KEY = 'soloz_admin_user'

const AuthContext = createContext(null)

const readStoredUser = () => {
  const raw = localStorage.getItem(USER_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || '')
  const [user, setUser] = useState(() => readStoredUser())

  const logout = useCallback(() => {
    setToken('')
    setUser(null)
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  }, [])

  const login = useCallback(async (email, password) => {
    const response = await api.adminLogin({ email, password })
    setToken(response.token)
    setUser(response.user)
    localStorage.setItem(TOKEN_KEY, response.token)
    localStorage.setItem(USER_KEY, JSON.stringify(response.user))
    return response
  }, [])

  // Escuta eventos de "Unauthorized" (401) vindo da api.js
  useEffect(() => {
    const handleForceLogout = () => {
      logout()
    }
    window.addEventListener('soloz:logout', handleForceLogout)
    return () => window.removeEventListener('soloz:logout', handleForceLogout)
  }, [logout])

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token),
      login,
      logout,
    }),
    [token, user, login, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }
  return context
}
