const archiveDao = require('./cartsArchiveDao')
const mongoDbDao = require('./cartsMongoDao')
const firebaseDao = require('./cartsFirebaseDao')
const sqlDbDao = require('./cartsSqlDao')

// In the future, this variable will be defined via a server process
// For now, we will leave it there, the switch statement will, in turn,
// respond the default value for it.
let cartsApiContainerType = process.env.CARTS_API_CONTAINER
let moduleToExport;
switch(cartsApiContainerType) {
    case 'archive':
        moduleToExport = archiveDao
        return 
    case 'mongo':
        moduleToExport = mongoDbDao
        return
    case 'firebase':
        moduleToExport = firebaseDao
        return
    case 'sql':
        moduleToExport = sqlDbDao
        return
    default:
        moduleToExport = archiveDao
}

module.exports = moduleToExport