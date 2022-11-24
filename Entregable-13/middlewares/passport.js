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
    console.log(password, user.password);
    return bCrypt.compareSync(password, user.password)
}

const initPassport = () => {
    passport.use('login', new LocalStrategy( async (username, password, done) => {
        // First, check if user exists
        const userExists = await usersDao.checkUserExists(username)
        console.log(userExists);
        if (!userExists) {
            return done(null, false)
        }
        
        // User does exist, retreive it from MongoDB
        const user = await usersDao.getUser(username)
        console.log('User returned: ', user);
        if (!isValidPassword(user, password)) {
            return done(null, false)
        }
        console.log('All valid');
        // If the user exists && the password is valid
        return done(null, user) // This will get passed to the serialize user method defined below
    }))

    passport.use('signup', new LocalStrategy({passReqToCallback: true}, 
        async (req, username, password, done) => {
        // First check if the username is available
        console.log(username, password);
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

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser( async (id, done) => {
        console.log('Deserializing');
        const user = await usersDao.getUserById(id) 
        done(null, user)
    })

}

module.exports = { initPassport }