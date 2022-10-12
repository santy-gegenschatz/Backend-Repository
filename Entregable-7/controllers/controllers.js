const Products = require('../classes/products')
const { validateFullFields } = require('../validation/validation')

const getProducts = async (req, res) => {
    return res.status(200).json(Products.getProducts())
}

const getProduct = async (req, res) => {
    const { id } = req.params
    return res.json(Products.getProduct(id))
}

const addProduct = async (req, res) => {
    const attributes = req.body
    if (validateFullFields(attributes).validated) {
        return res.json(Products.add(attributes))   
    } else {
        return res.json((validateFullFields(attributes)))
    }
}

const updateProduct = async (req, res) => {
    const { id } = req.params
    const attributes = req.body
    res.json(Products.editProduct(id, attributes))
}

const deleteProduct = async (req, res) => {
    const { id } = req.params
    res.json(Products.deleteProduct(id))
}



module.exports = { getProducts, getProduct, addProduct, updateProduct, deleteProduct}