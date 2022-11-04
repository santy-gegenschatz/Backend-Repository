const archiveDao = require('./productsArchiveDao')
console.log('2');
const mongoDbDao = require('./productsMongoDbDao')
console.log('3');
const firebaseDao = require('./productsFirebaseDao')
console.log('4');
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
