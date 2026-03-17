import { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])
  const [toast, setToast] = useState({ visible: false, message: '' })

  useEffect(() => {
    if (!toast.visible) return
    const timer = setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }))
    }, 2200)
    return () => clearTimeout(timer)
  }, [toast.visible])

  const showToast = (message) => {
    setToast({ visible: true, message })
  }

  // Adiciona produto ao carrinho (incrementa se já existir)
  const addToCart = (product) => {
    showToast(`${product.name} foi para o carrinho`)
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  // Remove produto do carrinho
  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId))
  }

  // Atualiza quantidade de um produto
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }

  // Limpa todo o carrinho
  const clearCart = () => setCartItems([])

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}

      {/* Toast global de feedback do carrinho */}
      <div className="fixed top-4 right-4 z-[80] pointer-events-none">
        <div
          className={`pointer-events-auto flex items-center gap-2 bg-db-card border border-emerald-400/40 text-gray-100 rounded-xl px-4 py-3 shadow-xl shadow-black/40 min-w-[260px] max-w-[320px] transition-all duration-300 ${
            toast.visible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-3'
          }`}
          role="status"
          aria-live="polite"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
          <p className="text-sm leading-snug">{toast.message || 'Item adicionado ao carrinho'}</p>
        </div>
      </div>
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
