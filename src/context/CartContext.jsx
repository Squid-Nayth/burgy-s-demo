import { createContext, useContext, useState, useCallback } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  const addItem = useCallback((product, categorie, slug, qty = 1) => {
    setItems(prev => {
      const key = `${categorie}/${slug}`
      const existing = prev.find(i => i.key === key)
      if (existing) {
        return prev.map(i => i.key === key ? { ...i, qty: i.qty + qty } : i)
      }
      return [...prev, { key, categorie, slug, name: product.name, price: product.price, img: product.images[0], qty }]
    })
  }, [])

  const removeItem = useCallback((key) => {
    setItems(prev => prev.filter(i => i.key !== key))
  }, [])

  const updateQty = useCallback((key, qty) => {
    if (qty <= 0) {
      setItems(prev => prev.filter(i => i.key !== key))
    } else {
      setItems(prev => prev.map(i => i.key === key ? { ...i, qty } : i))
    }
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const totalItems = items.reduce((sum, i) => sum + i.qty, 0)

  // Prix : on parse "4 500 CFA" → 4500
  const parsePrix = (str) => parseInt(str.replace(/\s/g, '').replace('CFA', ''), 10) || 0
  const totalPrice = items.reduce((sum, i) => sum + parsePrix(i.price) * i.qty, 0)
  const formatPrice = (n) => n.toLocaleString('fr-FR').replace(',', ' ') + ' CFA'

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, totalItems, totalPrice, formatPrice }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
