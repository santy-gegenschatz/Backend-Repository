const productsDao = require('../factory/productsFactory')
const { logDebug } = require('../loggers/logger')

class ProductsApi {
    constructor() {
        this.productsDao = productsDao
    }

    async addProduct(product) {
        try {
            // First of all, check if the id is coming or not in the product object
            if (typeof product.id === 'undefined') {
                // If it is not coming, we need to create a new product
                // Create the product
                const response = await this.productsDao.add(product)
                return this.throwSuccess('New item added to the database', response)
            } else {
                // If it is coming, we need to check if it is valid or not
                if (!mongoose.Types.ObjectId.isValid(product.id) || typeof product.id === 'number') {
                    // If it is not valid, we need to return an error message
                    return this.throwError('The id is not valid')
                } else {
                    // If it is coming and it is valid, we need to check if it is already in the DB or not
                    const response = await this.productsDao.get(product.id)
                    if (this.isNotError(response)) {
                        if (response) {
                            // Update Stock
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
                }
            }
        } catch (err) {
            return this.throwError('Could not add product to the DB.')
        }

    }

        
    async decreaseStock(id, decreaseAmount) {
        // Find the product in the DB
        // Get the current stock
        let { stock } = await this.productsDao.get(id)
        // Update the stock
        stock -= decreaseAmount 
        if (stock >= 0) {
            await this.productsDao.update(id, {stock: stock})
            return true
        } else {
            return new Error('Not enough stock to perform operation')            
        }
    }

    async deleteProduct(id) {
        const response = await this.productsDao.delete(id)
        if (response) {
            return this.throwSuccess('Product deleted: ', response)
        }
        return this.throwError('The id is incorrect')
    }

    async getProduct(id) {
        try {
            const response = await this.productsDao.get(id)
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
        const response = await this.productsDao.getAll()
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
        const { stock } = await this.productsDao.get(id)
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
        const response = await this.productsDao.update(id, newObject)
        if (response) {
            const updatedProduct = await this.getProduct(id)
            return this.throwSuccess('Here is how the product looks now: ', updatedProduct.payload)
        }

        return this.throwError('The id did not match any object')
    }


}

module.exports = new ProductsApi()