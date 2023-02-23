const { logDebug } = require("../loggers/logger");

const calculateRandomNumbers = (limit) => {
    let checkedLimit = limit
    if (limit < 10000) {
        checkedLimit = 100000000
    }
    const randomNumbersAmplitude = 1000;
    let randomNumbers = []
    for (let index = 0; index < checkedLimit; index++) {
        const randomNumber = Math.floor(Math.random() * randomNumbersAmplitude)
        randomNumbers.push(randomNumber)
    }

    let obj = {};
    for (let index = 0; index < randomNumbersAmplitude; index++) {
        obj[index] = 0
    }
    
    for (let index = 0; index < randomNumbers.length; index++) {
        obj[randomNumbers[index]] = obj[randomNumbers[index]] + 1
    }
    return obj
}

process.on('message', (cant) => {
    logDebug('Cant: ', cant);
    const response = calculateRandomNumbers(cant)
    logDebug('Sending back');
    setTimeout(() => {
        process.send(JSON.stringify(response, null, 2))
    }, 2000)
})