const usersDao = require('../daos/users/index')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bCrypt = require('bcrypt')
const { serializeUser } = require('passport')

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
            return done('userdoesnotexist', false)
        }
        
        // User does exist, retreive it from MongoDB
        const user = await usersDao.getUser(username)
        console.log('User returned: ', user);
        if (!isValidPassword(user, password)) {
            return done('wrongpassword', false)
        }
        console.log('All valid');
        // If the user exists && the password is valid
        return done(null, user) // This will get passed to the serialize user method defined below
    }))

    passport.use('signup', new LocalStrategy({passReqToCallback: true}, 
        async (req, username, password, done) => {
        // First check if the username is available
        const usernameAvailable = await usersDao.checkUserNameAvailable(username)
        if (!usernameAvailable) {
            return done('usernametaken', false)
        }

        // Create a new User
        const newUser = {
            username,
            password: createHash(password)
        }

        // Add the user to the mongodbDatabase
        const addedUser = await usersDao.add(newUser)
        console.log('The added user is: ', addedUser, 'end');
        return done(null, addedUser)
    }))

    passport.serializeUser((user, done) => {
        console.log('Serializing');
        done(null, user._id)
        console.log('Serialized');
    })

    passport.deserializeUser( async (id, done) => {
        console.log('Deserializing');
        const user = await usersDao.getUserById(id) 
        done(null, user)
    })

}

module.exports = { initPassport }