const {getProducts, getProduct, addProduct, updateProduct, deleteProduct} = require('../controllers/productController')
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