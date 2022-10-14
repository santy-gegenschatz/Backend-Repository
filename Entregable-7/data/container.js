const fs = require('fs')
class Container {
    constructor(folderName, fileName) {
        this.fileName = fileName
        this.fs = fs
        this.route = './' + folderName + '/' + fileName
    }

    save(object) {
        console.log('Saving');
        console.log(this.route);
        this.fs.writeFileSync(this.route, JSON.stringify(object))
    }

    read() {
        this.fs.readFileSync(this.fileName, (error, content) => {
            const parsedContent = JSON.parse(content)
            return parsedContent
        })
    }

    deleteAllData() {

    }
}

module.exports = Container

