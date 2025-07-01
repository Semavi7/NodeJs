const express = require("express")
const app = express()
const router = express.Router()
const rabitmqConnection = require("./rabbitmqCollection")
const publisher = require("./publisher")



router.post("/create", async(req,res) => {
    const { email } = req.body

    await publisher({email, date: Date.now()})
    res.send("Mail Gitti")
})


app.use(express.json())
app.use(router)
app.listen(5000, async () => {})