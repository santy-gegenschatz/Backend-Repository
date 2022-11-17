const auth = (req, res, next) => {
    if (req.session?.user && req.session?.admin) {
        return next()
    }

    return res.status(401).send('Authorization error')
}

module.exports = { auth }