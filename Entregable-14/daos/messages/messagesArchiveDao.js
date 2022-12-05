const Container = require('../../containers/archiveContainer')
class MessagesArchiveDao {
    constructor() {
        this.container = new Container(process.env.MESSAGES_COLLECTION_NAME + '.txt')
        this.messages = []
    }

    async addMessage(message) {
        // Retrieve the messages form the db
        const response = await this.container.read()
        this.messages = response
        // Add it to the array
        this.messages.push(message)
        // Normalize It
        const { normalizedData } = this.normalizeMessages(this.messages)
        // Save the array to text
        this.container.save(normalizedData)
        // Return success
        return true
    }

    async getMessages() {
        // Read from text archive
        const response = await this.container.read()
        console.log(typeof response);
        // The response is normalized data
        // Return it
        return response
    }

    normalizeMessages(messagesToNormalize) {
        const author = new schema.Entity('authors', {}, {idAttribute: 'email'})
        const message = new schema.Entity('messages', {
            author: author
        }, {idAttribute: 'date'})
        const messageArray = new schema.Entity('messageArrays', {
            messages: [message]
        })
        const normalizedData = normalize({id: 1, messages: messagesToNormalize}, messageArray)
        const a = JSON.stringify(messagesToNormalize).length;
        const b = JSON.stringify(normalizedData).length;
        return { normalizedData, compression: b/a }
    }
}

module.exports = new MessagesArchiveDao()