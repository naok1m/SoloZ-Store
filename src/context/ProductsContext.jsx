import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { api } from '../lib/api'

const ProductsContext = createContext(null)

const normalizeProduct = (product) => ({
  id: product.id,
  legacyId: product.legacyId,
  cartId: product.legacyId || product.id,
  checkoutProductId: product.id,
  name: product.name,
  description: product.description,
  price: Number(product.price || 0),
  category: product.category || 'outros',
  badge: product.badge || null,
  image: product.imageUrl || null,
  imageUrl: product.imageUrl || null,
  popular: Boolean(product.popular),
  active: product.active !== false,
  minecraftCommand: product.minecraftCommand,
})

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadProducts = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await api.listProducts()
      setProducts(response.map(normalizeProduct))
    } catch (err) {
      setError(err.message || 'Nao foi possivel carregar produtos.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  useEffect(() => {
    const onStorage = (event) => {
      if (event.key === 'soloz_products_version') {
        loadProducts()
      }
    }

    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const value = useMemo(
    () => ({
      products,
      loading,
      error,
      refreshProducts: loadProducts,
    }),
    [products, loading, error]
  )

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}

export function useProducts() {
  const context = useContext(ProductsContext)
  if (!context) {
    throw new Error('useProducts must be used inside ProductsProvider')
  }
  return context
}
