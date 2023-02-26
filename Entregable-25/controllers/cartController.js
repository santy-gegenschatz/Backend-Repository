const cartsApi = require('../api/cartsApi')
const { logDebug } = require('../loggers/logger')

const getCart = async (req, res) => {
    const { id } = req.params
    res.json(await cartsApi.getCart(id))
}

const createCart = async (req, res) => {
    res.json(await cartsApi.createCart())
}

const addItemToCart = async (req, res) => {
    const { id, id_prod} = req.params
    res.json(await cartsApi.addItemToCart(id, id_prod))
}

const deleteCartItem = async (req, res) => {
    const { id, id_prod} = req.params
    res.json(await cartsApi.deleteCartItem(id, id_prod))
}

const deleteCart = async (req, res) => {
    const { id } = req.params
    res.json(await cartsApi.deleteCart(id))
}

module.exports = {getCart, createCart, addItemToCart, deleteCartItem, deleteCart}