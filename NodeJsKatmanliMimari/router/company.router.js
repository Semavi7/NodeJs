const express = require("express")
const router = express.Router()
const controller = require("../controllers/index")
const companyValidatior = require("../validations/index")
router.get("/all",controller.companyController.getAllCompany)
router.get("/getById/:companyId",controller.companyController.getCompanyById)
router.post("/create",[companyValidatior.companyValidatior.validateCreateCompany()],controller.companyController.createCompany)
router.post("/uploadLogo",[companyValidatior.companyValidatior.validateUploadLogo()],controller.companyController.uploadLogo)
router.put("/update/:companyId", controller.companyController.updateCompany)
router.delete("/delete",[companyValidatior.companyValidatior.validateDeleteById()], controller.companyController.deleteCompanyById)
module.exports = {
    company: router
}
