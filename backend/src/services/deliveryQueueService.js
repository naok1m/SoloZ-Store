import { prisma } from '../lib/prisma.js'
import { executeCommand } from './rconService.js'
import { logger } from '../utils/logger.js'

const MAX_ATTEMPTS = 5
const BASE_DELAY_MS = 30_000
const MAX_DELAY_MS = 30 * 60_000
const STALE_PROCESSING_MS = 5 * 60_000

const computeBackoffDelay = (attemptNumber) => {
  const exponential = BASE_DELAY_MS * (2 ** Math.max(0, attemptNumber - 1))
  const jitter = Math.floor(Math.random() * 5_000)
  return Math.min(exponential + jitter, MAX_DELAY_MS)
}

const nowPlus = (ms) => new Date(Date.now() + ms)

export const enqueueDelivery = async (orderId) => {
  return prisma.deliveryQueue.upsert({
    where: { orderId },
    update: {},
    create: {
      orderId,
      status: 'pending',
      nextAttemptAt: new Date(),
    },
  })
}

const reclaimStaleProcessingItems = async () => {
  const staleBefore = new Date(Date.now() - STALE_PROCESSING_MS)
  const result = await prisma.deliveryQueue.updateMany({
    where: {
      status: 'processing',
      updatedAt: { lt: staleBefore },
      attempts: { lt: MAX_ATTEMPTS },
    },
    data: {
      status: 'failed',
      nextAttemptAt: new Date(),
      lastError: 'Processing timeout, requeued',
    },
  })

  if (result.count > 0) {
    logger.warn('Requeued stale processing items', { count: result.count })
  }
}

export const processQueueItem = async (queueItemId) => {
  const queueItem = await prisma.deliveryQueue.findUnique({
    where: { id: queueItemId },
    include: { order: { include: { product: true } } },
  })

  if (!queueItem) {
    return null
  }

  if (queueItem.status === 'delivered') {
    return queueItem
  }

  if (queueItem.attempts >= MAX_ATTEMPTS) {
    logger.warn('Delivery attempts exceeded', { queueItemId })
    return queueItem
  }

  const lockResult = await prisma.deliveryQueue.updateMany({
    where: {
      id: queueItemId,
      status: { in: ['pending', 'failed'] },
      attempts: { lt: MAX_ATTEMPTS },
      nextAttemptAt: { lte: new Date() },
    },
    data: { status: 'processing' },
  })

  if (lockResult.count === 0) {
    return queueItem
  }

  try {
    await executeCommand(
      queueItem.order.playerNickname,
      queueItem.order.product.minecraftCommand
    )

    await prisma.order.update({
      where: { id: queueItem.orderId },
      data: { status: 'delivered' },
    })

    const delivered = await prisma.deliveryQueue.update({
      where: { id: queueItemId },
      data: {
        status: 'delivered',
        lastError: null,
      },
    })

    logger.info('Delivery succeeded', { queueItemId })
    return delivered
  } catch (error) {
    const nextAttempts = queueItem.attempts + 1
    const nextAttemptAt = nowPlus(computeBackoffDelay(nextAttempts))

    const failed = await prisma.deliveryQueue.update({
      where: { id: queueItemId },
      data: {
        status: 'failed',
        attempts: { increment: 1 },
        lastError: error.message,
        nextAttemptAt,
      },
    })

    logger.error('Delivery failed', {
      queueItemId,
      error: error.message,
      attempts: nextAttempts,
      nextAttemptAt,
    })
    return failed
  }
}

export const processPendingDeliveries = async () => {
  await reclaimStaleProcessingItems()

  const now = new Date()
  const pendingItems = await prisma.deliveryQueue.findMany({
    where: {
      status: { in: ['pending', 'failed'] },
      attempts: { lt: MAX_ATTEMPTS },
      nextAttemptAt: { lte: now },
    },
    orderBy: { nextAttemptAt: 'asc' },
    take: 10,
  })

  for (const item of pendingItems) {
    await processQueueItem(item.id)
  }
}
