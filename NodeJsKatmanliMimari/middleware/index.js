const authMiddleware = require("./auth.middleware")
const loggerMiddleware = require("./logger.middleware")
const singleImageUploadMiddleWare = require("./singleImageupload.middleware")



module.exports = {
    authMiddleware,
    loggerMiddleware,
    singleImageUploadMiddleWare
}