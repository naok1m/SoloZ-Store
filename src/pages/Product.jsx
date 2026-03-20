import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/ProductCard'

const categoryGradients = {
  transformacoes: 'from-sky-500 to-cyan-500',
  vip: 'from-purple-500 to-pink-500',
  moedas: 'from-sky-400 to-cyan-600',
  kits: 'from-green-500 to-teal-500',
}

const categoryIcons = {
  transformacoes: '⚡',
  vip: '👑',
  moedas: '💰',
  kits: '🎒',
}

const categoryLabels = {
  transformacoes: 'Transformações',
  vip: 'VIP',
  moedas: 'Moedas Zeni',
  kits: 'Kits',
}

const badgeStyles = {
  POPULAR: 'bg-orange-500 text-white',
  DESTAQUE: 'bg-blue-500 text-white',
  PREMIUM: 'bg-purple-600 text-white',
  VIP: 'bg-sky-500 text-black',
  OFERTA: 'bg-green-500 text-white',
  NOVO: 'bg-cyan-500 text-white',
}

const features = [
  { icon: '⚡', text: 'Ativação imediata após confirmação' },
  { icon: '🎮', text: 'Entrega automática no servidor' },
  { icon: '💬', text: 'Suporte via Discord' },
  { icon: '🔒', text: 'Dados protegidos' },
]

export default function ProductPage() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  const product = products.find((p) => p.id === parseInt(id))

  if (!product) {
    return (
      <div className="min-h-screen bg-db-dark">
        <div className="border-b border-db-border bg-gradient-to-b from-sky-950/10 to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <p className="text-sky-300/80 text-xs font-gaming font-semibold uppercase tracking-wider mb-1">
              Solo Z
            </p>
            <h1 className="font-gaming text-3xl font-bold text-white">Produto</h1>
            <p className="text-gray-500 text-sm mt-1">Item indisponível</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex justify-center">
          <div className="text-center">
          <span className="text-6xl mb-4 block">❌</span>
          <h2 className="font-gaming text-xl text-white mb-2">Produto não encontrado</h2>
          <p className="text-gray-500 text-sm mb-6">
            O produto que você procura não existe ou foi removido.
          </p>
          <Link
            to="/shop"
            className="inline-block bg-gradient-to-r from-sky-500 to-cyan-500 text-black font-bold px-6 py-3 rounded-xl hover:from-sky-400 hover:to-cyan-400 transition-all"
          >
            ← Voltar à Loja
          </Link>
          </div>
        </div>
      </div>
    )
  }

  const icon = categoryIcons[product.category] || '🎮'

  // Produtos relacionados (mesma categoria, exceto o atual)
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3)

  const handleAddToCart = () => {
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }

  return (
    <div className="min-h-screen bg-db-dark">

      {/* Breadcrumb */}
      <div className="border-b border-db-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-xs text-gray-600">
          <Link to="/" className="hover:text-gray-400 transition-colors">Início</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-gray-400 transition-colors">Loja</Link>
          <span>/</span>
          <span className="text-gray-400 truncate max-w-[200px]">{product.name}</span>
        </div>
      </div>

      {/* Cabeçalho da página */}
      <div className="relative bg-gradient-to-b from-sky-950/10 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-sky-300/80 text-xs font-gaming font-semibold uppercase tracking-wider mb-1">
            Solo Z
          </p>
          <h1 className="font-gaming text-3xl font-bold text-white">{product.name}</h1>
          <p className="text-gray-500 text-sm mt-1">
            {categoryLabels[product.category] || product.category}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Produto principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">

          {/* Área visual do produto */}
          <div
            className="relative rounded-2xl overflow-hidden bg-db-card border border-db-border flex items-center justify-center"
            style={{ minHeight: '360px' }}
          >
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full min-h-[360px] bg-gradient-to-br from-[#17172a] to-[#10101f] flex items-center justify-center">
                <span className="text-[130px] drop-shadow-2xl">{icon}</span>
              </div>
            )}

            {/* Badge */}
            {product.badge && (
              <span
                className={`absolute top-5 left-5 text-sm font-black px-3 py-1 rounded-lg ${
                  badgeStyles[product.badge] || 'bg-gray-600 text-white'
                }`}
              >
                {product.badge}
              </span>
            )}

            {/* Categoria tag */}
            <div className="absolute bottom-5 left-5">
              <span className="bg-black/40 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-lg">
                {categoryLabels[product.category] || product.category}
              </span>
            </div>
          </div>

          {/* Informações do produto */}
          <div className="flex flex-col">
            <h2 className="font-gaming text-2xl sm:text-3xl font-black text-white mb-4 leading-tight">
              {product.name}
            </h2>

            <p className="text-gray-400 text-base leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {features.map((feat) => (
                <div
                  key={feat.text}
                  className="flex items-center gap-2 bg-db-card border border-db-border rounded-xl px-3 py-2.5"
                >
                  <span className="text-base">{feat.icon}</span>
                  <span className="text-gray-400 text-xs">{feat.text}</span>
                </div>
              ))}
            </div>

            {/* Preço e botão */}
            <div className="bg-db-card border border-db-border rounded-2xl p-5 mt-auto">
              <div className="flex items-baseline gap-2 mb-4">
                <span className="font-gaming text-4xl font-black text-sky-400">
                  R$ {product.price.toFixed(2)}
                </span>
                <span className="text-gray-600 text-sm">por unidade</span>
              </div>

              <button
                onClick={handleAddToCart}
                className={`w-full py-4 rounded-xl font-black text-base transition-all duration-300 ${
                  added
                    ? 'bg-green-500/20 border border-green-500/40 text-green-400'
                    : 'bg-gradient-to-r from-sky-500 to-cyan-500 text-black hover:from-sky-400 hover:to-cyan-400 hover:shadow-xl hover:shadow-sky-500/25 hover:-translate-y-0.5'
                }`}
              >
                {added ? '✅ Adicionado ao Carrinho!' : '🛒 Adicionar ao Carrinho'}
              </button>

              <div className="flex items-center justify-between mt-3">
                <Link
                  to="/cart"
                  className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
                >
                  Ver carrinho →
                </Link>
                <Link
                  to="/shop"
                  className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
                >
                  ← Continuar comprando
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Produtos relacionados */}
        {related.length > 0 && (
          <div>
            <h2 className="font-gaming text-xl font-black text-white mb-6">
              Produtos Relacionados
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
