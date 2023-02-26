const express = require('express')
const { Server: HttpServer} = require('http')
const { Server: IOServer} = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const ioServer = new IOServer(httpServer)

const { messages, products } = require('../data/index')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send('Hello World')
})

ioServer.on('connection', (client) => {
    client.emit('messages', messages)

    client.on('new-message', (msg) => {
        messages.push(msg)
        ioServer.sockets.emit('messages', messages)
    })

})

const PORT = process.env.PORT || 8000
httpServer.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})

app.post(('/products'), (req, res) => {
    const {title, price, thumbnail} = req.body
    if (title && price && thumbnail) {
        const newProduct = {
            title : title,
            price : price,
            thumbnail : thumbnail,
            id : products.length + 1
        }
        // Add the product to the array
        products.push(newProduct)
        res.redirect('/products')
    }
})