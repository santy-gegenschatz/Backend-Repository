const auth = (req, res, next) => {
    if (req.session?.user && req.session?.admin) {
        return next()
    }

    return res.redirect('/auth/login')
}

module.exports = { auth }