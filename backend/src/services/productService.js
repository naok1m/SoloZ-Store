import { prisma } from '../lib/prisma.js'

export const listProducts = async () => {
  return prisma.product.findMany({ where: { active: true } })
}

export const getProductById = async (id) => {
  return prisma.product.findUnique({ where: { id } })
}

export const listAllProducts = async () => {
  return prisma.product.findMany({ orderBy: { createdAt: 'desc' } })
}

export const createProduct = async (data) => {
  return prisma.product.create({ data })
}

export const updateProduct = async (id, data) => {
  return prisma.product.update({ where: { id }, data })
}

export const deactivateProduct = async (id) => {
  return prisma.product.update({ where: { id }, data: { active: false } })
}
