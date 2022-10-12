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