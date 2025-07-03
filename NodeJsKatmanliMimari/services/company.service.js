const Company = require("../models/company.model")
const companyDal = require("../dal/index")
const companyDto = require("../dto/company.dto")
const fileservice = require("./file.service")
const utils = require("../utils/index")
exports.createCompany = async (req) => {
    try {
        const { name, year, description } = req.body
        const company = new Company({
            name,
            year,
            description,
            logo: ""
        })
        const json = await companyDal.company.create(company)
        return { ...companyDto, name: json.name, year: json.year, description: json.description, logo: json.logo, id: json._id, createdAt: json.createdAt, updatedAt: json.updatedAt }
    } catch (error) {
        throw new Error(error)
    }
}
exports.updateCompany = async (req) => {
    try {
        const { id } = req.params
        const { name, year, description } = req.body
        const json = await companyDal.company.updateById(id, { name, year, description })
        return { ...companyDto, name, year, description, logo: json.logo, id: json._id, createdAt: json.createdAt, updatedAt: json.updatedAt }
    } catch (error) {
        throw new Error(error)
    }
}
exports.uploadLogo = async (req, res) => {
    try {
        const { id } = req.query
        const str = await fileservice.uploadImage(req, res)
        const json = await companyDal.company.updateById(id, { logo: str })
        console.log('str', str, json)
        return { ...companyDto, name: json.name, year: json.year, description: json.description, logo: str, id: json._id, createdAt: json.createdAt, updatedAt: json.updatedAt }
    } catch (error) {
        throw new Error(error)
    }
}
exports.updateLogo = async (req, res) => {
    try {
        const { id } = req.query
        const str = await fileservice.uploadImage(req, res)
        const findedCompany = await companyDal.company.findById(id)
        const isDeleted = utils.helpers.deleteFromDisk(findedCompany.logo ? findedCompany.logo.split("uploads/")[1] : "")
        if (isDeleted) {
            const json = await companyDal.company.updateById(id, { logo: str })
            console.log('str', str, json)
            return { ...companyDto, name: json.name, year: json.year, description: json.description, logo: str, id: json._id, createdAt: json.createdAt, updatedAt: json.updatedAt }
        }
        throw new Error("Dosya silme işlemi hatası")
    } catch (error) {
        throw new Error(error)
    }
}
exports.listCompany = async () => {
    try {
        const json = await companyDal.company.listAll()
        return json
    } catch (error) {
        throw new Error(error)
    }
}

exports.deleteCompanyById = async (req, res) => {
    try {
        const { id } = req.query
        const findedCompany = await companyDal.company.findById(id)
        const isDeleted = utils.helpers.deleteFromDisk(findedCompany.logo ? findedCompany.logo.split("uploads/")[1] : "")
        if (isDeleted) {
            const json = await companyDal.company.deleteById(id)
            return json
        }
        throw new Error("Dosya silme işlemi hatası")
    } catch (error) {
        throw new Error(error)
    }
}

exports.findCompanyById = async (req) => {
    try {
        const { id } = req.params
        const json = await companyDal.company.findById(id)
        return { ...companyDto, name: json.name, year: json.year, description: json.description, logo: json.logo, id: json._id, createdAt: json.createdAt, updatedAt: json.updatedAt }
    } catch (error) {
        throw new Error(error)
    }
}