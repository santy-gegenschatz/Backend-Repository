// Imports
import Container from './container';

// Server config
const express = require('express');

const app = express();

const port = process.env.PORT || 8080;

// Container config
const container = new Container('products.txt');

// Routes
app.get('/', (req, res) => {
    res.status(200).send("<h1> Welcome to the Server </h1>")
})

app.get('/products', (req, res) => {
    container.getAll()
    .then( (response) => {
        res.status(200).send(response)
    })
})

app.get('/randomProduct', (req, res) => {
    container.getRandomProduct()
    .then( (response) => {
        res.status(200).send(response)
    })
})

app.listen(port, (error) => {
    console.log('Listening on port: ', port);
})