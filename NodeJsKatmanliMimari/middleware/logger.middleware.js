const logger = require("../utils/index")
module.exports = (req, res, next) => {
    logger.logger.info(`IP Adresi : ${req.ip} - PATH : ${req.path} - BODY : ${req.body} - PARAMS : ${JSON.stringify(req.params)} - QUERY : ${JSON.stringify(req.query)} - MIDDLEWARE ACCESS TIME : ${Date.now} - URL : ${req.url}`)
    next()
}