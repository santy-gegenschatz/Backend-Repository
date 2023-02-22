const { logDebug } = require('../loggers/logger');

logDebug('Exporting Products Dao')

const productsApiContainerType = process.env.PRODUCTS_API_CONTAINER
let moduleToExport;

switch(productsApiContainerType) {
    case 'archive':
        moduleToExport = require('../daos/products/productsArchiveDao')
        break
    case 'mongoLocal':
        moduleToExport = require('../daos/products/productsMongoDao')
        break
    case 'mongoOnline':
        moduleToExport = require('../daos/products/productsMongoDao')
        break
    case 'firebase':
        moduleToExport = require('../daos/products/productsFirebaseDao')
        break
    case 'sql':
        moduleToExport = require('../daos/products/productsSqlDao')
        break
    default:
        moduleToExport = require('../daos/products/productsArchiveDao')
}


module.exports = moduleToExport
