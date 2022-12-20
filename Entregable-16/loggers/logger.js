const pino = require('pino')

const logger = pino()
const loggerWarn = pino('warn.log')

const logInfo = (req, res, next) => {
    const { method, url } = req
    logger.info(`There was an api call to the endpoint ${url} of type ${method}`)
    next()
}

const logWarn = (req, res) => {

}

module.exports = { logInfo, logWarn }