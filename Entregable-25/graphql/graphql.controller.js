const productsApi = require('../api/productsApi');

const addProduct = async (args) => {
    const {id, name, description, price, stock, thumbnail} = args
    const product = {id, name, description, price, stock, thumbnail}
    const response = await productsApi.addProduct(product);
    if (response.code === 200) {
        return response.payload;
    } else {
        return null
    }
}

const deleteProduct = async (args) => {
    const { id } = args;
    const response = await productsApi.deleteProduct(id);
    if (response.code === 200) {
        return response
    } else {
        return false
    }
}

const getProducts = async () => {
    const products = await productsApi.getAllProducts();
    return products.payload;
}

// What we do here is destructure the id attribute of the args object
const getProduct = async ( {id} ) => {
    const response = await productsApi.getProduct(id)
    if (response.code === 200) {
        return response.payload;
    } else {
        return null
    }
}

const updateProduct = async (args) => {
    const { id, name, description, price, stock, thumbnail } = args;
    const product = {name, description, price, stock, thumbnail };
    const response = await productsApi.updateProduct(id, product);
    if (response.code === 200) {
        return response.payload;
    } else {
        return null
    }
}


module.exports = { getProduct, getProducts, getProduct, getProducts, addProduct, updateProduct, deleteProduct}