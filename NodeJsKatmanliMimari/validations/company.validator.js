const { body, query, param } = require('express-validator')
const CompanyValidator = {
    validateCreateCompany() {
        return [body('name').not().isEmpty(), body('description').not().isEmpty(), body('year').isNumeric()]
    },
    validateUpdateCompanyById() {
        return [body('name').not().isEmpty(), body('description').not().isEmpty(), body('year').isNumeric(), param('id').isMongoId()]
    },
    validateUploadLogo() {
        return [query('id').isMongoId()]
    },
    validateUpdateLogo() {
        return [query('id').isMongoId()]
    },
    validateDeleteById() {
        return [query('id').isMongoId()]
    },
    validateGetPersons() {
        return [param('id').isMongoId()]
    },
    validateFindById() {
        return [param('id').isMongoId()]
    }
}

module.exports = CompanyValidator


