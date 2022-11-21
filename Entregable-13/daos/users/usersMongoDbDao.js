const mongoose = require('mongoose')
const Container = require('../../containers/mongoDbContainer2')
const { users } = require('../../models/mongoDbSchemas/users')

class usersMongoDbDao {
    constructor() {
        this.container = new Container('users')
    }

    async add(newUser) {
        const user = new users(newUser)
        await this.container.add(user)
        console.log('Dao finished saving user');
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
        return await this.container.getByKey(users, 'username', username)
    }
}

module.exports = new usersMongoDbDao()