const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    author: {type: Object, require: true},
    text: {type: String, require: true},
    date: {type: Date, require: true}
})

const messages = mongoose.model('messages', messageSchema)

module.exports = { messages, messageSchema }