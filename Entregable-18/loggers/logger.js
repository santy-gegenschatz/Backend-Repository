const pino = require('pino')

const logger = pino()
const loggerWarn = pino({level: 'warn'}, './logs/warn.log')
const loggerError = pino('./logs/error.log')

const logRouteInfo = (req, res, next) => {
    const { method, url } = req
    logger.info(`There was an api call of type ${method} to the endpoint ${url}`)
    next()
}

const logInfo = (msg) => {
    logger.info(msg)
}

const logWarn = (msg) => {
    logger.warn(msg)
    loggerWarn.warn(msg)
}

const logError = (msg) => {
    logger.error(msg)
    loggerError.error(msg)
}


module.exports = { logRouteInfo, logInfo, logWarn , logError}