console.log('Exporting Carts Dao');

let cartsApiContainerType = process.env.CARTS_API_CONTAINER
let moduleToExport;

switch(cartsApiContainerType) {
    case 'archive':
        moduleToExport = require('./cartsArchiveDao')
        return 
    case 'mongo':
        moduleToExport = require('./cartsMongoDao')
        return
    case 'firebase':
        moduleToExport = require('./cartsFirebaseDao')
        return
    case 'sql':
        moduleToExport = require('./cartsSqlDao')
        return
    default:
        moduleToExport = require('./cartsArchiveDao')
}

console.log('Finished exporting');

module.exports = moduleToExport