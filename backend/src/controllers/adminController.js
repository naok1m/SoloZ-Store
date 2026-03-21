import { getDashboardData } from '../services/adminService.js'

export const getDashboardController = async (req, res, next) => {
  try {
    const data = await getDashboardData()
    res.json(data)
  } catch (error) {
    next(error)
  }
}
