const { faker } = require('@faker-js/faker');
const urls = [
    'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',
    'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/clock-128.png',
    'https://cdn3.iconfinder.com/data/icons/remixicon-others/24/shirt-fill-128.png',
    'https://cdn4.iconfinder.com/data/icons/fashion-industry-set/88/Di-128.png'
]
const products = []
let i = 0;

while (i < 10) {
    const product = {
        name: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(1, 200),
        stock: faker.datatype.number(100),
        thumbnail: urls[Math.floor(Math.random() * 4)]
    }
    products.push(product)
    i++;
}

module.exports = { products }