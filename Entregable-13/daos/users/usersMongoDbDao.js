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

    async checkUserNameAvailable(username) {
        const users = await this.getAllUsers()
        const userExists = users.find( (user) => { 
            console.log(user.username);
            return user.username === username 
        })
        if (userExists) {
            console.log('User exists');
            return false
        } else {
            console.log('User does not exist');
            return true
        }
    }

    async getAllUsers() {
        return await this.container.getAll(users)
    }
}

module.exports = new usersMongoDbDao()