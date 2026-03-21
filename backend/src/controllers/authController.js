import { login } from '../services/authService.js'

export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.validatedBody
    const result = await login(email, password)
    res.json(result)
  } catch (error) {
    next(error)
  }
}
