const Person = require("../models/person.model")
const PersonDataAccess = {
    async create(personModel) {
        return await personModel.save()
    },
    async updateById(id, body) {
        return await Person.findByIdAndUpdate({_id: id}, body)
    },
    async listAll(where = {}, populate) {
        return await Person.find(where).select('_id name surname birthDate gender salary tcNumber email avatar cvFile country city title company').populate(populate)
    },
    async listAllWithPagination(where = {}, populate, limit, skip, sort) {
        return await Person.find(where)
            .limit(limit)
            .skip(skip)
            .sort(sort)
            .select('_id name surname birthDate gender salary tcNumber email avatar cvFile country city title company').populate(populate)
    },
    async deleteById(id) {
        return await Person.findByIdAndDelete({ _id: id })
    },
    async findById(id){
        return await Person.findById({ _id: id })
    },
    async findOne(where){
        return await Person.findOne(where)
    },
    async findOnePopulate(where, populate) {
        return await Person.findOne(where).populate(populate)
    },
    async deleteMultiple(where) {
        return await Person.deleteMany(where)
    }
}

module.exports = PersonDataAccess