const { logDebug } = require("../loggers/logger")
const usersDao = require("../daos/users/index")

const addProductToCart = async (req, res) => {
    try {
        const { user } = req
        const { productId } = req.body
        const response = await usersDao.addProductToCart(user.id, productId)
        logDebug('--- Controller Response ---')
        logDebug(response)
        return res.json(response)
    } catch (err) {
        logDebug(err)
        return res.json({error: 'Unknwon error'})
    }
}

module.exports = { addProductToCart }