class Products {
    constructor() {
        this.items = []
    }

    add(item) {
        const prodExists = this.items.findIndex((prod) => prod.id === item.id)
        if (prodExists !== -1) {
            this.items[prodExists].stock += item.stock
            return this.throwSuccess('Item already in the databse. Stock augmented')
        } else {
            this.items.push({id: this.assignId(), ...item})
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

    deleteProduct(id) {
        // First, figure out if the product effectively exists
        const productIndex = this.items.findIndex((prod) => prod.id === id)
        if (productIndex !== -1) {
            const removed = this.items.splice(productIndex)
            return this.throwSuccess('Product deleted', {deleted: removed.toString(), currentArray: this.items.toString()})
        } else {
            return this.throwError(' There is no item with that id in the database')
        }

    }

    editProduct(id, attributes) {
        // Figure out if the product exists
        const prodIndex = this.items.findIndex((prod) => prod.id === id)
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

    getProduct(id) {
        // Figure out if the product exists
        const prodExists = this.items.findIndex((prod) => prod.id === id)
        if (prodExists !== -1) {
            // If the product exists
            this.throwSuccess('Returning requested product', this.items[prodExists])
        } else {
            // If it does not exist
            this.throwError('Sorry, no product in our db matches the given id')
        }
    }

    getProducts() {
        this.items.length !== 0 ? {items: this.items} : this.throwError('No products in the database')
    }

    throwSuccess(message, payload) {
        return {code: 200, message, payload}
    }

    throwError(message) {
        return {code: 500, message}
    }

    find(id) {
        const product = this.items.find( (prod) => prod.id === id)
        if (product) {
            return product
        } else {
            return this.throwError('Product not found')
        }
    }
}

const item1 = {a : 'alpha', b: 'beta'}
const item2 = {name : 'charlie', description: 'delta'}

const products = new Products()
console.log(products.add(item1))
console.log(products.add(item2))
console.log(products.find(1));
console.log(products.find(3));
console.log(products.editProduct(1, {name: 'beta'}))
console.log(products);
console.log(products.deleteProduct(4));
console.log(products.deleteProduct(2));