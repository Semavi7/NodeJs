const Title = require("../models/titles.model")
const TitleDataAccess = {
    async create(titleModel) {
        return await titleModel.save()
    },
    async updateById(id, body) {
        return await Title.findByIdAndUpdate({_id: id}, body)
    },
    async listAll() {
        return await Title.find({})
    },
    async deleteById(id) {
        return await Title.findByIdAndDelete({ _id: id })
    },
    async findById(id){
        return await Title.findById({ _id: id })
    },
    async findOnePopulate(where, populate) {
        return await Title.findOne(where).populate(populate)
    }
}

module.exports = TitleDataAccess