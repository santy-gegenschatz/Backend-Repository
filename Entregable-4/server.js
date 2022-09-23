const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080

const products = []

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
    const {title, price, thumbnail} = req.query
    if (title && price && thumbnail) {
        
    } else {
        res.status(400).json({error : 'At least one of the query params is failing'})
    }
    const newProduct = {
        title : title,
        price : price,
        thumbnail : thumbnail
    }

})


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})