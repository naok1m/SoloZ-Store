import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { categories } from '../data/products'
import { useProducts } from '../context/ProductsContext'
import ProductCard from '../components/ProductCard'
import CategoryCard from '../components/CategoryCard'
import heroBg from '../assets/hero-back.jpg'
import logo from '../assets/Logo.png'

const KI_ORBS = [
  { w: 14, h: 14, top: '18%', left: '8%',  delay: '0s',   dur: '6.5s' },
  { w: 8,  h: 8,  top: '65%', left: '6%',  delay: '1.2s', dur: '8s'   },
  { w: 18, h: 18, top: '28%', right: '9%', delay: '2.1s', dur: '7.2s' },
  { w: 10, h: 10, top: '72%', right: '14%',delay: '0.7s', dur: '9.4s' },
  { w: 12, h: 12, top: '12%', right: '30%',delay: '3s',   dur: '5.8s' },
  { w: 6,  h: 6,  top: '82%', left: '28%', delay: '1.8s', dur: '10s'  },
  { w: 10, h: 10, top: '45%', left: '3%',  delay: '0.4s', dur: '7.8s' },
  { w: 7,  h: 7,  top: '55%', right: '4%', delay: '2.5s', dur: '6.2s' },
]


export default function Home() {
  const { products, loading } = useProducts()
  const [ipCopied, setIpCopied] = useState(false)
  const logoCardRef = useRef(null)
  const [logoTilt, setLogoTilt] = useState({ x: 0, y: 0, active: false })
  const popularProducts = products.filter((p) => p.popular).slice(0, 4)

  const copyIp = () => {
    navigator.clipboard.writeText('soloz.jogar.co')
    setIpCopied(true)
    setTimeout(() => setIpCopied(false), 2500)
  }

  const handleLogoMove = (e) => {
    if (!logoCardRef.current) return
    const rect = logoCardRef.current.getBoundingClientRect()
    const rotateX = -((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * 10
    const rotateY = ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 10
    setLogoTilt({ x: rotateX, y: rotateY, active: true })
  }

  const handleLogoLeave = () => setLogoTilt({ x: 0, y: 0, active: false })

  return (
    <div className="min-h-screen bg-[#0a0a14] relative overflow-hidden">
      
      {/* Efeitos de Fundo Global */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grade Sutil */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px]" 
          style={{ WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)', maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)' }}
        />
        {/* Luzes de Aura (Ki) pelo cenário */}
        <div className="absolute top-[600px] left-[-15%] w-[40vw] h-[600px] bg-sky-600/10 blur-[150px] rounded-full mix-blend-screen" />
        <div className="absolute top-[900px] right-[-10%] w-[35vw] h-[500px] bg-cyan-700/10 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[20%] w-[50vw] h-[400px] bg-indigo-600/10 blur-[140px] rounded-full mix-blend-screen" />
      </div>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden isolate min-h-[540px]">

        {/* BG layers */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            src={heroBg}
            alt=""
            aria-hidden="true"
            className="hero-bg-asset absolute inset-0 w-full h-full object-cover object-center opacity-100 scale-100"
          />
          {/* Glow central */}
          <div className="hero-glow-drift absolute left-1/2 top-[47%] -translate-x-1/2 -translate-y-1/2 w-[min(72vw,44rem)] h-[min(72vw,44rem)] rounded-full bg-sky-500/20 blur-[90px]" />
          {/* Second glow — mais frio */}
          <div className="hero-glow-drift absolute left-1/2 top-[40%] -translate-x-1/2 w-[min(40vw,22rem)] h-[min(40vw,22rem)] rounded-full bg-cyan-500/12 blur-[70px]" style={{ animationDelay: '1.3s' }} />
          <div className="hero-sweep absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(56,189,248,0.2),transparent_58%)]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060613]/85 via-[#060613]/30 to-[#060613]/85" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#060613]/70 via-[#060613]/08 to-[#060613]/85" />
        </div>

        {/* Ki Orbs flutuantes */}
        {KI_ORBS.map((orb, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-sky-400 blur-[6px] pointer-events-none ki-orb"
            style={{
              width: orb.w,
              height: orb.h,
              top: orb.top,
              left: orb.left,
              right: orb.right,
              animationDelay: orb.delay,
              animationDuration: orb.dur,
            }}
          />
        ))}

        {/* Conteúdo */}
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
            {/* Texto principal */}
            <div className="text-center lg:text-left">
              <p className="inline-flex items-center gap-2 text-sky-300/80 text-xs font-gaming font-semibold uppercase tracking-widest mb-3 bg-sky-500/10 border border-sky-500/20 px-3 py-1.5 rounded-full">
                Loja oficial Solo Z
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              </p>

              <h1
                className="font-gaming text-5xl sm:text-6xl font-black mb-4 leading-tight max-w-[14ch] mx-auto lg:mx-0 text-white animate-fade-in-up"
                style={{
                  textShadow: '0 0 22px rgba(56,189,248,0.35)',
                  animationDelay: '80ms',
                }}
              >
                Poder instantâneo no servidor
              </h1>

              <p
                className="text-gray-300/85 text-lg max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed animate-fade-in-up"
                style={{ animationDelay: '180ms' }}
              >
                Pacotes diretos, entrega rápida e benefícios claros. Escolha seu upgrade e comece forte desde o primeiro login.
              </p>

              {/* Botões */}
              <div
                className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3 mb-7 animate-fade-in-up"
                style={{ animationDelay: '280ms' }}
              >
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 bg-sky-500 text-black font-black text-base px-8 py-3.5 rounded-xl hover:bg-sky-400 hover:-translate-y-1 hover:shadow-[0_0_32px_rgba(56,189,248,0.6)] transition-all w-full sm:w-auto justify-center"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Acessar Loja
                </Link>
              </div>

              {/* Online indicator */}
              <p
                className="flex items-center justify-center lg:justify-start gap-2 text-gray-400 text-sm animate-fade-in-up"
                style={{ animationDelay: '380ms' }}
              >
                <span className="font-mono text-sky-400 font-semibold">soloz.jogar.co</span>
                <span className="text-gray-600">·</span>
                <span className="w-2 h-2 bg-green-400 rounded-full shadow-[0_0_8px_rgba(74,222,128,0.9)]" />
                <span>Online agora</span>
              </p>
            </div>

            {/* Logo 3D + ações */}
            <div className="flex flex-col items-center gap-5">
              <div
                ref={logoCardRef}
                onMouseMove={handleLogoMove}
                onMouseLeave={handleLogoLeave}
                style={{
                  transform: `perspective(900px) rotateX(${logoTilt.x}deg) rotateY(${logoTilt.y}deg) ${logoTilt.active ? 'scale(1.03)' : 'scale(1)'}`,
                  transition: logoTilt.active ? 'transform 0.08s ease' : 'transform 0.45s ease',
                }}
                className="flex items-center justify-center"
              >
                <img
                  src={logo}
                  alt="Logo da Solo Z"
                  className="w-60 h-60 sm:w-64 sm:h-64 object-contain drop-shadow-[0_0_36px_rgba(56,189,248,0.55)]"
                />
              </div>

              <div className="w-full max-w-sm grid grid-cols-1 gap-3">
                <a
                  href="/modpack.zip"
                  className="inline-flex items-center justify-center gap-2 bg-sky-500 text-black font-black text-base px-6 py-3 rounded-xl hover:bg-sky-400 hover:-translate-y-0.5 transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 3v12m0 0l-4-4m4 4l4-4M4 17h16" />
                  </svg>
                  Baixar Modpack
                </a>
                <button
                  onClick={copyIp}
                  className="inline-flex items-center justify-center gap-2 border border-white/20 bg-white/5 text-gray-100 font-semibold text-base px-6 py-3 rounded-xl hover:border-sky-400/45 hover:bg-sky-500/8 transition-all backdrop-blur-sm"
                >
                  {ipCopied ? (
                    <>
                      <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-green-400">IP Copiado!</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copiar IP
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Divisor curvo */}
        <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none" aria-hidden="true">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-full block">
            <path
              d="M0,96 C240,132 480,132 720,106 C960,82 1200,54 1440,76 L1440,120 L0,120 Z"
              fill="#0a0a14"
            />
          </svg>
        </div>
      </section>



      {/* ── Categorias ───────────────────────────────────────── */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-14 z-10">
        <div className="flex items-end justify-between mb-7">
          <div>
            <p className="text-sky-400/70 text-xs font-gaming font-semibold uppercase tracking-widest mb-1">
              Explore
            </p>
            <h2 className="font-gaming text-2xl font-bold text-white">Categorias</h2>
          </div>
          <Link to="/shop" className="text-sky-400 text-sm hover:text-sky-300 transition-colors hidden sm:inline-flex items-center gap-1">
            Ver tudo
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>



      {/* ── Produtos populares ───────────────────────────────── */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 z-10">
        {/* Glow sutil atrás dos cards */}
        <div className="absolute inset-x-0 top-[-60px] h-[320px] bg-gradient-to-b from-sky-500/4 to-transparent pointer-events-none" />
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-sky-400/70 text-xs font-gaming font-semibold uppercase tracking-widest mb-1">
              Destaques
            </p>
            <h2 className="font-gaming text-2xl font-black text-white">Mais Populares</h2>
          </div>
          <Link to="/shop" className="text-sky-400 text-sm hover:text-sky-300 transition-colors hidden sm:inline-flex items-center gap-1">
            Ver todos
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading && (
            <p className="text-gray-500 text-sm">Carregando produtos...</p>
          )}
          {!loading && popularProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-db-card border border-db-border text-gray-400 font-semibold px-6 py-3 rounded-xl hover:border-sky-500/35 hover:text-sky-400 hover:bg-sky-500/5 transition-all text-sm"
          >
            Ver todos os produtos
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ── CTA Discord ──────────────────────────────────────── */}
      <section id="discord" className="border-y border-indigo-500/15 bg-indigo-950/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-indigo-400 shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.04.033.05a19.91 19.91 0 0 0 5.993 3.03.072.072 0 0 0 .079-.025c.462-.63.874-1.295 1.226-1.994a.072.072 0 0 0-.041-.1 13.107 13.107 0 0 1-1.872-.892.073.073 0 0 1-.007-.122c.126-.094.252-.192.372-.292a.07.07 0 0 1 .073-.01c3.928 1.793 8.18 1.793 12.062 0a.07.07 0 0 1 .074.01c.12.1.246.198.373.292a.073.073 0 0 1-.006.122 12.3 12.3 0 0 1-1.873.892.072.072 0 0 0-.041.1c.36.698.772 1.362 1.225 1.993a.072.072 0 0 0 .079.026 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 0 0-.031-.028z" />
            </svg>
            <div>
              <span className="text-white font-semibold text-sm">Junte-se à comunidade</span>
              <span className="text-gray-500 text-xs ml-2">Suporte 24h · eventos · sorteios</span>
            </div>
          </div>
          <a
            href="https://discord.gg/XBWfBE8jMR"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white font-bold px-5 py-2 rounded-lg hover:bg-indigo-500 hover:shadow-[0_4px_18px_rgba(99,102,241,0.45)] transition-all text-sm whitespace-nowrap shrink-0"
          >
            Entrar no Discord
          </a>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="border-t border-db-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-600 text-xs">
          <span className="font-gaming font-bold text-gray-500">Solo Z</span>
          <p>© 2026 — Protótipo Visual. Não é uma loja real.</p>
          <div className="flex gap-4">
            <Link to="/shop" className="hover:text-gray-400 transition-colors">Loja</Link>
            <Link to="/cart" className="hover:text-gray-400 transition-colors">Carrinho</Link>
            <Link to="/admin/login" className="hover:text-gray-400 transition-colors">Admin</Link>
          </div>
        </div>
      </footer>

    </div>
  )
}

