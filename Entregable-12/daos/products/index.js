const archiveDao = require('./productsArchiveDao')
const mongoDbDao = require('./productsMongoDbDao')
const firebaseDao = require('./productsFirebaseDao')
const sqlDbDao = require('./productsSqlDbDao')

let environmentVariable;
let moduleToExport;

switch(environmentVariable) {
    case 1:
        moduleToExport = archiveDao
        break
    case 2:
        moduleToExport = mongoDbDao
        break
    case 3:
        moduleToExport = firebaseDao
        break
    case 4:
        moduleToExport = sqlDbDao
        break
    default:
        moduleToExport = archiveDao
}

module.exports = moduleToExport
