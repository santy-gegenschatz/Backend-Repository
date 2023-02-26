const Container = require('../../containers/mongoContainer')
const { carts } = require('../../models/mongoDbSchemas/carts')
const { logDebug, logError } = require('../../loggers/logger')

class CartsMongoDao {
    constructor() {
        const isLocal = process.env.CART_API_CONTAINER === 'mongoLocal' ? true : false
        this.container = new Container('carts', isLocal)
    }
    async add(cart) {
        try {
            const response = await this.container.add(carts, cart)
            return response
        } catch (err) {
            logError(err)
            return err
        }
    }

    async delete(id) {
        try {
            const response = await this.container.delete(carts, id)
            return response
        } catch (err) {
            logError(err)
            return err
        }
    }

    async getAll() {
        try {
            const response = await this.container.getAll(carts)
            return response
        } catch (err) {
            logError(err)
            return err
        }
    }

    async get(id) {
        try {
            const response = await this.container.getById(carts, id)
            return response
        } catch (err) {
            logError(err)
            return err
        }
    }

    async update(id, newObject) {
        try {
            const response = await this.container.updateFieldById(carts, id, newObject)
            return response
        } catch (err) {
            logError(err)
            return err
        }
    }
}

module.exports = new CartsMongoDao()