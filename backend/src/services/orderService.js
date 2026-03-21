import { prisma } from '../lib/prisma.js'
import { createPayment } from './paymentService.js'
import { enqueueDelivery, processQueueItem } from './deliveryQueueService.js'
import { logger } from '../utils/logger.js'

const findProductById = async (productId) => {
  const byId = await prisma.product.findUnique({ where: { id: productId } })
  if (byId) return byId

  const legacyId = Number(productId)
  if (!Number.isNaN(legacyId)) {
    return prisma.product.findFirst({ where: { legacyId } })
  }

  return null
}

export const createOrder = async ({
  productId,
  playerNickname,
  paymentMethod = 'pix',
  payerEmail,
}) => {
  const product = await findProductById(productId)
  if (!product || !product.active) {
    const error = new Error('Product not available')
    error.status = 404
    throw error
  }

  const order = await prisma.order.create({
    data: {
      productId: product.id,
      playerNickname,
      status: 'pending',
    },
  })

  // Bypass payment for free items
  if (product.price === 0) {
    const updatedOrder = await prisma.order.update({
      where: { id: order.id },
      data: { status: 'paid' },
    })
    
    // Auto-enqueue delivery
    const queueItem = await enqueueDelivery(order.id)
    await processQueueItem(queueItem.id)
    
    return {
      order: updatedOrder,
      payment: {
        id: 'free-' + order.id,
        status: 'approved',
        method: 'free',
      }
    }
  }

  const payment = await createPayment({
    amount: product.price,
    description: product.name,
    orderId: order.id,
    playerNickname,
    minecraftCommand: product.minecraftCommand,
    method: paymentMethod,
    payerEmail,
  })

  const updatedOrder = payment.id
    ? await prisma.order.update({
        where: { id: order.id },
        data: { paymentId: String(payment.id) },
      })
    : order

  return { order: updatedOrder, payment }
}

export const handleApprovedPayment = async ({ orderId, paymentId }) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { product: true },
  })

  if (!order) {
    const error = new Error('Order not found')
    error.status = 404
    throw error
  }

  if (order.status === 'delivered') {
    logger.warn('Order already delivered', { orderId: order.id })
    return order
  }

  if (paymentId && order.paymentId && order.paymentId !== paymentId) {
    logger.warn('Payment id mismatch', { orderId: order.id, paymentId })
  }

  await prisma.order.update({
    where: { id: order.id },
    data: { status: 'paid' },
  })

  const queueItem = await enqueueDelivery(order.id)
  const result = await processQueueItem(queueItem.id)
  if (result?.status === 'delivered') {
    logger.info('Order delivered', { orderId: order.id })
  }
  return result
}
