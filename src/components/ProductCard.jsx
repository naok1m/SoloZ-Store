import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const navigate = useNavigate()
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0, active: false })

  const handleBuyNow = () => {
    addToCart(product)
    navigate('/cart')
  }

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    const rotateX = -((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * 9
    const rotateY = ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 9
    setTilt({ x: rotateX, y: rotateY, active: true })
  }

  const handleMouseLeave = () => setTilt({ x: 0, y: 0, active: false })

  const cardStyle = {
    transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${tilt.active ? 'scale(1.03)' : 'scale(1)'}`,
    transition: tilt.active ? 'transform 0.08s ease' : 'transform 0.45s ease',
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={cardStyle}
      className="relative bg-db-card border border-db-border rounded-xl overflow-hidden flex flex-col will-change-transform"
    >
      {/* Badge */}
      {product.badge && (
        <span className="absolute top-3 left-3 z-10 text-xs font-semibold px-2 py-0.5 rounded bg-black/70 border border-white/10 text-gray-200 backdrop-blur-sm">
          {product.badge}
        </span>
      )}

      {/* Imagem — o admin define a URL no campo "image" */}
      <div className="h-48 bg-[#0d0d1a] border-b border-db-border overflow-hidden flex-shrink-0">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-700">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-xs">Sem imagem</span>
          </div>
        )}
      </div>

      {/* Conteúdo */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-base font-bold text-white mb-1 truncate">{product.name}</h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
          {product.description}
        </p>

        <div className="flex items-center justify-between gap-2">
          <span className="text-lg font-bold text-sky-400">
            R$ {product.price.toFixed(2)}
          </span>
          <div className="flex gap-2">
            <Link
              to={`/product/${product.id}`}
              className="text-sm px-3 py-1.5 border border-db-border text-gray-400 rounded-lg hover:text-white hover:border-gray-500 transition-colors"
            >
              Ver
            </Link>
            <button
              onClick={handleBuyNow}
              className="text-sm px-3 py-1.5 bg-sky-500 text-black font-bold rounded-lg hover:bg-sky-400 transition-colors"
            >
              Comprar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
