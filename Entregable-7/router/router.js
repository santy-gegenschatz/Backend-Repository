const {getProducts, getProduct, addProduct} = require('../controllers/controllers')
const { Router } = require('express')
const router = Router()
const { products } = require('../data/index')

// ROUTER URL'S
// Get all products
router.get('/', getProducts)

// Get a products by id
router.get('/:id', getProduct)

// Add a product to the array
router.post('/', addProduct)


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

exports.router = router