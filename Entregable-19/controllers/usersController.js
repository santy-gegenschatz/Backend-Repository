const { logDebug } = require("../loggers/logger")
const usersDao = require("../daos/users/index")

const addProductToCart = async (req, res) => {
    try {
        const { user } = req
        const { productId } = req.body
        logDebug(user)
        usersDao.addProductToCart(user.id, productId)
    } catch (err) {
        logDebug(err)
        return res.json({error: 'Unknwon error'})
    }
}

module.exports = { addProductToCart }