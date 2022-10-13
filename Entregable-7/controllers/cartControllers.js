const getCart = async (req, res) => {
    res.json('Getting Cart')
}

const createCart = async (req, res) => {
    res.json('Creating cart')
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