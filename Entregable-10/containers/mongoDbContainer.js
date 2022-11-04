const mongoose = require('mongoose')
const route = require('../data/mongoDBData/mongoDbConfig')

class MongoDbContainer {
    constructor(collectionName) {
        this.route = route
        this.connectToMongdoDb()
        this.dataCollection = collectionName
        this.dataSchema = new mongoose.Schema({
            saved: []
        })
        this.dataModel = mongoose.model(this.dataCollection, this.dataSchema)
    }

    connectToMongdoDb = async () => {
        await mongoose.connect(route, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    }

    async save(array) {
        await this.deleteAll()
        return await this.dataModel({saved: array}).save()
    }

    async read() {
        return await this.dataModel.find()
    }

    async deleteAll() {
        await this.datModel.deleteMany()
    }
}

module.exports = MongoDbContainer