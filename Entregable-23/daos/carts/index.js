console.log('Exporting Carts Dao');

const cartsApiContainerType = process.env.CARTS_API_CONTAINER
let moduleToExport;

switch(cartsApiContainerType) {
    case 'archive':
        moduleToExport = require('./cartsArchiveDao')
        break 
    case 'mongoLocal':
        moduleToExport = require('./cartsMongoDao')
        break
    case 'mongoOnline':
        moduleToExport = require('./cartsMongoDao')
        break
    case 'firebase':
        moduleToExport = require('./cartsFirebaseDao')
        break
    case 'sql':
        moduleToExport = require('./cartsSqlDao')
        break
    default:
        moduleToExport = require('./cartsArchiveDao')
}

module.exports = moduleToExport