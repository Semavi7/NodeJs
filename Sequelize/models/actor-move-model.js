const { DataTypes } = require("sequelize")
const db = require("../db")


const Actor_Movie = db.sequelize.define("Actor_Movie", {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    }
}, {
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    modelName: "Avtor_Movie",
    tableName: "actor_movie",
    timestamps: true,
    version: true,
    underscored: true
})


module.exports = Actor_Movie