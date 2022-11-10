const fs = require('fs')
const util = require('util')

class MessagesContainer {
    constructor(filename) {
        this.filename = filename
        this.fs = fs
        this.messages = []
        console.log(this.messages);
        this.loadMessages()
        console.log(this.messages);
    }
    
    add(message) {
        this.messages.push(message)
        this.save(this.messages)
    }

    getMessages() {
        return {payload: this.messages, compression: this.normalizeMessages()}
    }

    save(object) {
        this.fs.writeFileSync(__dirname + '/' + this.filename, JSON.stringify(object))
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
        console.log(response);
        this.messages = response
        this.normalizeMessages()
    }

    normalizeMessages() {
        const normalizr = require('normalizr')
        const normalize = normalizr.normalize
        const schema = normalizr.schema
        const author = new schema.Entity('authors', {}, {idAttribute: 'email'})
        const message = new schema.Entity('messages', {
            author: author
        })
        const messages = new schema.Entity('array', {
            messages: [message]
        })
        const normalizedData = normalize({id: 1, messages: this.messages}, messages)
        const print = (obj) => {
            console.log(util.inspect(obj, false, 12, true));
        }

        console.log('NormalizedData: ', normalizedData);
        console.log(normalizedData.entities.messages);
        console.log('------');
        const a = JSON.stringify(this.messages).length;
        const b = JSON.stringify(normalizedData).length;
        return b/a
    }

}

module.exports =  new MessagesContainer('messages.txt')