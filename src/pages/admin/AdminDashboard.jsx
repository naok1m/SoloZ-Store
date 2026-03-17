import { useLocation } from 'react-router-dom'
import AdminSidebar from '../../components/AdminSidebar'
import AdminTable from '../../components/AdminTable'
import { products } from '../../data/products'

// Dados mockados para o dashboard
const dashboardStats = [
  { label: 'Produtos Ativos', value: products.length, icon: 'products', trend: '+2 esta semana', color: 'from-yellow-500 to-orange-500' },
  { label: 'Pedidos Hoje', value: '24', icon: 'orders', trend: '+8 vs ontem', color: 'from-blue-500 to-cyan-500' },
  { label: 'Receita Total', value: 'R$ 4.890', icon: 'money', trend: '+12% este mês', color: 'from-green-500 to-teal-500' },
  { label: 'Jogadores Únicos', value: '312', icon: 'users', trend: '+45 esta semana', color: 'from-purple-500 to-pink-500' },
]

const categoryChart = [
  { label: 'Transformações', percent: 72, icon: 'transformacoes', color: 'from-yellow-500 to-orange-500' },
  { label: 'VIP', percent: 55, icon: 'vip', color: 'from-purple-500 to-pink-500' },
  { label: 'Moedas Zeni', percent: 40, icon: 'moedas', color: 'from-yellow-400 to-amber-600' },
  { label: 'Kits', percent: 28, icon: 'kits', color: 'from-green-500 to-teal-500' },
]

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
  if (type === 'money' || type === 'moedas') {
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
  if (type === 'transformacoes') {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  }
  if (type === 'vip') {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 16L3 6l5 3 4-5 4 5 5-3-2 10H5z" />
      </svg>
    )
  }
  if (type === 'kits') {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
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
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="8" strokeWidth={1.8} />
    </svg>
  )
}

const recentOrders = [
  { id: '#1043', player: 'SaiyajinBR', product: 'Super Saiyajin Blue', value: 'R$ 39,90', status: 'Entregue', time: 'há 5 min' },
  { id: '#1042', player: 'GokuFan99', product: 'Ultra Instinct', value: 'R$ 59,90', status: 'Entregue', time: 'há 12 min' },
  { id: '#1041', player: 'VegetaSSB', product: 'VIP Saiyajin', value: 'R$ 79,90', status: 'Pendente', time: 'há 30 min' },
  { id: '#1040', player: 'DBZPlayer', product: 'Moedas Zeni (5.000)', value: 'R$ 34,90', status: 'Entregue', time: 'há 45 min' },
  { id: '#1039', player: 'NamekBR', product: 'VIP Namekusei', value: 'R$ 69,90', status: 'Entregue', time: 'há 1h' },
]

// Placeholder para rotas que ainda não têm conteúdo
function PlaceholderPage({ title, icon }) {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <span className="w-12 h-12 mb-4 mx-auto text-gray-500 flex items-center justify-center rounded-xl border border-db-border bg-db-card">
          <Icon type={icon} className="w-6 h-6" />
        </span>
        <h2 className="font-gaming text-xl font-bold text-white mb-2">{title}</h2>
        <p className="text-gray-600 text-sm">Esta seção será implementada na versão completa.</p>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const location = useLocation()

  // Renderiza conteúdo baseado na rota atual
  const renderContent = () => {
    switch (location.pathname) {
      case '/admin/products':
        return (
          <div className="flex-1 p-8 overflow-auto">
            <AdminTable />
          </div>
        )
      case '/admin/orders':
        return <PlaceholderPage title="Pedidos" icon="orders" />
      case '/admin/categories':
        return <PlaceholderPage title="Categorias" icon="categories" />
      case '/admin/settings':
        return <PlaceholderPage title="Configurações" icon="settings" />
      default:
        return <DashboardContent />
    }
  }

  return (
    <div className="flex min-h-screen bg-db-dark">
      <AdminSidebar />
      {renderContent()}
    </div>
  )
}

function DashboardContent() {
  return (
    <div className="flex-1 p-8 overflow-auto">

      {/* Cabeçalho */}
      <div className="mb-8">
        <h1 className="font-gaming text-2xl font-black text-white">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Bem-vindo ao painel administrativo</p>
      </div>

      {/* Grid de estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {dashboardStats.map((stat) => (
          <div
            key={stat.label}
            className="bg-db-card border border-db-border rounded-xl p-5 hover:border-yellow-500/20 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <span className="text-gray-300"><Icon type={stat.icon} className="w-6 h-6" /></span>
              <span className="text-xs text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-lg">
                {stat.trend}
              </span>
            </div>
            <p className="font-gaming text-2xl font-black text-white mb-0.5">{stat.value}</p>
            <p className="text-gray-600 text-xs">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Dois painéis: Tabela de produtos + Pedidos recentes */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">

        {/* Mini tabela de produtos */}
        <div className="bg-db-card border border-db-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-gaming text-sm font-bold text-white">Top Produtos</h2>
            <a href="/admin/products" className="text-yellow-500/70 text-xs hover:text-yellow-400 transition-colors">
              Ver todos →
            </a>
          </div>
          <div className="space-y-3">
            {products.slice(0, 5).map((product) => (
              <div key={product.id} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-db-dark border border-db-border rounded-lg flex items-center justify-center flex-shrink-0 text-gray-300">
                  <Icon type={product.category} className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-xs font-semibold truncate">{product.name}</p>
                  <p className="text-gray-600 text-xs">{product.category}</p>
                </div>
                <span className="text-yellow-400 font-black text-xs flex-shrink-0">
                  R$ {product.price.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Gráfico de barras decorativo */}
        <div className="bg-db-card border border-db-border rounded-xl p-5">
          <h2 className="font-gaming text-sm font-bold text-white mb-4">Vendas por Categoria</h2>
          <div className="space-y-3">
            {categoryChart.map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-400 text-xs flex items-center gap-1.5">
                    <Icon type={item.icon} className="w-3.5 h-3.5" /> {item.label}
                  </span>
                  <span className="text-gray-500 text-xs">{item.percent}%</span>
                </div>
                <div className="h-2 bg-db-dark rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pedidos recentes */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-gaming text-lg font-bold text-white">Pedidos Recentes</h2>
          <a href="/admin/orders" className="text-yellow-500/70 text-xs hover:text-yellow-400 transition-colors">
            Ver todos →
          </a>
        </div>

        <div className="bg-db-card border border-db-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-db-border bg-db-dark/40">
                  {['Pedido', 'Jogador', 'Produto', 'Valor', 'Status', 'Hora'].map((col) => (
                    <th
                      key={col}
                      className="text-left px-4 py-3 text-gray-600 text-xs font-semibold uppercase tracking-wider whitespace-nowrap"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, idx) => (
                  <tr
                    key={order.id}
                    className={`hover:bg-white/5 transition-colors ${
                      idx < recentOrders.length - 1 ? 'border-b border-db-border/50' : ''
                    }`}
                  >
                    <td className="px-4 py-3 text-gray-500 text-xs font-mono">{order.id}</td>
                    <td className="px-4 py-3 text-white text-sm font-semibold whitespace-nowrap">{order.player}</td>
                    <td className="px-4 py-3 text-gray-400 text-sm whitespace-nowrap">{order.product}</td>
                    <td className="px-4 py-3 text-yellow-400 font-black text-sm whitespace-nowrap">{order.value}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs px-2 py-1 rounded-lg font-semibold whitespace-nowrap ${
                          order.status === 'Entregue'
                            ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                            : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-xs whitespace-nowrap">{order.time}</td>
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
