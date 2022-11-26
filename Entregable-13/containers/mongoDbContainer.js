const mongoose = require('mongoose')
const { route, advancedOptions} = require('../data/mongoDBData/mongoDbConfig')

class MongoDbContainer {
    constructor(collectionName, connect) {
        this.collectionName = collectionName
        // A method to connect to the db
        // To do this we will use mongoose
        // We also need to check that the mongodb is server is running locally on our computer
        if (connect) {
            this.connect()
        }
    }


    // Which methods do I need ? => A simple answer is the CRUD methods (6)
    // A more complex answer is that I also need an async method that connects to the local instance of the MongoDB server
    async connect() {
        mongoose.connect(route, advancedOptions)
        console.log('Connected to MongoDB. Collection: ', this.collectionName);
    }

    async add(model, sth) {
        try {
            console.log('Container: Saving');
            let sthSaved = await model.save(sth)
            return sthSaved
        } catch(err) {
            console.log(err);
            return err
        }
    }

    async getByKey(model, keyname, keyvalue) {
        try {
            console.log(keyname);
            const response = await model.findOne({keyname: keyvalue})
            return response
        } catch (err) {
            return err
        }
    }

    async getById(model, id) {
        try {
            console.log('Container: Getting by id');
            const user = await model.findOne( {_id : id} )
            console.log('Container - Found by id: ', user, 'end');
            return user
        } catch (err) {
            return err
        }
    }

    async getByUsername(model, username) {
        console.log('Container: Getting by username');
        const user = await model.findOne( {username : username} )
        console.log('Container: Found by username: ', user);
        return user
    }

    async getAll(model) {
        console.log('Container - Finding All');
        try {
            const response = await model.find()
            return response
        } catch (err) {
            console.log(err);
            return err
        }
    }

    async updateFieldById(model, id, field, value) {
        console.log('Container - Updating by Id: ', field);
        try {
            const response = await model.updateOne({'_id': id}, {$set: {field: value}})
            return response
        } catch (err) {
            return err
        }
    }

    async delete(model, id) {
        try {
            const response = await model.deleteOne({'_id': id})
            return response
        } catch (err) {
            return err
        }
    }

}

module.exports = MongoDbContainer