const Container = require('../../containers/mongoContainer')
const { messagesModel } = require('../../models/mongoDbSchemas/messagesNestedData')

class MessagesMongoDao {
    constructor() {
        // I need a variable that is a boolean and that changes as a function of the selected type of storage in the env file
        const isLocal = process.env.MESSAGES_CONTAINER === 'mongoLocal' ? true : false
        this.container = new Container(process.env.MESSAGES_COLLECTION_NAME, isLocal)
        this.messages = []
    }

    async add(message) {
        const response = await this.container.add(messagesModel, message)
        return response
    }

    async delete(id) {
        const response = await this.container.delete(messagesModel, id)
        return response
    }

    async get(id) {
        const response = await this.container.getById(messagesModel, id)
        return response
    }

    async getAll() {
        const response = await this.container.getAll(messagesModel)
        return response
    }

    async update(id, newObject) {
        const response = await this.container.updateFieldById(messagesModel, id, newObject)
        return response
    }

}

module.exports = new MessagesMongoDao()