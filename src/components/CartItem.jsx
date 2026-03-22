import { useCart } from '../context/CartContext'

const categoryIcons = {
  transformacoes: '⚡',
  vip: '👑',
  moedas: '💰',
  kits: '🎒',
}

const categoryGradients = {
  transformacoes: 'from-sky-500/20 to-cyan-500/20',
  vip: 'from-purple-500/20 to-pink-500/20',
  moedas: 'from-sky-400/20 to-cyan-600/20',
  kits: 'from-green-500/20 to-teal-500/20',
}

export default function CartItem({ item }) {
  const { removeFromCart, updateQuantity } = useCart()
  const icon = categoryIcons[item.category] || '🎮'
  const gradient = categoryGradients[item.category] || 'from-gray-700/20 to-gray-800/20'

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-db-card border border-db-border rounded-xl p-4 hover:border-sky-500/20 transition-all animate-fade-in-up">

      <div className="flex items-center gap-4 flex-1 min-w-0">
        {/* Ícone do produto */}
        <div
          className={`w-16 h-16 bg-gradient-to-br ${gradient} border border-db-border rounded-xl flex items-center justify-center text-3xl flex-shrink-0`}
        >
          {icon}
        </div>

        {/* Informações */}
        <div className="flex-1 min-w-0">
          <h3 className="font-gaming text-sm font-bold text-white truncate">{item.name}</h3>
          <p className="text-sky-400 font-bold text-sm mt-0.5">
            R$ {item.price.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-4 mt-2 sm:mt-0">
        {/* Controle de quantidade */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="w-8 h-8 bg-db-border rounded-lg text-white hover:bg-sky-500/20 hover:text-sky-400 transition-all active:scale-95 text-sm font-bold flex items-center justify-center"
            aria-label="Diminuir quantidade"
          >
            −
          </button>
          <span className="text-white font-black w-6 text-center text-sm">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="w-8 h-8 bg-db-border rounded-lg text-white hover:bg-sky-500/20 hover:text-sky-400 transition-all active:scale-95 text-sm font-bold flex items-center justify-center"
            aria-label="Aumentar quantidade"
          >
            +
          </button>
        </div>

        {/* Total do item e remover */}
        <div className="text-right flex-shrink-0 flex sm:flex-col items-center sm:items-end gap-3 sm:gap-0">
          <p className="text-emerald-400 font-black text-sm">
            R$ {(item.price * item.quantity).toFixed(2)}
          </p>
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-500/60 hover:text-red-400 text-xs sm:mt-1 transition-colors active:scale-95"
          >
            Remover
          </button>
        </div>
      </div>
    </div>
  )
}
