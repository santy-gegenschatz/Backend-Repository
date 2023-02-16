const { Router } = require('express')
const { addProductToCart, completePurchase } = require('../controllers/usersController')
const usersRouter = Router()

// ROUTER URL'S
// Get user info

usersRouter.post('/addToCart', addProductToCart)

usersRouter.post('/completePurchase', completePurchase)

module.exports = { usersRouter }
