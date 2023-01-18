const Container = require('../../containers/mongoContainer')
const { users } = require('../../models/mongoDbSchemas/users')
const { logInfo } = require('../../loggers/logger')

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

    async getAllUsers() {
        return await this.container.getAll(users)
    }

    async getUser(username) {
        console.log('Dao: getting specific user', username);
        return await this.container.getByUsername(users, username)
    }

    async getUserById(id) {
        console.log('Dao: getting specific id', id);
        return await this.container.getById(users, id)
    }
}

module.exports = new usersMongoDbDao()