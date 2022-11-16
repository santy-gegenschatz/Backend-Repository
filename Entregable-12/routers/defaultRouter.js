const { renderHome, renderProducts, renderFakeProducts } = require('../controllers/defaultController')
const { Router } = require('express')
const defaultRouter = Router()

// ROUTER URL'S
// Show the home screen
defaultRouter.get('/', renderHome)

// Show the products screen
defaultRouter.get('/products', renderProducts)

// Show faker data (Entregable 11)
defaultRouter.get('/api/products-test', renderFakeProducts)

// Test cookie functionality
defaultRouter.get('/set-cookie', (req, res) => {
    res.cookie('loggedIn', true).send('Cookie set')
})

defaultRouter.get('/set-ttl-cookie', (req, res) => {
    res.cookie('loggedInTtl', true, {maxAge: 10000}).send('Cookie ttl set')
})

defaultRouter.get('/get-cookie', (req, res) => {
    res.send({message: 'Cookie!', cookieValue: req.cookies.loggedIn || 'Cookie was deleted'})
})

defaultRouter.get('/get-ttl-cookie', (req, res) => {
    res.send({message: 'Cookie!', cookieValue: req.cookies.loggedInTtl || 'Cookie has died'})
})

defaultRouter.get('/delete-cookie', (req, res) => {
    res.clearCookie('loggedIn').send('Cookie Deleted')
})

exports.defaultRouter = defaultRouter