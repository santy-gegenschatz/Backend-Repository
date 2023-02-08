const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const { getProduct, getProducts, addProduct, updateProduct, deleteProduct } = require('./graphql.controller');

const schema = buildSchema(`
    type Product {
        id: ID!
        name: String!
        price: Int!
        description: String
        stock: Int
        thumbnail: String
    }

    type Message {
        code: Int!
        message: String!
    }

    input ProductInput {
        name: String!
        price: Float!
    }
    
    type Query {
        getProduct(id: ID!): Product
        getProducts: [Product]
    }

    type Mutation {
        addProduct(name: String!, price: Int!, stock: Int!, thumbnail: String!): Product
        updateProduct(id: ID!, name: String!, price: Int!, stock: Int!, thumbnail: String!): Product
        deleteProduct(id: ID!): Message
    }

`);

const graphqlRouter = graphqlHTTP({
    schema: schema,
    rootValue: {
        getProduct,
        getProducts,
        addProduct,
        updateProduct,
        deleteProduct
    },
    graphiql: true
});

module.exports = { graphqlRouter }

