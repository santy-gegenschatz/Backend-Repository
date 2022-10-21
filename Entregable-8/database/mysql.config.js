// connection object goes here
const options = {
    client: 'mysql',
    connection: {
        host: '192.168.64.2',
        user: 'root',
        password: '',
        database: 'ecommerce',
        port: 3306,
        verbose: true
    }
}

module.exports = options