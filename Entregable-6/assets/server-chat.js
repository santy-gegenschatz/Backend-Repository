const express = require('express')
const { Server: HttpServer} = require('http')
const { Server: IOServer} = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const ioServer = new IOServer(httpServer)

const { messages, products } = require('../data/index')
console.log(messages, products);

app.use(express.static('public'))

app.get('/', (req, res) => {
    console.log(messages);
    res.send('Hello World')
})

ioServer.on('connection', (client) => {
    console.log('Broadcasting message');
    client.emit('messages', messages)

    client.on('new-message', (msg) => {
        console.log(msg);
        messages.push(msg)
        ioServer.sockets.emit('messages', messages)
    })

})

const PORT = process.env.PORT || 8000
httpServer.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})