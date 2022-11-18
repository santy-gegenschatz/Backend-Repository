// Requiring dotenv as early as possible in the application
require('dotenv').config()

// Plain vanilla server with express
const express = require('express');

// Plain vanilla server with sockets.io
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

// Routers
const { defaultRouter } = require('../routers/defaultRouter')
const { productsRouter } = require('../routers/productsRouter')
const { cartRouter } = require('../routers/cartRouter')
const { authRouter } = require('../routers/authRouter')

// Cookies and sessions
const cookieParser = require('cookie-parser') // This is a middleware, so you need to use app.use later on
const session = require('express-session') // Another middleware, but in this case for sessions
const FileStore = require('session-file-store')(session) // Store session data persistently in JSON files
const MongoStore = require('connect-mongo') // idem but store it in MongoDB
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true} // To connect to MongoDB Atlas

// Data
const { products } = require('../data/archiveData/index')
const messagesContainer = require('../containers/messagesContainer')

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
      this.app.use(express.static('public'))
      this.app.use(express.json())
      this.app.use(express.urlencoded({extended : true}))
      this.app.use(cookieParser())
      this.app.use(session({ 
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
        cookie: {maxAge: 10*60*1000},
        store: MongoStore.create({
            mongoUrl : `mongodb+srv://admin-santy:${process.env.MONGODB_PASSWORD}@cluster0.nsmqg9h.mongodb.net/Ecommerce?retryWrites=true&w=majority`, 
            mongoOptions: advancedOptions
        })
    }))
    }

    routes() {
      this.app.use('/', defaultRouter)
      this.app.use('/api/cart', cartRouter)
      this.app.use('/api/products', productsRouter)
      this.app.use('/auth', authRouter)
    }

    // Websocket connections
     async startSockets() {
        const messages = await messagesContainer.getMessages()
        this.ioServer.on('connection', (client) => {
            console.log('Client connected');
            client.emit('messages', messages)
        
            // Operation when a message is added
            client.on('new-message', async (msg) => {
                console.log('Receiving');
                const response = await messagesContainer.add(msg)
                console.log('Server - Saved');
                console.log(response);
                console.log('Sending');
                this.ioServer.sockets.emit('messages', await messagesContainer.getMessages())
            })
        
            // Operation when a product is added
            client.on('add-product', (product) => {
                products.push(product)
                this.ioServer.sockets.emit('products', product)
            })
        })
    }

    templatingEngines() {
        this.app.set('view engine', 'ejs')
        this.app.set('views', 'views')
    }

    listen() {
      this.httpServer.listen(this.PORT, (error) => {
          error ? console.log(error) : console.log(`Server running on port ${this.PORT}`);
      })
    }
    

}

module.exports = Server                                
