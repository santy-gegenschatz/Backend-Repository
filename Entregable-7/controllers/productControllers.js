const Products = require('../classes/products')
const { validateFullFields, validateCredentials } = require('../validation/validation')

const getProducts = async (req, res) => {
    return res.status(200).json(Products.getProducts())
}

const getProduct = async (req, res) => {
    const { id } = req.params
    return res.json(Products.getProduct(id))
}

const addProduct = async (req, res) => {
    const {id, name, description, price, stock, thumbnail, credential} = req.body
    const attributes = {id, name, description, price, stock, thumbnail}
    if (validateCredentials(credential).validated) {
        if (validateFullFields(attributes).validated) {
            return res.json(Products.add(attributes))   
        } else {
            return res.json((validateFullFields(attributes)))
        }
    } else {
        return res.json(validateCredentials(credential))
    }
}

const updateProduct = async (req, res) => {
    const { id } = req.params
    const {name, description, price, stock, thumbnail, credential} = req.body
    const attributes = {name, description, price, stock, thumbnail}
    if (validateCredentials(credential).validated) {
        return res.json(Products.editProduct(id, attributes))
    } else {
        return res.json(validateCredentials(credential))
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params
    const { credential } = req.body
    if (validateCredentials(credential).validated) {
        return res.json(Products.deleteProduct(id))
    } else {
        return res.json(validateCredentials(credential))
    }
}



module.exports = { getProducts, getProduct, addProduct, updateProduct, deleteProduct}