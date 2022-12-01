const { products } = require('../data/archiveData/index')
const { generateFakeProducts } = require('../utils/fakeProductGenerator')
const { getServerInfo } = require('../utils/serverInfo.js')

const renderFakeProducts = async (req, res) => {
    res.render('fakeproducts.ejs', {products: generateFakeProducts(5)})
}

const renderHome = async (req, res) => {
    res.render('home.ejs', {products: products, noRender : products.length===0, username : req.user.username})
}

const renderProducts = async (req, res) => {
    res.render('products.ejs', {products: products, noRender : products.length===0})
}

const renderServerInfo = async (req, res) => {
    res.render('info.ejs', getServerInfo())
}


module.exports = { renderHome, renderProducts, renderFakeProducts, renderServerInfo}