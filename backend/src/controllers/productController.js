import {
  listProducts,
  listAllProducts,
  createProduct,
  updateProduct,
  deactivateProduct,
} from '../services/productService.js'

export const listProductsController = async (req, res, next) => {
  try {
    const products = await listProducts()
    res.json(products)
  } catch (error) {
    next(error)
  }
}

export const listAllProductsController = async (req, res, next) => {
  try {
    const products = await listAllProducts()
    res.json(products)
  } catch (error) {
    next(error)
  }
}

export const createProductController = async (req, res, next) => {
  try {
    const product = await createProduct(req.validatedBody)
    res.status(201).json(product)
  } catch (error) {
    next(error)
  }
}

export const updateProductController = async (req, res, next) => {
  try {
    const product = await updateProduct(req.params.id, req.validatedBody)
    res.json(product)
  } catch (error) {
    next(error)
  }
}

export const deleteProductController = async (req, res, next) => {
  try {
    const product = await deactivateProduct(req.params.id)
    res.json(product)
  } catch (error) {
    next(error)
  }
}
