const { DataTypes } = require("sequelize")
const db = require("../db")


const SocialModel = db.sequelize.define("Social", {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    socialMediaName: {
        type: DataTypes.STRING({ length: 50 })
    }
}, {
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    modelName: "SocialModel",
    tableName: "Social",
    timestamps: true,
    version: true,
    underscored: true
})


module.exports = SocialModel