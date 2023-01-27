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
            // First get the user's purchase history and create a new object that includes the current one and the new one
            const user = await this.getUserById(id)
            const purchaseHistory = user.purchaseHistory
            purchaseHistory.push(cartId)
            // Update the user's purchase history
            const updatedUser = await this.updateUser(id, {purchaseHistory})
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
            // Simple check to see if there is a current cart
            if (typeof user.currentCart === 'undefined' || typeof user.currentCart === 'string') {
                // Prevent that the type of string clause is not a false positive
                if (user.currentCart.length === 0) {
                    // Create a new cart
                    const newCart = await cartsDao.createCart()
                    logDebug('------- New Cart -------')
                    logDebug(newCart)
                    // Update the user with the new cart
                    await this.updateUser(user.id, {currentCart: newCart.payload._id})
                    const updatedUser = await this.getUserById(id)
                    logDebug('------- Updated User -------')
                    logDebug(updatedUser)
                    return updatedUser.currentCart
                } else {
                    return user.currentCart
                }
            } else {
                return user.currentCart
            }
        } catch (err) {
            logError(err)
            return this.throwError(err)
        }
    }

    async getPurchaseHistory(id) {
        try {
            const user = await this.getUserById(id)
            const purchaseHistory = user.purchaseHistory
            logDebug(purchaseHistory)
            const purchaseHistoryObjects = []
            for (let i = 0; i < purchaseHistory.length; i++) {
                const cart = await cartsDao.getCart(purchaseHistory[i])
                purchaseHistoryObjects.push(cart.payload)
            }
            logDebug(purchaseHistoryObjects)
            return this.throwSuccess('Purchase history retrieved', purchaseHistoryObjects)
        } catch (err) {
            logError(err)
            return this.throwError(err)
        }
    }

    async getUser(username) {
        logDebug('User Dao: getting specific user', username);
        return await this.container.getByUsername(users, username)
    }

    async getUserById(id) {
        logDebug('User Dao: getting specific user by id', id);
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