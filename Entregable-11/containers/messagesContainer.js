const fs = require('fs')
const util = require('util')
const normalizr = require('normalizr')
const { schema, normalize, denormalize } = normalizr

class MessagesContainer {
    constructor(filename) {
        this.filename = filename
        this.fs = fs
        this.messages = []
    }
    
    async add(message) {
        this.messages.push(message)
        await this.save(this.messages)
    }

    async getMessages() {
        await this.loadMessages()
        const response = await this.normalizeMessages() // We use await just in case we make it asynchronous in the future
        return response
    }

    async save(object) {
        await this.fs.writeFileSync(__dirname + '/' + this.filename, JSON.stringify(object))
    }

    async read() {
        const p = new Promise( (resolve, reject) => {
            this.fs.readFile(__dirname + '/' + this.filename, (error, content) => {
                try {
                    const parsedContent = JSON.parse(content)
                    resolve(parsedContent)
                } catch (e) {
                    console.log(e);
                }                
            })
        })
        return p   
    }

    async loadMessages() {
        const response = await this.read()
        this.messages = response
    }

    async normalizeMessages() {
        const author = new schema.Entity('authors', {}, {idAttribute: 'email'})
        const message = new schema.Entity('messages', {
            author: author
        }, {idAttribute: 'date'})
        const messageArray = new schema.Entity('messageArrays', {
            messages: [message]
        })
        const normalizedData = normalize({id: 1, messages: this.messages}, messageArray)
        const a = JSON.stringify(this.messages).length;
        const b = JSON.stringify(normalizedData).length;
        console.log('Compression: ', a, b, b/a);
        console.log('--- Data ---');
        console.log(this.messages);
        console.log('--- Normalized ---');
        console.log(normalizedData);
        console.log('--- Denormalized Data---');
        console.log(denormalize(normalizedData, messageArray))
        return {normalizedData, compression: b/a}
    }

    print = (obj) => {
        console.log(util.inspect(obj, false, 12, true));
    }

}

module.exports =  new MessagesContainer('messages.txt')