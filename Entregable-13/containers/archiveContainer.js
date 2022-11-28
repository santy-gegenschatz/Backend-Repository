const fs = require('fs')
class ArchiveContainer {
    constructor(fileName) {
        this.fileName = fileName
        this.path = './data/archiveData/' + this.fileName
        this.fs = fs
    }

    save(object) {
        this.fs.writeFileSync(this.path, JSON.stringify(object))
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
}

module.exports = ArchiveContainer

