const { renderHome, renderProducts, renderFakeProducts } = require('../controllers/defaultController')
const { Router } = require('express')
const defaultRouter = Router()

// ROUTER URL'S
// Show the home screen
defaultRouter.get('/', renderHome)

// Show the products screen
defaultRouter.get('/products', renderProducts)

// Show fakewr data (Entregable 11)
defaultRouter.get('/api/products-test', renderFakeProducts)

exports.defaultRouter = defaultRouter