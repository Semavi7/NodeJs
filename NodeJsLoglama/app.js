const express = require("express")
const app = express()
const router = express.Router()
const MyLogger = require("./logger")
const logger = new MyLogger()


const data = []
router.get("/", (req,res) => {
    try {
        logger.logInfo(`${req.ip} den ilgili endpointe ${req.path} erişim sağlandı`)
        res.json(data)
    } catch (error) {
        logger.logError(`${req.ip} den ilgili endpointe ${req.path} erişim sağlandı hata alındı hata bilgileri ${error}`)
    }
})

router.post("/", (req,res) => {
    const { name } = req.body
    try {
        logger.logInfo(`${req.ip} den ilgili endpointe ${req.path} erişim sağlandı ${name} isimli kayıt eklendi`)
        const item = { name: name.toUpperCase(), id: Date.now() }
        data.push(item)
        res.status(201).json(item)
    } catch (error) {
        logger.logError(`${req.ip} den ilgili endpointe ${req.path} erişim sağlandı, ${name} isimli kayıt eklenmeye çalışılsı ve hata alındı hata bilgileri ${error}`)
    }
})

app.use(express.json())
app.use(router)

app.listen(5000, () => {
    console.log("Runing")
})