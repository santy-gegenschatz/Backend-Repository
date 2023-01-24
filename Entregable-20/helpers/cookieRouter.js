const { Router } = require('express')
const cookieRouter = Router()

// COOKIE Testing Routes
cookieRouter.get('/set-cookie', (req, res) => {
    res.cookie('loggedIn', true).send('Cookie set')
})

cookieRouter.get('/set-ttl-cookie', (req, res) => {
    res.cookie('loggedInTtl', true, {maxAge: 10000}).send('Cookie ttl set')
})

cookieRouter.get('/get-cookie', (req, res) => {
    res.send({message: 'Cookie!', cookieValue: req.cookies.loggedIn || 'Cookie was deleted'})
})

cookieRouter.get('/get-ttl-cookie', (req, res) => {
    res.send({message: 'Cookie!', cookieValue: req.cookies.loggedInTtl || 'Cookie has died'})
})

cookieRouter.get('/delete-cookie', (req, res) => {
    res.clearCookie('loggedIn').send('Cookie Deleted')
})

cookieRouter.get('/session', (req, res) => { 
    const session = req.session
    if (req.session.contador) {
        req.session.contador++
        res.send(`<h2> You have visited the site ${JSON.stringify(session)} times </h2>`)
    } else {
        req.session.contador = 1
        res.send('Welcome!')
    }
})

cookieRouter.get('/logout', (req, res) => {
    req.session.destroy( (err) => {
        if (!err) {
            res.send('Successfully logged out')
        } else {
            res.send({status: 'Logout ERROR', body: err})
        }
    })
})

cookieRouter.get('/login', (req, res) => {
    const { username, password } = req.query
    if (username !== 'john' || password !== 'admin') {
        return res.send('Login failed')
    } else {
        req.session.user = username
        req.session.admin = true
        res.send('Login success!')
    }
})

cookieRouter.get('/private', auth, (req, res) => {
    res.send('If you are watching this you have already logged in')
})

module.exports = cookieRouter