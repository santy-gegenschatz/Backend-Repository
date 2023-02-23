require('dotenv').config()
const pino = require('pino')
let logger;
if(process.env.ENVIRONMENT_TYPE === 'development') {
    logger = pino({
        level: 'debug',
        transport: {
            target: 'pino-pretty'
        }
    })
} else {
    logger = pino({
        level: 'info'
    })
}
    const loggerWarn = pino({level: 'warn'}, './logs/warn.log')
    const loggerError = pino('./logs/error.log')

const logRouteInfo = (req, res, next) => {
    const { method, url } = req
    if (process.env.ENVIRONMENT_TYPE === 'development') {
        console.log(`There was an api call of type ${method} to the endpoint ${url}`)
    } else {
        logger.info({message: `There was an api call of type ${method} to the endpoint ${url}`})
    }
    next()
}

const logDebug = (msg) => {
    if (process.env.ENVIRONMENT_TYPE === 'development') {
        console.log(msg)
    } else {
        logger.debug(msg)
    }
}

const logInfo = (msg) => {
    if (process.env.ENVIRONMENT_TYPE === 'development') {
        console.log(msg)
    } else {
        logger.info({message: msg})
    }
}

const logWarn = (msg) => {
    logger.warn(msg)
    loggerWarn.warn(msg)
}

const logError = (msg) => {
    logger.error(msg)
    loggerError.error(msg)
}


module.exports = { logRouteInfo, logDebug, logInfo, logWarn , logError}