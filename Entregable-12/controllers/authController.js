const loginUser = async (req, res) => {
    const { username, password } = req.body
    req.session.user = username
    req.session.admin = true
    res.redirect('/')
}

const renderLoginScreen = async (req, res) => {
    res.status(200).render('login.ejs')
}

const renderLogoutScreen = async (req, res) => {
    res.status(200).render('logout.ejs')
}

const renderSignUpScreen = async (req, res) => {
    res.status(200).render('signup.ejs')
}

const signUpUser = async (req, res) => {
    const { username, password } = req.body

}



module.exports = { renderLoginScreen, renderLogoutScreen, loginUser}