const express = require('express');

const app = express();

const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.status(200).send("<h1> Welcome to the Server </h1>")
})

app.get('/products', (req, res) => {
    res.status(200).send("<h1> Welcome to the Server </h1>")
})

app.get('/randomProduct', (req, res) => {
    res.status(200).send("<h1> Welcome to the Server </h1>")
})

app.listen(port, (error) => {
    console.log('Listening on port: ', port);
})