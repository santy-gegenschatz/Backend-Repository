const productsDao = require('../daos/products/index')
const { validateFullFields, validateCredentials } = require('../utils/validation/validation')

const getProducts = async (req, res) => {
       return res.status(200).json(await productsDao.getAllProducts())
}

const getProduct = async (req, res) => {
    const { id } = req.params
    return res.json(await productsDao.getProduct(id))
}

const addProduct = async (req, res) => {
    const {id, name, description, price, stock, thumbnail, credential} = req.body
    const product = {id, name, description, price, stock, thumbnail}
    if (validateCredentials(credential).validated) {
        if (validateFullFields(product).validated) {
            return res.json(await productsDao.addProduct(product))   
        } else {
            return res.json((validateFullFields(product)))
        }
    } else {
        return res.json(validateCredentials(credential))
    }
}

const updateProduct = async (req, res) => {
    const { id } = req.params
    const {name, description, price, stock, thumbnail, credential} = req.body
    const newObject = {name, description, price, stock, thumbnail}
    if (validateCredentials(credential).validated) {
        return res.json(await productsDao.updateProduct(id, newObject))
    } else {
        return res.json(validateCredentials(credential))
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params
    const { credential } = req.body
    if (validateCredentials(credential).validated) {
        return res.json(await productsDao.deleteProduct(id))
    } else {
        return res.json(validateCredentials(credential))
    }
}



module.exports = { getProducts, getProduct, addProduct, updateProduct, deleteProduct}