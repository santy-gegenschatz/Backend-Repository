const { getProducts, getProduct, addProduct, updateProduct, deleteProduct } = require('../controllers/productController')
const { logRouteInfo, logDebug } = require('../loggers/logger')
const { Router } = require('express')
const { checkAuthentication } = require('../middlewares/passportAuth')
const productsRouter = Router()

// ROUTER URL'S
// Get all products
productsRouter.get('/', logRouteInfo, checkAuthentication, getProducts)

// Get a products by id
productsRouter.get('/:id', logRouteInfo, checkAuthentication, getProduct)

// Add a product to the array
productsRouter.post('/', logRouteInfo, checkAuthentication, addProduct)

// Update a product
productsRouter.put('/:id', logRouteInfo, checkAuthentication, updateProduct)

// Delete a product
productsRouter.delete('/:id', logRouteInfo, checkAuthentication, deleteProduct)

exports.productsRouter = productsRouter