const admin = require('firebase-admin')
const { logDebug, logError } = require('../loggers/logger')

class FirebaseContainer {
    constructor() {
        this.serviceAccount = JSON.parse(process.env.FIREBASE_SECURITY_CONFIG)
        this.databaseURL = process.env.FIREBASE_URL
        this.connect()
        this.db = admin.firestore()
        this.connected = false;
    }
    
    connect = () => {
        if (!this.connected) {
            admin.initializeApp({
                credential: admin.credential.cert(this.serviceAccount),
                databaseURL: this.databaseURL
            })
            logDebug('Successfully connected to the firebase');
        }
    }

    create = async (collectionName, sth) => {
        try {
            const response = await this.db.collection(collectionName).add(sth)
            return response
        } catch(err) {
            logError(err);
            return new Error(err)
        }
    }
    
    getAll = async(collectionName) => {
        try {
            const query = this.db.collection(collectionName)
            const querySnapshot = await query.get()
            let docs = querySnapshot.docs;
            const response = docs.map ((doc) => {
                
            })
            return response
        } catch (err) {
            logError(err);
            return new Error(err)
        }
    }

    getById = async (collectionName, id) => {
        try {
            const query = this.db.collection(collectionName)
            const doc = query.doc(id)
            const item = await doc.get()
            const response = item.data()
            if (typeof response !== 'undefined') {
                return {
                    ...response,
                    id
                }
            } else {
                return new Error('Something went wrong')
            }
        } catch(err) {
            logError(err);
            return new Error(err)
        }
    }

    updateById = async (collectionName, id, updateObject) => {
        try {
            const query = this.db.collection(collectionName)
            const doc = query.doc(id)
            // Note that the update operation is additive, whatever keys are not passed will remain as they are
            const response = await doc.update(updateObject)
            return response
        } catch(err) {
            logError(err);
            return new Error(err)
        }
    }

    delete = async (collectionName, id) => {
        try {
            const query = this.db.collection(collectionName)
            const doc = query.doc(id)
            const response = await doc.delete()
            return response
        } catch(err) {
            logError(err);
            return new Error(err)
        }
    }
    
}

module.exports = new FirebaseContainer()