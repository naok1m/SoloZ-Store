import { Router } from 'express'
import { z } from 'zod'
import {
	listProductsController,
	listAllProductsController,
	createProductController,
	updateProductController,
	deleteProductController,
} from '../controllers/productController.js'
import { requireAuth } from '../middlewares/authMiddleware.js'
import { validateRequest } from '../middlewares/validateRequest.js'

const router = Router()

const productSchema = z.object({
	legacyId: z.coerce.number().int().positive().optional(),
	name: z.string().min(3),
	description: z.string().min(3),
	price: z.coerce.number().min(0),
	minecraftCommand: z.string().min(3),
	category: z.string().min(2).optional(),
	badge: z.string().min(2).optional().nullable(),
	imageUrl: z.string().url().optional().nullable(),
	popular: z.boolean().optional(),
	active: z.boolean().optional(),
})

const productUpdateSchema = productSchema.partial()

router.get('/', listProductsController)
router.get('/admin', requireAuth, listAllProductsController)
router.post('/', requireAuth, validateRequest(productSchema), createProductController)
router.put('/:id', requireAuth, validateRequest(productUpdateSchema), updateProductController)
router.delete('/:id', requireAuth, deleteProductController)

export default router
