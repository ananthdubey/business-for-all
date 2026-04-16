import { useEffect, useRef, useState } from 'react'
import AuthContext from './auth-context'
import { apiRequest, setStoredToken } from '../utils/api'

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isReady, setIsReady] = useState(false)
  const hasHydrated = useRef(false)

  useEffect(() => {
    if (hasHydrated.current) {
      return undefined
    }

    hasHydrated.current = true

    const hydrateSession = async () => {
      try {
        const response = await apiRequest('/api/auth/me')
        setUser(response.data)
      } catch {
        setStoredToken('')
        setUser(null)
      } finally {
        setIsReady(true)
      }
    }

    hydrateSession()
    return undefined
  }, [])

  const login = async (payload) => {
    const response = await apiRequest('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    })

    setStoredToken(response.data.token)
    setUser(response.data.user)
    return response.data
  }

  const register = async (payload) => {
    const response = await apiRequest('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    })

    setStoredToken(response.data.token)
    setUser(response.data.user)
    return response.data
  }

  const logout = async () => {
    try {
      await apiRequest('/api/auth/logout', {
        method: 'POST',
      })
    } finally {
      setStoredToken('')
      setUser(null)
    }
  }

  const refreshUser = async () => {
    const response = await apiRequest('/api/auth/me')
    setUser(response.data)
    return response.data
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isReady,
        login,
        register,
        logout,
        refreshUser,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider }
