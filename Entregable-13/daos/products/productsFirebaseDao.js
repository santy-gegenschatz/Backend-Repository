const Product = require('../../models/product')
const Container = require('../../containers/firebaseContainer') 

class ProductsFirebaseDao {
    constructor() {
        this.container = Container
        this.collectionName = process.env.FIREBASE_PRODUCTS_COLLECTION
        console.log(this.collectionName);
    }
    async getAllProducts() {
        const response = await this.container.getAll(this.collectionName)
        return response
    }

    async addProduct(product) {
        // First, check if the product id matches with one in the firebase
        const response = await this.container.getById(this.collectionName, product.id)
        console.log(response);
        console.log(typeof response);
        if ((typeof response) === undefined) {
            console.log('Not undefined');
        }
        if (!response) {
            console.log('Reponse is undefined');
        }
        // if it does, call the update function
        // otherwise continue
        const response2 = await this.container.create(this.collectionName, product)
        if (!Error.prototype.isPrototypeOf(response)) {
            return this.throwSuccess('Product added to the firebase')
        } else {
            return this.throwError('Something terrible happenned. Sorry.')
        }

    }


    decreaseStock(prod) {
        let stock = Number(prod.stock)
        stock -= 1
        prod.stock = stock
        this.saveToPersistentMemory(this.items)
    }

    deleteProduct(id) {
        // First, figure out if the product effectively exists
        const convertedId = Number(id)
        const productIndex = this.items.findIndex((prod) => prod.id === convertedId)
        if (productIndex !== -1) {
            const removed = this.items.splice(productIndex)
            this.saveToPersistentMemory(this.items)
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
                this.saveToPersistentMemory(this.items)
                return this.throwSuccess('Succesfully modified product. Here is the new one', this.items[prodIndex])
            } catch (error) {
                throw new Error(error)
            }
        } else {
            // If it does not exist
            return this.throwError('Sorry, no product in our db matches the given id')
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

    // getProducts() {
    //     return this.items.length !== 0 ? {items: this.items} : this.throwError('No products in the database')
    // }

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

module.exports = new ProductsFirebaseDao()
