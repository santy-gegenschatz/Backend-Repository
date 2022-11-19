let users = []
const bcrypt = require('bcrypt')
const saltRounds = 10;

const loginUser = async (req, res) => {
    const { username, password } = req.body
    console.log('Trying to log in: ', username, password);
    // First, find the user among the userDB, in this case a simple array in memory
    const user = users.find( (user) => user.username === username)
    if (!user) {
        return res.json({error: 'username does not mach any register in the database'})
    }
    console.log('User found:', user);
    bcrypt.compare(password, user.password, function(err, result) {
        // returns result
        if (result) {
            req.session.user = username
            req.session.admin = true
            res.redirect('/')
        } else {
            res.redirect('/auth/unauthorized')
        }
      });
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
    console.log(req);
    const { username, password} = req.body
    console.log(username, password);
    const user = users.find ((user) => user.username === username)

    // Check that username is available
    if (user) {
        return res.json({error: 'The username is already taken. Please select a different one'})
    }

    // Create a new user, given that the username is free
    bcrypt.hash(password, saltRounds, (err, hash) => {
        console.log('Hash:', hash);
        const newUser = {
            username,
            password: hash
        }
        
        users.push(newUser)
        res.send('/auth/signup')
    })

}

module.exports = { renderLoginScreen, renderLogoutScreen, renderSignUpScreen, loginUser, signUpUser, logoutUser, renderUnauthorizedScreen}