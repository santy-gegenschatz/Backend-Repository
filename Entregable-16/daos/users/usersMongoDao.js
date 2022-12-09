const Container = require('../../containers/mongoContainer')
const { users } = require('../../models/mongoDbSchemas/users')

class usersMongoDbDao {
    constructor() {
        this.container = new Container('users', true)
    }

    async add(newUser) {
        const user = new users(newUser)
        const insertUser = await this.container.add(user)
        console.log('Dao finished saving user');
        return insertUser
    }

    async checkUserExists(username) {
        const users = await this.getAllUsers()
        const userExists = users.find( (user) => {return user.username === username})
        if (userExists) {
            console.log('Dao: User exists');
            return true
        } else {
            console.log('Dao: User does not exist');
            return false
        }
    }

    async checkUserNameAvailable(username) {
        const users = await this.getAllUsers()
        const userExists = users.find( (user) => { return user.username === username  })
        if (userExists) {
            console.log('Dao: User exists');
            return false
        } else {
            console.log('Dao: User does not exist');
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