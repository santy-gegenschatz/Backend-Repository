const passort = require('passport')
const bCrypt = require('bcrypt')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const createHash = (password) => {
    return bCrypt.hashSync(
        password,
        bCrypt.genSaltSync(10),
        null
    )
}

const isValidPassword = (user, password) => {
    return bCrypt.compareSync(password, user.password)
}

const initPassport = () => {
    passport.use('login', new LocalStrategy( (username, password, done) => {
        
    }))

    passort.use('signup', new LocalStrategy( (username, passowrd, done) => {

    }))
}

module.exports = { initPassport }