import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '../lib/prisma.js'
import { env } from '../config/env.js'

export const login = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    const error = new Error('Invalid credentials')
    error.status = 401
    throw error
  }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    const error = new Error('Invalid credentials')
    error.status = 401
    throw error
  }

  const token = jwt.sign(
    { id: user.id, role: user.role, email: user.email },
    env.JWT_SECRET,
    { expiresIn: '7d' }
  )

  return { token, user: { id: user.id, email: user.email, role: user.role } }
}
