const { renderHome, renderProducts, renderFakeProducts, renderServerInfo, renderRandomNumbers} = require('../controllers/defaultController')
const { Router } = require('express')
const { auth } = require('../middlewares/auth')
const { checkAuthentication } = require('../middlewares/passportAuth')
const defaultRouter = Router()

// ROUTER URL'S
// Show the home screen
defaultRouter.get('/', checkAuthentication, renderHome)

// Show the products screen
defaultRouter.get('/products', checkAuthentication, renderProducts)

// Show faker data (Entregable 11)
defaultRouter.get('/api/products-test', renderFakeProducts)

// Show process data (Entregable 14)
defaultRouter.get('/info', renderServerInfo)

// Trigger a fork child process
defaultRouter.get('/api/randoms', renderRandomNumbers)

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

defaultRouter.get('/session', (req, res) => { 
    const session = req.session
    if (req.session.contador) {
        req.session.contador++
        res.send(`<h2> You have visited the site ${JSON.stringify(session)} times </h2>`)
    } else {
        req.session.contador = 1
        res.send('Welcome!')
    }
})

defaultRouter.get('/logout', (req, res) => {
    req.session.destroy( (err) => {
        if (!err) {
            res.send('Successfully logged out')
        } else {
            res.send({status: 'Logout ERROR', body: err})
        }
    })
})

defaultRouter.get('/login', (req, res) => {
    const { username, password } = req.query
    if (username !== 'john' || password !== 'admin') {
        return res.send('Login failed')
    } else {
        req.session.user = username
        req.session.admin = true
        res.send('Login success!')
    }
})

defaultRouter.get('/private', auth, (req, res) => {
    res.send('If you are watching this you have already logged in')
})
exports.defaultRouter = defaultRouter