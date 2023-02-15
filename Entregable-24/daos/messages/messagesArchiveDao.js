const Container = require('../../containers/archiveContainer')
const { normalizeMessages, denormalizeMessages } = require('../../utils/normalize')

class MessagesArchiveDao {
    constructor() {
        this.container = new Container(process.env.MESSAGES_COLLECTION_NAME + '.txt')
        this.messages = []
    }

    async addMessage(message) {
        // Retrieve the messages form the db
        const response = await this.container.read()
        // The data is normalized, so we need to denormalize it
        const denormalizedData = denormalizeMessages(response)
        this.messages = denormalizedData.messages
        // Add it to the array
        this.messages.push(message)
        // Normalize It
        const { normalizedData } = normalizeMessages(this.messages)
        // Save the array to text
        this.container.save(normalizedData)
        // Return success
        return true
    }

    async getMessages() {
        // Read from text archive
        const response = await this.container.read()
        // The response is normalized data, so denormalize it to know its length and calculate the compression rate
        const denormalizedData = denormalizeMessages(response)
        const a = JSON.stringify(response).length;
        const b = JSON.stringify(denormalizedData).length;
        // Return it
        return { normalizedData: response, compression: a/b }
    }

}

module.exports = new MessagesArchiveDao()