const Product = require('../../models/product')
const Container = require('../../containers/archiveContainer') 
const { logDebug } = require('../../loggers/logger')

class ProductsArchiveDao {
    constructor() {
        this.container = new Container('products.txt')
        this.items = []
        this.initialRead()
    }

    addProduct(item) {
        const prodExists = this.items.findIndex((prod) => prod.id === Number(item.id))
        if (prodExists !== -1) {
            this.items[prodExists].stock = Number(this.items[prodExists].stock)
            this.items[prodExists].stock += Number(item.stock)
            this.saveToPersistentMemory(this.items)
            return this.throwSuccess('Item already in the database. Stock augmented')
        } else {
            const newProduct = new Product(this.assignId(), item)
            this.items.push(newProduct)
            this.saveToPersistentMemory(this.items)
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

    decreaseStock(prod, decreaseAmount) {
        let stock = Number(prod.stock)
        stock -= 1
        const productIndex = this.items.findIndex( (p) => p.id === prod.id)
        this.items[productIndex].stock = stock
        this.saveToPersistentMemory(this.items)
        return true
    }

    deleteUndefinedKeys = (obj) => {
        Object.keys(obj).forEach( (key) => {
            if (obj[key] === undefined) {
                delete obj[key]
            }
        })
    }
    
    deleteProduct(id) {
        // First, figure out if the product effectively exists
        const convertedId = Number(id)
        const productIndex = this.items.findIndex((prod) => prod.id === convertedId)
        if (productIndex !== -1) {
            const removed = this.items.splice(productIndex, 1)
            this.saveToPersistentMemory(this.items)
            return this.throwSuccess('Product deleted', {deleted: removed[0], currentArray: this.items})
        } else {
            return this.throwError(' There is no item with that id in the database')
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

    getAllProducts() {
        return this.items.length !== 0 ? {items: this.items} : this.throwError('No products in the database')
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

    async initialRead() {
        await this.readItems()
        logDebug('Successfully connected to the archives');
    }

    async updateProduct(id, attributes) {
        // Figure out if the product exists
        const convertedId = Number(id)
        const prodExists = this.items.findIndex((prod) => prod.id === convertedId)
        // => Remember that the array.findIndex funciton in js returns -1 if there is no match
        if (prodExists !== -1) { 
            // If the product exists
            try {
                const originalProduct = this.items[prodExists]
                this.deleteUndefinedKeys(attributes)
                const newProduct = {...originalProduct, ...attributes}
                this.items[prodExists] = newProduct
                this.saveToPersistentMemory(this.items)
                return this.throwSuccess('Succesfully modified product. Here is the new one', newProduct)
            } catch (error) {
                throw new Error(error)
            }
        } else {
            // If it does not exist
            return this.throwError('Sorry, no product in our db matches the given id')
        }
    }

    productHasStock(id) {
        return this.find(id).stock >= 1 
    }

    async readItems() {
        this.items = await this.container.read()
    }

    saveToPersistentMemory(object) {
        this.container.save(object)
    }

    throwError(message) {
        return {code: 500, message}
    }

    throwSuccess(message, payload) {
        return {code: 200, message, payload}
    }
}

module.exports = new ProductsArchiveDao()
