const fs = require('fs')
const util = require('util')
const normalizr = require('normalizr')
const { logError } = require('../loggers/logger')
const { schema, normalize, denormalize } = normalizr

class MessagesContainer {
    constructor(filename) {
        this.filename = filename
        this.fs = fs
        this.messages = []
        this.path = './data/archiveData/' + this.filename
    }
    
    async add(message) {
        const p = new Promise ( async (resolve, reject) => {
            this.messages.push(message)
            const response = await this.save(this.messages)
            resolve('End - Saving')
        })
        return p
    }

    async getMessages() {
        const response = await this.loadMessages()
        const responseNormalization = await this.normalizeMessages() // We use await just in case we make it asynchronous in the future
        return responseNormalization
    }

    async loadMessages() {
        const response = await this.read()
        this.messages = response
        return ('Read from DB')
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
        return {normalizedData, compression: b/a}
    }

    async read() {
        const p = new Promise( (resolve, reject) => {
            this.fs.readFile(this.path, (error, content) => {
                try {
                    const parsedContent = JSON.parse(content)
                    resolve(parsedContent)
                } catch (e) {
                    logError(e);
                }                
            })
        })
        return p   
    }

    async save(object) {
        const p = new Promise( (resolve, reject) => {
            this.fs.writeFile(this.path, JSON.stringify(object), () => {
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