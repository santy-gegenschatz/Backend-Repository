class Cart {
    constructor(id) {
        this.id = id
        this.creationDate = new Date()
        this.items = []
    }

    add(item) {
        this.items.push(item)
    }

    removeItem(id) {
        const itemIndex = this.items.find( (i) => i.id ===id)
        if (itemIndex !== -1) {
            this.items.splice(itemIndex)
            return true
        } else {
            return false
        }
    }
}

module.exports = Cart