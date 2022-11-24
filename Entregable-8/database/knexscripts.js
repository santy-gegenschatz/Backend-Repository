const { products, messages } = require('../utils/dataGenerator')
const {options: mariaDbOptions} = require('../database/mysql.config')
const {options: sqliteOptions} = require('../database/mysql.config')
const knex = require('knex')
const knexProducts = knex(mariaDbOptions)
const knexMessages = knex(sqliteOptions)

class TableCreator {
    constructor (productsTableName, messagesTableName) {
        this.productsTableName = productsTableName
        this.messagesTableName = messagesTableName
    }

    async createTables() {
        await this.createTableProducts()
        this.createTableMessages()
    }

    async createTableProducts() {
        try {
            await knexProducts.schema.dropTable(this.productsTableName)
            console.log('Products table deleted');
            await knexProducts.schema.createTable(this.productsTableName, table => {
                table.increments('id')
                table.string('name')
                table.string('description')
                table.integer('price')
                table.integer('stock')
                table.string('thumbnail')
            })
            console.log('Products table successfully created');
            await knexProducts(this.productsTableName).insert(products)
        } catch (e) {
            console.log(e);
        }
    }
    
    async createTableMessages() {
        try {
            await knexMessages.schema.dropTable(this.messagesTableName)
            console.log('Messages table deleted');
            await knexMessages.schema.createTable(this.messagesTableName, table => {
                table.increments('id')
                table.string('author')
                table.string('message')
                table.string('date')
            })
            console.log('Messages table successfully created');
            await knexMessages(this.messagesTableName).insert(messages)
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = { TableCreator }