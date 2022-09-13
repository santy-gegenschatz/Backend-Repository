const express = require('express');

const app = express();

const port = 4000;

app.get('/', (req, res) => {
    res.status(200).json({message: 'Hello World'})
})

app.listen(port, (error) => {
    console.log('Listening on port 4000');
})