// Plain vanilla server with express
const express = require('express');

// Plain vanilla server with sockets.io
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const { productsRouter } = require('../routers/productsRouter')
const { cartRouter } = require('../routers/cartRouter')

// Data
const { products, messages } = require('../data/index')
// const dbMessages = require('../containers/messagesContainer')
// const sqlite3Config = require('../database/sqlite3.config')
// const Messages = new dbMessages(sqlite3Config, 'messages')

class Server {
    constructor() {
        this.PORT = process.env.PORT || 8080
        this.app = express()
        this.httpServer = new HttpServer(this.app)
        this.ioServer = new IOServer(this.httpServer)
        this.middlewares()
        this.routes()
        this.templatingEngines()
        this.startSockets()
    }

    middlewares() {
      this.app.use(express.json())
      this.app.use(express.urlencoded({extended : true}))
      this.app.use(express.static('public'))
    }

    routes() {
      this.app.use('/api/products', productsRouter)
      this.app.use('/api/cart', cartRouter)
      // App routes
        this.app.get('/', (req, res) => {
            res.render('form.ejs', {products: products, noRender : products.length===0})
        })

        this.app.get('/products', (req, res) => {
            res.render('products.ejs', {products: products, noRender : products.length===0})
        })

    }

    templatingEngines() {
      this.app.set('views', 'views')
      this.app.set('view engine', 'ejs')
    }

    listen() {
      this.httpServer.listen(this.PORT, (error) => {
          error ? console.log(error) : console.log(`Server running on port ${this.PORT}`);
      })
    }
    
    // Websocket connections
    startSockets() {
        this.ioServer.on('connection', (client) => {
            console.log('Client connected');
            client.emit('messages', Messages.getMessages())
        
            // Operation when a message is added
            client.on('new-message', (msg) => {
                Messages.addMessage(msg)
                this.ioServer.sockets.emit('messages', Messages.getMessages())
            })
        
            // Operation when a product is added
            client.on('add-product', (product) => {
                products.push(product)
                this.ioServer.sockets.emit('products', product)
            })
        })
    }
}

module.exports = Server                                
