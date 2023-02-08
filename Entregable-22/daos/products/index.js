console.log('Exporting Product Dao');

const productsApiContainerType = process.env.PRODUCTS_API_CONTAINER
let moduleToExport;

switch(productsApiContainerType) {
    case 'archive':
        moduleToExport = require('./productsArchiveDao')
        break
    case 'mongoLocal':
        moduleToExport = require('./productsMongoDao')
        break
    case 'mongoOnline':
        moduleToExport = require('./productsMongoDao')
        break
    case 'firebase':
        moduleToExport = require('./productsFirebaseDao')
        break
    case 'sql':
        moduleToExport = require('./productsSqlDao')
        break
    default:
        moduleToExport = require('./productsArchiveDao')
}


module.exports = moduleToExport
