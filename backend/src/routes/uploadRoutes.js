import { Router } from 'express'
import { requireAuth } from '../middlewares/authMiddleware.js'
import { uploadProductImage } from '../middlewares/uploadMiddleware.js'
import { uploadProductImageController } from '../controllers/uploadController.js'

const router = Router()

router.post('/product-image', requireAuth, uploadProductImage.single('image'), uploadProductImageController)

export default router
