class SqlContainer {
    constructor(configObject, tableName) {
        this.configObject = configObject
        this.tableName = tableName
        this.knex = require('knex')(configObject)
    }

    async add(sth) {
        const response = await this.knex(this.tableName).insert(sth)
        return this.throwSuccess('Added', response)
    }
    
    async getById(id) {
        const response = await this.knex.from(this.tableName).select('*').where('id', '=', id)
        return this.throwSuccess('Obtained', response)
    }

    async getAll() {
        console.log('Getting, ', this.tableName);
        console.log('Driname:' , __dirname, this.configObject.connection);
        const response = await this.knex.from(this.tableName).select('*')
        return this.throwSuccess('Retrieved all from DB', response)
    }

    async deleteById(id) {
        const response = await this.knex.from(this.tableName).where('id', '=', id).del()
        return this.throwSuccess('Deleted', response)
    }

    async updateById(id, newObject) {
        try {
            const response = await this.knex(this.tableName).where({id: id}).update(newObject)
            return this.throwSuccess('Updated', response)
        } catch (e) {
            console.log(e);
        }
    }

    throwSuccess(message, payload) {
        return {code: 200, message, payload}
    }

    throwError(message) {
        return {code: 500, message}
    }
}

module.exports = { SqlContainer }
