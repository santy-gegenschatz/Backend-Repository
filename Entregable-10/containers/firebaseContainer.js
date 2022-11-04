const admin = require('firebase-admin')
const { firestore, database } = require('firebase-admin')
const { serviceAccount, databaseURL } = require('../firebase/firebaseConfig')

class FirebaseContainer {
    constructor(collectionName) {
        this.connectDB()
        this.collectionName = collectionName
    }

    async connectDB() {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: databaseURL
        })
    }

    async read() {
        try {
            const db = admin.firestore()
            const query = db.collection(this.collectionName)
            const querySnapshot = await query.get()
            let docs = querySnapshot.docs
            const response = docs.map( (doc) => {
                return {
                    ...doc
                }
            })
            console.log(response);
        } catch (e) {
            console.log(e);
        }
    }

    async save(array) {
        const db = admin.firestore()
        const query = db.collection(this.collectionName)
        // Create
        try {
            const doc = query.doc()
            await doc.create({saved : array})
            console.log('Inserted data into the Firebase DB');
        } catch (e) {
            console.log(e);
        }
    }


}

module.exports = FirebaseContainer