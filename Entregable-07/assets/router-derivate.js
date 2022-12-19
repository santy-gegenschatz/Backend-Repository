// router.get('/:id', (req, res) => {
//     // // We get the params with a destructuring, as follows:
//     // const { id } = req.params
//     // // We find the product in the array of products
//     // const selectedProduct = products.find(prod => prod.id === Number(id))
//     // if (selectedProduct !== undefined) {
//     //     res.status(200).json({
//     //         product : selectedProduct
//     //     })
//     // } else {
//     //     res.status(400).json({
//     //         error : "No product matches that id"
//     //     })
//     // }
// })

// router.post('/', (req, res) => {
//     const {title, price, thumbnail} = req.body
//     console.log(req);
//     console.log(req.body);
//     if (title && price && thumbnail) {
//         const newProduct = {
//             title : title,
//             price : price,
//             thumbnail : thumbnail,
//             id : products.length + 1
//         }
//         // Add the product to the array
//         products.push(newProduct)
//         // Return it through a JSON
//         res.status(200).json({
//             message : 'Successfuly created product',
//             product : newProduct
//         })
//     } else {
//         res.status(400).json({error : 'At least one of the query params is failing'})
//     }
// })

// Update a product that already exists in the db
// router.put('/:id', (req, res) => {
//     // Get the id via req.params
//     const {id} = req.params
//     // Find the product in the array
//     const productToUpdate = products.find( (prod) => prod.id === Number(id))
//     if (productToUpdate !== undefined) {
//         // Find it in the array again, but this time mo
//         let modified = false;
//         let {title, price, thumbnail} = req.body
//         console.log(req.body);
//         //
//         if (title && price && thumbnail) {
//             products.forEach( (prod) => {
//                 if (prod.id === Number(id)) {
//                     prod.title = title
//                     prod.price = price
//                     prod.thumbnail = thumbnail
//                     modified = true;
//                 }
//             })
//             if (modified) {
//                 res.status(200).json({
//                     status : `Successfully updated product with id ${id}`
//                 })    
//             }
//         } else {
//             res.status(400).json({
//                 error : 'One of the body parameters is faulty'
//             })
//         }
//     } else {
//         res.status(400).json({
//             error : 'The id inserted did not match with any product'
//         })
//     }
// })

// Delete an item
// router.delete('/:id', (req, res) => {
//     // const {id} = req.params
//     // // Find it in the array and delete it
//     // const index = products.findIndex( (prod) => prod.id === Number(id))
//     // if (index !== -1) {
//     //     products.splice(index, 1)
//     //     res.status(200).json({
//     //         response : 'Product successfully deleted'
//     //     })
//     // } else {
//     //     res.status(400).json({
//     //         error : 'No product matches that id'
//     //     })
//     // }
// })