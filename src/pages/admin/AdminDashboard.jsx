import { useEffect, useMemo, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import AdminSidebar from '../../components/AdminSidebar'
import AdminTable from '../../components/AdminTable'
import { useAuth } from '../../context/AuthContext'
import { api } from '../../lib/api'

const categoryLabels = {
  transformacoes: 'Transformacoes',
  vip: 'VIP',
  moedas: 'Moedas Zeni',
  kits: 'Kits',
  outros: 'Outros',
}

const categoryColors = {
  transformacoes: 'from-sky-500 to-cyan-500',
  vip: 'from-purple-500 to-pink-500',
  moedas: 'from-sky-400 to-cyan-600',
  kits: 'from-green-500 to-teal-500',
  outros: 'from-slate-500 to-slate-300',
}

function Icon({ type, className = 'w-4 h-4' }) {
  if (type === 'products') {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
      </svg>
    )
  }
  if (type === 'orders') {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a3 3 0 006 0M9 5a3 3 0 016 0" />
      </svg>
    )
  }
  if (type === 'money') {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.7 0-3 .9-3 2s1.3 2 3 2 3 .9 3 2-1.3 2-3 2m0-8V7m0 9v1m9-5a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  }
  if (type === 'users') {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a4 4 0 00-5-3.87M9 20H4v-2a4 4 0 015-3.87m8-5a4 4 0 11-8 0 4 4 0 018 0zm-10 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )
  }
  if (type === 'categories') {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 7h.01M7 3h5l8 8-9 9-8-8V3h4z" />
      </svg>
    )
  }
  if (type === 'settings') {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10.325 4.317a1 1 0 011.35-.936l1.065.426a1 1 0 00.74 0l1.065-.426a1 1 0 011.35.936l.07 1.124a1 1 0 00.53.82l.96.533a1 1 0 01.39 1.39l-.52.95a1 1 0 000 .96l.52.95a1 1 0 01-.39 1.39l-.96.533a1 1 0 00-.53.82l-.07 1.124a1 1 0 01-1.35.936l-1.065-.426a1 1 0 00-.74 0l-1.065.426a1 1 0 01-1.35-.936l-.07-1.124a1 1 0 00-.53-.82l-.96-.533a1 1 0 01-.39-1.39l.52-.95a1 1 0 000-.96l-.52-.95a1 1 0 01.39-1.39l.96-.533a1 1 0 00.53-.82l.07-1.124z" />
      </svg>
    )
  }
  return <span className={className}>•</span>
}

const timeAgo = (isoDate) => {
  const created = new Date(isoDate).getTime()
  const diffMs = Math.max(0, Date.now() - created)
  const min = Math.floor(diffMs / 60000)
  if (min < 1) return 'agora'
  if (min < 60) return `ha ${min} min`
  const hours = Math.floor(min / 60)
  if (hours < 24) return `ha ${hours}h`
  const days = Math.floor(hours / 24)
  return `ha ${days}d`
}

function PlaceholderPage({ title, icon }) {
  return (
    <div className="flex-1 flex items-center justify-center animate-fade-in-up">
      <div className="text-center">
        <span className="w-12 h-12 mb-4 mx-auto text-gray-500 flex items-center justify-center rounded-xl border border-db-border bg-db-card">
          <Icon type={icon} className="w-6 h-6" />
        </span>
        <h2 className="font-gaming text-xl font-bold text-white mb-2">{title}</h2>
        <p className="text-gray-600 text-sm">Esta seção sera implementada na versao completa.</p>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const { token } = useAuth()
  const location = useLocation()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [data, setData] = useState({
    stats: {
      activeProducts: 0,
      ordersToday: 0,
      revenueTotal: 0,
      uniquePlayers: 0,
    },
    topProducts: [],
    salesByCategory: [],
    recentOrders: [],
  })

  const loadDashboard = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await api.getAdminDashboard(token)
      setData(response)
    } catch (err) {
      setError(err.message || 'Falha ao carregar dados do dashboard.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!token) return
    loadDashboard()
  }, [token])

  const dashboardStats = useMemo(
    () => [
      {
        label: 'Produtos Ativos',
        value: String(data.stats.activeProducts),
        icon: 'products',
        trend: 'dados reais',
      },
      {
        label: 'Pedidos Hoje',
        value: String(data.stats.ordersToday),
        icon: 'orders',
        trend: 'atualizado agora',
      },
      {
        label: 'Receita Total',
        value: `R$ ${Number(data.stats.revenueTotal || 0).toFixed(2)}`,
        icon: 'money',
        trend: 'pedidos pagos',
      },
      {
        label: 'Jogadores Unicos',
        value: String(data.stats.uniquePlayers),
        icon: 'users',
        trend: 'base total',
      },
    ],
    [data]
  )

  const [sidebarOpen, setSidebarOpen] = useState(false)

  const renderContent = () => {
    switch (location.pathname) {
      case '/admin/products':
        return (
          <div className="flex-1 p-4 sm:p-8 overflow-auto animate-fade-in">
            <AdminTable />
          </div>
        )
      case '/admin/orders':
        return <PlaceholderPage title="Pedidos" icon="orders" />
      case '/admin/categories':
        return <PlaceholderPage title="Categorias" icon="categories" />
      case '/admin/settings':
        return <PlaceholderPage title="Configuracoes" icon="settings" />
      default:
        return (
          <DashboardContent
            loading={loading}
            error={error}
            dashboardStats={dashboardStats}
            topProducts={data.topProducts}
            salesByCategory={data.salesByCategory}
            recentOrders={data.recentOrders}
          />
        )
    }
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-db-dark">
      {/* Mobile Topbar */}
      <div className="md:hidden flex items-center justify-between bg-db-card border-b border-db-border p-4">
        <h1 className="font-gaming font-black text-white">Painel Admin</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 p-1">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Sidebar Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 md:hidden animate-fade-in" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar Content */}
      <div className={`fixed inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out z-50 md:z-0`}>
        <AdminSidebar onClose={() => setSidebarOpen(false)} />
      </div>

      <div className="flex-1 overflow-auto bg-db-dark">
        {renderContent()}
      </div>
    </div>
  )
}

function DashboardContent({ loading, error, dashboardStats, topProducts, salesByCategory, recentOrders }) {
  return (
    <div className="flex-1 p-4 sm:p-8 overflow-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="font-gaming text-2xl font-black text-white">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Bem-vindo ao painel administrativo</p>
      </div>

      {error && <p className="text-red-400 text-xs mb-5">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {dashboardStats.map((stat) => (
          <div key={stat.label} className="bg-db-card border border-db-border rounded-xl p-5 hover:border-sky-500/20 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <span className="text-gray-300"><Icon type={stat.icon} className="w-6 h-6" /></span>
              <span className="text-xs text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-lg">{stat.trend}</span>
            </div>
            <p className="font-gaming text-2xl font-black text-white mb-0.5">{loading ? '...' : stat.value}</p>
            <p className="text-gray-600 text-xs">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
        <div className="bg-db-card border border-db-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-gaming text-sm font-bold text-white">Top Produtos</h2>
            <Link to="/admin/products" className="text-sky-500/70 text-xs hover:text-sky-400 transition-colors">Ver todos →</Link>
          </div>
          <div className="space-y-3">
            {!loading && topProducts.length === 0 && <p className="text-gray-500 text-xs">Sem dados ainda.</p>}
            {topProducts.map((product) => (
              <div key={product.id} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-db-dark border border-db-border rounded-lg flex items-center justify-center flex-shrink-0 text-gray-300">
                  <span>📦</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-xs font-semibold truncate">{product.name}</p>
                  <p className="text-gray-600 text-xs">{categoryLabels[product.category] || 'Sem categoria'}</p>
                </div>
                <span className="text-sky-400 font-black text-xs flex-shrink-0">R$ {Number(product.price).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-db-card border border-db-border rounded-xl p-5">
          <h2 className="font-gaming text-sm font-bold text-white mb-4">Vendas por Categoria</h2>
          <div className="space-y-3">
            {!loading && salesByCategory.length === 0 && <p className="text-gray-500 text-xs">Sem vendas pagas ainda.</p>}
            {salesByCategory.map((item) => (
              <div key={item.category}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-400 text-xs">{categoryLabels[item.category] || item.category}</span>
                  <span className="text-gray-500 text-xs">{item.percent}%</span>
                </div>
                <div className="h-2 bg-db-dark rounded-full overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${categoryColors[item.category] || categoryColors.outros} rounded-full`} style={{ width: `${item.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-gaming text-lg font-bold text-white">Pedidos Recentes</h2>
          <Link to="/admin/orders" className="text-sky-500/70 text-xs hover:text-sky-400 transition-colors">Ver todos →</Link>
        </div>

        <div className="bg-db-card border border-db-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-db-border bg-db-dark/40">
                  {['Pedido', 'Jogador', 'Produto', 'Valor', 'Status', 'Hora'].map((col) => (
                    <th key={col} className="text-left px-4 py-3 text-gray-600 text-xs font-semibold uppercase tracking-wider whitespace-nowrap">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {!loading && recentOrders.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-6 text-center text-gray-500 text-sm">Nenhum pedido registrado.</td>
                  </tr>
                )}
                {recentOrders.map((order, idx) => (
                  <tr key={order.id} className={`hover:bg-white/5 transition-colors ${idx < recentOrders.length - 1 ? 'border-b border-db-border/50' : ''}`}>
                    <td className="px-4 py-3 text-gray-500 text-xs font-mono">#{order.id.slice(0, 8)}</td>
                    <td className="px-4 py-3 text-white text-sm font-semibold whitespace-nowrap">{order.playerNickname}</td>
                    <td className="px-4 py-3 text-gray-400 text-sm whitespace-nowrap">{order.productName}</td>
                    <td className="px-4 py-3 text-sky-400 font-black text-sm whitespace-nowrap">R$ {Number(order.value).toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-lg font-semibold whitespace-nowrap ${order.status === 'delivered' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-sky-500/10 text-sky-400 border border-sky-500/20'}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-xs whitespace-nowrap">{timeAgo(order.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
