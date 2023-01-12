const { getProducts, getProduct, addProduct, updateProduct, deleteProduct } = require('../controllers/productController')
const { logRouteInfo } = require('../loggers/logger')
const { Router } = require('express')
const productsRouter = Router()

// ROUTER URL'S
// Get all products
productsRouter.get('/', logRouteInfo, getProducts)

// Get a products by id
productsRouter.get('/:id', logRouteInfo, getProduct)

// Add a product to the array
productsRouter.post('/', logRouteInfo, addProduct)

// Update a product
productsRouter.put('/:id', logRouteInfo, updateProduct)

// Delete a product
productsRouter.delete('/:id', logRouteInfo, deleteProduct)



exports.productsRouter = productsRouter