const { products } = require('../data/archiveData/index')
const renderHome = async (req, res) => {
    res.render('form.ejs', {products: products, noRender : products.length===0})
}

const renderProducts = async (req, res) => {
    res.render('products.ejs', {products: products, noRender : products.length===0})
}

module.exports = { renderHome, renderProducts }