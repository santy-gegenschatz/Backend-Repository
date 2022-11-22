const usersDao = require('../daos/users/index')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bCrypt = require('bcrypt')

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
    passport.use('login', new LocalStrategy( async (username, password, done) => {
        // First, check if user exists
        const userExists = await usersDao.checkUserExists(username)
        if (!userExists) {
            return done(null, false)
        }
        
        // User does exist, retreive it from MongoDB
        const user = await usersDao.getUser(username)
        if (!isValidPassword(user, password)) {
            return done(null, false)
        }

        // If the user exists && the password is valid
        return done(null, user)
    }))

    passport.use('signup', new LocalStrategy({passReqToCallback: true}, 
        async (req, username, password, done) => {
        // First check if the username is available
        const usernameAvailable = await usersDao.checkUserNameAvailable(username)
        if (!usernameAvailable) {
            return done(null, false)
        }

        // Create a new User
        const newUser = {
            username,
            password: createHash(password)
        }

        // Add the user to the mongodbDatabase
        await usersDao.add(newUser)
        return done(null, await usersDao.getUser(username))
    }))
}

module.exports = { initPassport }