// Plain vanilla server with express
const express = require('express');

//Plain vanilla server with sockets.io
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

// Instantiate everything
const app = express();
const httpServer = new HttpServer(app)
const ioServer = new IOServer(httpServer)

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(express.static('../public'))

// Extract router from express
const {Router} = express
const router = Router()//
app.use('/api/products', router)

// Ejs Config
app.set('views', '../views')
app.set('view engine', 'ejs')
const { render } = require('ejs')

// Data
const { products, messages } = require('../data/index')

// Websocket connections
ioServer.on('connection', (client) => {
    console.log('Client connected');
    client.emit('messages', messages)

    client.on('new-message', (msg) => {
        messages.push(msg)
        ioServer.sockets.emit('messages', messages)
    })

    client.on('add-product', (product) => {
        products.push(product)
        ioServer.sockets.emit('products', product)
    })
})

// Router routes
app.get('/', (req, res) => {
    res.render('form.ejs', {products: products, noRender : products.length===0})
})

app.get('/products', (req, res) => {
    console.log(products.length);
    res.render('products.ejs', {products: products, noRender : products.length===0})
})

app.post(('/products'), (req, res) => {
    const {title, price, thumbnail} = req.body
    console.log(req.body);
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

// Router url's
router.get('/', (req, res) => {
    res.status(200).json({products: products})
})

// Get products by id
router.get('/:id', (req, res) => {
    // We get the params with a destructuring, as follows:
    const { id } = req.params
    // We find the product in the array of products
    const selectedProduct = products.find(prod => prod.id === Number(id))
    if (selectedProduct !== undefined) {
        res.status(200).json({
            product : selectedProduct
        })
    } else {
        res.status(400).json({
            error : "No product matches that id"
        })
    }
})

// Add a product to the array
router.post('/', (req, res) => {
    const {title, price, thumbnail} = req.body
    console.log(req);
    console.log(req.body);
    if (title && price && thumbnail) {
        const newProduct = {
            title : title,
            price : price,
            thumbnail : thumbnail,
            id : products.length + 1
        }
        // Add the product to the array
        products.push(newProduct)
        // Return it through a JSON
        res.status(200).json({
            message : 'Successfuly created product',
            product : newProduct
        })
    } else {
        res.status(400).json({error : 'At least one of the query params is failing'})
    }
})

// Update a product that already exists in the db
router.put('/:id', (req, res) => {
    // Get the id via req.params
    const {id} = req.params
    // Find the product in the array
    const productToUpdate = products.find( (prod) => prod.id === Number(id))
    if (productToUpdate !== undefined) {
        // Find it in the array again, but this time mo
        let modified = false;
        let {title, price, thumbnail} = req.body
        console.log(req.body);
        //
        if (title && price && thumbnail) {
            products.forEach( (prod) => {
                if (prod.id === Number(id)) {
                    prod.title = title
                    prod.price = price
                    prod.thumbnail = thumbnail
                    modified = true;
                }
            })
            if (modified) {
                res.status(200).json({
                    status : `Successfully updated product with id ${id}`
                })    
            }
        } else {
            res.status(400).json({
                error : 'One of the body parameters is faulty'
            })
        }
    } else {
        res.status(400).json({
            error : 'The id inserted did not match with any product'
        })
    }
})

// Delete an item
router.delete('/:id', (req, res) => {
    const {id} = req.params
    // Find it in the array and delete it
    const index = products.findIndex( (prod) => prod.id === Number(id))
    if (index !== -1) {
        products.splice(index, 1)
        res.status(200).json({
            response : 'Product successfully deleted'
        })
    } else {
        res.status(400).json({
            error : 'No product matches that id'
        })
    }
})

// Make the server listen on a given port
const PORT = process.env.PORT || 8080
httpServer.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`Server running on port ${PORT}`);
})