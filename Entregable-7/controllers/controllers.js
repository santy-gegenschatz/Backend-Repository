const Products = require('../classes/products')

const getProducts = async (req, res) => {
    console.log('1');
    return res.status(200).json(Products.getProducts())
}

const getProduct = async (req, res) => {
    const { id } = req.params
    return res.json(Products.getProduct(id))
}

const addProduct = async (req, res) => {
    const attributes = req.body
    console.log(attributes);
    return res.json(Products.add(attributes))   
}

module.exports = { getProducts, getProduct, addProduct}