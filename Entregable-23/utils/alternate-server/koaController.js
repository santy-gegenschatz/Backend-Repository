const productsApi = require('../../api/productsApi');

const getProduct = async (ctx) => {
    const { id } = ctx.params;
    const product = await productsApi.getProduct(id);
    ctx.response.body = product.payload;
}

const getProducts = async (ctx) => {
    const products = await productsApi.getAllProducts();
    ctx.response.body = products.payload;
}

const addProduct = async (ctx) => {
    const product = ctx.request.body;
    const newProduct = await productsApi.addProduct(product);
    ctx.response.body = newProduct.payload;
}

const updateProduct = async (ctx) => {
    const { id } = ctx.params;
    const product = ctx.request.body;
    const updatedProduct = await productsApi.updateProduct(id, product);
    ctx.response.body = updatedProduct.payload;
}

const deleteProduct = async (ctx) => {
    const { id } = ctx.params;
    const deletedProduct = await productsApi.deleteProduct(id);
    ctx.response.body = deletedProduct.payload;
}

module.exports = { getProducts, getProduct, addProduct, updateProduct, deleteProduct }
