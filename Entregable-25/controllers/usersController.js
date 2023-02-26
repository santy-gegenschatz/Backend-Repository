const { logDebug } = require("../loggers/logger")
const usersApi = require("../api/usersApi")

const addProductToCart = async (req, res) => {
    try {
        const { user } = req
        const { productId } = req.body
        const response = await usersApi.addProductToCart(user.id, productId)
        return res.json(response)
    } catch (err) {
        logDebug(err)
        return res.json({error: 'Unknwon error'})
    }
}

const completePurchase = async (req, res) => {
    try {
        const { user } = req
        const response = await usersApi.completePurchase(user.id)
        return res.json(response)
    } catch (err) {
        logDebug(err)
        return res.json({error: 'Unknwon error'})
    }
}

module.exports = { addProductToCart, completePurchase }