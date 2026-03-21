import app from './app.js'
import { env } from './config/env.js'
import { prisma } from './lib/prisma.js'
import { logger } from './utils/logger.js'
import { processPendingDeliveries } from './services/deliveryQueueService.js'

const start = async () => {
  try {
    await prisma.$connect()
    app.listen(env.PORT, () => {
      logger.info(`API running on port ${env.PORT}`)
    })

    setInterval(async () => {
      try {
        await processPendingDeliveries()
      } catch (error) {
        logger.error('Queue processing failed', { error: error.message })
      }
    }, 15000)
  } catch (error) {
    logger.error('Failed to start server', { error: error.message })
    process.exit(1)
  }
}

start()
