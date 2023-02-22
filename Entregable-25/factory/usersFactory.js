const { logDebug } = require('../loggers/logger');

logDebug('Exporting Users Dao')

const usersDao = process.env.USERS_API_CONTAINER
let moduleToExport;

switch(usersDao) {
    case('mongoOnline'):
        moduleToExport = require('../daos/users/usersMongoDao')
        break;
    case('mongoLocal'):
        moduleToExport = require('../daos/users/usersMongoDao')
        break;
    default:
        moduleToExport = require('../daos/users/usersMongoDao')
}

module.exports = moduleToExport