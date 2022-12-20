const pino = require('pino')

const logger = pino()
const loggerWarn = pino({level: 'info'}, './logs/warn.log')
const loggerError = pino('./logs/error.log')

const logInfo = (req, res, next) => {
    const { method, url } = req
    logger.info(`There was an api call to the endpoint ${url} of type ${method}`)
    next()
}

const logWarn = (req, res, next) => {
    const { method, url } = req
    logger.warn(`There was an api call to the endpoint ${url} of type ${method}`)
    loggerWarn.warn(`There was an api call to the endpoint ${url} of type ${method}`)
    next()
}

const logError = (req, res, next) => {
    const { method, url } = req
    logger.error(`There was an api call to the endpoint ${url} of type ${method}`)
    loggerError.error(`There was an api call to the endpoint ${url} of type ${method}`)
    next()
}

module.exports = { logInfo, logWarn , logError}