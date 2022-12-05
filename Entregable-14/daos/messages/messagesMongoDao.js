const { normalizeMessages } = require('../../utils/normalize') 
const Container = require('../../containers/mongoContainer')
const { isNotError } = require('../../utils/errors')

class MessagesMongoDao {
    constructor() {
        this.container = new Container(process.env.MESSAGES_COLLECTION_NAME)
    }

    async addMessage(message) {
        // Add it to the db
        const response = await this.container.add(message)
        return isNotError(response)
    }

    async getMessages() {

    }

}

module.exports = new MessagesMongoDao()