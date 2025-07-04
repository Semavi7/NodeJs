const utils = require("../utils/index")
const baseResponse = require("../dto/baseresponse.dto")
const { StatusCodes } = require("http-status-codes")
const personService = require("../services/index")

exports.getAllPerson = async (req, res) => {
    try {
        const json = await personService.person.listPersons()
        res.status(StatusCodes.OK).json({...baseResponse, data: json, success: true, timestamp: Date.now(), code: StatusCodes.OK })
    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({...baseResponse,
            success: false,
            error: true,
            timestamp: Date.now(),
            message: error.message,
            code: StatusCodes.INTERNAL_SERVER_ERROR,
        })
    }
}

exports.getAllPersonsPagination = async(req, res) => {
    try {
        const json = await personService.person.listPersonsWithPagination(req)
        res.status(StatusCodes.OK).json({...baseResponse, data: json, success: true, timestamp: Date.now(), code: StatusCodes.OK })
    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({...baseResponse,
            success: false,
            error: true,
            timestamp: Date.now(),
            message: error.message,
            code: StatusCodes.INTERNAL_SERVER_ERROR,
        })
    }
}

exports.getPersonById = (req, res) => {}

exports.createPerson = async (req, res) => {
     const _response = { ...baseResponse }
    try {
        const isInvalid = utils.helpers.handeValidation(req)
        if (isInvalid) {
            res.status(StatusCodes.BAD_REQUEST).json({
                ...isInvalid
            })
            return
        }
        const json = await personService.person.createPerson(req)
        res.status(StatusCodes.CREATED).json({
            ..._response,
            success: true,
            timestamp: Date.now(),
            code: StatusCodes.CREATED,
            data: json
        })
    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            ..._response,
            success: false,
            error: true,
            timestamp: Date.now(),
            message: error.message,
            code: StatusCodes.INTERNAL_SERVER_ERROR
        })
    }
}

exports.updatePerson = (req, res) => {}

exports.deletePersonById = (req, res) => {}

exports.uploadAvatar = async(req, res) => {
    try {
        const isInvalid = utils.helpers.handeValidation(req)
        if (isInvalid) {
            res.status(StatusCodes.BAD_REQUEST).json({...baseResponse,
                ...isInvalid
            })
            return
        }
        const json = await personService.person.uploadAvatar(req)
        res.status(StatusCodes.OK).json(json)
    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({...baseResponse,
            success: false,
            error: true,
            timestamp: Date.now(),
            message: error.message,
            code: StatusCodes.INTERNAL_SERVER_ERROR,
        })
    }
}

exports.uploadCv = async(req, res) => {
    try {
        const isInvalid = utils.helpers.handeValidation(req)
        if (isInvalid) {
            res.status(StatusCodes.BAD_REQUEST).json({...baseResponse,
                ...isInvalid
            })
            return
        }
        const json = await personService.person.uploadCv(req)
        res.status(StatusCodes.OK).json(json)
    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({...baseResponse,
            success: false,
            error: true,
            timestamp: Date.now(),
            message: error.message,
            code: StatusCodes.INTERNAL_SERVER_ERROR,
        })
    }
}

exports.getCompany = async(req, res) => {
    try {
        const isInvalid = utils.helpers.handeValidation(req)
        if (isInvalid) {
            res.status(StatusCodes.BAD_REQUEST).json({...baseResponse,
                ...isInvalid
            })
            return
        }
        const json = await personService.person.getCompany(req)
        res.status(StatusCodes.OK).json({...baseResponse, data: json, success: true, timestamp: Date.now(), code: StatusCodes.OK })
    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({...baseResponse,
            success: false,
            error: true,
            timestamp: Date.now(),
            message: error.message,
            code: StatusCodes.INTERNAL_SERVER_ERROR,
        })
    }
}

exports.getTitle = async(req, res) => {
    try {
        const isInvalid = utils.helpers.handeValidation(req)
        if (isInvalid) {
            res.status(StatusCodes.BAD_REQUEST).json({...baseResponse,
                ...isInvalid
            })
            return
        }
        const json = await personService.person.getTitle(req)
        res.status(StatusCodes.OK).json({...baseResponse, data: json, success: true, timestamp: Date.now(), code: StatusCodes.OK })
    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({...baseResponse,
            success: false,
            error: true,
            timestamp: Date.now(),
            message: error.message,
            code: StatusCodes.INTERNAL_SERVER_ERROR,
        })
    }
}

exports.getPersonById = async(req, res) => {

    try {
        const isInvalid = utils.helpers.handeValidation(req)
        if (isInvalid) {
            res.status(StatusCodes.BAD_REQUEST).json({...baseResponse,
                ...isInvalid
            })
            return
        }
        const json = await personService.person.getPersonById(req)
        res.status(StatusCodes.OK).json({...baseResponse, data: json, success: true, timestamp: Date.now(), code: StatusCodes.OK })
    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({...baseResponse,
            success: false,
            error: true,
            timestamp: Date.now(),
            message: error.message,
            code: StatusCodes.INTERNAL_SERVER_ERROR,
        })
    }
}

exports.updatePerson = async(req, res) => {
    try {
        const isInvalid = utils.helpers.handeValidation(req)
        if (isInvalid) {
            res.status(StatusCodes.BAD_REQUEST).json({...baseResponse,
                ...isInvalid
            })
            return
        }
        const json = await personService.person.updatePerson(req)
        res.status(StatusCodes.OK).json({...baseResponse, data: json, success: true, timestamp: Date.now(), code: StatusCodes.OK })
    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({...baseResponse,
            success: false,
            error: true,
            timestamp: Date.now(),
            message: error.message,
            code: StatusCodes.INTERNAL_SERVER_ERROR,
        })
    }
}

exports.deletePersonById = async(req, res) => {
    try {
        const isInvalid = utils.helpers.handeValidation(req)
        if (isInvalid) {
            res.status(StatusCodes.BAD_REQUEST).json({...baseResponse,
                ...isInvalid
            })
            return
        }
        const json = await personService.person.deletePersonById(req)
        res.status(StatusCodes.OK).json({...baseResponse, data: json, success: true, timestamp: Date.now(), code: StatusCodes.OK })
    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({...baseResponse,
            success: false,
            error: true,
            timestamp: Date.now(),
            message: error.message,
            code: StatusCodes.INTERNAL_SERVER_ERROR,
        })
    }
}


