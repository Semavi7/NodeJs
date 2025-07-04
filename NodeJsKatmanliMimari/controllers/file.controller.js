const utils = require("../utils/index")
const baseResponse = require("../dto/baseresponse.dto")
const { StatusCodes } = require("http-status-codes")
const companyService = require("../services/index")
const { reset } = require("ansi-colors")
const upload = require("../middleware/singleImageupload.middleware")
const multer = require("multer")
exports.uploadFile = async (req, res) => {
    const _response = { ...baseResponse }
    try {
        upload(req, res, async (err) => {
            if (err instanceof (multer.MulterError)) {
                utils.helpers.logToError(err, req)
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    ..._response,
                    success: false,
                    error: true,
                    timestamp: Date.now(),
                    message: err.message,
                    code: StatusCodes.INTERNAL_SERVER_ERROR
                })
                return
            }
            else if (err) {
                utils.helpers.logToError(err, req)
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    ..._response,
                    success: false,
                    error: true,
                    timestamp: Date.now(),
                    message: err.message,
                    code: StatusCodes.INTERNAL_SERVER_ERROR
                })
            }
            res.status(StatusCodes.CREATED).json({ message: "Success" })
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