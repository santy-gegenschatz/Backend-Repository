const Container = require('../../containers/mongoDbContainer') 
const mongoose = require('mongoose')
const { products } = require('../../models/mongoDbSchemas/products')


class ProductsMongoDao {
    constructor() {
        this.container = new Container('products', true)
    }

    async addProduct(product) {
        try {
            // First, check if the product exists
            // That implies checking the id is valid
            if (!mongoose.Types.ObjectId.isValid(product.id)) {
                return {error : false}
            }
            const response = await this.container.getById(products, product.id)
            console.log(response);
            if (response) {
                // Update Stock
                const response = await this.container.updateFieldById(products, product.id, stock, product.stock + Number(response.stock))
                return this.throwSuccess('Item already in the database. Stock augmented')
            } else {
                // Create the product
                const response = await this.container.add(products, product)
                return this.throwSuccess('New item added to the database', response)
            }
        } catch (err) {
            return err
        }

    }

    async getProduct(id) {
        console.log(id);
        const response = await this.container.getById(products, id)
        console.log('DAO: Response Obtained', response);
        return this.throwSuccess('Product recovered from the DB', response)
    }

    async getAllProducts() {
        const response = await this.container.getAll(products)
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
