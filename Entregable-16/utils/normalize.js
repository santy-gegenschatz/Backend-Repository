const normalizr = require('normalizr')
const { schema, normalize, denormalize } = normalizr

// Schemas
const authorSchema = new schema.Entity('authors', {}, {idAttribute: 'email'})
const messageSchema = new schema.Entity('messages', {
    author: authorSchema
}, {idAttribute: 'date'})
const messageArraySchema = new schema.Entity('messageArrays', {
    messages: [messageSchema]
})

const normalizeMessages = (messagesToNormalize) => {

    const normalizedData = normalize({id: 1, messages: messagesToNormalize}, messageArraySchema)
    const a = JSON.stringify(messagesToNormalize).length;
    const b = JSON.stringify(normalizedData).length;
    return { normalizedData, compression: b/a }
}

const denormalizeMessages = (messagesToDenormalize) => {
    try {
        console.log(messagesToDenormalize);
        const denormalizedData = normalizr.denormalize(messagesToDenormalize.result, messageArraySchema, messagesToDenormalize.entities)
        return denormalizedData
    } catch (err) {
        return new Error(err)
    }
}

module.exports = { normalizeMessages, denormalizeMessages }