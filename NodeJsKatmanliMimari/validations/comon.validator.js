const { param } = require("express-validator")
exports.Commonvalidator = {
    validateCountryById(){
        return [param("countryId").isLength({ min: 1, max:4 }).withMessage("Geçersiz Id Biçimi")]
    }
}

