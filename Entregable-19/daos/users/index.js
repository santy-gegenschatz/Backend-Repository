console.log('Exporting Users Dao');

const usersDao = process.env.USERS_API_CONTAINER
let moduleToExport;

switch(usersDao) {
    case('mongoOnline'):
        moduleToExport = require('./usersMongoDao')
        break;
    case('mongoLocal'):
        moduleToExport = require('./usersMongoDao')
        break;
    default:
        moduleToExport = require('./usersMongoDao')
}

module.exports = moduleToExport