const validateFullFields = (attributes) => {
    if (attributes.name && attributes.description && attributes.price && attributes.stock && attributes.thumbnail) {
        return {validated: true, attributes}
    } else {
        return {validated: false, message: 'Some of the fields is missing or downright incorrect'}
    }
}

module.exports = { validateFullFields }