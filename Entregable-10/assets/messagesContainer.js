class MessagesDatabase {
    constructor(configObject, tableName) {
        this.tableName = tableName
        this.knex = require('knex')(configObject)
    }

    async getMessages() {
        const response = await this.knex.from(this.tableName).select('*')
        return response
    }

    async addMessage(messageObject) {
        const response = await this.knex.insert(messageObject)
        return response
    }
}

module.exports = MessagesDatabase