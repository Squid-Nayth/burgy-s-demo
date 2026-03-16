import { createContext, useContext, useState, useCallback } from 'react'

const AuthContext = createContext(null)

// Génère un ID de commande unique
const genOrderId = () => `#BRG-${String(Math.floor(Math.random() * 9000) + 1000)}`

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

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
            favorites: [], // { slug, categorie, name, price, img }
            orders: [
              {
                id: '#BRG-0042',
                createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(), // il y a 45 min → plus annulable
                total: '13 000 CFA',
                totalAmount: 13000,
                mode: 'emporter',
                modeDetails: { nom: 'Jean Test' },
                status: 'Livré',
                paymentMethod: 'Carte bancaire',
                items: [
                  { name: 'Menu Classique', price: '6 500 CFA', qty: 1, img: '/logos/image-removebg-preview (1) copie.png' },
                  { name: 'Frites Parmesan', price: '2 500 CFA', qty: 1, img: '/logos/image-removebg-preview (4) copie 2.png' },
                ],
              },
              {
                id: '#BRG-0039',
                createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // il y a 2 jours
                total: '9 000 CFA',
                totalAmount: 9000,
                mode: 'table',
                modeDetails: { table: 'Table 3', personnes: '2' },
                status: 'Livré',
                paymentMethod: 'Airtel Money',
                items: [
                  { name: 'Le Spicy Chicken', price: '4 500 CFA', qty: 1, img: "/assets/Capture d'écran 2026-03-05 à 19.04.54.png" },
                  { name: 'Milkshake Vanille', price: '2 000 CFA', qty: 1, img: '/logos/image-removebg-preview (4).png' },
                ],
              },
            ],
            addresses: [
              { id: 1, label: 'Domicile', address: 'Quartier Glass, Rue des Cocotiers, Libreville' },
            ],
            paymentMethods: [
              { id: 1, type: 'card', label: 'Visa •••• 4242', icon: 'card', details: { number: '**** **** **** 4242', name: 'JEAN TEST', expiry: '12/27' } },
              { id: 2, type: 'airtel', label: 'Airtel Money — 077 123 456', icon: 'airtel', details: { phone: '+241 077 123 456', holder: 'Jean Test' } },
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
            email, name,
            avatar: null,
            joinedAt: 'Mars 2026',
            points: 0,
            level: 'BRONZE',
            favorites: [],
            orders: [],
            addresses: [],
            paymentMethods: [],
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

  // ── Favoris ──
  const addFavorite = useCallback((product) => {
    setUser(prev => {
      if (!prev) return prev
      const already = prev.favorites.some(f => f.slug === product.slug && f.categorie === product.categorie)
      if (already) return prev
      return { ...prev, favorites: [...prev.favorites, product] }
    })
  }, [])

  const removeFavorite = useCallback((slug, categorie) => {
    setUser(prev => {
      if (!prev) return prev
      return { ...prev, favorites: prev.favorites.filter(f => !(f.slug === slug && f.categorie === categorie)) }
    })
  }, [])

  const isFavorite = useCallback((slug, categorie) => {
    return user?.favorites?.some(f => f.slug === slug && f.categorie === categorie) ?? false
  }, [user])

  // ── Commandes ──
  // Appelée depuis Paiement.jsx après confirmation
  const addOrder = useCallback(({ items, total, totalAmount, mode, modeDetails, paymentMethod }) => {
    const order = {
      id: genOrderId(),
      createdAt: new Date().toISOString(),
      total,
      totalAmount,
      mode,
      modeDetails,
      status: 'En cours',
      paymentMethod,
      items,
    }
    setUser(prev => {
      if (!prev) return prev
      // +1 pt par tranche de 500 CFA
      const pointsGained = Math.floor(totalAmount / 500)
      const newPoints = prev.points + pointsGained
      const newLevel = newPoints >= 3000 ? 'DIAMOND' : newPoints >= 1500 ? 'GOLD' : newPoints >= 500 ? 'SILVER' : 'BRONZE'
      return {
        ...prev,
        points: newPoints,
        level: newLevel,
        orders: [order, ...prev.orders],
      }
    })
    return order
  }, [])

  // Annulation : possible uniquement si moins de 20 minutes depuis la création
  const cancelOrder = useCallback((orderId) => {
    setUser(prev => {
      if (!prev) return prev
      return {
        ...prev,
        orders: prev.orders.map(o => {
          if (o.id !== orderId) return o
          const elapsed = (Date.now() - new Date(o.createdAt).getTime()) / 1000 / 60
          if (elapsed >= 20) return o // trop tard
          return { ...o, status: 'Annulé' }
        }),
      }
    })
  }, [])

  // ── Adresses ──
  const addAddress = useCallback((address) => {
    setUser(prev => {
      if (!prev) return prev
      const id = Date.now()
      return { ...prev, addresses: [...prev.addresses, { id, ...address }] }
    })
  }, [])

  const removeAddress = useCallback((id) => {
    setUser(prev => {
      if (!prev) return prev
      return { ...prev, addresses: prev.addresses.filter(a => a.id !== id) }
    })
  }, [])

  // ── Moyens de paiement ──
  const addPaymentMethod = useCallback((method) => {
    setUser(prev => {
      if (!prev) return prev
      const id = Date.now()
      return { ...prev, paymentMethods: [...prev.paymentMethods, { id, ...method }] }
    })
  }, [])

  const removePaymentMethod = useCallback((id) => {
    setUser(prev => {
      if (!prev) return prev
      return { ...prev, paymentMethods: prev.paymentMethods.filter(m => m.id !== id) }
    })
  }, [])

  return (
    <AuthContext.Provider value={{
      user, login, register, logout, updateProfile,
      addFavorite, removeFavorite, isFavorite,
      addOrder, cancelOrder,
      addAddress, removeAddress,
      addPaymentMethod, removePaymentMethod,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
