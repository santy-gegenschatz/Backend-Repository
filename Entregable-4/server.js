const express = require('express');
const { title } = require('process');
const app = express();

// Use json to receive post requests
app.use(express.json())
app.use(express.urlencoded({extended : true}))

const PORT = process.env.PORT || 8080

const products = [{id : 1, title : 'prodcut #1', price : 10, thumbnail : 'url'}]

// Get all products
app.get('/api/products', (req, res) => {
    res.status(200).json({products: products})
})

// Get products by id
app.get('/api/products/:id', (req, res) => {
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
app.post('/api/products', (req, res) => {
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
        // Return it through a JSON
        res.status(200).json({
            product : newProduct
        })
    } else {
        res.status(400).json({error : 'At least one of the query params is failing'})
    }
})

// Update a product that already exists in the db
app.put('(api/products/:id', (req, res) => {
    // Get the id via req.params
    const {id} = req.params
    // Find the product in the array
    const productToUpdate = products.find( (prod) => prod.id === Number(id))
    if (productToUpdate !== undefined) {
        // Find it in the array again, but this time mo
        const modified = false;
        const {title, price, thumbnail} = req.body
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
app.delete('api/products/:id', (req, res) => {
    const {id} = req.params
    // Find it in the array and delete it
    const index = products.findIndex( (prod) => prod.id === id)
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


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})