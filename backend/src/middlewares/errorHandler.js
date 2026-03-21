import { logger } from '../utils/logger.js'

export const errorHandler = (err, req, res, next) => {
  logger.error('Request failed', { message: err.message, stack: err.stack })
  const status = err.status || 500
  res.status(status).json({
    error: err.message || 'Internal server error',
  })
}
