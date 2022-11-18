const { products } = require('../data/archiveData/index')
const { generateFakeProducts } = require('../utils/fakeProductGenerator')
const renderHome = async (req, res) => {
    console.log('receiving');
    res.render('form.ejs', {products: products, noRender : products.length===0, username : req.session.user})
}

const renderProducts = async (req, res) => {
    res.render('products.ejs', {products: products, noRender : products.length===0})
}

const renderFakeProducts = async (req, res) => {
    res.render('fakeproducts.ejs', {products: generateFakeProducts(5)})
}

module.exports = { renderHome, renderProducts, renderFakeProducts }