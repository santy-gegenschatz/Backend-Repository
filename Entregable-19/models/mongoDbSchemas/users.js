const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {type: String, require: false},
    username: {type: String, require: true},
    password: {type: String, require: true},
    firstName: {type: String, require: false},
    address: {type: String, require: false},
    age: {type: Number, require: false},
    phoneNumber: {type: String, require: false},
    currentCart: {type: String, required: false},
    purchaseHistory: {type: Array, require: false},
})

const users = mongoose.model('users', userSchema)

module.exports = { users }