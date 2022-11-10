const fs = require('fs')
class ArchiveContainer {
    constructor(folderName, fileName) {
        this.fileName = fileName
        this.fs = fs
        this.route = folderName + './' + fileName
        console.log(this.route);
        console.log(__dirname);
    }

    save(object) {
        console.log(this.route);
        this.fs.writeFileSync(this.route, JSON.stringify(object))
    }

    async read() {
        const p = new Promise( (resolve, reject) => {
            this.fs.readFile(this.route, (error, content) => {
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

    deleteAllData() {

    }
}

module.exports = ArchiveContainer

