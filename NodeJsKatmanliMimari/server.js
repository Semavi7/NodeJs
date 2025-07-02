const express = require("express")
const cors = require("cors")
const { default: helmet } = require("helmet")
const configs = require("./configs/index")
const db = require("./db/index")
const router = require("./router/index")
const consts = require("./consts/index")
const middlewares = require("./middleware/index")


const app = express()
const PORT = process.env.PORT || 5000



configs.serverConfig.initialServerConfig()



app.use(express.json())
app.use(helmet())
app.use(cors())

app.use(middlewares.loggerMiddleware)
app.use(middlewares.authMiddleware)

app.use(`${process.env.APP_PREFIX}${consts.router.COMMON}`, router.commonRouter.common)
app.use(`${process.env.APP_PREFIX}${consts.router.COMPANY}`, router.companyRouter.company)
app.use(`${process.env.APP_PREFIX}${consts.router.PERSON}`, router.personRouter.person)
app.use(`${process.env.APP_PREFIX}${consts.router.TİTLE}`, router.titleRouter.titles)
app.use(`${process.env.APP_PREFIX}${consts.router.AUTH}`, router.authRouter.auth)

db.mongooseConnection.connectToMongoDb(process.env.MONGODB_HOST, process.env.MONGODB_PORT, process.env.MONGODB_COLLECTION, process.env.MONGODB_MIN_POOL_SIZE, process.env.MONGODB_MAX_POOL_SIZE, process.env.MONGODB_COLLECTION_TIMEOUT).then(() => {
    app.listen(PORT, () => {

    })
})

