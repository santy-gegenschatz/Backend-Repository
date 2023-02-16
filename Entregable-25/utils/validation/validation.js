const validateFullFields = (attributes) => {
    if (attributes.name && attributes.description && attributes.price && attributes.stock && attributes.thumbnail) {
        return {validated: true, attributes}
    } else {
        return {validated: false, error: -3, message: 'Some of the fields is missing or downright incorrect'}
    }
}

const validateCredentials = (authCredential) => {
    try {
        if (Number(authCredential.password) === 1) {
            return {validated: true}
        } else {
            return {validated: false, error: -1, message: 'Route denied. Check your credentials and come again soon'}
        }
    } catch (e) {
        return {validated: false, error: -1, message: 'Route denied. Check your credentials and come again soon'}
    }
}

module.exports = { validateFullFields, validateCredentials}