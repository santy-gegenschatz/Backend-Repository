const getServerInfo = () => {
    return {
        os: process.platform,
        nodeVersion: process.version,
        currentDirectory: process.cwd(),
        processId: process.pid,
        memoryUsage: process.memoryUsage().toString(),
        entryArguments: process.argv,
        numCPUs: require('os').cpus().length
    }
}

module.exports = { getServerInfo }