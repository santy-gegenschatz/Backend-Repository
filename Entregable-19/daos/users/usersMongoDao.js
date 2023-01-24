const Container = require('../../containers/mongoContainer')
const { users } = require('../../models/mongoDbSchemas/users')
const cartsDao = require('../carts/index')
const { logInfo, logError, logDebug } = require('../../loggers/logger')

class usersMongoDbDao {
    constructor() {
        const isLocal = process.env.USER_API_CONTAINER === 'mongoLocal' ? true : false
        this.container = new Container('users', isLocal)
    }
    
    async add(newUser) {
        const user = new users(newUser)
        const insertUser = await this.container.add(users, user)
        logInfo('Dao: User added', insertUser)
        return insertUser
    }

    async addProductToCart(id, productId) {
        try {
            const cartId = await this.getCurrentCartIdForUser(id)
            logDebug('------ Retrieved Cart Id ---------')
            logDebug(cartId)
            const updatedCart = await cartsDao.addItemToCart(cartId, productId)
            if (updatedCart.code !== 200) {
                return this.throwError(updatedCart)
            }

            return this.throwSuccess('Product added to cart', updatedCart)
        } catch (err) {
            logError(err)
            return this.throwError(err)
        }
    }
    
    async checkUserExists(username) {
        const users = await this.getAllUsers()
        const userExists = users.find( (user) => {return user.username === username})
        if (userExists) {
            return true
        } else {
            return false
        }
    }

    async checkUserNameAvailable(username) {
        const users = await this.getAllUsers()
        const userExists = users.find( (user) => { return user.username === username  })
        if (userExists) {
            return false
        } else {
            return true
        }
    }

    async completePurchase(id) {
        try {
            const cartId = await this.getCurrentCartIdForUser(id)
            // Check if cart is not empty
            const cart = await cartsDao.getCart(cartId)
            if (cart.payload.items.length === 0) {
                return this.throwError('Cart is empty')
            }
            // Add cart to user's purchase history
            const updatedUser = await this.updateUser(id, {purchaseHistory: cartId})
            logDebug('------- Updated User -------')
            logDebug(updatedUser)
            // Set CurrentCart to undefined
            const updatedUser2 = await this.updateUser(id, {currentCart: ''})
            logDebug('------- Updated User 2-------')
            logDebug(updatedUser2)
            // Return success
            return this.throwSuccess('Purchase completed')
        } catch (err) {
            logError(err)
            return this.throwError(err)
        }
    }

    async getAllUsers() {
        return await this.container.getAll(users)
    }

    async getCurrentCartForUser (id) {
        try {
            const cartId = await this.getCurrentCartIdForUser(id)
            logDebug('------ Retrieved Cart Id ---------')
            logDebug(cartId)
            const cart = await cartsDao.getCart(cartId)
            return cart
        } catch (err) {
            logError(err)
            return this.throwError(err)
        }
    }
    
    async getCurrentCartIdForUser(id) {
        try {
            const user = await this.getUserById(id)
            logDebug('------- User -------')
            logDebug(user)
            if (typeof user.currentCart === 'undefined' || typeof user.currentCart === 'string') {
                // Create a new cart
                const newCart = await cartsDao.createCart()
                logDebug('------- New Cart -------')
                logDebug(newCart)
                // Update the user with the new cart
                const updatedUser = await this.updateUser(user.id, {currentCart: newCart.payload._id})
                logDebug('------- Updated User -------')
                logDebug(updatedUser)
                return updatedUser.currentCart
            } else {
                return user.currentCart
            }
        } catch (err) {
            logError(err)
            return this.throwError(err)
        }
    }

    async getUser(username) {
        console.log('Dao: getting specific user', username);
        return await this.container.getByUsername(users, username)
    }

    async getUserById(id) {
        console.log('Dao: getting specific id', id);
        return await this.container.getById(users, id)
    }

    async updateUser(id, object) {
        console.log(id, users, object);
        return await this.container.updateFieldById(users, id, object)
    }

    throwError(message) {
        return {code: 500, message}
    }
    
    throwSuccess(message, payload) {
        if (typeof payload === 'undefined') {
            return {code: 200, message}
        }
        
        return {code: 200, message, payload}
    }
}

module.exports = new usersMongoDbDao()