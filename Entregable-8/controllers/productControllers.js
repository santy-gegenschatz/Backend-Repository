const { validateFullFields, validateCredentials } = require('../validation/validation')
const { SqlContainer } = require('../containers/dbContainer')
const { options } = require('../database/mysql.config')
const Database = new SqlContainer(options, 'products')

const getProducts = async (req, res) => {
       return res.status(200).json(await Database.getAll())
}

const getProduct = async (req, res) => {
    const { id } = req.params
    return res.json(await Database.getById(id))
}

const addProduct = async (req, res) => {
    const {name, description, price, stock, thumbnail, credential} = req.body
    const attributes = {name, description, price, stock, thumbnail}
    if (validateCredentials(credential).validated) {
        if (validateFullFields(attributes).validated) {
            return res.json(await Database.add(attributes))   
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
        return res.json(await Database.updateById(id, attributes))
    } else {
        return res.json(validateCredentials(credential))
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params
    const { credential } = req.body
    if (validateCredentials(credential).validated) {
        return res.json(await Database.deleteById(id))
    } else {
        return res.json(validateCredentials(credential))
    }
}



module.exports = { getProducts, getProduct, addProduct, updateProduct, deleteProduct}