const socket = io.connect()

const addMessage = (m) => {
    const text = document.getElementById('text').value
    const author = document.getElementById('author').value
    const message = {
        text: text,
        author: author,
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

const render = (array) => {
    const html = array.map( (m) => {
        return (`<div class = 'main-div'> 
                <strong class = 'blue'> ${m.author} </strong> <span class = 'brown'> [${m.date}] </span> :  <em class = 'green' > ${m.text} </em>
                </div>`)
    }).join(' ')
    const divDisplay = document.getElementById('divDisplay')
    divDisplay.innerHTML = html
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

socket.on('messages', (data) => {
    render(data)
})

socket.on('products', (data) => {
    renderProduct(data)
})