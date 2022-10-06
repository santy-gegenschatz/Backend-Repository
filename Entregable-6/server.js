const express = require('express')
const { Server: HttpServer} = require('http')
const { Server: IOServer} = require('socket.io')
const { messages } = require('./data/data')

const app = express()
const httpServer = new HttpServer(app)
const ioServer = new IOServer(httpServer)

app.use(express.static('public'))

app.get('/', (req, res) => {
    console.log(messages);
    res.send('Hello World')
})

ioServer.on('connection', (client) => {
    console.log('Broadcasting message');
    client.emit('messages', messages)
})

httpServer.listen(4000, () => {
    console.log('Listening on port 4000');
})