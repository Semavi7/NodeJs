const { DataTypes } = require("sequelize")
const db = require("../db")


const UserModel = db.sequelize.define("User", {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    userName: {
        type: DataTypes.STRING({ length: 50 })
    }
}, {
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    modelName: "UserModel",
    tableName: "user",
    timestamps: true,
    version: true,
    underscored: true
})


module.exports = UserModel