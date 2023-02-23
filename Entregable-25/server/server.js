// Requiring dotenv as early as possible in the application
require('dotenv').config() // => Then we can use it anywhere in our Node project.
// Require yargs to obtain data from cmd initialization
const yargs = require('yargs/yargs')(process.argv.slice(2))

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
const { usersRouter } = require('../routers/usersRouter')
const { graphqlRouter } = require('../graphql/graphql');

// Sockets 
const { startSockets } = require('../sockets/sockets')

// Cookies and sessions
const cookieParser = require('cookie-parser') // This is a middleware, so you need to use app.use later on
const session = require('express-session') // Another middleware, but in this case for sessions
const FileStore = require('session-file-store')(session) // Store session data persistently in JSON files
const MongoStore = require('connect-mongo') // idem but store it in MongoDB
const { advancedOptions } = require('../config/mongo/mongoDbConfig') // To connect to MongoDB Atlas

// Login - Logout
const passport = require('passport')
const { initPassport } = require('../middlewares/passport'); 

// Swagger Docs
const { specs, swaggerUi } = require('../docs/swaggerDocs');
const { logError, logInfo } = require('../loggers/logger');

class Server {
    constructor() {
        this.PORT = yargs.argv.port || 8080
        this.app = express()
        this.httpServer = new HttpServer(this.app)
        this.ioServer = new IOServer(this.httpServer)
        this.middlewares()
        this.routes()
        this.templatingEngines()
        startSockets(this.ioServer)
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
      initPassport()
      this.app.use(passport.initialize())
      this.app.use(passport.session())
      this.app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs))

    }

    routes() {
      this.app.use('/', defaultRouter)
      this.app.use('/auth', authRouter)
      this.app.use('/api/products', productsRouter)
      this.app.use('/api/cart', cartRouter)
      this.app.use('/api/users', usersRouter)
      this.app.use('/api/graphql', graphqlRouter)
    }

    templatingEngines() {
        this.app.set('view engine', 'ejs')
        this.app.set('views', 'views')
    }

    listen() {
      this.httpServer.listen(this.PORT, (error) => {
          error ? logError(err) : logInfo(`Server running on port ${this.PORT}`);
      })
    }
    

}

module.exports = Server                                
