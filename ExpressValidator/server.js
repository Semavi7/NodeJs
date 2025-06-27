const express = require("express")
const app = express()
const router = express.Router()
const { validationResult } = require("express-validator")
const { validateUser, validateGetUserById, validateQuery } = require("./validators.middleware")

router.post("/createUser", validateUser(), (req, res) => {
    const { username, password } = req.body
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        console.log(username, password)
    }
    else {
        res.status(400).json(errors.array({ onlyFirstError: false }))
    }
})

router.get("/getUserById/:userId", validateGetUserById(), (req,res) => {
    const errors = validationResult(req)
    console.log(errors.array())
})

router.get("/getUserByQuery", validateQuery(), (req,res) => {
    const errors = validationResult(req)
    console.log(errors.array())
})


app.use(express.json())
app.use(router)

app.listen(5000, () => {
    console.log('runing on port 5000')
})             