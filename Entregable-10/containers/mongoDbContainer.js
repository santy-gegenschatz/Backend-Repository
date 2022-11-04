const { route } = require('../mongodb/mongoDbConfig')

class MongoDbContainer {
    constructor(collectionName) {
        this.mongoose = require('mongoose')
        this.route = route
        this.connectToMongdoDb()
        this.dataCollection = collectionName
        this.dataSchema = new this.mongoose.Schema({
            data: []
        })
        this.datapoints = this.mongoose.model(this.dataCollection, this.dataSchema)
    }

    connectToMongdoDb = async () => {
        const response = await this.mongoose.connect(route, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    }

    async save(object) {
        const e = await this.deleteAll()
        const d = new this.datapoints(object)
        const res = await d.save()
        return res
    }

    async read() {
        const res = await this.datapoints.find()
        return res
    }

    async deleteAll() {
        await this.datapoints.deleteMany()
    }
}

module.exports = MongoDbContainer