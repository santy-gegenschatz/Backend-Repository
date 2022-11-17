const { renderLoginScreen, renderLogoutScreen, renderSignUpScreen, loginUser, signUpUser, logoutUser} = require('../controllers/authController')
const { Router } = require('express')

const authRouter = Router()

authRouter.get('/login', renderLoginScreen)

authRouter.get('/logout', renderLogoutScreen)

authRouter.get('/signup', renderSignUpScreen)

authRouter.post('/login', loginUser)

authRouter.post('/signup', signUpUser)

authRouter.post('/logout', logoutUser)

module.exports = { authRouter }