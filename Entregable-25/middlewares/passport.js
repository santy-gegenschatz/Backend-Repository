const usersApi = require('../api/usersApi')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bCrypt = require('bcrypt')
const { serializeUser } = require('passport')
const { logInfo, logDebug } = require('../loggers/logger')

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
        const userExists = await usersApi.checkUserExists(username)
        if (!userExists) {
            return done('userdoesnotexist', false)
        }
        
        // If the user does exist, retreive it from MongoDB
        const user = await usersApi.getUser(username)
        // Check the password is Correct
        if (!isValidPassword(user, password)) {
            return done('wrongpassword', false)
        }
        logInfo(`Logged in user: ${user.username}`);
        // If the user exist && the password is valid
        // This will get passed to the serialize user method defined below
        return done(null, user) 
    }))

    passport.use('signup', new LocalStrategy({passReqToCallback: true}, 
        async (req, username, password, done) => {
        // First check if the username is available
        const usernameAvailable = await usersApi.checkUserNameAvailable(username)
        if (!usernameAvailable) {
            return done('usernametaken', false)
        }
        // Create a new User
        const newUser = {
            username,
            password: createHash(password),
            firstName: req.body.firstName,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
            age: req.body.age
        }

        // Add the user to the mongodbDatabase
        const {payload: addedUser} = await usersApi.add(newUser)
        logDebug(addedUser)
        return done(null, addedUser)
    }))

    passport.serializeUser((user, done) => {
        logDebug('Serializing');
        done(null, user._id)
    })

    passport.deserializeUser( async (id, done) => {
        logDebug('Deserializing');
        const user = await usersApi.getUserById(id)
        done(null, user)
    })

}

module.exports = { initPassport }