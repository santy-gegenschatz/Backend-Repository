const passport = require('passport')
const adminEmail = process.env.ADMIN_EMAIL
const { sendEmail } = require('../utils/comms/nodemailer')
const { logError, logDebug } = require('../loggers/logger')
const { upload } = require('../utils/uploading/multer')


const goToHome = async (req, res) => {
    res.redirect('/')
}

const loginUser = async (req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
        if (!err) {
            req.login(user, () => {
                return next();
            })
        } else {
            logError(err)
            res.redirect(`/auth/error/?error=${err}`)
        }
      })
      (req, res, next);
}

const logoutUser = async (req, res) => {
    const stringUsername = req.user.username
    req.session.destroy( (err) => {
        if (err) {
            return res.json(err)
        }
        res.redirect(`/auth/logout?username=${stringUsername}`)
    })
}

const renderErrorScreen = async (req, res) => {
    let errorMessage;
    const error = req.query.error;
    switch(error) {
        case('usernametaken'):
            errorMessage = 'Username Taken'
            break;
        case('wrongpassword'):
            errorMessage = 'Wrong password'
            break;
        case('userdoesnotexist'):
            errorMessage = 'User does not exist'
            break;
        default:
            errorMessage = 'Unknown error'
            break;
    }
    res.render('error.ejs', {error: errorMessage})
}

const renderLoginScreen = async (req, res) => {
    res.render('login.ejs')
}

const renderLogoutScreen = async (req, res) => {
    res.status(200).render('logout.ejs', {greetingUsername : req.query.username})
}

const renderSignUpScreen = async (req, res) => {
    res.status(200).render('signup.ejs')
}

const renderUnauthorizedScreen = async (req, res) => {
    res.render('unauthorized.ejs')
}

const signUpUser = async (req, res, next) => {
    passport.authenticate('signup', (err, user, info) => {
        if (!err) {
            try {
                // Send an email indicating that a new user has been created
                // sendEmail(adminEmail, 'New user created', `A new user has been created. Username: ${user.username}. Address: ${user.address}. Phone number: ${user.phoneNumber}. Age: ${user.age}`)
            } catch (err) {
                logError(err)
            }
            req.login(user, (err) => {
                if (err) {
                    logError(err)
                    res.redirect(`/auth/error/?error=${err}`)
                } else {
                    res.send({url : '/'})
                }
            })
        } else {
            logError(err)
            res.send({url : `/auth/error/?error=${err}`})
        }
      })
      (req, res, next);
}

const uploadProfilePicture = async (req, res) => {
    upload.single('file')(req, res, (err) => {
        if (err) {
            logError(err)
        } else {
            res.json('File uploaded successfully');
        }
    })
}

module.exports = { goToHome, renderLoginScreen, renderLogoutScreen, uploadProfilePicture, renderSignUpScreen, loginUser, signUpUser, logoutUser, renderUnauthorizedScreen, renderErrorScreen}