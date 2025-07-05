const express = require("express")
const router = express.Router()
const controller = require("../controllers/index")
const companyValidatior = require("../validations/index")
router.get("/all",controller.companyController.getAllCompany)
router.get("/getById/:id",[companyValidatior.companyValidatior.validateFindById()],controller.companyController.getCompanyById)
router.post("/create",[companyValidatior.companyValidatior.validateCreateCompany()],controller.companyController.createCompany)
router.post("/uploadLogo",[companyValidatior.companyValidatior.validateUploadLogo()],controller.companyController.uploadLogo)
router.post("/updateLogo",[companyValidatior.companyValidatior.validateUpdateLogo()],controller.companyController.updateLogo)
router.put("/update/:id",[companyValidatior.companyValidatior.validateUpdateCompanyById()], controller.companyController.updateCompany)
router.delete("/delete",[companyValidatior.companyValidatior.validateDeleteById()], controller.companyController.deleteCompanyById)
router.get('/person/:id', [companyValidatior.companyValidatior.validateGetPersons()], controller.companyController.getPersonsById)
module.exports = {
    company: router
}
