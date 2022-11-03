const { query } = require('express')

class FirebaseContainer {
    constructor() {
           this.admin = require('firebase-admin')
           this.config = require('../firebase/firebaseConfig')
           this.serviceAccount = this.config.serviceAccount
           this.url = this.config.url
           this.admin.initializeApp({
            credential: this.admin.credential.cert(serviceAccount),
            databaseURL: this.url
           })
    }

    async save(object) {
        const db = this.admin.firestore()
        const query = db.collection('datapoints')
        const doc = query.doc()
        return await doc.create({data: object})
    }

    async read() {
        const querySnapshit = await quer
    }
}

module.exports = FirebaseContainer