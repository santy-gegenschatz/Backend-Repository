const Router = require('koa-router');
const router = new Router({ prefix: '/api/products' } );
const { getProducts, getProduct, addProduct, updateProduct, deleteProduct } = require('./koaController')

router.get('/', getProducts)

router.get('/:id', getProduct)

router.post('/', addProduct)

router.put('/:id', updateProduct)

router.delete('/:id', deleteProduct)

module.exports = router;