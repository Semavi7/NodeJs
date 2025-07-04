const { body, query, param } = require('express-validator')
const personService = require('../services/index')
const utils = require('../utils/index')
const PersonValidator = {
    validateSignIn() {
        return [
            body('email').not().isEmpty().isEmail(),
            body('password').not().isEmpty(),
            body('password').isLength({ min: 8, max: 30 }),
        ]
    },
    validateUpdatePerson() {
        return [
            body('name').not().isEmpty(),
            body('surname').not().isEmpty(),
            body('birthDate').isNumeric(),
            body('birthDate').not().equals(0),
            body('gender').not().isEmpty(),
            body('salary').isNumeric(),
            body('tcNumber').isNumeric().isLength({ min: 11, max: 11 }).custom(async(value, { req }) => {
                if (utils.helpers.validateTcNumber(value) === false) {
                    throw new Error('Geçersiz TC Numarası')
                }
                return true
            }),
            body('email').not().isEmpty().isEmail().custom(async(value, { req }) => {
                const result = await personService.person.findByEmail(value)
                if (result) {
                    throw new Error('Email Adresi Kullanımda')
                }
                return true
            }),
            body('password').not().isEmpty(),
            body('password').isLength({ min: 8, max: 30 }),
            body('country').not().isEmpty(),
            body('city').not().isEmpty(),
            body('company').isMongoId(),
            body('title').isMongoId(),
        ]
    },
    validateCreatePerson() {
        return [
            body('name').not().isEmpty(),
            body('surname').not().isEmpty(),
            body('birthDate').isNumeric(),
            body('birthDate').not().equals(0),
            body('gender').not().isEmpty(),
            body('salary').isNumeric(),
            body('tcNumber').isNumeric().isLength({ min: 11, max: 11 }).custom(async(value, { req }) => {
                if (utils.helpers.validateTcNumber(value) === false) {
                    throw new Error('Geçersiz TC Numarası')
                }
                return true
            }),
            body('email').not().isEmpty().isEmail().custom(async(value, { req }) => {
                const result = await personService.person.findByEmail(value)
                if (result) {
                    throw new Error('Email Adresi Kullanımda')
                }
                return true
            }),
            body('password').not().isEmpty(),
            body('password').isLength({ min: 8, max: 30 }),
            body('country').not().isEmpty(),
            body('city').not().isEmpty(),
            body('company').isMongoId(),
            body('title').isMongoId(),
        ]
    },
    validateUpdateAvatar() {
        return [query('id').isMongoId()]
    },
    validateUploadAvatar() {
        return [query('id').isMongoId()]
    },
    validateUpdateCv() {
        return [query('id').isMongoId()]
    },
    validateUploadCv() {
        return [query('id').isMongoId()]
    },
    validateGetCompany() {
        return [param('id').isMongoId()]
    },
    validateGetTitle() {
        return [param('id').isMongoId()]
    },
    validateGetPersonById() {
        return [param('id').isMongoId()]
    },
    validateListPagination() {
        return [query('perPage').isNumeric(),
            query('page').isNumeric(),
            query('sortBy').not().isNumeric().not().isEmpty(),
            query('sortDirection').not().isEmpty(),
        ]
    },
    validateDeleteById() {
        return [param('id').isMongoId()]
    },

}

module.exports = PersonValidator