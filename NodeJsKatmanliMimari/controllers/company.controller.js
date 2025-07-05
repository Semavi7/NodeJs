const utils = require("../utils/index")
const baseResponse = require("../dto/baseresponse.dto")
const { StatusCodes } = require("http-status-codes")
const companyService = require("../services/index")


exports.getAllCompany = async (req, res) => {
    try {
        const json = await companyService.company.listCompany()
        res.status(StatusCodes.OK).json({
            ...baseResponse,
            success: true,
            timestamp: Date.now(),
            code: StatusCodes.OK,
            data: json
        })
    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            ...baseResponse,
            success: false,
            error: true,
            timestamp: Date.now(),
            message: error.message,
            code: StatusCodes.INTERNAL_SERVER_ERROR
        })
    }
}

exports.getCompanyById =  async(req, res) => {
    try {
        const isInvalid = utils.helpers.handeValidation(req)
        if (isInvalid) {
            res.status(StatusCodes.BAD_REQUEST).json({
                ...isInvalid
            })
            return
        }
        const json = await companyService.company.findCompanyById(req)
        res.status(StatusCodes.OK).json({
            ...baseResponse,
            success: true,
            timestamp: Date.now(),
            code: StatusCodes.OK,
            data: json
        })
    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            ...baseResponse,
            success: false,
            error: true,
            timestamp: Date.now(),
            message: error.message,
            code: StatusCodes.INTERNAL_SERVER_ERROR
        })
    }
}

exports.createCompany = async (req, res) => {
    const _response = { ...baseResponse }
    try {
        const isInvalid = utils.helpers.handeValidation(req)
        if (isInvalid) {
            res.status(StatusCodes.BAD_REQUEST).json({
                ...isInvalid
            })
            return
        }
        const json = await companyService.company.createCompany(req)
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

exports.updateCompany = async (req, res) => {
    const _response = { ...baseResponse }
    try {
        const isInvalid = utils.helpers.handeValidation(req)
        if (isInvalid) {
            res.status(StatusCodes.BAD_REQUEST).json({
                ...isInvalid
            })
            return
        }
        const json = await companyService.company.updateCompany(req)
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

exports.deleteCompanyById = async (req, res) => {
    try {
        const isInvalid = utils.helpers.handeValidation(req)
        if (isInvalid) {
            res.status(StatusCodes.BAD_REQUEST).json({
                ...isInvalid
            })
            return
        }
        const json = await companyService.company.deleteCompanyById(req)
        res.status(StatusCodes.OK).json({
            ...baseResponse,
            success: true,
            timestamp: Date.now(),
            code: StatusCodes.OK,
            data: json
        })
    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            ...baseResponse,
            success: false,
            error: true,
            timestamp: Date.now(),
            message: error.message,
            code: StatusCodes.INTERNAL_SERVER_ERROR
        })
    }
}

exports.uploadLogo = async (req, res) => {
    const _response = { ...baseResponse }
    try {
        const isInvalid = utils.helpers.handeValidation(req)
        if (isInvalid) {
            res.status(StatusCodes.BAD_REQUEST).json({
                ...isInvalid
            })
            return
        }
        const json = await companyService.company.uploadLogo(req)
        res.status(StatusCodes.OK).json(json)
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

exports.updateLogo = async (req, res) => {
    const _response = { ...baseResponse }
    try {
        const isInvalid = utils.helpers.handeValidation(req)
        if (isInvalid) {
            res.status(StatusCodes.BAD_REQUEST).json({
                ...isInvalid
            })
            return
        }
        const json = await companyService.company.updateLogo(req)
        res.status(StatusCodes.OK).json(json)
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

exports.getPersonsById = async(req, res) => {
    try {
        const isInvalid = utils.helpers.handeValidation(req)
        if (isInvalid) {
            res.status(StatusCodes.BAD_REQUEST).json({...baseResponse,
                ...isInvalid
            })
            return
        }
        const json = await companyService.company.getPersonsById(req)
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