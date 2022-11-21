const Container = require('../../containers/mongoDbContainer2')
const { users } = require('../../models/mongoDbSchemas/users')

class usersMongoDbDao {
    constructor() {

    }

    add(newUser) {
        const user = new mongoose.model.users(newUser)
        Container.add(user)
    }
}

module.exports = new usersMongoDbDao()