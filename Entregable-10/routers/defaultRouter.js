const { renderHome, renderProducts } = require('../controllers/defaultController')
const { Router } = require('express')
const defaultRouter = Router()

// ROUTER URL'S
// Show the home screen
defaultRouter.get('/', renderHome)

// Show the products screen
defaultRouter.get('/products', renderProducts)

exports.defaultRouter = defaultRouter