const Container = require('../../containers/mongoContainer') 
const { products } = require('../../models/mongoDbSchemas/products')
const { logError } = require('../../loggers/logger')


class ProductsMongoDao {
    constructor() {
        const isLocal = process.env.PRODUCTS_API_CONTAINER === 'mongoLocal' ? true : false
        this.container = new Container('products', isLocal)
    }

    async add(product) {
        try {
            const response = await this.container.add(products, product)
            return response
        } catch (err) {
            return this.throwError('Could not add product to the DB.')
        }
    }

    async delete(id) {
        try {
            return await this.container.delete(products, id)
        } catch (err) {
            return this.throwError('Could not delete product from the DB.')
        }
    }

    async get(id) {
        try {
            const response = await this.container.getById(products, id)
            return response
        } catch (err) {
            return this.throwError('Could not get product from the DB.')
        }
    }

    async getAll() {
        try {
            const response = await this.container.getAll(products)
            return response
        } catch (err) {
            return this.throwError('Could not get all products from the DB.')
        }
    }

    async update(id, newObject) {
        try {
            const response = await this.container.updateFieldById(products, id, newObject)
            return response
        } catch (err) {
            return this.throwError('Could not update product in the DB.')
        }
    }

    throwError(message) {
        return {code: 500, message}
    }

}

module.exports = new ProductsMongoDao()
