const cartsDao = require('../daos/carts/index')

const getCart = async (req, res) => {
    const { id } = req.params
    res.json(await cartsDao.getCart(id))
}

const createCart = async (req, res) => {
    res.json(await cartsDao.createCart())
}

const addItemToCart = async (req, res) => {
    const { id, id_prod} = req.params
    res.json(await cartsDao.addItemToCart(id, id_prod))
}

const deleteCartItem = async (req, res) => {
    const { id, id_prod} = req.params
    res.json(await cartsDao.deleteCartItem(id, id_prod))
}

const deleteCart = async (req, res) => {
    const { id } = req.params
    res.json(await cartsDao.deleteCart(id))
}

module.exports = {getCart, createCart, addItemToCart, deleteCartItem, deleteCart}