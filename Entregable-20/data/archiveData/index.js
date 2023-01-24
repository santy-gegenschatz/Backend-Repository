const p1 = {id : 1, title : 'Calculator', price : 10, thumbnail : 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'}
const p2 = {id : 2, title : 'Clock', price : 20, thumbnail : 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/clock-128.png'}
const p3 = {id : 3, title : 'Shirt', price : 40, thumbnail : 'https://cdn3.iconfinder.com/data/icons/remixicon-others/24/shirt-fill-128.png'}
const p4 = {id : 4, title : 'Shoes', price : 30, thumbnail : 'https://cdn4.iconfinder.com/data/icons/fashion-industry-set/88/Di-128.png'}
const products = [p1, p2, p3, p4]

const messages = [
    {text: 'Hello', author: 'John', date: new Date()},
    {text: 'Good', author: 'Susan', date: new Date()},
    {text: 'Goodbye', author: 'John', date: new Date()}
]

module.exports = { products, messages }
