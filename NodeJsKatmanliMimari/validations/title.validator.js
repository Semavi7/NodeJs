const { body, param } = require('express-validator')
const TitleValidator = {
    validateCreateTitle() {
        return [body('name').not().isEmpty()]
    },
    validateFindById() {
        return [param('id').isMongoId()]
    },
    validateUpdateTitle() {
        return [param('id').isMongoId()]
    },
    validateDeleteById() {
        return [param('id').isMongoId()]
    }
}

module.exports = TitleValidator