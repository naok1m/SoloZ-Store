import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import logo from '../assets/Logo.png'

export default function Navbar() {
  const { totalItems } = useCart()
  const { isAuthenticated } = useAuth()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { to: '/', label: 'Início' },
    { to: '/shop', label: 'Loja' },
    { to: '/cart', label: 'Carrinho' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-db-dark/95 backdrop-blur-sm border-b border-db-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2 md:grid md:grid-cols-3 md:gap-4">

          {/* Desktop Nav (left) */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-lg font-rajdhani font-semibold text-sm transition-all ${
                  isActive(link.to)
                    ? 'text-sky-300 bg-sky-500/10'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Logo (center) */}
          <Link to="/" className="group flex items-center justify-start md:justify-center min-w-0">
            <img
              src={logo}
              alt="Logo da Solo Z"
              className="w-20 h-20 sm:w-24 sm:h-24 -my-4 object-contain drop-shadow-[0_0_18px_rgba(56,189,248,0.35)] transition-transform transition-shadow duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_26px_rgba(56,189,248,0.55)]"
            />
          </Link>

          {/* Carrinho + Admin (right) */}
          <div className="hidden md:flex items-center justify-end gap-2">
            <Link
              to="/cart"
              className="relative flex items-center gap-1.5 border border-db-border px-3 py-1.5 rounded-lg text-gray-300 hover:text-white hover:border-gray-500 transition-colors text-sm font-semibold"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-16H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="hidden sm:block">Carrinho</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-sky-400 text-black text-xs w-5 h-5 rounded-full flex items-center justify-center font-black">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </Link>

            {isAuthenticated && (
              <Link
                to="/admin/dashboard"
                className="hidden sm:block text-xs text-emerald-400 hover:text-emerald-300 border border-emerald-400/20 bg-emerald-400/10 px-2 py-1 rounded transition-colors"
              >
                Painel Admin
              </Link>
            )}
          </div>

          {/* Mobile: Carrinho + Hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <Link
              to="/cart"
              className="relative flex items-center gap-1.5 border border-db-border px-3 py-1.5 rounded-lg text-gray-300 hover:text-white hover:border-gray-500 transition-colors text-sm font-semibold"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-16H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-sky-400 text-black text-xs w-5 h-5 rounded-full flex items-center justify-center font-black">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </Link>

            <button
              className="p-2 text-gray-400 hover:text-white transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Abrir menu"
            >
              <div className="space-y-1">
                <span className={`block w-5 h-0.5 bg-current transition-all ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                <span className={`block w-5 h-0.5 bg-current transition-all ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`block w-5 h-0.5 bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-db-border py-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`block px-4 py-2.5 font-rajdhani font-semibold text-sm transition-colors ${
                  isActive(link.to) ? 'text-sky-300' : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated && (
              <Link
                to="/admin/dashboard"
                className="block px-4 py-2.5 text-emerald-400 hover:text-emerald-300 font-semibold text-sm transition-colors bg-emerald-400/5 mt-1"
                onClick={() => setMenuOpen(false)}
              >
                Painel Admin
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
