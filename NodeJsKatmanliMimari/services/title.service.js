const Title = require("../models/titles.model")
const titleDal = require("../dal/index")
const titleDto = require("../dto/title.dto")
exports.createTitle = async (req) => {
    try {
        const { name } = req.body
        const title = new Title({
            name,
            persons: []
        })
        const json = await titleDal.title.create(title)
        return { ...titleDto, name: json.name, id: json._id, createdAt: json.createdAt, updatedAt: json.updatedAt }
    } catch (error) {
        throw new Error(error)
    }
}

exports.listtitle = async () => {
    try {
        const json = await titleDal.title.listAll()
        return json
    } catch (error) {
        throw new Error(error)
    }
}

exports.findTitleById = async (req) => {
    try {
        const { id } = req.params
        const json = await titleDal.title.findById(id)
        return { ...titleDto, name: json.name, createdAt: json.createdAt, updatedAt: json.updatedAt }
    } catch (error) {
        throw new Error(error)
    }
}

exports.updateTitle = async (req) => {
    try {
        const { id } = req.params
        const { name } = req.body
        const json = await titleDal.title.updateById(id, { name })
        return { ...titleDto, name, createdAt: json.createdAt, updatedAt: json.updatedAt }
    } catch (error) {
        throw new Error(error)
    }
}

exports.deleteTitleById = async (req, res) => {
    try {
        const { id } = req.params
        const json = await titleDal.title.deleteById(id)
        return json
    } catch (error) {
        throw new Error(error)
    }
}