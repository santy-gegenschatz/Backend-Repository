const yargs = require('yargs/yargs')(process.argv.slice(2))
const { renderHome, renderProducts, renderFakeProducts, renderServerInfo, renderRandomNumbers} = require('../controllers/defaultController')
const { logInfo, logWarn } = require('../loggers/logger')
const { Router, query } = require('express')
const compression = require('compression')
const { checkAuthentication } = require('../middlewares/passportAuth')
const defaultRouter = Router()

// ROUTER URL'S
// Show the home screen
defaultRouter.get('/', logInfo, checkAuthentication, renderHome)

// Show the products screen
defaultRouter.get('/products', checkAuthentication, renderProducts)

// Show faker data (Entregable 11)
defaultRouter.get('/api/products-test', renderFakeProducts)

// Show process data (Entregable 14)
defaultRouter.get('/info', renderServerInfo)

// Show gzipped process data (Entregable 16)
defaultRouter.get('/info-compressed', compression(), renderServerInfo)

// Trigger a fork child process
defaultRouter.get('/api/randoms', renderRandomNumbers)

// Test the datos route
defaultRouter.get('/datos', (req, res) => {
    res.send(`This is the endpoint datos of the server. This server is has a process id of ${process.pid} and runs on port ${yargs.argv.port}`)
})

defaultRouter.get('*', (req, res) => {
    const { url, method } = req
    res.send(`The requested url ${url} with method ${method} does not exist in this api`)
})
exports.defaultRouter = defaultRouter