const { renderLoginScreen, renderLogoutScreen, renderSignUpScreen, loginUser, signUpUser, logoutUser, renderUnauthorizedScreen} = require('../controllers/authController')
const { Router } = require('express')

const authRouter = Router()

authRouter.get('/login', renderLoginScreen)

authRouter.get('/logout', renderLogoutScreen)

authRouter.get('/signup', renderSignUpScreen)

authRouter.get('/unauthorized', renderUnauthorizedScreen)

authRouter.post('/login', loginUser)

authRouter.post('/signup', signUpUser)

authRouter.post('/logout', logoutUser)

module.exports = { authRouter }