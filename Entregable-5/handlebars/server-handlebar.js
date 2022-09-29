// Data imports
const p1 = {id : 1, title : 'prodcut #1', price : 10, thumbnail : 'url'}
const p2 = {id : 2, title : 'prodcut #2', price : 20, thumbnail : 'url'}
const p3 = {id : 3, title : 'prodcut #3', price : 150, thumbnail : 'url'}
const p4 = {id : 4, title : 'prodcut #4', price : 250, thumbnail : 'url'}
const products = [p1, p2, p3, p4]

console.log(products);

// Plain vanilla server with express
const express = require('express');
const app = express();

// Extract router from express
const {Router} = express
const router = Router()

// Use json to receive post requests
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(express.static('public'))

// Set up the app.use
app.use('/api/products', router)

// Handlebars config
const hbs = require('express-handlebars')
app.set('views', './views')
app.set('view engine', 'hbs')
app.engine('hbs', hbs.engine({
    extname: '.hbs',
    partialsDir: __dirname + '/views/partials',
    layoutsDir: __dirname + '/views/layouts',
    defaultLayout: 'products-form-layout.hbs'
}))


// Common url's
app.get('/', (req, res) => {
    res.render('form.hbs')
})

app.get('/products', (req, res) => {
    res.render('products', {layout : 'products-table-layout', products: products, noRender : products.length!==0?false:true})
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
app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`Server running on port ${PORT}`);
})