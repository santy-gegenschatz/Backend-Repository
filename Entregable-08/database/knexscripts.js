const { products, messages } = require('../utils/dataGenerator')
const {options: mariaDbOptions} = require('../database/mysql.config')
const {options: sqliteOptions} = require('../database/sqlite3.config')
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
                const exists = await knexProducts.schema.hasTable(this.productsTableName)
                console.log('Products table Exists, ', exists);
                if (!exists) {
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
                }

        } catch (e) {
            console.log(e);
        }
    }
    
    async createTableMessages() {
        try {
            const exists = await knexMessages.schema.hasTable(this.messagesTableName)
            console.log('Messages table Exists, ', exists);
            if (!exists) { 
                await knexMessages.schema.createTable(this.messagesTableName, table => {
                    table.increments('id')
                    table.string('author')
                    table.string('message')
                    table.datetime('date')
                })
                console.log('Messages table successfully created');
                await knexMessages(this.messagesTableName).insert(messages)
            }
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = { TableCreator }