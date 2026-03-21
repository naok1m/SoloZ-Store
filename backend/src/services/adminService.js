import { prisma } from '../lib/prisma.js'

const toStartOfDay = (date) => {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

export const getDashboardData = async () => {
  const startOfDay = toStartOfDay(new Date())

  const [
    activeProducts,
    allOrders,
    todayOrdersCount,
    recentOrdersRaw,
    topProductsRaw,
  ] = await Promise.all([
    prisma.product.count({ where: { active: true } }),
    prisma.order.findMany({ include: { product: true } }),
    prisma.order.count({ where: { createdAt: { gte: startOfDay } } }),
    prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: { product: true },
      take: 8,
    }),
    prisma.product.findMany({
      where: { active: true },
      orderBy: [{ popular: 'desc' }, { createdAt: 'desc' }],
      take: 5,
    }),
  ])

  const successfulStatuses = new Set(['paid', 'delivered'])
  const successfulOrders = allOrders.filter((order) => successfulStatuses.has(order.status))

  const revenueTotal = successfulOrders.reduce(
    (sum, order) => sum + Number(order.product?.price || 0),
    0
  )

  const uniquePlayers = new Set(allOrders.map((order) => order.playerNickname)).size

  const categoryTotals = successfulOrders.reduce((acc, order) => {
    const category = order.product?.category || 'outros'
    acc[category] = (acc[category] || 0) + 1
    return acc
  }, {})

  const totalCategoryOrders = Object.values(categoryTotals).reduce((sum, qty) => sum + qty, 0)

  const salesByCategory = Object.entries(categoryTotals)
    .map(([category, count]) => ({
      category,
      count,
      percent: totalCategoryOrders > 0 ? Math.round((count / totalCategoryOrders) * 100) : 0,
    }))
    .sort((a, b) => b.count - a.count)

  const recentOrders = recentOrdersRaw.map((order) => ({
    id: order.id,
    playerNickname: order.playerNickname,
    productName: order.product?.name || 'Produto removido',
    value: Number(order.product?.price || 0),
    status: order.status,
    createdAt: order.createdAt,
  }))

  return {
    stats: {
      activeProducts,
      ordersToday: todayOrdersCount,
      revenueTotal,
      uniquePlayers,
    },
    topProducts: topProductsRaw,
    salesByCategory,
    recentOrders,
  }
}
