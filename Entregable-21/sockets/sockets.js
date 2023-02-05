const messagesDao = require('../daos/messages/index')
const { products } = require('../data/archiveData/index')
const { logDebug } = require('../loggers/logger')

const startSockets = (ioServer) => {
    logDebug('Trying to connect to socket')
    ioServer.on('connection', async (client) => {
        console.log('Client connected');
        const messages = await messagesDao.getMessages()
        logDebug('--- Messages ---')
        logDebug(messages)
        client.emit('messages', messages)
    
        // Operation when a message is added
        client.on('new-message', async (msg) => {
            console.log('Receiving');
            const response = await messagesDao.addMessage(msg)
            if (response) {
                console.log('Server - Saved');  
                ioServer.sockets.emit('messages', await messagesDao.getMessages())
            }
        })
    })
}

module.exports = { startSockets }