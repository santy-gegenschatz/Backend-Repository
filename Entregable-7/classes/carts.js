const Cart = require('./cart')

class Carts {
    constructor() {
        this.items = []
    }

    addItemsToCart(idCart, items) {
        // First, numberize the items
        const cartId = Number(idCart)
        // Then, make sure the cart exists
        
        // Then, make sure the product exists and there is enough stock

        // Then, add the item to the cart
    }

    createCart() {
        const cart = new Cart()
        this.items.push(cart)
        return this.throwSuccess('Cart succesfully created', cart)
    }

    find(id) {
        const cart = this.items.find( (cart) => cart.id === id)
        if (cart) {
            return true
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

    throwSuccess(message, payload) {
        return {code: 200, message, payload}
    }

    throwError(message) {
        return {code: 500, message}
    }

}

module.exports = new Carts()