const mongoose = require('mongoose')
const { localRoute, serverRoute, advancedOptions} = require('../config/mongo/mongoDbConfig')
const { logError, logInfo, logDebug } = require('../loggers/logger')

class MongoDbContainer {
    constructor(collectionName, isLocal) {
        this.collectionName = collectionName
        this.isLocal = isLocal === undefined ? true : isLocal
        // A method to connect to the db
        // To do this we will use mongoose
        // We also need to check that the mongodb is server is running locally on our computer
        this.connect()
    }

    // Which methods do I need ? => A simple answer is the CRUD methods (6)
    // A more complex answer is that I also need an async method that connects to the local instance of the MongoDB server
    async connect() {
        const route = this.isLocal ? localRoute : serverRoute
        mongoose.connect(route, advancedOptions)
        const connectionMessageString = `Connected to MongoDB. Via: ${this.isLocal ? 'Local' : 'Server'}. Collection: ${this.collectionName}`
        logDebug(connectionMessageString);
    }

    async add(modelName, sth) {
        try {
            let sthSaved = await new modelName(sth).save()
            return sthSaved
        } catch(err) {
            logError(err)
            return err
        }
    }

    async delete(model, id) {
        try {
            const response = await model.deleteOne({'_id': id})
            return response
        } catch (err) {
            logError(err)
            return false
        }
    }

    async getAll(model) {
        try {
            const response = await model.find()
            return response
        } catch (err) {
            logError(err)
            return new Error(err)
        }
    }

    async getById(model, id) {
        try {
            const response = await model.findOne( {_id : id} )
            if (response !== null) {
                const obj = response._doc
                const {_id, ...rest} = obj
                const newObj = {id: _id.toString(), ...rest}
                return newObj
            }
            return null
        } catch (err) {
            logError(err)
            return new Error(err)
        }
    }

    async getByKey(model, filterObject) {
        try {
            const response = await model.findOne(filterObject)
            return response
        } catch (err) {
            logError(err)
            return new Error(err)
        }
    }

    async getByUsername(model, username) {
        const user = await model.findOne( {username : username} )
        return user
    }

    async updateFieldById(model, id, object) {
        try {
            const response = await model.updateOne({_id: id}, {$set: object}, {new: true})
            return response
        } catch (err) {
            logError(err)
            return false
        }
    }

}

module.exports = MongoDbContainer