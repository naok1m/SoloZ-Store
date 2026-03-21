import { getPayment } from '../services/paymentService.js'
import { handleApprovedPayment } from '../services/orderService.js'
import { logger } from '../utils/logger.js'
import { env } from '../config/env.js'

export const mercadopagoWebhookController = async (req, res, next) => {
  try {
    const token = req.query.token || req.headers['x-webhook-token']
    if (!token || token !== env.WEBHOOK_TOKEN) {
      return res.status(401).json({ error: 'Invalid webhook token' })
    }

    const paymentId = req.body?.data?.id || req.body?.id
    if (!paymentId) {
      return res.status(400).json({ error: 'Missing payment id' })
    }

    logger.info('Webhook received', { paymentId })

    const payment = await getPayment(paymentId)
    if (payment.status !== 'approved') {
      logger.info('Payment not approved yet', { paymentId, status: payment.status })
      return res.status(200).json({ received: true })
    }

    const orderId = payment.metadata?.orderId || payment.external_reference
    if (!orderId) {
      return res.status(400).json({ error: 'Missing orderId in payment metadata' })
    }

    await handleApprovedPayment({
      orderId,
      paymentId: String(payment.id),
    })

    res.status(200).json({ delivered: true })
  } catch (error) {
    next(error)
  }
}
