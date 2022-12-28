const Container = require('../../containers/mongoContainer')
const productsDao = require('../products/index')
const { carts } = require('../../models/mongoDbSchemas/carts')

class CartsMongoDao {
    constructor() {
        this.container = new Container('carts')
    }

    async addItemToCart(idCart, idProduct) {
        // Then, make sure the cart exists, the product exists and the product has stock
        let cartResponse = await this.getCart(idCart)
        const productResponse = await productsDao.getProduct(idProduct)
        console.log(productResponse);
        console.log(cartResponse);
        if (cartResponse.code === 200) {
            if (productResponse.code === 200) {
                    // Check the product has stock
                    const stockResponse = await productsDao.productHasStock(idProduct) // We already know the product exists, so the response needs no error handling
                    if (stockResponse) {
                        // Then, add the product to the cart
                        const currentCartItems = cartResponse.payload.items
                        // Check if the products already exists in the cart
                        const productInArray = currentCartItems.find( (prod) => {
                            console.log('Prod: ', prod, idProduct);
                            return prod.id?.toString() === idProduct
                        })
                        let newCartItems;
                        let product;
                        if (productInArray) {
                            // If it exists, update the quantity
                            productInArray.quantity = productInArray.quantity + 1
                            product = productInArray;
                            newCartItems = currentCartItems
                        } else {
                            // If it does not exist, add a new object to the array
                            const currentProduct = {...productResponse.payload}
                            console.log(currentProduct)
                            const {stock, ...rest} = currentProduct
                            product = {...rest, quantity: 1}
                            console.log('product: ', product);
                            newCartItems = [...currentCartItems, product]
                        }
                        // Update the items array via an API call to the container
                        const addReponse = await this.container.updateFieldById(carts, idCart, {items: newCartItems})
                        // After succesfully adding the product to the cart, decrease the stock of the product
                        const decreaseResponse = await productsDao.decreaseStock(idProduct, 1)
                        // Check for errors and return
                        if (this.isNotError(addReponse) && this.isNotError(decreaseResponse)) {
                            cartResponse = await this.getCart(idCart)
                            return this.throwSuccess(`Added ${product.name} to the cart ${cartResponse.payload.id}`)
                        } else {
                            return this.throwError('An unknown error prevented the system from performing your request. Please contact the support team.')
                        }
                    } else {
                    return this.throwError('There is not enough stock of the product to perform the operation')
                }
            } else {
                return this.throwError('The product id does not match any product')
            }
        } else {
            return this.throwError('The cart id does not match any cart')
        }
    }

    async createCart() {
        const newCart = {creationDate: new Date().toLocaleString(), items: []}
        const createReponse = await this.container.add(carts, newCart)
        if (this.isNotError(createReponse)) {
            return this.throwSuccess('Cart succesfully created', createReponse)
        } else {
            return this.throwError('There was a problem creating your cart.')
        }
    }

    async deleteCart(id) {
        const deleteResponse = await this.container.delete(carts, id)
        if (this.isNotError(deleteResponse)) {
            return this.throwSuccess('Cart deleted')
        } else {
            return this.throwError('Cart could not be deleted. Please check the provided id.')
        }
    }

    async deleteCartItem(idCart, idProduct) {
        const cartResponse = await this.getCart(idCart)
        const productResponse = await productsDao.getProduct(idProduct)
        if (cartResponse.code === 200 && productResponse.code === 200) {
            // Means the cart exists and the product exists
            // Now, 
            // 1) delete the product from the cart items array
            const product = productResponse.payload
            const cartItems = cartResponse.payload.items
            const productIndex = cartItems.findIndex( (prod) => prod._id.toString() === idProduct)
            // 1.1) Verify the cart effectively has that product
            if (productIndex !== -1) {
                cartItems.splice(productIndex, 1)
                // 2) Then update the cart items field
                const updateReponse = await this.container.updateFieldById(carts, idCart, {items: cartItems})
                return this.throwSuccess('Product deleted')
            } else {
                return this.throwError('The cart does not contain that product')
            }   
        } else {
            return this.throwError('Error deleting item. Please check the provided product and cart id`s.')
        }
    }

    async getCart(id) {
        const response = await this.container.getById(carts, id)
        if (this.isNotError(response) && response !== null) {
            return this.throwSuccess('Cart obtained', response)
        } else {
            return this.throwError('Could not find a cart with that id. Please try again.')
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

module.exports = new CartsMongoDao()