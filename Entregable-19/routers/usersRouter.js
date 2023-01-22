const { Router } = require('express')
const { addProductToCart } = require('../controllers/usersController')
const usersRouter = Router()

// ROUTER URL'S
// Get user info
usersRouter.post('/addToCart', addProductToCart)

module.exports = { usersRouter }
