const messagesApi = require('../api/messagesApi')
const { logInfo } = require('../loggers/logger')

const startSockets = (ioServer) => {
    logInfo('Trying to connect to socket')
    ioServer.on('connection', async (client) => {
        logInfo('Client connected to socket')
        const messages = await messagesApi.getMessages()
        client.emit('messages', messages)
    
        // Operation when a message is added
        client.on('new-message', async (msg) => {
            const response = await messagesApi.addMessage(msg)
            if (response) {
                ioServer.sockets.emit('messages', await messagesApi.getMessages())
            }
        })
    })
}

module.exports = { startSockets }