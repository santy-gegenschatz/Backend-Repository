const messagesDao = require('../factory/messagesFactory')
const { normalizeMessages, denormalizeMessages } = require('../utils/normalize')
const { logDebug, logInfo } = require('../loggers/logger')

class MessagesApi {
    constructor() {
        this.messagesDao = messagesDao
    }

    async addMessage(message) { // The function returns true if everything went allright
        // Check if it is the first message to be added 
        const daoCall = await this.messagesDao.getAll()
        const response = daoCall[0]
        if (response !== null) {
            // Denormalize the data
            const relevantData = {
                entities: response.entities,
                result: response.result[0]
            }
            const { messages } = denormalizeMessages(relevantData)
            // Make the array equal to the data
            this.messages = messages
            // Add the item to the array
            this.messages.push(message)
            // Normalize the array
            const { normalizedData } = normalizeMessages(this.messages)
            // Turn the array into an objecto MongoDb can understand
            const objectToStore = {
                messagesDataId: 1,
                ...normalizedData
            }
            // Update the DB with the new object
            const updateResponse = await this.messagesDao.update(response._id, objectToStore)
            // If there are no errors, 
            // Send a true response
            return true
        } else {
            // First document to be added
            // Normalize the only message so far
            const { normalizedData } = normalizeMessages([message])
            // Create a new object with the destructuring and add an id
            const objectToStore = {
                messagesDataId: 1,
                ...normalizedData
            }
            // Store the object
            const saveResponse = await this.messagesDao.add(objectToStore)
            logInfo('--- message save Response ---')
            logInfo(saveResponse)
            // Return true
            return true

        }
    }

    async getMessages() {
        // This function must return an object with keys: normalizedData, compression
        const daoCall = await this.messagesDao.getAll()
        const response = daoCall[0]
        // The container will return null if there is no data in the db
        if (response === null) { 
            return 
        }
            // Reponse is a normalized piece of data, so we denormalize it to calculate the compression rate
            // Denormalize the data
            const relevantData = {
                entities: response.entities,
                result: response.result[0]
            }
            const { messages } = denormalizeMessages(relevantData)
            const a = JSON.stringify(response).length;
            const b = JSON.stringify(messages).length;
            // Return it
            return { normalizedData: response, compression: a/b }
        
    }
}

module.exports = new MessagesApi()