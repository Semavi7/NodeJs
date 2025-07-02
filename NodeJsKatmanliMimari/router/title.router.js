const express = require("express")
const router = express.Router()
const controller = require("../controllers/index")
router.get("/all",controller.titleController.getAllTitle)
router.get("/getById/:titleId",controller.titleController.getTitleById)
router.post("/create",controller.titleController.createTitle)
router.put("/update/:titleId", controller.titleController.updateTitle)
router.delete("/delete/:titleId", controller.titleController.deleteTitleById)
module.exports = {
    titles: router
}