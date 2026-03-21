import express from 'express'
import path from 'path'
import cors from 'cors'
import morgan from 'morgan'
import authRoutes from './routes/authRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import productRoutes from './routes/productRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import webhookRoutes from './routes/webhookRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import { errorHandler } from './middlewares/errorHandler.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use('/uploads', express.static(path.resolve(process.cwd(), 'uploads')))

app.use((req, res, next) => {
	if (req.method === 'GET' && (req.path.startsWith('/products') || req.path.startsWith('/admin'))) {
		res.set('Cache-Control', 'no-store')
	}
	next()
})

app.get('/health', (req, res) => res.json({ status: 'ok' }))

app.use('/auth', authRoutes)
app.use('/admin', adminRoutes)
app.use('/products', productRoutes)
app.use('/orders', orderRoutes)
app.use('/webhook', webhookRoutes)
app.use('/upload', uploadRoutes)

app.use(errorHandler)

export default app
