const yargs = require('yargs/yargs')(process.argv.slice(2))
const { renderHome, renderProducts, renderCart, renderMessages, renderAccount, renderAdminPanel, renderFakeProducts, renderServerInfo, renderRandomNumbers} = require('../controllers/defaultController')
const { logRouteInfo } = require('../loggers/logger')
const { Router } = require('express')
const compression = require('compression')
const { checkAuthentication } = require('../middlewares/passportAuth')
const defaultRouter = Router()

// ROUTER URL'S
// Show the home screen
defaultRouter.get('/', logRouteInfo, checkAuthentication, renderHome)

// Show the products screen
defaultRouter.get('/products', logRouteInfo, checkAuthentication, renderProducts)

// Show the carts screen
defaultRouter.get('/cart', logRouteInfo, renderCart)

// Show the messages screen
defaultRouter.get('/messages', logRouteInfo, renderMessages)

// Show the account screen
defaultRouter.get('/account', logRouteInfo, checkAuthentication, renderAccount)

// Show the admin screen
defaultRouter.get('/admin', logRouteInfo, checkAuthentication, renderAdminPanel)

// Wildcard route
defaultRouter.get('*', logRouteInfo, checkAuthentication, renderHome)

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