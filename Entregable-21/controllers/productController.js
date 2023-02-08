const productsApi = require('../api/productsApi.js')
const { validateFullFields, validateCredentials } = require('../utils/validation/validation')
const { logDebug } = require('../loggers/logger')

const getProducts = async (req, res) => {
       return res.status(200).json(await productsApi.getAllProducts())
}

const getProduct = async (req, res) => {
    const { id } = req.params
    return res.json(await productsApi.getProduct(id))
}

const addProduct = async (req, res) => {
    const {id, name, description, price, stock, thumbnail} = req.body
    const product = {id, name, description, price, stock, thumbnail}
    logDebug(product)
    return res.json(await productsApi.addProduct(product)) 
}

const updateProduct = async (req, res) => {
    const { id } = req.params
    const {name, description, price, stock, thumbnail, credential} = req.body
    const newObject = {name, description, price, stock, thumbnail}
    if (validateCredentials(credential).validated) {
        return res.json(await productsApi.updateProduct(id, newObject))
    } else {
        return res.json(validateCredentials(credential))
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params
    const { credential } = req.body
    if (validateCredentials(credential).validated) {
        return res.json(await productsApi.deleteProduct(id))
    } else {
        return res.json(validateCredentials(credential))
    }
}



module.exports = { getProducts, getProduct, addProduct, updateProduct, deleteProduct}