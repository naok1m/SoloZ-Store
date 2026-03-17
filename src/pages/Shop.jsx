import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { products, categories } from '../data/products'
import ProductCard from '../components/ProductCard'

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('default')

  // Sincroniza categoria com o parâmetro da URL (ex: /shop?category=vip)
  useEffect(() => {
    const cat = searchParams.get('category')
    if (cat) setActiveCategory(cat)
  }, [searchParams])

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId)
    if (catId === 'all') {
      setSearchParams({})
    } else {
      setSearchParams({ category: catId })
    }
  }

  // Filtragem e ordenação
  const filtered = products
    .filter((p) => activeCategory === 'all' || p.category === activeCategory)
    .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price
      if (sortBy === 'price-desc') return b.price - a.price
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      return 0
    })

  return (
    <div className="min-h-screen bg-db-dark">

      {/* Cabeçalho da página */}
      <div className="relative bg-gradient-to-b from-yellow-950/10 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <p className="text-amber-300/80 text-xs font-gaming font-semibold uppercase tracking-wider mb-1">
            Solo Z
          </p>
          <h1 className="font-gaming text-3xl font-bold text-white">Loja</h1>
          <p className="text-gray-500 text-sm mt-1">Todos os itens disponíveis para o servidor</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Barra de busca e ordenação */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-sm" aria-hidden="true">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Buscar produto..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-db-card border border-db-border rounded-xl pl-10 pr-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-yellow-500/40 transition-colors"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-db-card border border-db-border rounded-xl px-4 py-2.5 text-gray-400 text-sm focus:outline-none focus:border-yellow-500/40 transition-colors cursor-pointer"
          >
            <option value="default">Ordenar por</option>
            <option value="price-asc">Menor preço</option>
            <option value="price-desc">Maior preço</option>
            <option value="name">Nome A–Z</option>
          </select>
        </div>

        {/* Filtro por categoria */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => handleCategoryChange('all')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeCategory === 'all'
                ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-black'
                : 'bg-db-card border border-db-border text-gray-500 hover:border-yellow-500/30 hover:text-yellow-400'
            }`}
          >
            Todos
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-black'
                  : 'bg-db-card border border-db-border text-gray-500 hover:border-yellow-500/30 hover:text-yellow-400'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Contador de resultados */}
        <p className="text-gray-600 text-xs mb-6">
          {filtered.length} produto{filtered.length !== 1 ? 's' : ''} encontrado
          {filtered.length !== 1 ? 's' : ''}
          {activeCategory !== 'all' && (
            <button
              onClick={() => handleCategoryChange('all')}
              className="ml-3 text-yellow-500/70 hover:text-yellow-400 transition-colors"
            >
              Limpar filtro
            </button>
          )}
        </p>

        {/* Grid de produtos */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <span className="w-12 h-12 mx-auto mb-4 flex items-center justify-center text-gray-500" aria-hidden="true">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z" />
              </svg>
            </span>
            <h3 className="font-gaming text-lg font-bold text-white mb-2">
              Nenhum produto encontrado
            </h3>
            <p className="text-gray-500 text-sm">
              Tente outro filtro ou termos de busca.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
