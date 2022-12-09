const yargs = require('yargs/yargs')(process.argv.slice(2))
const mode = yargs.argv.mode || 'FORK'
console.log(mode);
if (mode === 'FORK') {
    console.log('Initiating with Fork mode, only one thread will run');
    const Server = require('./server/server')
    const server = new Server()
    server.listen()
} else {
    console.log('Initiating with Cluster mode, several threads will run');
    const cluster = require('cluster')
    if (cluster.isPrimary) {
        console.log('Primary thread, creating workers');
        for (let index = 0; index < 2; index++) {
            console.log('Creating forks');
            cluster.fork()
        }
        cluster.on('exit', (worker, coder, signal) => {
            console.log(`Worker: ${process.pid} has died`);
        }) 
    } else {
        console.log('Will start listening');
        const Server = require('./server/server')
        const server = new Server()
        server.listen()
    }
}



