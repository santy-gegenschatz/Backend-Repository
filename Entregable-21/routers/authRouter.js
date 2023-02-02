const { goToHome, renderLoginScreen, renderLogoutScreen, renderSignUpScreen, loginUser, signUpUser, logoutUser, renderUnauthorizedScreen, renderErrorScreen} = require('../controllers/authController')
const { logRouteInfo, logDebug } = require('../loggers/logger')
const { Router } = require('express')
const { upload } = require('../utils/uploading/multer')

const authRouter = Router()

authRouter.get('/login', logRouteInfo, renderLoginScreen)

authRouter.get('/logout', logRouteInfo, renderLogoutScreen)

authRouter.get('/signup', logRouteInfo, renderSignUpScreen)

authRouter.get('/unauthorized', logRouteInfo, renderUnauthorizedScreen)

authRouter.get('/error', logRouteInfo, renderErrorScreen)

authRouter.get('*', logRouteInfo, renderSignUpScreen)

authRouter.post('/login', logRouteInfo, loginUser, goToHome)

authRouter.post('/signup', logRouteInfo, signUpUser)

authRouter.post('/logout', logRouteInfo, logoutUser)

authRouter.post('/upload', upload.single('file'), (req, res) => {
    logDebug(req.file)
    res.send('Done')
})

module.exports = { authRouter }