const fs = require('fs')

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
        return this.messages
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
    }
}

module.exports =  new MessagesContainer('messages.txt')