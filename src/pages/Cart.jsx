import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { api } from '../lib/api'
import CartItem from '../components/CartItem'

const paymentMethods = [
  { id: 'card', label: '💳 Cartao' },
  { id: 'pix', label: '🏦 PIX' },
  { id: 'boleto', label: '📱 Boleto' },
]

const paymentTitles = {
  pix: 'Pagamento Pix',
  boleto: 'Pagamento Boleto',
  card: 'Pagamento Cartao',
}

export default function Cart() {
  const { cartItems, totalPrice, totalItems, clearCart } = useCart()
  const [nickname, setNickname] = useState(() => localStorage.getItem('@soloz:nickname') || '')
  const [paymentMethod, setPaymentMethod] = useState('pix')
  const [payerEmail, setPayerEmail] = useState(() => localStorage.getItem('@soloz:email') || '')
  const [error, setError] = useState('')
  const [checkoutError, setCheckoutError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [payments, setPayments] = useState([])

  const handleCheckout = async () => {
    if (!nickname.trim()) {
      setError('Insira seu nickname do Minecraft para continuar.')
      return
    }
    if (nickname.trim().length < 3) {
      setError('O nickname deve ter pelo menos 3 caracteres.')
      return
    }
    setError('')
    setCheckoutError('')
    setIsSubmitting(true)

    // Salva o nick e email para a proxima compra
    localStorage.setItem('@soloz:nickname', nickname.trim())
    if (payerEmail.trim()) {
      localStorage.setItem('@soloz:email', payerEmail.trim())
    }

    try {
      const createdPayments = []
      for (const item of cartItems) {
        const totalOrders = Math.max(1, item.quantity)
        for (let i = 0; i < totalOrders; i += 1) {
          const data = await api.createOrder({
            productId: item.id,
            playerNickname: nickname.trim(),
            paymentMethod,
            payerEmail: payerEmail || undefined,
          })

          createdPayments.push({
            item,
            order: data.order,
            payment: data.payment,
          })
        }
      }

      setPayments(createdPayments)
    } catch (err) {
      setCheckoutError(err.message || 'Nao foi possivel iniciar o pagamento.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Tela de pagamento
  if (payments.length > 0) {
    const primaryPayment = payments[0]
    const isFree = primaryPayment.payment?.method === 'free' || primaryPayment.payment?.status === 'approved'

    return (
      <div className="min-h-screen bg-db-dark">
        <div className="border-b border-db-border bg-gradient-to-b from-sky-950/10 to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <p className="text-sky-300/80 text-xs font-gaming font-semibold uppercase tracking-wider mb-1">
              Solo Z
            </p>
            <h1 className="font-gaming text-3xl font-bold text-white">
              {isFree ? 'Sucesso!' : (paymentTitles[paymentMethod] || 'Pagamento')}
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {isFree ? 'Seu item foi resgatado e está sendo entregue.' : 'Escaneie o QR Code para concluir'}
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex justify-center">
          <div className="bg-db-card border border-db-border rounded-2xl p-10 text-center max-w-md w-full">
            <div className="w-20 h-20 bg-sky-500/15 border border-sky-500/30 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
              {isFree ? '✅' : '💠'}
            </div>
            <h2 className="font-gaming text-2xl font-black text-white mb-2">
              {isFree ? 'Resgate concluído' : 'Pagamento em aberto'}
            </h2>
            <p className="text-gray-400 mb-5 text-sm">
              Nick: <span className="text-sky-400 font-bold">{nickname}</span>
            </p>

            {!isFree && primaryPayment.payment?.qrCodeBase64 && (
              <img
                src={`data:image/png;base64,${primaryPayment.payment.qrCodeBase64}`}
                alt="QR Code Pix"
                className="w-48 h-48 mx-auto mb-4 rounded-xl border border-db-border bg-white p-2"
              />
            )}

            {!isFree && primaryPayment.payment?.ticketUrl && (
              <a
                href={primaryPayment.payment.ticketUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-sky-500 text-black font-black text-base px-6 py-3 rounded-xl hover:bg-sky-400 transition-all w-full"
              >
                Abrir boleto / comprovante
              </a>
            )}

            {!isFree && primaryPayment.payment?.checkoutUrl && (
              <a
                href={primaryPayment.payment.checkoutUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-sky-500 text-black font-black text-base px-6 py-3 rounded-xl hover:bg-sky-400 transition-all w-full"
              >
                Ir para checkout do cartao
              </a>
            )}

            <div className="text-left mt-6">
              <p className="text-xs text-gray-500 mb-2">Pedidos criados:</p>
              <div className="space-y-2">
                {payments.map((entry) => (
                  <div key={entry.order.id} className="flex items-center justify-between text-xs text-gray-400">
                    <span className="truncate mr-2">{entry.item.name}</span>
                    <span className="text-gray-500">{isFree ? 'Grátis' : entry.payment?.method} · {entry.payment?.status}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Link
                to="/"
                className="flex-1 py-3 border border-db-border text-gray-400 rounded-xl hover:border-gray-500 hover:text-gray-300 transition-all text-sm font-semibold"
              >
                Início
              </Link>
              <Link
                to="/shop"
                className="flex-1 py-3 bg-gradient-to-r from-sky-500 to-cyan-500 text-black font-black rounded-xl hover:from-sky-400 hover:to-cyan-400 transition-all text-sm"
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
        <div className="border-b border-db-border bg-gradient-to-b from-sky-950/10 to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <p className="text-sky-300/80 text-xs font-gaming font-semibold uppercase tracking-wider mb-1">
              Solo Z
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
            className="inline-block bg-gradient-to-r from-sky-500 to-cyan-500 text-black font-black px-8 py-3 rounded-xl hover:from-sky-400 hover:to-cyan-400 transition-all"
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
      <div className="border-b border-db-border bg-gradient-to-b from-sky-950/10 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <p className="text-sky-300/80 text-xs font-gaming font-semibold uppercase tracking-wider mb-1">
            Solo Z
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
                  error ? 'border-red-500/50 focus:border-red-500/70' : 'border-db-border focus:border-sky-500/40'
                }`}
              />
              {error && (
                <p className="text-red-400 text-xs mt-1.5">⚠️ {error}</p>
              )}
              <input
                type="email"
                placeholder="Seu email (opcional)"
                value={payerEmail}
                onChange={(e) => setPayerEmail(e.target.value)}
                className="mt-2 w-full bg-db-dark border border-db-border rounded-xl px-3 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-sky-500/40 transition-colors"
              />
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
                  <span className="font-gaming text-2xl font-black text-sky-400">
                    {totalPrice === 0 ? 'Grátis' : `R$ ${totalPrice.toFixed(2)}`}
                  </span>
                </div>
              </div>

              {/* Métodos de pagamento */}
              {totalPrice > 0 && (
                <div className="flex gap-2 mb-4">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      type="button"
                      className={`flex-1 text-center text-xs border rounded-lg py-1.5 transition-colors ${
                        paymentMethod === method.id
                          ? 'bg-sky-500/20 border-sky-500/40 text-sky-300'
                          : 'bg-db-dark border-db-border text-gray-500 hover:text-gray-300'
                      }`}
                    >
                      {method.label}
                    </button>
                  ))}
                </div>
              )}

              <button
                onClick={handleCheckout}
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-sky-500 to-cyan-500 text-black font-black rounded-xl hover:from-sky-400 hover:to-cyan-400 transition-all hover:shadow-xl hover:shadow-sky-500/25 hover:-translate-y-0.5 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting 
                  ? (totalPrice === 0 ? 'Resgatando...' : 'Gerando pagamento...') 
                  : (totalPrice === 0 ? 'Resgatar Agora' : 'Finalizar Compra')}
              </button>
              {checkoutError && (
                <p className="text-red-400 text-xs text-center mt-2">⚠️ {checkoutError}</p>
              )}
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
