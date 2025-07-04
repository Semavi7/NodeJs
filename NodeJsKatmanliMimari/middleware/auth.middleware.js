const helpers = require("../utils/index")
const { StatusCodes } = require("http-status-codes")
const consts = require("../consts/index")
module.exports = (req, res, next) => {
    try {
        if (!req.url.includes("/api/v1/person/signIn")) {
            const token = req.headers.authorization.split(" ")[1]
            console.log('token', token)
            const decodedToken = helpers.helpers.verifyToken(token)
            if (decodedToken.decodedToken === null) {
                return res.status(StatusCodes.UNAUTHORIZED).send({
                    messege: consts.auth.AUTH.UNAUTORIZATION_MESSAGE
                })
            }
            req.user = decodedToken
            next()
            return
        }
        next()
    } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).send({
            messege: consts.auth.AUTH.UNAUTORIZATION_MESSAGE
        })
    }
}