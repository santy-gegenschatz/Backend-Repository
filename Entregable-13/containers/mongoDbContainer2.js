const mongoose = require('mongoose')
const { route, advancedOptions} = require('../data/mongoDBData/mongoDbConfig')
const { users } = require('../models/mongoDbSchemas/users')

class MongoDbContainer2 {
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
        console.log('Connected to MongoDB');
    }

    async add(sth) {
        console.log('Saving');
        let sthSaved = await sth.save()
        console.log(sthSaved);
    }

    getById(id) {

    }

    async getAll(model) {
        console.log('Container - Finding All');
        return await model.find()
    }

    update(id) {

    }

    deleteAll() {

    }

    deleteById(id) {

    }
}

module.exports = MongoDbContainer2