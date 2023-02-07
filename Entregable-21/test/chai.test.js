require('dotenv').config()
const request = require('supertest')(`http://localhost:${process.env.PORT}`)
const expect = require('chai').expect
const { logDebug } = require('../loggers/logger')

describe('Product API Integration test with chai', () => {
    before( () => {
        logDebug('Starting integration test')
    })

    beforeEach( () => {
        logDebug('Starting a new test')
    })

    after( () => {
        logDebug('Finishing integration test')
    })

    it('should get all the products', async () => {
        const response = await request.get('/api/products')
        expect(response.status).to.equal(200)
    });

    it('products should be full', async () => {
        const response = await request.get('/api/products')
        expect(response.body.payload.length).to.be.greaterThan(0)
    });

    it('should not get a product if wrong id is provided', async () => {
        const response = await request.get('/api/products/123456789')
        expect(response.body.code).to.equal(500)
    });

    it('should get a product if correct id is provided', async () => {
        const response = await request.get(`/api/products/${process.env.TEST_PRODUCT_ID}`)
        expect(response.body.code).to.equal(200)
    });

})
