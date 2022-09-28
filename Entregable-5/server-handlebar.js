// Plain vanilla server with express
const express = require('express')
const app = express()
const PORT = 8080;

app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`Server running on port ${PORT}`);
})

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/prueba', (req, res) => {
    const {nombre, apellido} = req.query
    res.render('main', {nombre, apellido})
})

// Handlebars config
const hbs = require('express-handlebars')
app.set('views', './views')
app.set('view engine', 'hbs')
app.engine('hbs', hbs.engine({
    extname: '.hbs',
    partialsDir: __dirname + '/views/partials',
    layoutsDir: __dirname + '/views/layouts',
    defaultLayout: 'layout1.hbs'
}))