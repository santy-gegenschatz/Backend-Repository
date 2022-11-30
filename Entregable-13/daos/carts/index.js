console.log('Exporting Carts Dao');

let cartsApiContainerType = process.env.CARTS_API_CONTAINER
let moduleToExport;

switch(cartsApiContainerType) {
    case 'archive':
        moduleToExport = require('./cartsArchiveDao')
        return 
    case 'mongo':
        console.log('Starting');
        moduleToExport = require('./cartsMongoDao')
        console.log('Done');
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