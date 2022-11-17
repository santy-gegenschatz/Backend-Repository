const { renderLoginScreen, renderLogoutScreen, loginUser, renderSignUpScreen} = require('../controllers/authController')
const { Router } = require('express')

const authRouter = Router()

authRouter.get('/login', renderLoginScreen)

authRouter.get('/logout', renderLogoutScreen)

authRouter.get('/signup', renderSignUpScreen)

authRouter.post('/login', loginUser)

authRouter.poset('/signup', signUpUser)

module.exports = { authRouter }