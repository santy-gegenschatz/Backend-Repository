const socket = io.connect()

const addMessage= (m) => {
    const text = document.getElementById('text').value
    const author = document.getElementById('author').value
    const message = {
        text: text,
        author: author
    }
    console.log(message);
    socket.emit('new-message', message)
    return false
}

const render = (array) => {
    console.log('Array: ', array);
    const html = array.map( (m) => {
        return (`<div> ${m.author}: ${m.text} </div>`)
    }).join(' ')
    const divDisplay = document.getElementById('divDisplay')
    divDisplay.innerHTML = html
}

socket.on('messages', (data) => {
    console.log("Message received");
    render(data)
})