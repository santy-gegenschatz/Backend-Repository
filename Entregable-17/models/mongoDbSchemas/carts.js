const mongoose = require('mongoose')
const { productSchema } = require('./products')
const cartSchema = new mongoose.Schema({
    items: [],
    total: {type: Number, require: false},
    creationDate: {type: Date, require: true},
})

const carts = mongoose.model('carts', cartSchema)

module.exports = { carts }