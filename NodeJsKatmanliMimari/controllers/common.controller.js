const commonService = require("../services/index")
const baseResponse = require("../dto/baseresponse.dto")
const { StatusCodes } = require("http-status-codes")
const utils = require("../utils/index")
const { validationResult } = require("express-validator")
exports.getAllCountry = (req, res) => {
    try {
        const _response = { ...baseResponse }

        const json = commonService.common.getAllCountries(req, res)
        res.json({..._response, 
            success: true, 
            timestamp: Date.now(), 
            code: StatusCodes.OK, 
            data: json
        })
    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({..._response, 
            success: false, 
            error: true, 
            timestamp: Date.now(),
            message: error.message, 
            code: StatusCodes.INTERNAL_SERVER_ERROR
        })
    }
}

exports.getCityByCountryId = (req, res) => {
    try {
        const { countryId } = req.params
        const _response = { ...baseResponse }
        const isInvalid = utils.helpers.handeValidation(req)
                if(isInvalid){
                    res.status(StatusCodes.BAD_REQUEST).json({
                        ...isInvalid
                    })
                }
        const json = commonService.common.getCityByCountryId(countryId)
        res.json({..._response, 
            success: true, 
            error: false, 
            timestamp: Date.now(), 
            code: StatusCodes.OK, 
            data: json
        })
    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({..._response, 
            success: false, 
            error: true, 
            timestamp: Date.now(),
            message: error.message, 
            code: StatusCodes.INTERNAL_SERVER_ERROR
        })
    }
}
