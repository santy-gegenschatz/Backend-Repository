const archiveDao = require('./cartsArchiveDao')
const mongoDbDao = require('./cartsMongoDbDao')
const firebaseDao = require('./cartsFirebaseDao')
const sqlDbDao = require('./cartsSqlDbDao')

// In the future, this variable will be defined via a server process
// For now, we will leave it there, the switch statement will, in turn,
// respond the default value for it.
let environmentVariable;
let moduleToExport;
switch(environmentVariable) {
    case 1:
        moduleToExport = archiveDao
        return 
    case 2:
        moduleToExport = mongoDbDao
        return
    case 3:
        moduleToExport = firebaseDao
        return
    case 4:
        moduleToExport = sqlDbDao
        return
    default:
        moduleToExport = archiveDao
}

module.exports = moduleToExport