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
        console.log(response, '----', denormalizedData);
        this.messages = denormalizedData
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
        // The response is normalized data
        // Return it
        return response
    }

}

module.exports = new MessagesArchiveDao()