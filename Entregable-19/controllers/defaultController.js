const { fork } = require('child_process')
const productsDao = require('../daos/products/index')
const { logInfo, logDebug } = require('../loggers/logger')
const { generateFakeProducts } = require('../utils/fakeProductGenerator')
const { getServerInfo } = require('../utils/serverInfo.js')

const renderAccount = async (req, res) => {
    res.render('account.ejs', {username: req.user.username, user : req.user})
}

const renderAdminPanel = async (req, res) => {
    res.render('admin.ejs', {username : req.user.username})
}

const renderCart = async (req, res) => {
    logInfo(req.user)
    try {
        res.render('cart.ejs', {username : req.user.username})
    } catch(err) {
        logInfo(err)
    }
}

const renderFakeProducts = async (req, res) => {
    res.render('fakeproducts.ejs', {products: generateFakeProducts(5)})
}

const renderHome = async (req, res) => {
    const { payload } = await productsDao.getAllProducts()
    logInfo(payload)
    const products = payload.map( (p) => {
        return {
            title: p._doc.name,
            price: p.price,
            thumbnail: p._doc.thumbnail,
            id: p._id
        }
    })
    logDebug(products);
    res.render('home.ejs', {products: products, noRender : payload.length===0, username : req.user.username})
}

const renderMessages = async (req, res) => {
    try {
        logInfo(req.user)
        res.render('messages.ejs', {username : req.user.username})
    } catch (err) {
        res.redirect('/')
    }
}

const renderProducts = async (req, res) => {
    const { payload } = await productsDao.getAllProducts()
    logDebug(payload)
    const products = payload.map( (p) => {
        return {
            title: p._doc.name,
            price: p.price,
            thumbnail: p._doc.thumbnail
        }
    })
    logDebug(products);
    
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


module.exports = { renderHome, renderProducts, renderCart, renderMessages, renderAccount, renderAdminPanel, renderFakeProducts, renderServerInfo, renderRandomNumbers}