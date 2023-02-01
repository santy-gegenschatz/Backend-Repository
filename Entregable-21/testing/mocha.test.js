require('dotenv').config() // => Then we can use it anywhere in our Node project.
const assert = require('assert');
const fetch = require('node-fetch');
const { logDebug } = require('../loggers/logger');

describe('Product API Integration test', () => {
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
        console.log(`http://localhost:${process.env.PORT}/api/products`);
        const response = await fetch(`http://localhost:${process.env.PORT}/api/products`)
        assert(response.ok);
    });

    it('products should be full', async () => {
        const response = await fetch(`http://localhost:${process.env.PORT}/api/products`)
        const data = await response.json();
        assert(data.payload.length > 0);
    });

    it('should not get a product if wrong id is provided', async () => {
        const response = await fetch(`http://localhost:${process.env.PORT}/api/products/123456789`)
        const data = await response.json();
        assert(data.code === 500);
    });

    it('should get a product if correct id is provided', async () => {
        const response = await fetch(`http://localhost:${process.env.PORT}/api/products/${process.env.TEST_PRODUCT_ID}`)
        const data = await response.json();
        assert(data.code === 200);
    });

});