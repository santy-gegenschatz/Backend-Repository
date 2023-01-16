const mongoose = require('mongoose')
const Container = require('../../containers/mongoContainer') 
const { products } = require('../../models/mongoDbSchemas/products')
const { logError } = require('../../loggers/logger')


class ProductsMongoDao {
    constructor() {
        const isLocal = process.env.PRODUCTS_API_CONTAINER === 'mongoLocal' ? true : false
        this.container = new Container('products', isLocal)
    }

    async addProduct(product) {
        try {
            // First, check if the product exists
            // That implies checking the id is valid
            console.log(typeof product.id);
            if (!mongoose.Types.ObjectId.isValid(product.id) || typeof product.id === 'number') {
                return {error : false}
            }
            const response = await this.container.getById(products, product.id)
            if (this.isNotError(response)) {
                if (response) {
                    // Update Stock
                    console.log('Updating field');
                    const object = { stock :  Number(product.stock) + Number(response.stock)}
                    const response2 = await this.container.updateFieldById(products, product.id, object)
                    return this.throwSuccess('Item already in the database. Stock augmented', response2)
                } else {
                    // Create the product
                    const response = await this.container.add(products, product)
                    return this.throwSuccess('New item added to the database', response)
                }
            } else {
                return this.throwError('Could not add product to the DB.')    
            }
        } catch (err) {
            return this.throwError('Could not add product to the DB.')
        }

    }

    async decreaseStock(id, decreaseAmount) {
        // Find the product in the DB
        // Get the current stock
        const { stock } = await this.container.getByKey(products, {_id: id})
        // Update the stock
        const value = stock - decreaseAmount 
        if (value >= 0) {
            const response = await this.container.updateFieldById(products, id, {stock: value})
            return true
        } else {
            return new Error('Not enough stock to perform operation')            
        }
    }

    async deleteProduct(id) {
        const response = await this.container.delete(products, id)
        if (response) {
            return this.throwSuccess('Product deleted: ', response)
        }
        return this.throwError('The id is incorrect')
    }

    async getProduct(id) {
        try {
            const response = await this.container.getById(products, id)
            if (this.isNotError(response)) {
                return this.throwSuccess('Product recovered from the DB', response)
            } else {
                return this.throwError('There was an error retrieving the product with the given id in our DB.')
            }
        } catch (err) {
            return this.throwError('Unknown error')
        }
    }

    async getAllProducts() {
        const response = await this.container.getAll(products)
        if (this.isNotError(response)) {
            return this.throwSuccess('Here are the Products', response)
        } else {
            return this.throwError('There was an error and products could not be retrieved')
        }
    }

    isNotError(response) {
        if (!Error.prototype.isPrototypeOf(response)) {
            return true
        } else {
            return false
        }
    }

    async productHasStock(id) {
        const { stock } = await this.container.getByKey(products, {_id: id})
        console.log('Stock: ', stock);
        if (stock > 0) {
            return true
        }
        return false
    }

    throwSuccess(message, payload) {
        return {code: 200, message, payload}
    }

    throwError(message) {
        return {code: 500, message}
    }

    async updateProduct(id, newObject) {
        const response = await this.container.updateFieldById(products, id, newObject)
        if (response) {
            return this.throwSuccess('Here is how the product looks now: ', await this.getProduct(id))
        }

        return this.throwError('The id did not match any object')
    }
}

module.exports = new ProductsMongoDao()
