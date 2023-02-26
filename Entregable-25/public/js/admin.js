const addProduct = async () => {
    const name = document.getElementById('title').value
    const price = document.getElementById('price').value
    const stock = document.getElementById('stock').value
    const thumbnail = document.getElementById('thumbnail').value

    // Check that all fields are filled
    if (name === '' || price === '' || thumbnail === '' || stock === '') {
        alert('Please fill all fields')
        return
    }

    // Check that price is a number
    if (isNaN(price)) {
        alert('Price must be a number')
        return
    }

    // Check that price is a positive number
    if (price < 0) {
        alert('Price must be a positive number')
        return
    }

    // Check that stock is a number
    if (isNaN(stock)) {
        alert('Stock must be a number')
        return
    }

    // Check that stock is a positive number
    if (stock < 0) {
        alert('Stock must be a positive number')
        return
    }

    const product = {
        name,
        price,
        stock,
        thumbnail,
    }

    const response = await fetch('/api/products/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })

    const data = await response.json()
    alert(data.message)
    goToHome()
}

const goToGraphql = () => {
    window.location.href = '/api/graphql'
}

const goToApi = () => {
    window.location.href = '/api/products/'
}

const goToMulti = () => {
    window.location.href = '/api/randoms/'
}

const goToData = () => {
    window.location.href = '/info-compressed'
}