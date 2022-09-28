// Plain vanilla server with express
const express = require('express')
const app = express()
const PORT = 8080;

app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`Server running on port ${PORT}`);
})

// Handlebars config
const handlebars = require('express-handlebars')
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
        layoutsDir: __dirname + 'views/layouts',
        partialsDir: __dirname + 'views/partials'
    })
)
app.set('view engine', 'hbs')
app.set('views', './views')
app.use(express.static('public'))