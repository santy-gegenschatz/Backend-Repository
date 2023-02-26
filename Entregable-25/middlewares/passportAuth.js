const checkAuthentication = async (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    } else {
        const { url } = req
        if (url === '/') {
            res.redirect('/auth/login')
        } else {
            res.redirect('/auth/unauthorized')
        }
    }
}

module.exports = { checkAuthentication }