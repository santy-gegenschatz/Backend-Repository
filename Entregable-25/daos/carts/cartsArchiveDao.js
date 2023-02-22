const Container = require('../../containers/archiveContainer')
const Cart = require('../../models/cart')
const productsDao = require('../../factory/productsFactory')

class CartsArchiveDao {
    constructor() {
        this.container = new Container('carts.txt')
        this.items = []
        this.readCarts()
    }
    
    assignId() {
        if (this.items.length === 0) {
            return 1
        } else {
            return this.items.length + 1
        }
    }

    addItemToCart(idCart, idProduct) {
        // First, numberize the items
        const convertedCartId = Number(idCart)
        const convertedProductId = Number(idProduct)
        // Then, make sure the cart exists, the product exists and the product has stock
        const cart = this.find(convertedCartId)
        const product = productsDao.find(convertedProductId)
        const productHasStock = productsDao.hasStock(convertedProductId)
        if (cart) {
            if (product) {
                if (productHasStock) {
                    // Then, add the product to the cart and then decrease the stock
                    cart.add(product)
                    productsDao.decreaseStock(product)
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

    find(id) {
        const cart = this.items.find( (cart) => cart.id === id)
        if (cart) {
            return cart
        } else {
            return false
        }
    }

    getCart(id) {
        // Just in case some random idiot passes a string
        const convertedId = Number(id)
        // Find the cart that corresponds to the input id
        const cart = this.items.find( (item) => item.id === convertedId)
        if (cart) {
            return this.throwSuccess(`Returning a cart with id ${id}`, cart)
        } else {
            return this.throwError('No cart in our database matches the given id')
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

module.exports = new CartsArchiveDao()