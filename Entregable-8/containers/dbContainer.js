const { products } = require('../utils/dataGenerator')
class SqlContainer {
    constructor(configObject, tableName) {
        this.configObject = configObject
        this.tableName = tableName
        this.knex = require('knex')(configObject)
        this.createTable()
    }
    async createTable() {
        try {
            await this.knex.schema.dropTable('products')
            console.log('Products table deleted');
            await this.knex.schema.createTable('products', table => {
                table.increments('id')
                table.string('name')
                table.string('description')
                table.integer('price')
                table.integer('stock')
                table.string('thumbnail')
            })
            console.log('Table successfully created');
            await this.knex(this.tableName).insert(products)
        } catch (e) {
            console.log(e);
        }
    }

    async add(sth) {
        const response = await this.knex(this.tableName).insert(sth)
        return this.throwSuccess('Added', response)
    }
    
    async getById(id) {
        const response = await this.knex.from(this.tableName).select('*').where('id', '=', id)
        return this.throwSuccess('Obtained', response)
    }

    async getAll() {
        console.log('Getting');
        const response = await this.knex.from(this.tableName).select('*')
        console.log('Response: ', response);
        return this.throwSuccess('Retrieved all from DB', response)
    }

    async deleteById(id) {
        const response = await this.knex.from(this.tableName).where('id', '=', id).del()
        return this.throwSuccess('Deleted', response)
    }

    async updateById(id, newObject) {
        try {
            const response = await this.knex(this.tableName).where({id: id}).update(newObject)
            return this.throwSuccess('Updated', response)
        } catch (e) {
            console.log(e);
        }
    }

    throwSuccess(message, payload) {
        return {code: 200, message, payload}
    }

    throwError(message) {
        return {code: 500, message}
    }
}

module.exports = { SqlContainer }
