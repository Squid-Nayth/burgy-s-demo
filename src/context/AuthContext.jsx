import { createContext, useContext, useState, useCallback } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null) // null = non connecté

  // Faux login (pas de backend)
  const login = useCallback((email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (password.length < 4) {
          reject(new Error('Mot de passe incorrect'))
        } else {
          setUser({
            email,
            name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
            avatar: null,
            joinedAt: 'Mars 2026',
            points: 340,
            level: 'BRONZE',
            orders: [
              { id: '#BRG-0042', date: '12 mars 2026', total: '13 000 CFA', status: 'Livré', items: ['Menu Classique', 'Frites Parmesan'] },
              { id: '#BRG-0039', date: '8 mars 2026',  total: '9 000 CFA',  status: 'Livré', items: ['Le Spicy Chicken', 'Milkshake Vanille'] },
              { id: '#BRG-0031', date: '1 mars 2026',  total: '6 500 CFA',  status: 'Livré', items: ['Le Classique Smashé'] },
            ],
            addresses: [
              { id: 1, label: 'Domicile', address: 'Quartier Glass, Rue des Cocotiers, Libreville' },
            ],
          })
          resolve()
        }
      }, 800)
    })
  }, [])

  const register = useCallback((name, email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (password.length < 4) {
          reject(new Error('Le mot de passe doit faire au moins 4 caractères'))
        } else {
          setUser({
            email,
            name,
            avatar: null,
            joinedAt: 'Mars 2026',
            points: 0,
            level: 'BRONZE',
            orders: [],
            addresses: [],
          })
          resolve()
        }
      }, 800)
    })
  }, [])

  const logout = useCallback(() => setUser(null), [])

  const updateProfile = useCallback((fields) => {
    setUser(prev => ({ ...prev, ...fields }))
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
