const jwt = require("jsonwebtoken")
const logger = require("./logger")
const fs = require("fs")
const dns = require("dns")
const os = require("os")
const { validationResult } = require("express-validator")
const { StatusCodes } = require("http-status-codes")

const createToken = () => {
    const token = jwt.sign({
        userId: "",
        fullName: "",
        email: ""
    }, process.env.SECRET_KEY, {
        issuer: "localhost",
        expiresIn: process.env.EXPIRESIN
    })
    return token
}

const verifyToken = (token) => {
    const isVerify = { decodedToken: null }
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
        isVerify.decodedToken = decodedToken
    } catch (error) {
        isVerify.decodedToken = null
        console.log('error', error)
    }
    return isVerify
}

const hashToPassword = (password) => {
    const md5 = require("md5")
    return md5(password)
}

const createUpLoadDir = (str) => {
    if (!fs.existsSync(str)) {
        fs.mkdirSync(str, { recursive: true })
    }
}

const getHost = () => {
    return new Promise((resolve) => {
        const ip = Object.values(os.networkInterfaces())
            .flat()
            .find(details => details.family === 'IPv4' && !details.internal)?.address;

        if (ip) {
            resolve(`http://${ip}:${process.env.PORT}`);
        } else {
            // Fallback to original method if no suitable IP found
            dns.lookup(os.hostname(), (err, fallbackIp) => {
                resolve(`http://${fallbackIp || 'localhost'}:${process.env.PORT}`);
            });
        }
    });
};

const logToError = (error, req, message) => {
    logger.error(`IP Adresi : ${req.ip} - PATH : ${req.path} - BODY : ${JSON.stringify(req.body)} - PARAMS : ${JSON.stringify(req.params)} - QUERY : ${JSON.stringify(req.query)} - ERROR TİME : ${Date.now()} - URL : ${req.url} - ERROR MESSAGE : ${error.message} - ERROR CALLSTACK : ${JSON.stringify(error)}- CUSTOM-INFO : ${message}`)
}

const handeValidation = (req) => {
    const validationErrors = validationResult(req)
    if (validationErrors.isEmpty() === false) {
        return{
            message: "Gecersiz Veri",
            success: false,
            validationErrors: validationErrors.array(),
            timestamp: Date.now(),
            code: StatusCodes.BAD_REQUEST
        }
    }
    return null
}

module.exports = {
    createToken,
    verifyToken,
    hashToPassword,
    logToError,
    createUpLoadDir,
    getHost,
    handeValidation
}