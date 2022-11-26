const { response } = require('express');
const Container = require('../../containers/mongoDbContainer') 
const { products } = require('../../models/mongoDbSchemas/products')

class ProductsMongoDao {
    constructor() {
        this.container = new Container('products', true)

    }

    async addProduct(product) {
        // First, check if the product exists
        const response = await this.container.getById(product.id)
        console.log(response);
        if (response) {
            // Update Stock
            const response = await this.container.updateFieldById(products, product.id, stock, product.stock + Number(response.stock))
            return this.throwSuccess('Item already in the database. Stock augmented')
        } else {
            // Create the product
            const response = await this.container.add(product)
            return this.throwSuccess('New item added to the database')
        }

    }

    async getProduct(id) {
        console.log(id);
        const response = await this.container.getByKey(products, '_id', id)
        console.log('DAO: Response Obtained', response);
        return response
    }

    async getAllProducts() {
        const response = await this.container.getAll(products)
        console.log('DAO: Response Obtained', response);
        return this.throwSuccess('Here are the Products', response)
    }

    async updateProduct(id, field, value) {
        const response = await this.container.updateFieldById(products, id, field, value)
        return this.throwSuccess('Here is how the product looks now: ', response)
    }

    async deleteProduct(id) {
        const response = await this.container.delete(products, id)
        return this.throwSuccess('Product deleted: ', response)
    }

    async decreaseStock(id, decreaseAmount) {
        // Find the product in the DB
        // Get the current stock
        const { stock } = await this.container.getByKey(products, '_id', id)
        // Update the stock
        if (stock - decreaseAmount >= 0) {
            const response = await this.container.updateFieldById(products, id, 'stock', value)
            return true
        } else {
            return new Error('Not enough stock to perform operation')            
        }
    }

    async productHasStock(id) {
        const { stock } = await this.container.getByKey(products, '_id', id)
        stock > 0 ? true : false 
    }

    throwSuccess(message, payload) {
        return {code: 200, message, payload}
    }

    throwError(message) {
        return {code: 500, message}
    }
}

module.exports = new ProductsMongoDao()
