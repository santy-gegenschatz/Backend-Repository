const mongoose = require('mongoose')

const messagesDataSchema = new mongoose.Schema({
    messagesDataId: {type: Number, require: true},
    entities: {type: Object, require: true},
    result: {type: Array, require: true}

})

const messagesModel = mongoose.model('messages', messagesDataSchema)

module.exports = { messagesModel }