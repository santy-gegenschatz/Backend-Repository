// const Server = require('./server/server')
// const server = new Server()
// server.listen()

const options = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '1234',
        database: 'ecommerce',
        port: 8080
    }
}

const knex = require('knex')(options)
async function connection() {
    const response = await knex.from('products').select('*').where('id', '=', 0)
    console.log(response);
}

connection()
console.log('b');
