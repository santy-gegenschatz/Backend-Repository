const author = new normalizr.schema.Entity('authors', {}, {idAttribute: 'email'})
const message = new normalizr.schema.Entity('messages', {
    author: author
})
const messageArray = new normalizr.schema.Entity('messageArrays', {
    messages: [message]
})

// Define socket
const socket = io()

// Define actions for each case
socket.on('messages', (data) => {
    try {
        renderCompression(data.compression)
        renderMessages(data.normalizedData)
    } catch(err) {
        console.log(err);
    }
})

// Define specific functions
const renderCompression = (compression) => {
    const h5 = document.getElementById('h5')
    h5.innerText = `Compression: ${(compression*100).toString().slice(0, 4)}%`
}

const renderMessages = (data) => {
    const denormalizedData = normalizr.denormalize(data, messageArray, data.entities)
    const messagesObject = denormalizedData.entities.messages;
    const messagesArray = Object.entries(messagesObject).map ( (key) => {
        const m = key[1]
        return (`
        <div class = 'message-div'>
        <strong> ${m.author} </strong>
        <br/>
        <em> ${m.text} </em>
        <br/>
        <div style = 'text-align: right'> ${m.date.toString().slice(0,10) + ' ' + m.date.toString().slice(11,16)} </div>
        </div>
        `)
    })

    const chatDiv = document.getElementById('chat-messages-div')
    chatDiv.innerHTML = messagesArray.join(' ')

    
}

const addMessage = (m) => {
    const text = document.getElementById('text').value
    const name = document.getElementById('name').value
    const surname = document.getElementById('surname').value
    const email = document.getElementById('email').value
    const age = document.getElementById('age').value
    const alias = document.getElementById('alias').value

    const message = {
        author: {
            name,
            surname,
            email,
            age,
            alias
        },
        text,
        date: new Date()
    }
    socket.emit('new-message', message)
    return false
}