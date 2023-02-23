const yargs = require('yargs/yargs')(process.argv.slice(2))
const mode = yargs.argv.mode || 'FORK'

const { logInfo, logWarn } = require('./loggers/logger')

if (mode === 'FORK') {
    logInfo('Initiating with Fork mode, only one thread will run');
    const Server = require('./server/server')
    const server = new Server()
    server.listen()
} else {
    logInfo('Initiating with Cluster mode, several threads will run');
    const cluster = require('cluster')
    if (cluster.isPrimary) {
        logInfo(`Primary thread, with process id: ${process.pid}`);
        for (let index = 0; index < 2; index++) {
            logInfo('Creating a fork');
            cluster.fork()
        }
        cluster.on('exit', (worker, coder, signal) => {
            logInfo(`Worker: ${process.pid} has died`);
        }) 
    } else {
        logInfo(`Creating a new thread, with id ${process.pid}`);
        const Server = require('./server/server')
        const server = new Server()
        server.listen()
    }
}



