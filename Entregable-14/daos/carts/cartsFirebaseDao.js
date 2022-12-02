const Container = require('../../containers/firebaseContainer')
const productsDao = require('../products/index')
const Cart = require('../../models/cart')

class Carts {
    constructor() {
        this.container = Container
        this.collectionName = process.env.CARTS_COLLECTION_NAME
    }

    async addItemsToCart(idCart, idProduct) {
        // We need to check
        // the cart exists
        const cartResponse = await this.container.getById(this.collectionName, idCart)
        if (this.isNotError(cartResponse)) {
            // the product exists
            const productResponse = await productsDao.getProduct(idProduct)
            if (productResponse.code === 200) {
                // the product has stock
                const stockResponse = productsDao.productHasStock(idProduct)
                if (stockResponse) {
                    // all conditions cleared  
                    // add it to the cart items array
                        // get the current cart items array
                        const currentCartItems = cartResponse.items
                        // create an updated array with the pertinent changes
                        let newCartItems;
                        let newProduct;
                    // if it is already there update the quantity
                        // find out if it is already there
                        const currentProduct = currentCartItems.find( (prod) => prod.id === idProduct)
                        if (currentProduct !== undefined) {
                            currentProduct.quantity +=1
                            newCartItems = [...currentCartItems]
                        } else {
                            // if it is not already there add it for the first time
                            const {stock, ...rest } = productResponse.payload
                            newProduct = {...rest, quantity: 1}
                            newCartItems = [...currentCartItems, newProduct]
                        }
                    // post the changes to the carts db
                    const updateCartResponse = await this.container.updateById(this.collectionName, idCart, {items: newCartItems})
                    // decrease the stock of the product in the products db
                    const updateStockResponse = await productsDao.decreaseStock(idProduct, 1)
                    // return a success message if everything went right
                    if (this.isNotError(updateCartResponse) && this.isNotError(updateStockResponse)) {
                        return this.throwSuccess(`The product ${productResponse.payload.name} has been added to the cart ${cartResponse.payload}`)
                    }
                    // return an error if something went wrong

                } else {
                    return this.throwError('There is not enough stock of the selected product.')
                }
            } else {
                return this.throwError('The product id does not match any of the product id`s in our DB.')
            }
        } else {
            return this.throwError('The cart id does not match any id in our carts DB.')
        }
        // the product has stock

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