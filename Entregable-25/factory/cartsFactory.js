const { logDebug } = require('../loggers/logger');
logDebug('Exporting Carts Dao')

const cartsApiContainerType = process.env.CARTS_API_CONTAINER
let moduleToExport;

switch(cartsApiContainerType) {
    case 'archive':
        moduleToExport = require('../daos/carts/cartsArchiveDao')
        break 
    case 'mongoLocal':
        moduleToExport = require('../daos/carts/cartsMongoDao')
        break
    case 'mongoOnline':
        moduleToExport = require('../daos/carts/cartsMongoDao')
        break
    case 'firebase':
        moduleToExport = require('../daos/carts/cartsFirebaseDao')
        break
    case 'sql':
        moduleToExport = require('../daos/carts/cartsSqlDao')
        break
    default:
        moduleToExport = require('../daos/carts/cartsArchiveDao')
}

module.exports = moduleToExport