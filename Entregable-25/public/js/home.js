// Imports
const addToCart = async (id) => {
    // Add the product with the given id to the cart of the user
    const response = await fetch(`/api/users/addToCart`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({productId: id})
    })
    const data = await response.json()
    alert(data.payload.message)
    goToCart()
}
