import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    // Simula autenticação (protótipo visual — qualquer credencial é aceita)
    setTimeout(() => {
      setLoading(false)
      navigate('/admin/dashboard')
    }, 1200)
  }

  return (
    <div className="min-h-screen bg-db-dark flex items-center justify-center p-4">
      {/* Fundo decorativo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl mb-4 shadow-lg shadow-orange-500/20">
            <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
            </svg>
          </div>
          <h1 className="font-gaming text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
            DragonBlock Store
          </h1>
          <p className="text-gray-600 text-sm mt-1">Painel Administrativo</p>
        </div>

        {/* Card de login */}
        <div className="bg-db-card border border-db-border rounded-2xl p-8 shadow-2xl">
          <h2 className="font-gaming text-base font-bold text-white mb-6">
            Acesso ao Painel
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-500 text-xs font-semibold mb-1.5 uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@dragonblock.com"
                required
                className="w-full bg-db-dark border border-db-border rounded-xl px-4 py-3 text-white text-sm placeholder-gray-700 focus:outline-none focus:border-yellow-500/40 transition-colors"
              />
            </div>

            <div>
              <label className="block text-gray-500 text-xs font-semibold mb-1.5 uppercase tracking-wider">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-db-dark border border-db-border rounded-xl px-4 py-3 text-white text-sm placeholder-gray-700 focus:outline-none focus:border-yellow-500/40 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-black rounded-xl hover:from-yellow-400 hover:to-orange-400 transition-all hover:shadow-lg hover:shadow-orange-500/25 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Entrando...
                </span>
              ) : (
                'Entrar'
              )}
            </button>
          </form>

          <div className="mt-5 p-3 bg-yellow-500/5 border border-yellow-500/10 rounded-xl">
            <p className="text-yellow-600/70 text-xs text-center">
              Protótipo visual: qualquer credencial será aceita.
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-gray-600 hover:text-gray-400 text-sm transition-colors"
          >
            ← Voltar à loja
          </Link>
        </div>
      </div>
    </div>
  )
}
