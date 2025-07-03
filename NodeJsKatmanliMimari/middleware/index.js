const authMiddleware = require("./auth.middleware")
const loggerMiddleware = require("./logger.middleware")
const singleFileUploadMiddleWare = require("./singlefileupload.middleware")



module.exports = {
    authMiddleware,
    loggerMiddleware,
    singleFileUploadMiddleWare
}