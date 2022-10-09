class Product {
    constructor(id, attributes) {
        this.id = id
        this.creationDate = new Date()
        this.name = attributes.name
        this.description = attributes.description
        this.price = attributes.price
        this.stock = attributes.stock
        this.thumbnail = attributes.thumbnail
    }
}

module.exports = Product