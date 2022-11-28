const admin = require('firebase-admin')

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
            console.log('Successfully connected to the firebase');
            this.connected = true;
        }
    }

    create = async (collectionName, sth) => {
        try {
            const query = this.db.collection(collectionName)
            const doc = query.doc()
            const response = await doc.create(sth)
            return response
        } catch(err) {
            console.log(err);
            return new Error(err)
        }
    }
    
    getAll = async(collectionName) => {
        try {
            const query = this.db.collection(collectionName)
            const querySnapshot = await query.get()
            let docs = querySnapshot.docs;
            console.log(docs);
            const response = docs.map ((doc) => {
                
            })
            console.log(response);
            return response
        } catch (err) {
            console.log(err);
            return new Error(err)
        }
    }

    getById = async (collectionName, id) => {
        try {
            const query = this.db.collection(collectionName)
            const doc = query.doc(id)
            const item = await doc.get()
            const response = item.data()
            return response
        } catch(err) {
            console.log(err);
            return new Error(err)
        }
    }

    updateById = async (collectionName, id, updateObject) => {
        try {
            const doc = this.query.doc(id)
            // Note that the update operation is additive, whatever keys are not passed will remain as they are
            const response = await doc.update(updateObject)
            console.log(response);
        } catch(err) {
            console.log(err);
            return new Error(err)
        }
    }

    delete = async (collectionName, id) => {
        try {
            const doc = this.query.doc(id)
            const response = await doc.delete()
            console.log(response);
        } catch(err) {
            console.log(err);
            return new Error(err)
        }
    }
    
}

module.exports = new FirebaseContainer()