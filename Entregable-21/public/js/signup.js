const verifyFields = () => {
    const age = document.getElementById('ageField').value
    const phoneNumber = document.getElementById('phoneField').value
    if (age < 18) {
        alert('You must be 18 or older to use this service')
        return;
    }

    // if (phoneNumber.length < 10) {
    //     alert('Phone number must be at least 10 digits long ')
    //     return;
    // }

    verifyPasswordsMatch()
}

const verifyPasswordsMatch = () => {
    const pass1 = document.getElementById('passwordField1').value
    const pass2 = document.getElementById('passwordField2').value
    if (pass1 === pass2) {
        // if (pass1.length < 8) {
        //     alert('Password must be at least 8 characters')
        //     return;
        // }

        if (pass1.length > 20) {
            alert('Password must be less than 20 characters')
            return;
        }
        sendData(pass1)
    } else {
        alert('The passwords do not match')
        return;
    }
}

const sendData = async (password) => {
    const username = document.getElementById('usernameField').value
    const firstName = document.getElementById('firstNameField').value
    const address = document.getElementById('addressField').value
    const phoneNumber = document.getElementById('phoneField').value
    const age = document.getElementById('ageField').value
    const file = document.getElementById('fileField').files[0]
    const formData = new FormData()
    formData.append('username', username)
    formData.append('password', password)
    formData.append('firstName', firstName)
    formData.append('address', address)
    formData.append('phoneNumber', phoneNumber)
    formData.append('age', age)
    formData.append('file', file)

    const response = await fetch('/auth/signup', {
        method: 'POST',
        body: formData
    })

    console.log('Response: ', response);
    const data = await response.json()
    console.log('Data: ', data);
    window.location.href = data.url
}