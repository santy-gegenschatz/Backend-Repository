const {getProducts, getProduct, addProduct, updateProduct, deleteProduct} = require('../controllers/controllers')
const { Router } = require('express')
const router = Router()

// ROUTER URL'S
// Get all products
router.get('/', getProducts)

// Get a products by id
router.get('/:id', getProduct)

// Add a product to the array
router.post('/', addProduct)

// Update a product
router.put('/:id', updateProduct)

// Delete a product
router.delete('/:id', deleteProduct)

exports.router = router