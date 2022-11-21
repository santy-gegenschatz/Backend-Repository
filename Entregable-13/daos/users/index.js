const userMongoDao = require('./usersMongoDbDao')

const usersDao = process.env.USERS_DAO
let moduleToExport;

switch(usersDao) {
    case(1):
        moduleToExport = userMongoDao
    
    default:
        moduleToExport = userMongoDao
}

module.exports = moduleToExport