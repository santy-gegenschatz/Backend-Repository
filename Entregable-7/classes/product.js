class Product {
    constructor(id, name, description, price, stock, thumbnail) {
        this.id = id
        this.creationDate = new Date()
        this.name = name
        this.description = description
        this.price = price
        this.stock = stock
        this.thumbnail = thumbnail
    }
}