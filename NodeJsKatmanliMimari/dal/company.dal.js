const Company = require("../models/company.model")
const CompanyDataAccess = {
    async create(companyModel) {
        return await companyModel.save()
    },
    async updateById(id, body) {
        return await Company.findByIdAndUpdate({_id: id}, body)
    },
    async listAll() {
        return await Company.find({})
    },
    async deleteById(id) {
        return await Company.findByIdAndDelete({ _id: id })
    },
    async findById(id){
        return await Company.findById({ _id: id })
    },
    async findOnePopulate(where, populate) {
        return await Company.findOne(where).populate(populate)
    }
}

module.exports = CompanyDataAccess