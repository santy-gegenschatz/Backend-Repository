const yargs = require('yargs/yargs')(process.argv.slice(2))
const { renderHome, renderCart, renderMessages, renderProfile, renderAdminPanel, renderFakeProducts, renderServerInfo, renderRandomNumbers, renderPurchases} = require('../controllers/defaultController')
const { logRouteInfo } = require('../loggers/logger')
const { Router } = require('express')
const compression = require('compression')
const { checkAuthentication } = require('../middlewares/passportAuth')
const defaultRouter = Router()

// ROUTER URL'S
// Show the home screen
defaultRouter.get('/', logRouteInfo, checkAuthentication, renderHome)

// Show the carts screen
defaultRouter.get('/cart', logRouteInfo, checkAuthentication, renderCart)

// Show the purchases screen
defaultRouter.get('/purchases', logRouteInfo, checkAuthentication, renderPurchases)

// Show the messages screen
defaultRouter.get('/messages', logRouteInfo, checkAuthentication, renderMessages)

// Show the account screen
defaultRouter.get('/profile', logRouteInfo, checkAuthentication, renderProfile)

// Show the admin screen
defaultRouter.get('/admin', logRouteInfo, checkAuthentication, renderAdminPanel)

// Wildcard route
// This route is generating collosal damage. Why?
// defaultRouter.get('*', logRouteInfo, checkAuthentication, renderHome)

// Show faker data (Entregable 11)
defaultRouter.get('/api/products-test', renderFakeProducts)

// Show process data (Entregable 14)
defaultRouter.get('/info', logRouteInfo, renderServerInfo)

// Show gzipped process data (Entregable 16)
defaultRouter.get('/info-compressed', logRouteInfo, compression(), renderServerInfo)

// Trigger a fork child process
defaultRouter.get('/api/randoms', logRouteInfo, renderRandomNumbers)

// Test the datos route
defaultRouter.get('/datos', logRouteInfo, (req, res) => {
    res.send(`This is the endpoint datos of the server. This server is has a process id of ${process.pid} and runs on port ${yargs.argv.port}`)
})

exports.defaultRouter = defaultRouter