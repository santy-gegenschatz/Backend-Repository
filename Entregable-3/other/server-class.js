const express = require('express');

const app = express();

const port = 4000;

// Analytical variables
let numberOfVisits = 0;
const serverStartDate = new Date().toUTCString()

const increaseNumberOfVisitors = () => {numberOfVisits +=1}

app.get('/', (req, res) => {
    res.status(200).send("<h1 style = 'color: blue'> Welcome to the express server</h1>")
    increaseNumberOfVisitors();
})

app.get('/visitors', (req, res) => { 
    res.status(200).json({message: `The number of visitors since this server has become active on ${serverStartDate} is ${numberOfVisits}`})
    increaseNumberOfVisitors();
})

app.get('/time&date', (req, res) => {
    const currentTimeAndDate = new Date().toUTCString(); // Figure out online how to make this UTC.
    res.status(200).json({message: `The current time and date is ${currentTimeAndDate}`})
    increaseNumberOfVisitors();
})


app.listen(port, (error) => {
    console.log('Listening on port 4000');
})