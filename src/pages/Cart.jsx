import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import CartItem from '../components/CartItem'

// Métodos de pagamento decorativos (apenas visual)
const paymentMethods = ['💳 Cartão', '🏦 PIX', '📱 Boleto']

export default function Cart() {
  const { cartItems, totalPrice, totalItems, clearCart } = useCart()
  const [nickname, setNickname] = useState('')
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [error, setError] = useState('')

  const handleCheckout = () => {
    if (!nickname.trim()) {
      setError('Insira seu nickname do Minecraft para continuar.')
      return
    }
    if (nickname.trim().length < 3) {
      setError('O nickname deve ter pelo menos 3 caracteres.')
      return
    }
    setError('')
    setOrderPlaced(true)
  }

  // Tela de sucesso pós-compra
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-db-dark">
        <div className="border-b border-db-border bg-gradient-to-b from-yellow-950/10 to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <p className="text-amber-300/80 text-xs font-gaming font-semibold uppercase tracking-wider mb-1">
              DragonBlock Store
            </p>
            <h1 className="font-gaming text-3xl font-bold text-white">Pedido</h1>
            <p className="text-gray-500 text-sm mt-1">Compra finalizada com sucesso</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex justify-center">
          <div className="bg-db-card border border-db-border rounded-2xl p-10 text-center max-w-md w-full">
          <div className="w-20 h-20 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
            🎉
          </div>
          <h2 className="font-gaming text-2xl font-black text-white mb-2">
            Pedido Realizado!
          </h2>
          <p className="text-gray-400 mb-1 text-sm">
            Obrigado,{' '}
            <span className="text-yellow-400 font-bold">{nickname}</span>!
          </p>
          <p className="text-gray-600 text-xs mb-8 leading-relaxed">
            Este é apenas um protótipo visual. Em produção, o pagamento seria
            processado e os itens entregues automaticamente no servidor.
          </p>
          <div className="flex gap-3">
            <Link
              to="/"
              onClick={clearCart}
              className="flex-1 py-3 border border-db-border text-gray-400 rounded-xl hover:border-gray-500 hover:text-gray-300 transition-all text-sm font-semibold"
            >
              Início
            </Link>
            <Link
              to="/shop"
              onClick={clearCart}
              className="flex-1 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-black rounded-xl hover:from-yellow-400 hover:to-orange-400 transition-all text-sm"
            >
              Continuar Comprando
            </Link>
          </div>
          </div>
        </div>
      </div>
    )
  }

  // Carrinho vazio
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-db-dark">
        <div className="border-b border-db-border bg-gradient-to-b from-yellow-950/10 to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <p className="text-amber-300/80 text-xs font-gaming font-semibold uppercase tracking-wider mb-1">
              DragonBlock Store
            </p>
            <h1 className="font-gaming text-3xl font-bold text-white">Carrinho</h1>
            <p className="text-gray-500 text-sm mt-1">Nenhum item no momento</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex justify-center">
          <div className="text-center">
          <div className="w-24 h-24 bg-db-card border border-db-border rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
            🛒
          </div>
          <h2 className="font-gaming text-xl text-white mb-2">
            Seu carrinho está vazio
          </h2>
          <p className="text-gray-500 text-sm mb-8">
            Adicione produtos da loja para continuar
          </p>
          <Link
            to="/shop"
            className="inline-block bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-black px-8 py-3 rounded-xl hover:from-yellow-400 hover:to-orange-400 transition-all"
          >
            Ir para a Loja
          </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-db-dark">

      {/* Cabeçalho */}
      <div className="border-b border-db-border bg-gradient-to-b from-yellow-950/10 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <p className="text-amber-300/80 text-xs font-gaming font-semibold uppercase tracking-wider mb-1">
            DragonBlock Store
          </p>
          <h1 className="font-gaming text-3xl font-bold text-white">Carrinho</h1>
          <p className="text-gray-500 text-sm mt-1">
            {totalItems} item{totalItems !== 1 ? 'ns' : ''} no carrinho
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Lista de itens */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-gaming text-base font-bold text-white">Itens</h2>
              <button
                onClick={clearCart}
                className="text-xs text-red-500/60 hover:text-red-400 transition-colors"
              >
                Limpar carrinho
              </button>
            </div>
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Painel lateral */}
          <div className="space-y-4">

            {/* Nickname do Minecraft */}
            <div className="bg-db-card border border-db-border rounded-xl p-5">
              <h3 className="font-gaming text-sm font-bold text-white mb-3">
                🎮 Nickname no Minecraft
              </h3>
              <input
                type="text"
                placeholder="Seu nickname exato no servidor"
                value={nickname}
                onChange={(e) => {
                  setNickname(e.target.value)
                  if (error) setError('')
                }}
                className={`w-full bg-db-dark border rounded-xl px-3 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none transition-colors ${
                  error ? 'border-red-500/50 focus:border-red-500/70' : 'border-db-border focus:border-yellow-500/40'
                }`}
              />
              {error && (
                <p className="text-red-400 text-xs mt-1.5">⚠️ {error}</p>
              )}
              <p className="text-gray-600 text-xs mt-2">
                Use exatamente como aparece no jogo
              </p>
            </div>

            {/* Resumo do pedido */}
            <div className="bg-db-card border border-db-border rounded-xl p-5">
              <h3 className="font-gaming text-sm font-bold text-white mb-4">
                Resumo do Pedido
              </h3>

              <div className="space-y-2 mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-xs">
                    <span className="text-gray-500 truncate mr-2">
                      {item.name}
                      <span className="text-gray-600"> ×{item.quantity}</span>
                    </span>
                    <span className="text-gray-400 flex-shrink-0">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-db-border pt-3 mb-5">
                <div className="flex justify-between items-baseline">
                  <span className="text-gray-400 font-semibold text-sm">Total</span>
                  <span className="font-gaming text-2xl font-black text-yellow-400">
                    R$ {totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Métodos de pagamento (visual) */}
              <div className="flex gap-2 mb-4">
                {paymentMethods.map((method) => (
                  <span
                    key={method}
                    className="flex-1 text-center text-xs bg-db-dark border border-db-border rounded-lg py-1.5 text-gray-500"
                  >
                    {method}
                  </span>
                ))}
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-black rounded-xl hover:from-yellow-400 hover:to-orange-400 transition-all hover:shadow-xl hover:shadow-orange-500/25 hover:-translate-y-0.5 text-sm"
              >
                Finalizar Compra
              </button>
              <p className="text-gray-600 text-xs text-center mt-2 flex items-center justify-center gap-1">
                🔒 Ambiente seguro
              </p>
            </div>

            <Link
              to="/shop"
              className="block text-center text-xs text-gray-600 hover:text-gray-400 transition-colors py-2"
            >
              ← Continuar comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
