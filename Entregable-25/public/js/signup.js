const verifyFields = () => {
    const age = document.getElementById('ageField').value
    const phoneNumber = document.getElementById('phoneField').value
    if (age < 18) {
        alert('You must be 18 or older to use this service')
        return;
    }
    const image = document.getElementById('fileField').files[0]
    
    if (!image) {
        alert('Please upload an image')
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
    
    const response = await fetch('/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password,
            firstName,
            address,
            phoneNumber,
            age
        })
    })
    
    const data = await response.json()
    
    const formData = new FormData()
    formData.append('file', file)
    formData.append('userId', data.userId)

    const imageUploadResponse = await fetch('/auth/upload', {
        method: 'POST',
        body: formData
    })

    window.location.href = data.url
}