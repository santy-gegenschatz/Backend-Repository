const passport = require('passport')
const adminEmail = process.env.ADMIN_EMAIL
const { sendEmail } = require('../utils/comms/nodemailer')
const { logDebug } = require('../loggers/logger')


const loginUser = async (req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
        if (!err) {
            console.log('User: ', user);
            console.log('Info: ', info);
            req.login(user, () => {
                return next();
            })
        } else {
            console.log('Error: ', err);
            res.redirect(`/auth/error/?error=${err}`)
        }
      })
      (req, res, next);
}

const goToHome = async (req, res) => {
    console.log(req.user);
    res.redirect('/')
}

const signUpUser = async (req, res, next) => {
    passport.authenticate('signup', (err, user, info) => {
        if (!err) {
            logDebug('User created')
            // Send an email indicating that a new user has been created
            sendEmail(adminEmail, 'New user created', `A new user has been created. Username: ${user.username}. Address: ${user.address}. Phone number: ${user.phoneNumber}. Age: ${user.age}`)
            // Send a twilio whatsapp message indicating that a new user has been created
            
            req.login(user, () => {
                res.send({url: '/'})
            })
        } else {
            console.log('Error: ', err);
            res.send({url : `/auth/error/?error=${err}`})
        }
      })
      (req, res, next);
}

const logoutUser = async (req, res) => {
    const stringUsername = req.user.username
    console.log(req.user);
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

    console.log('After the switch, the error message is: ', errorMessage);
    res.render('error.ejs', {error: errorMessage})
}

const renderLoginScreen = async (req, res) => {
    res.render('login.ejs')
}

const renderLogoutScreen = async (req, res) => {
    res.status(200).render('logout.ejs', {username : req.query.username})
}

const renderSignUpScreen = async (req, res) => {
    res.status(200).render('signup.ejs')
}

const renderUnauthorizedScreen = async (req, res) => {
    res.render('unauthorized.ejs')
}


module.exports = { goToHome, renderLoginScreen, renderLogoutScreen, renderSignUpScreen, loginUser, signUpUser, logoutUser, renderUnauthorizedScreen, renderErrorScreen}