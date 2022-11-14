// Imports
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
    console.log('rendering');
    renderCompression(data)
    console.log('ok');
    renderMessages(data)
})

socket.on('products', (data) => {
    renderProduct(data)
})

// Define specific functions
const renderCompression = (data) => {
    const h5 = document.getElementById('h5')
    const { compression } = data
    h5.innerText = `Compression: ${(compression*100).toString().slice(0, 4)}%`
}

const renderMessages = (data) => {
    const { normalizedData } = data
    console.log(normalizedData);
    const denormalizedData = normalizr.denormalize(normalizedData, messageArray)
    const array = denormalizedData.entities.messages
    console.log('Array: ', array);
    console.log('¡B');
    
}

const renderProduct = (prod) => {
    const table = document.getElementById('table')
    const tableHtml = table.innerHTML
    console.log(tableHtml);
    const newHtml = `<tr> <td> ${prod.title} </td> <td> ${prod.price} </td> <td> <img src = '${prod.thumbnail}'> </td> </tr> </tbody>`
    const replaced = tableHtml.replace('</tbody>', newHtml)
    console.log(replaced);
    table.innerHTML = replaced
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
    console.log(message);
    socket.emit('new-message', message)
    return false
}

const addProduct = (p) => {
    const title = document.getElementById('title').value
    const price = document.getElementById('price').value
    const thumbnail = document.getElementById('thumbnail').value

    const product = { title, price, thumbnail}
    socket.emit('add-product', product)
    return false
}


{/* //             <strong class = 'blue'> ${m.author.name}, ${m.author.surname} [${m.author.age}] </strong> <span class = 'brown'> [${m.date.toString().slice(0, 11)}] </span> :  <em class = 'green' > ${m.text} </em> */}