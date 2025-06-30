const winston = require("winston")
const dailyRotateFile = require("winston-daily-rotate-file")
const { label, timestamp, prettyPrint, json } = winston.format
// const myFormat = winston.format.printf(({ level, message, label, timestamp }) => {
//     return `Oluşan Hata ${timestamp} - ${label} - ${message} - ${level}`
// })

const logger = winston.createLogger({
    defaultMeta: {api: "Abc Uygulaması Endpoinleri"},
    format: winston.format.combine(
        label({ label: "Benim Api" }),
        timestamp(),
        prettyPrint(),
        json()
        // myFormat
    ),
    level: "error",
    transports: [
        new dailyRotateFile({
            datePattern: "DD-MM-YYYY",
            filename: "myapp-%DATE%.log"
        })
        // new winston.transports.File({filename: "error.log"}, {level: "error"}),
        // new winston.transports.File({filename: "info.log"}, {level: "info"}),
        // new winston.transports.File({filename: "warn.log"}, {level: "warn"}),
        // new winston.transports.Console()
    ]
})

// logger.debug("test")
logger.info("info")
logger.warn("warn")
logger.error("Hata")