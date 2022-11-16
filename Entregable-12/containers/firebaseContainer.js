const admin = require('firebase-admin')
const { firestore, database } = require('firebase-admin')
const { serviceAccount, databaseURL } = require('../data/firebaseData/firebaseConfig')

class FirebaseContainer {
    constructor(collectionName) {
        this.proceed = false
        this.connectDB(this.proceed)
        this.collectionName = collectionName
    }

    async connectDB(proceed) {
        if (proceed) {
            console.log('proceeding');
            // admin.initializeApp({
            //     credential: admin.credential.cert(serviceAccount),
            //     databaseURL: databaseURL
            // })
        }
    }

    async read() {
        if (this.proceed) {
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