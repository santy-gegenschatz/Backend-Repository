const usersDao = require('../daos/users/index')
const passport = require('passport')

const loginUser = async (req, res) => {
    return passport.authenticate('login', {
        successRedirect: '/api/products',
        failureRedirect: '/auth/error/?error=wrongpassword'
    })
}

const logoutUser = async (req, res) => {
    const stringUsername = req.session.user
    req.session.destroy( (err) => {
        if (err) {
            return res.json(err)
        }
        res.redirect(`/auth/logout?name=${stringUsername}`)
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
    res.status(200).render('logout.ejs', {username : req.query.name})
}

const renderSignUpScreen = async (req, res) => {
    res.status(200).render('signup.ejs')
}

const renderUnauthorizedScreen = async (req, res) => {
    res.render('unauthorized.ejs')
}

const signUpUser = async (req, res) => {
    return passport.authenticate('signup', {
        successRedirect: '/api/products',
        failureRedirect: '/auth/error/?error=usernametaken'
    })
}

module.exports = { renderLoginScreen, renderLogoutScreen, renderSignUpScreen, loginUser, signUpUser, logoutUser, renderUnauthorizedScreen, renderErrorScreen}