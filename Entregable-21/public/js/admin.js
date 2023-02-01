const addProduct = (p) => {
    const title = document.getElementById('title').value
    const price = document.getElementById('price').value
    const thumbnail = document.getElementById('thumbnail').value

    const product = { title, price, thumbnail}
    socket.emit('add-product', product)
    return false
}
