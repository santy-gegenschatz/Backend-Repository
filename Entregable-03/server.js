// Imports
import {Container} from './container.js';
import express from 'express';

const app = express();

const port = process.env.PORT || 8080;

// Container config
const container = new Container('products.txt');

// Routes
app.get('/', (req, res) => {
    res.status(200).send("<h1 style = 'text-align: center'> Welcome to the Server </h1> <p style = 'text-align: center'> You can check out the Route /randomProduct to get a new JSON object</p>")
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
        console.log(response);
        res.status(200).send(response) //
    })
})

app.listen(port, (error) => {
    console.log('Listening on port: ', port);
})