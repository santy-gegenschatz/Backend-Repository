const isNotError = (response) => {
    if (!Error.prototype.isPrototypeOf(response)) {
        return true
    } else {
        return false
    }
}

module.exports = {isNotError}