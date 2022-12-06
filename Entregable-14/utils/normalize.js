const normalizr = require('normalizr')
const { schema, normalize, denormalize } = normalizr

// Schemas
const author = new schema.Entity('authors', {}, {idAttribute: 'email'})
const message = new schema.Entity('messages', {
    author: author
}, {idAttribute: 'date'})
const messageArray = new schema.Entity('messageArrays', {
    messages: [message]
})

const normalizeMessages = (messagesToNormalize) => {

    const normalizedData = normalize({id: 1, messages: messagesToNormalize}, messageArray)
    const a = JSON.stringify(messagesToNormalize).length;
    const b = JSON.stringify(normalizedData).length;
    return { normalizedData, compression: b/a }
}

const denormalizeMessages = (messagesToDenormalize) => {
    try {
        const denormalizedData = normalizr.denormalize(messagesToDenormalize, messageArray)
        return denormalizedData
    } catch (err) {
        return new Error(err)
    }
}

module.exports = { normalizeMessages, denormalizeMessages }