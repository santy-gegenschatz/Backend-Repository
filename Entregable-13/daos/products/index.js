const archiveDao = require('./productsArchiveDao')
const mongoDao = require('./productsMongoDao')
const firebaseDao = require('./productsFirebaseDao')
const sqlDao = require('./productsSqlDao')

const productsApiContainerType = process.env.PRODUCTS_API_CONTAINER
let moduleToExport;

switch(productsApiContainerType) {
    case 'archive':
        moduleToExport = archiveDao
        break
    case 'mongo':
        moduleToExport = mongoDao
        break
    case 'firebase':
        moduleToExport = firebaseDao
        break
    case 'sql':
        moduleToExport = sqlDao
        break
    default:
        moduleToExport = archiveDao
}

module.exports = moduleToExport
