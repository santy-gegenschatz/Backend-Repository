const Container = require('../../containers/sqlContainer')
const productsDao = require('../products/index')

class Carts {
    constructor() {
        this.container = Container
        this.tablename = process.env.CARTS_COLLECTION_NAME
        this.secondaryTablename = process.env.CARTS_SECONDARY_TABLENAME
        this.productsDao = productsDao
    }

    async addItemToCart(idCart, idProduct) {
        // Check the cart exists
        const cartResponse = await this.getCart(idCart)
        if (cartResponse.code === 200) {
            // Check product exists
            const productResponse = await this.productsDao.getProduct(idProduct)
            if (productResponse.code === 200) {
                // Check the products has stock
                const stockResponse = await this.productsDao.productsHasStock(idProduct)
                if (stockResponse) {
                    // Add a row to the table that lists products that have been ordered

                } else {
                    return this.throwError('There is not enough stock of the selected product to perform your request.')
                }
            } else {
                return this.throwError('Item could not be added. Please check the provided product id.')
            }
        } else {
            return this.throwError('Item could not be added. Please check the provided cart id.')
        }

    }

    async createCart() {
        console.log('Creating');
        const newCart = {creationDate: new Date()}
        const response = await this.container.create(this.tablename, newCart)
        if(this.isNotError(response)) {
            return this.throwSuccess('Cart created', {id: response})
        } else {
            return this.throwError('There was an unknown error creating the cart.')
        }
    }

    async deleteCart(id) {
        const response = await this.container.delete(this.tablename, id)
        if (this.isNotError(response)) {
            return this.throwSuccess(`Cart with id ${id} successfully deleted.`)
        } else {
            return this.throwError('Could not delete cart. Please check the provided id.')
        }
    }

    deleteCartItem(idCart, idProduct) {
        const convertedCartId = Number(idCart)
        const convertedProductId = Number(idProduct)
        const cart = this.find(convertedCartId)
        if (cart) {
            if (cart.removeItem(convertedProductId)) {
                this.saveToPersistentMemory(this.items)
                return this.throwSuccess('Product removed from the cart', cart)
            } else {
                return this.throwError('The if of the product does not match a product in the cart')
            }
        } else {
            return this.throwError('The id of the cart does not match any cart')
        }

    }

    async getCart(id) {
        const response = await this.container.getById(this.tablename, id)
        if (this.isNotError(response)) {
            return this.throwSuccess('Cart successfully retrieved.', response)
        } else {
            return this.throwError('Could not find a cart with the given id in our DB.')
        }
    }

    isNotError(response) {
        if (!Error.prototype.isPrototypeOf(response)) {
            return true
        } else {
            return false
        }
    }

    throwError(message) {
        return {code: 500, message}
    }

    throwSuccess(message, payload) {
        return {code: 200, message, payload}
    }

}

module.exports = new Carts()