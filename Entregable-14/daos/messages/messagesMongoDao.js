const { normalizeMessages } = require('../../utils/normalize') 
const Container = require('../../containers/mongoContainer')

class MessagesMongoDao {
    constructor() {
        this.container = new Container(process.env.MESSAGES_COLLECTION_NAME)
    }

    async addMessage(message) {
        // Add it to the db
        // If everything went allright return true
    }

    async getMessages() {

    }

}

module.exports = new MessagesMongoDao()