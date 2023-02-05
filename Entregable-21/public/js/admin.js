const addProduct = async () => {
    const title = document.getElementById('title').value
    const price = document.getElementById('price').value
    const thumbnail = document.getElementById('thumbnail').value

    // Check that all fields are filled
    if (title === '' || price === '' || thumbnail === '') {
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

    const product = {
        title,
        price,
        thumbnail
    }

    const response = await fetch('/api/products/test', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })

    console.log(response);

    const data = await response.json()
    console.log(data)
}
