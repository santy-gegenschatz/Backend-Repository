const { getCart, createCart, addItemToCart, deleteCartItem, deleteCart } = require('../controllers/cartController')
const { Router } = require('express')
const cartRouter = Router()

// ROUTER URL'S
// Get a specific cart with all its products
cartRouter.get('/:id', getCart)

// Create a new empty cart
cartRouter.post('/', createCart)

// Add a product to a cart
cartRouter.post('/:id/:id_prod', addItemToCart)

// Delete a product from a cart
cartRouter.delete('/deleteItem/:id/:id_prod', deleteCartItem)

// Delete a cart
cartRouter.delete('/:id', deleteCart)


exports.cartRouter = cartRouter