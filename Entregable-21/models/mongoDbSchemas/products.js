const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {type: String, require: true},
    description: {type: String, require: true},
    price: {type: Number, require: true},
    stock: {type: Number, require: true},
    imageUrl: {type: String, require: true},
    thumbnail: {type: String, require: true}
})

const products = mongoose.model('products', productSchema)

module.exports = { products, productSchema }