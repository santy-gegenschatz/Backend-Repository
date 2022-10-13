const Carts = require('../classes/carts')

const getCart = async (req, res) => {
    const { id } = req.params
    res.json(Carts.getCart(id))
}

const createCart = async (req, res) => {
    res.json(Carts.createCart())
}

const addItemsToCart = async (req, res) => {
    res.json('Adding items to cart')
}

const deleteCartItem = async (req, res) => {
    res.json('Deleting item from cart')
}

const deleteCart = async (req, res) => {
    res.json('Deleting cart')
}

module.exports = {getCart, createCart, addItemsToCart, deleteCartItem, deleteCart}