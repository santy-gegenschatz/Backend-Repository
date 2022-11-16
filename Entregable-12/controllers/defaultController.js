const { products } = require('../data/archiveData/index')
const { generateFakeProducts } = require('../utils/fakeProductGenerator')
const renderHome = async (req, res) => {
    res.render('form.ejs', {products: products, noRender : products.length===0})
}

const renderProducts = async (req, res) => {
    res.render('products.ejs', {products: products, noRender : products.length===0})
}

const renderFakeProducts = async (req, res) => {
    res.render('fakeproducts.ejs', {products: generateFakeProducts(5)})
}

module.exports = { renderHome, renderProducts, renderFakeProducts }