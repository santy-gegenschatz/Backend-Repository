# Backend-Repository
A repository with work that represents a fully functional ecommerce backend. It includes several RESTful API's, each of them working with different containers and data persistency methods.

## Quick Start
1) Git clone
2) npm i
3) nodemon app.js

## Features
**Api 1:** Data persistency via MongoDB.  

**Api 2:** Data persistency via SQL (MariaDB).  

**Api 3:** Data persistency via Firebase.  

**Api 4:** Data persistency via Local Storage.  


## Architecture
The system is based on an express server running on Node.JS. A good amount of middleware is used.

## Tech
Several npm packages are used to provide specific functionality to the backend. Some of them are:  

**-socket.io:** To generate realtime connections between server and client.  

**-normalizr:** To compress data and improve overall performance.  

**-bcrypt:** Generate salted and hashed passwords. 

**-passport.js:** Facilitate authentication and allow route protection.  

**-knex.js:** Query builder for SQL.  

**-mongoose.js:** Connect between MongoDB & Node.js. 

**-yargs:** Receive parameters via command line on start.  

**-Session File Store:** Store sessions locally if needed.  

**-Cookie Parser:** Manage cookies in the client.  

