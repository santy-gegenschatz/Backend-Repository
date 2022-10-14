const Carts = require('../classes/carts')

const getCart = async (req, res) => {
    const { id } = req.params
    res.json(Carts.getCart(id))
}

const createCart = async (req, res) => {
    res.json(Carts.createCart())
}

const addItemToCart = async (req, res) => {
    const { id, id_prod} = req.params
    res.json(Carts.addItemsToCart(id, id_prod))
}

const deleteCartItem = async (req, res) => {
    res.json('Deleting item from cart')
}

const deleteCart = async (req, res) => {
    res.json('Deleting cart')
}

module.exports = {getCart, createCart, addItemToCart, deleteCartItem, deleteCart}