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
        const p = new Promise ( async (resolve, reject) => {
            console.log('Saving');
            this.messages.push(message)
            const response = await this.save(this.messages)
            console.log('Response: ', response);
            resolve('End - Saving')
        })
        return p
    }

    async getMessages() {
        console.log('Getting Messages');
        const response = await this.loadMessages()
        console.log(response);
        const responseNormalization = await this.normalizeMessages() // We use await just in case we make it asynchronous in the future
        return responseNormalization
    }

    async loadMessages() {
        console.log('Reading from DB');
        const response = await this.read()
        this.messages = response
        return ('Read from DB')
    }

    async normalizeMessages() {
        console.log('Normalizing messages');
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
        // console.log('--- Data ---');
        // console.log(this.messages);
        // console.log('--- Normalized ---');
        // console.log(normalizedData);
        // console.log('--- Denormalized Data---');
        // console.log(denormalize(normalizedData, messageArray))
        return {normalizedData, compression: b/a}
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

    async save(object) {
        const p = new Promise( (resolve, reject) => {
            this.fs.writeFile(__dirname + '/' + this.filename, JSON.stringify(object), () => {
                resolve(true)
            })
        })
        return p
    }

    print = (obj) => {
        console.log(util.inspect(obj, false, 12, true));
    }

}

module.exports =  new MessagesContainer('messages.txt')