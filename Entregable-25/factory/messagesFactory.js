const { logDebug } = require('../loggers/logger');
logDebug('Exporting Messages Dao');

const messagesContainer = process.env.MESSAGES_CONTAINER
let moduleToExport;

switch(messagesContainer) {
    case 'archive':
        moduleToExport = require('../daos/messages/messagesArchiveDao')
        break;
    case 'mongoOnline':
        moduleToExport = require('../daos/messages/messagesMongoDao')
        break;
    case 'mongoLocal':
        moduleToExport = require('../daos/messages/messagesMongoDao')
        break;
    default:
        moduleToExport = require('../daos/messages/messagesArchiveDao')
        break;
}

module.exports = moduleToExport