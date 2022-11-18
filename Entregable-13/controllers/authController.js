const loginUser = async (req, res) => {
    const { username, password } = req.body
    req.session.user = username
    req.session.password = password
    req.session.admin = true
    res.redirect('/')
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
    console.log(req.body);
    res.redirect('/')
}

module.exports = { renderLoginScreen, renderLogoutScreen, renderSignUpScreen, loginUser, signUpUser, logoutUser, renderUnauthorizedScreen}