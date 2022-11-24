const passport = require('passport')
const { renderLoginScreen, renderLogoutScreen, renderSignUpScreen, loginUser, signUpUser, logoutUser, renderUnauthorizedScreen, renderErrorScreen} = require('../controllers/authController')
const { Router, application } = require('express')

const authRouter = Router()

authRouter.get('/login', renderLoginScreen)

authRouter.get('/logout', renderLogoutScreen)

authRouter.get('/signup', renderSignUpScreen)

authRouter.get('/unauthorized', renderUnauthorizedScreen)

authRouter.get('/error', renderErrorScreen)

authRouter.get('*', renderSignUpScreen)

authRouter.post('/login', passport.authenticate('login', { failureRedirect: '/auth/error/?error=wrongpassword'}), (req, res) => {
    console.log(req.user);
    res.redirect('/')
})

authRouter.post('/signup', passport.authenticate('signup'), (req, res) => {
    console.log(req.user),
    res.send({url: '/'})
})

authRouter.post('/logout', logoutUser)

module.exports = { authRouter }