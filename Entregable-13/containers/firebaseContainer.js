const admin = require('firebase-admin')

class FirebaseContainer {
    constructor(collectionName) {
        this.serviceAccount = JSON.parse(process.env.FIREBASE_SECURITY_CONFIG)
        this.databaseURL = process.env.FIREBASE_URL
        this.collectionName = collectionName
        this.connect()
        this.db = admin.firestore()
        this.query = this.db.collection(this.collectionName)
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

    create = async (sth) => {
        try {
            const doc = this.query.doc()
            const response = await doc.create(sth)
            console.log(response);
        } catch(err) {
            console.log(err);
            return new Error(err)
        }
    }
    
    getAll = async() => {
        try {
            const querySnapshot = await this.query.get()
            let docs = querySnapshot.docs;
            console.log(docs);
            const response = docs.map ((doc) => {
                
            })
            console.log(response);
        } catch (err) {
            console.log(err);
            return new Error(err)
        }
    }

    getById = async (id) => {
        try {
            const doc = this.query.doc(id)
            const item = await doc.get()
            const response = item.data()
            console.log(response);
        } catch(err) {
            console.log(err);
            return new Error(err)
        }
    }

    updateById = async (id, updateObject) => {
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

    delete = async (id) => {
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

module.exports = FirebaseContainer