const { logDebug, logError } = require('../loggers/logger')
const fs = require('fs')
class ArchiveContainer {
    constructor(filename) {
        this.filename = filename
        this.path = './data/archiveData/' + this.filename
        this.fs = fs
        this.logConnectionMessage()
    }

    logConnectionMessage() {
        logDebug(`Connected to Text Archive DB. Collection: ${this.filename}`)
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

    save(object) {
        this.fs.writeFileSync(this.path, JSON.stringify(object))
    }
    

}

module.exports = ArchiveContainer

