const express = require("express")
const router = express.Router()
const controller = require("../controllers/index")
const titleValidatior = require("../validations/index")
router.get("/all",controller.titleController.getAllTitle)
router.get("/getById/:id",[titleValidatior.titleValidatior.validateFindById()],controller.titleController.getTitleById)
router.post("/create",[titleValidatior.titleValidatior.validateCreateTitle()],controller.titleController.createTitle)
router.put("/update/:id",[titleValidatior.titleValidatior.validateUpdateTitle()], controller.titleController.updateTitle)
router.delete("/delete/:id",[titleValidatior.titleValidatior.validateDeleteById()], controller.titleController.deleteTitleById)
module.exports = {
    titles: router
}