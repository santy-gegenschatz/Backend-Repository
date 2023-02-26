const productsApi = require('../api/productsApi.js')

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
    return res.json(await productsApi.addProduct(product)) 
}

const updateProduct = async (req, res) => {
    const { id } = req.params
    const { name, description, price, stock, thumbnail } = req.body
    const newObject = { name, description, price, stock, thumbnail }
    return res.json(await productsApi.updateProduct(id, newObject))
}

const deleteProduct = async (req, res) => {
    const { id } = req.params
    return res.json(await productsApi.deleteProduct(id))
}



module.exports = { getProducts, getProduct, addProduct, updateProduct, deleteProduct}