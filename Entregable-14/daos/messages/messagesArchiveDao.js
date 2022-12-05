const Container = require('../../containers/archiveContainer')
class MessagesArchiveDao {
    constructor() {
        this.container = new Container(process.env.MESSAGES_COLLECTION_FILENAME)
        this.messages = []
    }

    addMessage(message) {
        // Add it to the array
        this.messages.push(message)
        // Save the array to text
        this.container.save(this.messages)
    }

    getMessages() {
        return this.messages
    }

    async loadMessages() {
        // Update the messages array with the contents of the text archive
        const response = await this.container.read()
        this.messages = response
    }

    normalizeMessages() {

    }
}

module.exports = new MessagesArchiveDao()