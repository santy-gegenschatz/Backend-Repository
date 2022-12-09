const { fork } = require('child_process')
const productsDao = require('../daos/products/index')
const { generateFakeProducts } = require('../utils/fakeProductGenerator')
const { getServerInfo } = require('../utils/serverInfo.js')

const renderFakeProducts = async (req, res) => {
    res.render('fakeproducts.ejs', {products: generateFakeProducts(5)})
}

const renderHome = async (req, res) => {
    const { payload } = await productsDao.getAllProducts()
    const products = payload.map( (p) => {
        console.log(p._doc.thumbnail);
        return {
            title: p._doc.title,
            price: p.price,
            thumbnail: p._doc.thumbnail
        }
    })
    console.log(products);
    res.render('home.ejs', {products: products, noRender : payload.length===0, username : req.user.username})
}

const renderProducts = async (req, res) => {
    res.render('products.ejs', {products: products, noRender : products.length===0})
}

const renderRandomNumbers = async (req, res) => {
    const { cant } = req.query
    const computation = fork('./utils/computation.js')
    console.log('Beginning Computation');
    computation.send(cant || 1)
    computation.on('message', (obj) => {
        res.render('random.ejs', {object: obj})
    })
}

const renderServerInfo = async (req, res) => {
    res.render('info.ejs', getServerInfo())
}


module.exports = { renderHome, renderProducts, renderFakeProducts, renderServerInfo, renderRandomNumbers}