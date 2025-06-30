const express = require("express")
const app = express()
const router = express.Router()
const json = require("./mock.json")
const { createClient } = require("redis")
const client = createClient()

router.get("/", async (req, res) => {
    const result = await client.get("jsonData")
    if (result) {
        console.log("isExist")
        res.json(JSON.parse(result))
    }
    else {
        console.log("notExsit")
        res.json(json)
        const json1 = await client.set("jsonData", JSON.stringify(json))
        console.log('json', json1)
    }
})

router.post("/", async (req, res) => {
    const { username } = req.body
    const json1 = await client.set("createData", JSON.stringify(username))
    console.log('json', json1)
    res.status(200).json({ username })

})
router.get("/user", async (req, res) => {
    const result = await client.get("createData")
    if (result) {
        console.log("isExist")
        res.json(JSON.parse(result))
    }
    else {
        console.log("notExsit")
        res.json({ username: Date.now() })
        const json1 = await client.set("createData", JSON.stringify({ username: Date.now() }))
        console.log('json', json1)
    }
})

app.use(express.json())
app.use(router)


const startApp = async () => {
    try {
        await client.connect()
        app.listen(5000, () => {
            console.log("Sunucu çalışıyor")
        })
    } catch (error) {
        console.log(error)
    }
}

startApp()