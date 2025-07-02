const express = require("express")
const router = express.Router()
const controller = require("../controllers/index")
router.post("/auth/signIn", controller.authController.signIn)
router.post("/auth/singUp", controller.authController.signUp)
module.exports = {
    auth: router
}