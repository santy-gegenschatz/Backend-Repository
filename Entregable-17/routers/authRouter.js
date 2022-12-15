const { goToHome, renderLoginScreen, renderLogoutScreen, renderSignUpScreen, loginUser, signUpUser, logoutUser, renderUnauthorizedScreen, renderErrorScreen} = require('../controllers/authController')
const { Router } = require('express')

const authRouter = Router()

authRouter.get('/login', renderLoginScreen)

authRouter.get('/logout', renderLogoutScreen)

authRouter.get('/signup', renderSignUpScreen)

authRouter.get('/unauthorized', renderUnauthorizedScreen)

authRouter.get('/error', renderErrorScreen)

authRouter.get('*', renderSignUpScreen)

authRouter.post('/login', loginUser, goToHome)

authRouter.post('/signup', signUpUser)

authRouter.post('/logout', logoutUser)

module.exports = { authRouter }