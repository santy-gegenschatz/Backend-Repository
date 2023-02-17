const goToHomeScreen = () => {
    window.location.href = '/';
}

const checkoutCart = async () => {
    console.log('Checking out cart');
    const response = await fetch('/api/users/completePurchase', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    alert(data.message, data.code)
    goToPurchases();
}

const deleteItem = async (cartId, productId) => {
    const response = await fetch(`/api/cart/${cartId}/${productId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    alert(data.message, data.code)
    goToCart();
}