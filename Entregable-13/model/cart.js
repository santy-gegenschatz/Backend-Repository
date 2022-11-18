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
        console.log(id);
        const itemIndex = this.items.findIndex( (i) => i.id === id)
        console.log(itemIndex);
        if (itemIndex !== -1) {
            this.items.splice(itemIndex)
            return true
        } else {
            return false
        }
    }
}

module.exports = Cart