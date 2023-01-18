const messagesDao = require('../daos/messages/index')
const { products } = require('../data/archiveData/index')

const startSockets = (ioServer) => {
    ioServer.on('connection', async (client) => {
        console.log('Client connected');
        const messages = await messagesDao.getMessages()
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
    
        // Operation when a product is added
        client.on('add-product', (product) => {
            products.push(product)
            ioServer.sockets.emit('products', product)
        })
    })
}

module.exports = { startSockets }