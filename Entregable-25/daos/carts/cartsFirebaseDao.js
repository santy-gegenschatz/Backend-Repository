const Container = require('../../containers/firebaseContainer')
const productsDao = require('../../factory/productsFactory')
const Cart = require('../../models/cart')

class Carts {
    constructor() {
        this.container = Container
        this.collectionName = process.env.CARTS_COLLECTION_NAME
    }

    async addItemToCart(idCart, idProduct) {
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
                    logDebug('New cart Items: ', newCartItems);
                // post the changes to the carts db
                const updateCartResponse = await this.container.updateById(this.collectionName, idCart, {items: newCartItems})
                // decrease the stock of the product in the products db
                const updateStockResponse = await productsDao.decreaseStock(idProduct, 1)
                // return a success message if everything went right
                if (this.isNotError(updateCartResponse) && this.isNotError(updateStockResponse)) {
                    return this.throwSuccess(`The product ${productResponse.payload.name} has been added to the cart ${cartResponse.id}`)
                } else {
                    // return an error if something went wrong
                    return this.throwError('There was an unkwown error and your operation could not be performed.')
                }
                } else {
                    return this.throwError('There is not enough stock of the selected product.')
                }
            } else {
                return this.throwError('The product id does not match any of the product id`s in our DB.')
            }
        } else {
            return this.throwError('The cart id does not match any id in our carts DB.')
        }
    }

    async createCart() {
        const newCart = {items: [], creationDate: new Date().toLocaleString()}
        // Create the cart in firebase
        const createResponse = await this.container.create(this.collectionName, newCart)
        // Retrieve the created cart in firebase
        if (this.isNotError(createResponse)) {
            return this.throwSuccess('Succesfully created cart', {...newCart, id: createResponse.id})
        } else {
            return this.throwError('There was a problem creating your cart. Please contact the system admin.')
        }
    }

    async deleteCart(id) {
        // Check the cart exists
        const cartResponse = await this.getCart(id)
        if (cartResponse.code === 200) {
            // if so delete it
            const deleteResponse = await this.container.delete(this.collectionName, id)
            if (this.isNotError(deleteResponse)) {
                return this.throwSuccess(`Succesfully deleted cart with id ${id}`)
            } else {
                // if there is a problem also show an error message
                return this.throwError('Oops. There was a problem deleting your cart.')
            } 
        } else {
            // otherwise, show an error message
            this.throwError('The provided id does not match any cart in our DB.')
        }
    }

    async deleteCartItem(idCart, idProduct) {
        // Check the cart exists
        const cartResponse = await this.getCart(idCart)
        // Check the product exists
        const productResponse = await productsDao.getProduct(idProduct)
        if (cartResponse.code === 200) {
            if (productResponse.code === 200) {
                // Get the current array
                const currentCartItems = cartResponse.payload.items
                // Check if the product exists in that array
                const productIndex = currentCartItems.findIndex( (prod) => prod.id === idProduct)
                if (productIndex !== -1) {
                    // Splice it
                    currentCartItems.splice(productIndex, 1) 
                    // update the cart with the new array
                    const updateResponse = await this.container.updateById(this.collectionName, idCart, {items: currentCartItems})
                    if (this.isNotError(updateResponse)) {
                        // return success and errors
                        return this.throwSuccess(`Deleted product ${productResponse.payload.name} from cart ${cartResponse.payload.id}`)
                    } else {
                        return this.throwError('There was an unknown error deleting the product. Please contact the system admin.')
                    }
                } else {
                    // Product not in cart, return an error
                    this.throwError('The product is not present in the cart. Check the provided cart and products ids.')
                }
            }
        }
    }

    async getCart(id) {
        const response = await this.container.getById(this.collectionName, id)
        if (this.isNotError(response)) {
            return this.throwSuccess('Cart obtained', response)
        } else {
            return this.throwError('There was a problem retrieving your cart from the DB. Please check the provided id.')
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