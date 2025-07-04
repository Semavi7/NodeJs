const express = require("express")
const router = express.Router()
const controller = require("../controllers/index")
const personValidatior = require("../validations/index")
router.get("/all", controller.personController.getAllPerson)
router.get('/listPagination', [personValidatior.personValidatior.validateListPagination()], controller.personController.getAllPerson)
router.get("/getById/:id", [personValidatior.personValidatior.validateGetPersonById()], controller.personController.getPersonById)
router.post('/uploadCv', [personValidatior.personValidatior.validateUploadCv()], controller.personController.uploadCv)
router.post('/uploadAvatar', [personValidatior.personValidatior.validateUploadAvatar()], controller.personController.uploadAvatar)
router.post("/create", [personValidatior.personValidatior.validateCreatePerson()], controller.personController.createPerson)
router.put("/update/:id",[personValidatior.personValidatior.validateUpdatePerson()], controller.personController.updatePerson)
router.get("/getCompany/:id", controller.personController.getCompany)
router.get('/getTitle/:id', [personValidatior.personValidatior.validateGetTitle()], controller.personController.getTitle)
router.delete("/delete/:id",[personValidatior.personValidatior.validateDeleteById()], controller.personController.deletePersonById)
module.exports = {
    person: router
}