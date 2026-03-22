import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import logo from '../assets/Logo.png'

const menuItems = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: 'dashboard' },
  { to: '/admin/products', label: 'Produtos', icon: 'products' },
  { to: '/admin/orders', label: 'Pedidos', icon: 'orders' },
  { to: '/admin/categories', label: 'Categorias', icon: 'categories' },
  { to: '/admin/settings', label: 'Configurações', icon: 'settings' },
]

function MenuIcon({ type }) {
  if (type === 'dashboard') {
    return (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 13h6V4H4v9zm0 7h6v-5H4v5zm10 0h6V11h-6v9zm0-18v7h6V2h-6z" />
      </svg>
    )
  }
  if (type === 'products') {
    return (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
      </svg>
    )
  }
  if (type === 'orders') {
    return (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a3 3 0 006 0M9 5a3 3 0 016 0" />
      </svg>
    )
  }
  if (type === 'categories') {
    return (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 7h.01M7 3h5l8 8-9 9-8-8V3h4z" />
      </svg>
    )
  }
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10.325 4.317a1 1 0 011.35-.936l1.065.426a1 1 0 00.74 0l1.065-.426a1 1 0 011.35.936l.07 1.124a1 1 0 00.53.82l.96.533a1 1 0 01.39 1.39l-.52.95a1 1 0 000 .96l.52.95a1 1 0 01-.39 1.39l-.96.533a1 1 0 00-.53.82l-.07 1.124a1 1 0 01-1.35.936l-1.065-.426a1 1 0 00-.74 0l-1.065.426a1 1 0 01-1.35-.936l-.07-1.124a1 1 0 00-.53-.82l-.96-.533a1 1 0 01-.39-1.39l.52-.95a1 1 0 000-.96l-.52-.95a1 1 0 01.39-1.39l.96-.533a1 1 0 00.53-.82l.07-1.124z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 12a3 3 0 100-6 3 3 0 000 6z" />
    </svg>
  )
}

export default function AdminSidebar({ onClose }) {
  const { logout } = useAuth()
  const location = useLocation()

  return (
    <aside className="w-64 bg-db-card border-r border-db-border h-full min-h-screen flex flex-col flex-shrink-0">

      {/* Logo do painel */}
      <div className="p-6 border-b border-db-border flex items-center justify-between">
        <div className="flex-1">
          <Link to="/" className="flex items-center gap-2" onClick={onClose}>
            <img
              src={logo}
              alt="Logo da Solo Z"
              className="w-7 h-7 rounded object-contain"
            />
            <span className="font-gaming text-sm font-black text-white">Solo Z</span>
          </Link>
          <p className="text-gray-600 text-xs mt-1">Painel Administrativo</p>
        </div>
        <button onClick={onClose} className="md:hidden text-gray-500 hover:text-white">
           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      {/* Itens de navegação */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const active = location.pathname === item.to
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-rajdhani font-semibold text-sm transition-all active:scale-95 ${
                active
                  ? 'bg-gradient-to-r from-sky-500/20 to-cyan-500/20 text-sky-300 border border-sky-500/30'
                  : 'text-gray-500 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="text-base"><MenuIcon type={item.icon} /></span>
              {item.label}
              {active && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-sky-400" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Rodapé da sidebar */}
      <div className="p-4 border-t border-db-border">
        <button
          onClick={() => { logout(); if (onClose) onClose(); }}
          className="w-full flex items-center gap-2 text-red-400/80 hover:text-red-300 text-sm transition-colors mb-3 active:scale-95 origin-left"
        >
          <span>⏻</span>
          Sair do admin
        </button>
        <Link
          to="/"
          onClick={onClose}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-400 text-sm transition-colors active:scale-95 origin-left"
        >
          <span>←</span>
          Voltar à loja
        </Link>
      </div>
    </aside>
  )
}
