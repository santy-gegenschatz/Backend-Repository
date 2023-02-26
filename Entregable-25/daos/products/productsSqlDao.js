const Container = require('../../containers/sqlContainer') 

class Products {
    constructor() {
        this.container = Container
        this.tablename = process.env.PRODUCTS_COLLECTION_NAME
    }

    async addProduct(product) {
        // Check if the id corresponds to a product of the database
        const response = await this.container.getById(this.tablename, product.id)
        if (!this.isError(response)) {
            const {id, ...rest} = product
            return this.updateProduct(id, rest)
        } else {
            if (response.message !== 'Err') {
                const {id, ...rest} = product
                const response2 = await this.container.create(this.tablename, rest)
                if (!this.isError(response2)) {
                    return this.throwSuccess('Product added to the database')
                } else {
                    return this.throwError('Could not add the product to the database')
                }
            }  else {
                return this.throwError('Wrong id')
            }
        }
    }

    async getAllProducts() {
        const response = await this.container.getAll(this.tablename)
        if (!this.isError(response)) {
            return this.throwSuccess('Products obtained', response)
        } else {
            return this.throwError('There was a problem retrieving the products from the DB') 
        }
    }

    async getProduct(id) {
        const response = await this.container.getById(this.tablename, id)
        if (!this.isError(response)) {
            return this.throwSuccess('Product successfully obtained', response)
        } else {
            return this.throwError('Oops. Something went wrong. Please check the product id.')
        }
    }

    async updateProduct(id, newObject) {
        // Check if the product exists
        const response = await this.container.getById(this.tablename, id)
        if (!this.isError(response)) {
            const response2 = await this.container.update(this.tablename, id, newObject)
            if (!this.isError(response2)) {
                return this.throwSuccess('The product was updated')
            } else {
                return this.throwError('Ooops. There was an unknown problem updateing your product')
            }
        } else {
            return this.throwError('Oops. There was a problem. Check the product id you submitted.')
        }
    }

    async deleteProduct(id) {
        const response = await this.container.delete(this.tablename, id)
        if (!this.isError(response)) {
            return this.throwSuccess('Product deleted')
        } else {
            return this.throwError('Oops. There was a problem deleting the product. Please check the productId you have provided.')
        }
    }

    isError(response) {
        return Error.prototype.isPrototypeOf(response)
    }

    decreaseStock(prod, decreaseAmount) {
        let stock = Number(prod.stock)
        stock -= 1
        prod.stock = stock
        this.saveToPersistentMemory(this.items)
    }

    productHasStock(id) {
        const product = this.find(id)
        return this.find(id).stock >= 1 
    }

    throwSuccess(message, payload) {
        return {code: 200, message, payload}
    }

    throwError(message) {
        return {code: 500, message}
    }
}

module.exports = new Products()
