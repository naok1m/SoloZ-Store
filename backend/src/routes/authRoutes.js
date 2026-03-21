import { Router } from 'express'
import { z } from 'zod'
import { validateRequest } from '../middlewares/validateRequest.js'
import { loginController } from '../controllers/authController.js'

const router = Router()

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

router.post('/login', validateRequest(loginSchema), loginController)

export default router
