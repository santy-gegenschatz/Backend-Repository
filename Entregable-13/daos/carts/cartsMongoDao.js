const Container = require('../../containers/mongoDbContainer')
const productsDao = require('../products/index')
const { carts } = require('../../models/mongoDbSchemas/carts')

class CartsMongoDao {
    constructor() {
        this.container = new Container('carts')
    }

    async addItemToCart(idCart, idProduct) {
        // Then, make sure the cart exists, the product exists and the product has stock
        const cartResponse = await this.getCart(idCart)
        const productResponse = await productsDao.getProduct(idProduct)
        if (cartResponse.code === 200) {
            if (productResponse.code === 200) {
                if (stockResponse.code === 200) {
                    // Check the product has stock
                    const stockResponse = productsDao.productHasStock(idProduct) // We already know the product exists, so the response needs no error handling
                    // Then, add the product to the cart and then decrease the stock
                    const addReponse = await this.up

                    cart.add(product)
                    Products.decreaseStock(product)
                    this.saveToPersistentMemory(this.items)
                    return this.throwSuccess(`Successfully added ${product.name} to cart ${cart.id}`, {cart, product})
                } else {
                    return this.throwError('There is not enough stock of the product')
                }
            } else {
                return this.throwError('The product id does not match any product')
            }
        } else {
            return this.throwError('The cart id does not match any cart')
        }

    }

    createCart() {
        const cart = new Cart(this.assignId())
        this.items.push(cart)
        this.saveToPersistentMemory(this.items)
        return this.throwSuccess('Cart succesfully created', cart)
    }

    deleteCart(id) {
        const convertedCartId = Number(id)
        const cartIndex = this.items.findIndex((cart) => cart.id === convertedCartId)
        if (cartIndex !== -1) {
            const removed = this.items.splice(cartIndex)
            this.saveToPersistentMemory(this.items)
            return this.throwSuccess('The cart has been successfully deleted', {deleted: removed[0]})
        } else {
            return this.throwError('The id does not match with any cart')
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

    async findCart(id) {
        const response = await this.container.getByKey(carts, {id: id})
        if (this.isNotError(response)) {
            return response
        }

    }

    async getCart(id) {
        const response = await this.container.getById(carts, id)
        if (this.isNotError(response)) {
            return this.throwSuccess('Cart obtained', response)
        } else {
            this.throwError('Could not find a cart with that id. Please try again.')
        }
    }

    isNotError(response) {
        if (!Error.prototype.isPrototypeOf(response)) {
            return true
        } else {
            return false
        }
    }

    async readCarts() {
        this.items = await this.container.read()
    }

    saveToPersistentMemory(object) {
        this.container.save(object)
    }

    throwSuccess(message, payload) {
        return {code: 200, message, payload}
    }

    throwError(message) {
        return {code: 500, message}
    }

}

module.exports = new CartsMongoDao()