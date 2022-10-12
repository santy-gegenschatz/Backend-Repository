const Products = require('../classes/products')
const { validateFullFields } = require('../validation/validation')

const getProducts = async (req, res) => {
    return res.status(200).json(Products.getProducts())
}

const getProduct = async (req, res) => {
    const { id } = req.params
    console.log('ID: ', id, typeof(id));
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
    console.log('Type of id: ', typeof(id));
    console.log('Attributes: ', attributes);
    res.json(Products.editProduct(id, attributes))
}



module.exports = { getProducts, getProduct, addProduct, updateProduct}