import { Router } from 'express'
import { z } from 'zod'
import { validateRequest } from '../middlewares/validateRequest.js'
import { createOrderController } from '../controllers/orderController.js'

const router = Router()

const createOrderSchema = z.object({
  productId: z.union([
    z.string().uuid(),
    z.string().regex(/^\d+$/),
    z.number().int().positive(),
  ]),
  playerNickname: z.string().min(3).max(24),
  paymentMethod: z.enum(['pix', 'boleto', 'card']).optional(),
  payerEmail: z.string().email().optional(),
})

router.post('/', validateRequest(createOrderSchema), createOrderController)

export default router
