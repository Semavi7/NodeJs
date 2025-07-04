const utils = require("../utils/index")
const baseResponse = require("../dto/baseresponse.dto")
const { StatusCodes } = require("http-status-codes")
const titleService = require("../services/index")

exports.getAllTitle = async (req, res) => {
    try {
        const json = await titleService.title.listtitle()
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

exports.getTitleById = async (req, res) => {
    try {
        const isInvalid = utils.helpers.handeValidation(req)
        if (isInvalid) {
            res.status(StatusCodes.BAD_REQUEST).json({
                ...isInvalid
            })
            return
        }
        const json = await titleService.title.findTitleById(req)
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

exports.createTitle = async (req, res) => {
    const _response = { ...baseResponse }
    try {
        const isInvalid = utils.helpers.handeValidation(req)
        if (isInvalid) {
            res.status(StatusCodes.BAD_REQUEST).json({
                ...isInvalid
            })
            return
        }
        const json = await titleService.title.createTitle(req)
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

exports.updateTitle = async (req, res) => {
    const _response = { ...baseResponse }
    try {
        const isInvalid = utils.helpers.handeValidation(req)
        if (isInvalid) {
            res.status(StatusCodes.BAD_REQUEST).json({
                ...isInvalid
            })
            return
        }
        const json = await titleService.title.updateTitle(req)
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

exports.deleteTitleById = async (req, res) => {
    try {
            const isInvalid = utils.helpers.handeValidation(req)
            if (isInvalid) {
                res.status(StatusCodes.BAD_REQUEST).json({
                    ...isInvalid
                })
                return
            }
            const json = await titleService.title.deleteTitleById(req)
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