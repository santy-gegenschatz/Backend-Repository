const { faker } = require('@faker-js/faker')
faker.locale = 'es'

const { commerce, image } = faker

const generateFakeProducts = (n) => {
    let fakeProducts = []
    for (let index = 0; index < n; index++) {
        const fakeProduct = {
            title: commerce.product(),
            price: commerce.price(10, 50),
            thumbnail: image.abstract(50, 50)
        }
        fakeProducts.push(fakeProduct)
    }

    return fakeProducts
}

module.exports = { generateFakeProducts }
