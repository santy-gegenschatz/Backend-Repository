const {getCart, createCart, addItemsToCart, deleteCartItem, deleteCart} = require('../controllers/cartControllers')
const { Router } = require('express')
const cartRouter = Router()

// ROUTER URL'S
// Get a specific cart with all its products
cartRouter.get('/:id', getCart)

// Create a new empty cart
cartRouter.post('/', createCart)

// Add a product to a cart
cartRouter.post('/:id', addItemsToCart)

// Delete a product from a cart
cartRouter.delete('/:id/:id_prod', deleteCartItem)

// Delete a cart
cartRouter.delete('/:id', deleteCart)


exports.cartRouter = cartRouter