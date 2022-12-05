const fs = require('fs')
class ArchiveContainer {
    constructor(filename) {
        this.filename = filename
        this.path = './data/archiveData/' + this.filename
        this.fs = fs
        this.logConnectionMessage()
    }

    logConnectionMessage() {
        console.log(`Connected to Text Archive DB. Collection: ${this.filename}`)
    }
    // Use the following line to figure out where in your system your script is being executed
    // console.log(process.cwd());
    async read() {
        const p = new Promise( (resolve, reject) => {
            this.fs.readFile(this.path, (error, content) => {
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

    save(object) {
        this.fs.writeFileSync(this.path, JSON.stringify(object))
    }
    

}

module.exports = ArchiveContainer

