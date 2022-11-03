class Database {
    constructor(configObject, tableName) {
        this.configObject = configObject
        this.tableName = tableName
        this.knex = require('knex')(configObject)
    }
    
    async addProduct(product) {
        const response = await this.knex.insert(product)
        return this.throwSuccess('Product added', response)
    }
    
    async getProduct(id) {
        const response = await this.knex.from(this.table).select('*').where('id', '=', id)
        return this.throwSuccess('Product added', response)
    }

    async deleteProduct(id) {
        const response = await this.knex.from(this.table).where('id', '=', id).del()
        return this.throwSuccess('Product deleted', response)
    }

     async getProducts() {
        const response = await this.knex.from(this.tableName).select('*')
        return this.throwSuccess('Here are the products', response)
    }

    async updateProduct(id, attributes) {
        const response1 = await this.knex.from(this.table).where('id', '=', id).del()
        const response2 = await this.knex.from(this.table).insert(attributes)
        return this.throwSuccess('Product updated', response2)
    }

    throwSuccess(message, payload) {
        return {code: 200, message, payload}
    }

    throwError(message) {
        return {code: 500, message}
    }
}

module.exports = Database
