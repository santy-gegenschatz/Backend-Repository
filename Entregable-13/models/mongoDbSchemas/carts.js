const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    items: {type: Array, require: true},
    total: {type: Number, require: false},
    creationDate: {type: Date, require: true},
})

const carts = mongoose.model('carts', cartSchema)

module.exports = { carts }