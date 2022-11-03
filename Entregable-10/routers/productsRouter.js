const {getProducts, getProduct, addProduct, updateProduct, deleteProduct} = require('../controllers/productControllers')
const { Router } = require('express')
const productsRouter = Router()

// ROUTER URL'S
// Get all products
productsRouter.get('/', getProducts)

// Get a products by id
productsRouter.get('/:id', getProduct)

// Add a product to the array
productsRouter.post('/', addProduct)

// Update a product
productsRouter.put('/:id', updateProduct)

// Delete a product
productsRouter.delete('/:id', deleteProduct)



exports.productsRouter = productsRouter