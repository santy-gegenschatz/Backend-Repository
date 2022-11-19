const verifyPasswordsMatch = () => {
    const pass1 = document.getElementById('passwordField1').value
    const pass2 = document.getElementById('passwordField2').value
    if (pass1 === pass2) {
        sendData(pass1)
    } else {
        alert('The passwords do not match')
    }
}

const sendData = async (password) => {
    const username = document.getElementById('usernameField').value
    console.log(username);
    const response = await fetch('/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    })

    const data = await response.json()
    console.log(data);
}