const Container = require('../../containers/mongoContainer')
const { users } = require('../../models/mongoDbSchemas/users')
const { logInfo, logError, logDebug } = require('../../loggers/logger')

class usersMongoDao {
    constructor() {
        const isLocal = process.env.USER_API_CONTAINER === 'mongoLocal' ? true : false
        this.container = new Container('users', isLocal)
    }
    
    async add(newUser) {
        try {
            const user = new users(newUser)
            const insertUser = await this.container.add(users, user)
            logInfo('Dao: User added', insertUser)
            return insertUser
        } catch(err) {
            logError(err)
            return err
        }
    }

    async delete(id) {
        try {
            const response = await this.container.delete(users, id)
            return response
        } catch (err) {
            logError(err)
            return err
        }
    }

    async get(id) {
        return await this.container.getById(users, id)
    }

    async getAll() {
        return await this.container.getAll(users)
    }

    async getByUsername(username) {
        return await this.container.getByUsername(users, username)
    }

    async update(id, newObject) {
        return await this.container.updateFieldById(users, id, newObject)
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

module.exports = new usersMongoDao()