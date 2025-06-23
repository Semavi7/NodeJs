const { DataTypes } = require("sequelize")
const db = require("../db")


const Actor = db.sequelize.define("Actor", {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    actor_name: {
        type: DataTypes.STRING({ length: 50 })
    }
}, {
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    modelName: "Actor",
    tableName: "actor",
    timestamps: true,
    version: true,
    underscored: true
})


module.exports = Actor