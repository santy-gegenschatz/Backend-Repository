const mongoose = require('mongoose')
const { route, advancedOptions} = require('../data/mongoDBData/mongoDbConfig')
const { logError, logInfo } = require('../loggers/logger')

class MongoDbContainer {
    constructor(collectionName) {
        this.collectionName = collectionName
        // A method to connect to the db
        // To do this we will use mongoose
        // We also need to check that the mongodb is server is running locally on our computer
        this.connect()
    }


    // Which methods do I need ? => A simple answer is the CRUD methods (6)
    // A more complex answer is that I also need an async method that connects to the local instance of the MongoDB server
    async connect() {
        mongoose.connect(route, advancedOptions)
        console.log('Connected to MongoDB. Collection: ', this.collectionName);
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
        console.log('Container - Finding All');
        try {
            const response = await model.find()
            return response
        } catch (err) {
            logError(err)
            return err
        }
    }

    async getById(model, id) {
        try {
            const response = await model.findOne( {_id : id} )
            const obj = response._doc
            const {_id, ...rest} = obj
            const newObj = {id: _id.toString(), ...rest}
            return newObj
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
        logInfo('Getting by username')
        const user = await model.findOne( {username : username} )
        console.log('Container: Found by username: ', user);
        return user
    }



    async updateFieldById(model, id, object) {
        console.log('Container - Updating by Id');
        try {
            const response = await model.updateOne({_id: id}, {$set: object})
            return response
        } catch (err) {
            logError(err)
            return false
        }
    }

}

module.exports = MongoDbContainer