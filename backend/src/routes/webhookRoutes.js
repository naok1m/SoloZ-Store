import { Router } from 'express'
import { mercadopagoWebhookController } from '../controllers/webhookController.js'

const router = Router()

router.post('/mercadopago', mercadopagoWebhookController)

export default router
