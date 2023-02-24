const { fork } = require('child_process')
const { logInfo, logDebug } = require('../loggers/logger')
const { generateFakeProducts } = require('../utils/fakeProductGenerator')
const { getServerInfo } = require('../utils/serverInfo.js')
const productsApi = require('../api/productsApi')
const usersApi = require('../api/usersApi')


const renderAdminPanel = async (req, res) => {
    res.render('admin.ejs', {username : req.user.username})
}

const renderCart = async (req, res) => {
    const { id:userId } = req.user
    const cart = await usersApi.getCurrentCartForUser(userId)

    if (cart.code !== 200) {
        res.redirect('/auth/error?message=Error+obtaining+cart')
        return
    }
    
    if (cart.payload.items.length === 0) {
        res.render('cart.ejs', {username : req.user.username, cartProducts: [], noRender : true, total: 0})
        return
    }

    const products = cart.payload.items
    let total = 0
    cart.payload.items.forEach( (p) => {
        total += p.price * p.quantity
    })
    try {
        res.render('cart.ejs', {cartId: cart.payload.id, username : req.user.username, cartProducts: products, noRender : products.length===0, total})
    } catch(err) {
        logInfo(err)
    }
}

const renderFakeProducts = async (req, res) => {
    res.render('fakeproducts.ejs', {products: generateFakeProducts(5)})
}

const renderHome = async (req, res) => {
    const { payload } = await productsApi.getAllProducts()
    const products = payload.map( (p) => {
        return {
            title: p._doc.name,
            price: p.price,
            thumbnail: p._doc.thumbnail,
            id: p._id
        }
    })
    res.render('home.ejs', {products: products, noRender : payload.length===0, username : req.user.username})
}

const renderMessages = async (req, res) => {
    try {
        res.render('messages.ejs', {username : req.user.username})
    } catch (err) {
        res.redirect('/')
    }
}

const renderProfile = async (req, res) => {
    const profileImage = './uploads/' + req.user.id + '.png'
    res.render('profile.ejs', {username: req.user.username, user : req.user, image: profileImage})
}

const renderPurchases = async (req, res) => {
    const { code, payload } = await usersApi.getPurchaseHistory(req.user.id)
    if (code !== 200) {
        res.redirect('/auth/error?message=Error+obtaining+purchase+history')
        return
    }
    if (payload.length > 0) {
        res.render('purchases.ejs', {username : req.user.username, purchases: payload, noRender : false})
        return
    } else {
        res.render('purchases.ejs', {username : req.user.username, purchases: [], noRender : true})
        return
    }
}

const renderRandomNumbers = async (req, res) => {
    const { cant } = req.query
    const computation = fork('./utils/computation.js')
    logInfo('Beginning computation')
    computation.send(cant || 1)
    computation.on('message', (obj) => {
        res.render('random.ejs', {object: obj})
    })
}

const renderServerInfo = async (req, res) => {
    res.render('info.ejs', getServerInfo())
}


module.exports = { 
    renderHome, 
    renderCart, 
    renderPurchases,
    renderMessages, 
    renderProfile, 
    renderAdminPanel, 
    renderFakeProducts, 
    renderServerInfo, 
    renderRandomNumbers
}