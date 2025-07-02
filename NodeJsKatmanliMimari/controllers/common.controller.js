const commonService = require("../services/index")
const baseResponse = require("../dto/baseresponse.dto")
const { StatusCodes } = require("http-status-codes")
const logger = require("../utils/index")
exports.getAllCountry = (req, res) => {
    try {
        const json = commonService.common.getAllCountries(req, res)
        baseResponse.data = json
        baseResponse.success = true
        baseResponse.error = false
        baseResponse.timestamp = Date.now()
        baseResponse.code = StatusCodes.OK
        res.json(baseResponse)
    } catch (error) {
        baseResponse.error = true
        baseResponse.data = null
        baseResponse.success = false
        baseResponse.timestamp = Date.now()
        baseResponse.code = StatusCodes.INTERNAL_SERVER_ERROR
        baseResponse.message = error.message
        logger.logger.error(`IP Adresi : ${req.ip} - PATH : ${req.path} - BODY : ${req.body} - PARAMS : ${JSON.stringify(req.params)} - QUERY : ${JSON.stringify(req.query)} - ERROR TİME : ${Date.now()} - URL : ${req.url} - ERROR MESSAGE : ${error.message} - ERROR CALLSTACK : ${JSON.stringify(error)}`)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(baseResponse)
    }
}

exports.getCityByCountryId = (req, res) => {
    try {
        const { countryId } = req.params
        const json = commonService.common.getCityByCountryId(countryId)
        baseResponse.data = json
        baseResponse.success = true
        baseResponse.error = false
        baseResponse.timestamp = Date.now()
        baseResponse.code = StatusCodes.OK
        res.json(baseResponse)
    } catch (error) {
        baseResponse.error = true
        baseResponse.data = null
        baseResponse.success = false
        baseResponse.timestamp = Date.now()
        baseResponse.code = StatusCodes.INTERNAL_SERVER_ERROR
        baseResponse.message = error.message
        logger.logger.error(`IP Adresi : ${req.ip} - PATH : ${req.path} - BODY : ${req.body} - PARAMS : ${JSON.stringify(req.params)} - QUERY : ${JSON.stringify(req.query)} - ERROR TİME : ${Date.now()} - URL : ${req.url} - ERROR MESSAGE : ${error.message} - ERROR CALLSTACK : ${JSON.stringify(error)}`)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(baseResponse)
    }
}