const options = {
    client : 'sqlite3',
    connection: {
        filename: './data/db.sqlite'
    },
    useNullAsDefault: true
}

const containerOptions = {
    client : 'sqlite3',
    connection: {
        filename: '../data/db.sqlite'
    },
    useNullAsDefault: true
}

module.exports = { options, containerOptions }