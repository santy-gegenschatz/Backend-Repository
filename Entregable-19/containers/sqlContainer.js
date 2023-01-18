const knex = require('knex')
const configObject = JSON.parse(process.env.SQL_CONFIG)
class sqlContainer {
    constructor() {
        this.knex;
        this.connectToDb()
    }

    connectToDb() {
        this.knex = knex(configObject)
        console.log('Connected to SQL DB. Collections depend on parameters');
    }

    async create(tablename, sth) {
        try {
            const response = await this.knex(tablename).insert(sth)
            return response[0]
        } catch (err) {
            console.log(err);
            return new Error(err)
        }
    }

    async delete(tablename, id) {
        try {
            const response = await this.knex.from(tablename).where('id', '=', id).del()
            return response === 1 ? response : new Error('Product id incorrect')
        } catch(err) {
            return new Error(err)
        }
    }

    async deleteByDoubleCondition(tablename, firstFieldName, firstFieldValue, secondFieldName, secondFieldValue) {
        try {
            const response = await this.knex.from(tablename).where(firstFieldName, '=', firstFieldValue).andWhere(secondFieldName, '=', secondFieldValue).del()
            return response === 1 ? response : new Error('Could not perform delete')
        } catch(err) {

        }
    }

    async getAll(tablename) {
        try {
            const response = await this.knex.from(tablename).select('*')
            return response
        } catch (err) {
            console.log(err)
            return new Error(err)
        }
    }

    async getById(tablename, id) {
        try {   
            const response = await this.knex.from(tablename).select('*').where('id', '=', id)
            return response.length !== 0 ? response : new Error('Not found by id')
        } catch (err) {
            console.log(err)
            return new Error(err)
        }
    }

    async getByKey(tablename, key, value) {
        try {
            const response = await this.knex.from(tablename).select('*').where(key, '=', value)
            return response.length !== 0 ? response : new Error('Cart not found')
        } catch(err) {
            console.log(err);
            return new Error(err)
        }
    }

    async getByDoubleCondition(tablename, firstFieldName, firstFieldId, secondFieldName, secondFieldId) {
        try {
            const response = await this.knex.from(tablename).select('*').where(firstFieldName, '=', firstFieldId).andWhere(secondFieldName, '=', secondFieldId)
            return response.length !== 0 ? response : new Error('Err')
        } catch(err) {
            console.log(err);
            return new Error(err)
        }
    }

    async update(tablename, id, newObject) {
        try {
            const response = await this.knex(tablename).where({id:id}).update(newObject)
            return response
        } catch (err) {
            return new Error(err)
        }
    }

    async updateByDoubleCondition(tablename, firstFieldName, firstFieldId, secondFieldName, secondFieldId, newObject) {
        try {   
            const response = this.knex(tablename).where(firstFieldName, '=', firstFieldId).andWhere(secondFieldName, '=', secondFieldId).update(newObject)
            return response
        } catch(err) {
            console.log(err);
            return new Error(err)
        }
        
    }

}

module.exports = new sqlContainer()