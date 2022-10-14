const Product = require('./product')

class Products {
    constructor() {
        this.items = []
    }

    add(item) {
        const prodExists = this.items.findIndex((prod) => prod.id === Number(item.id))
        console.log(prodExists);
        if (prodExists !== -1) {
            this.items[prodExists].stock = Number(this.items[prodExists].stock)
            this.items[prodExists].stock += Number(item.stock)
            return this.throwSuccess('Item already in the database. Stock augmented')
        } else {
            const newProduct = new Product(this.assignId(), item)
            this.items.push(newProduct)
            return this.throwSuccess('New item added to the database')
        }
    }

    assignId() {
        if (this.items.length === 0) {
            return 1
        } else {
            return this.items.length + 1
        }
    }

    decreaseStock(prod) {
        let stock = Number(prod.stock)
        stock -= 1
        prod.stock = stock
    }

    deleteProduct(id) {
        // First, figure out if the product effectively exists
        const convertedId = Number(id)
        const productIndex = this.items.findIndex((prod) => prod.id === convertedId)
        if (productIndex !== -1) {
            const removed = this.items.splice(productIndex)
            return this.throwSuccess('Product deleted', {deleted: removed[0].toString(), currentArray: this.items.toString()})
        } else {
            return this.throwError(' There is no item with that id in the database')
        }

    }

    editProduct(id, attributes) {
        // Figure out if the product exists
        const convertedId = Number(id)
        const prodIndex = this.items.findIndex((prod) => prod.id === convertedId)
        if (prodIndex !== -1) {
            // If the product exists
            try {
                const product = this.items[prodIndex]
                this.items[prodIndex] = {...product, ...attributes}
                return this.throwSuccess('Succesfully modified product. Here is the new one', this.items[prodIndex])
            } catch (error) {
                throw new Error(error)
            }
        } else {
            // If it does not exist
            return this.throwError('Sorry, no product in our db matches the given id')
        }
    }

    find(id) {
        const product = this.items.find( (prod) => prod.id === id)
        if (product) {
            return product
        } else {
            return false
        }
    }

    getProduct(id) {
        // Figure out if the product exists
        // In case some douchebag passes the id as a string we will turn it into a number
        const convertedId = Number(id)
        const prodExists = this.items.findIndex((prod) => prod.id === convertedId)
        if (prodExists !== -1) {
            // If the product exists
            return this.throwSuccess('Returning requested product', this.items[prodExists])
        } else {
            // If it does not exist
            return this.throwError('Sorry, no product in our db matches the given id')
        }
    }

    getProducts() {
        return this.items.length !== 0 ? {items: this.items} : this.throwError('No products in the database')
    }

    hasStock(id) {
        const product = this.find(id)
        return this.find(id).stock >= 1 
    }

    throwSuccess(message, payload) {
        return {code: 200, message, payload}
    }

    throwError(message) {
        return {code: 500, message}
    }
}

module.exports = new Products()
