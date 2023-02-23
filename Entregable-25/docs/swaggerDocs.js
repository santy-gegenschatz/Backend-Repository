const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'The Summer Store API',
            version: '1.0.0',
            description: 'The Summer Store API',
            contact: {
                name: 'Santy Gegenschatz',
            }
        }
    },
    // The below direction is relative to the cwd (current working directory) of the project
    // This is important to understand as it can be the cause of a lot of confusion
    apis: ['./docs/*.yaml'],
}

const specs = swaggerJsDoc(options);


module.exports = { specs, swaggerUi}