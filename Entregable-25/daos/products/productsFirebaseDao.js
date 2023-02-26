const Container = require('../../containers/firebaseContainer') 
const { logError } = require('../../loggers/logger')

class ProductsFirebaseDao {
    constructor() {
        this.container = Container
        this.collectionName = process.env.PRODUCTS_COLLECTION_NAME
    }

    async addProduct(product) {
        // First, check if the product id matches with one in the firebase
        const response = await this.container.getById(this.collectionName, product.id)
        if (!Error.prototype.isPrototypeOf(response)) {
            // call update product
            const newObject = {stock: response.stock + product.stock}
            return await this.updateProduct(product.id, newObject)
        } else {            
            const response2 = await this.container.create(this.collectionName, product)
            if (!Error.prototype.isPrototypeOf(response2)) {
                return this.throwSuccess('Product added to the firebase')
            } else {
                return this.throwError('Something terrible happenned. Sorry.')
            }
        }
    }

    async getAllProducts() {
        try {
            const response = await this.container.getAll(this.collectionName)
            return response
        } catch (err) {
            logError(err)
            return new Error(err)
        }
    }

    async getProduct(id) {
        const response = await this.container.getById(this.collectionName, id)
        if (!Error.prototype.isPrototypeOf(response)) {
            return this.throwSuccess('A product has been obtained.', response)
        } else {
            return this.throwError('Oops. Something went wrong.')
        }

    }

    async updateProduct(id, newObject) {
        const response = await this.container.updateById(this.collectionName, id, newObject)
        if (!Error.prototype.isPrototypeOf(response)) {
            return this.throwSuccess('Product updated', response)
        } else {
            return this.throwError('Something went wrong. Check the Id is correct')
        }
    }

    async deleteProduct(id) {
        const exists = await this.getProduct(id)
        if (exists.code === 500) {
            return this.throwError('Something went wrong. Check the Id is correct')
        } else {
            const response = this.container.delete(this.collectionName, id)
            if (!Error.prototype.isPrototypeOf(response)) {
                return this.throwSuccess('Product deleted')
            } else {
                return this.throwError('Something went wrong')
            }
        }
    }


    async productHasStock(id) {
        const product = await this.getProduct(id)
        if (product.code === 200) {
            if (product.stock >= 1) {
                return true
            } else {
                return false
            }
        } else {
            return new Error('product not found')
        }
    }

    async decreaseStock(id, decreaseAmount) {
        const product = await this.getProduct(id)
        if (product.code === 200) {
            if (product.stock >= 1) {
                this.updateProduct(id, {stock: product.stock - 1})
            } else {
                return new Error('Stock cannot be negative')
            }
        } else {
            return new Error('product not found')
        }
    }

    throwSuccess(message, payload) {
        return {code: 200, message, payload}
    }

    throwError(message) {
        return {code: 500, message}
    }
}

module.exports = new ProductsFirebaseDao()
