const normalizeMessages = (messagesToNormalize) => {
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

module.exports = { normalizeMessages }