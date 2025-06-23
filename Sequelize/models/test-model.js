const { DataTypes } = require("sequelize")
const db = require("../db")


const TestModel = db.sequelize.define("Test", {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        field: "test_id"
    },
    testAd: {
        type: DataTypes.STRING({ length: 50 }),
        defaultValue: "Ali",
        get() {
            const val = this.getDataValue("testAd")
            console.log("getter çalışıyor")
            this.setDataValue("testAd", val.toUpperCase())
        },
        set(value) {
            console.log("setter çalışıyor")
            this.setDataValue("testAd", value.toUpperCase())
        }
    },
    testSoyad: {
        type: DataTypes.CHAR({ length: 50 }),
        validate: {
            isEmail: {
                msg: "Bu alana Email gir"
            },
            customValidate(value) {
                if (value === "yasin") {
                    throw new Error("Yasin Değeri Girilemez")
                }
            }
        },
        defaultValue: "Veli"
    },
    testFullName: {
        type: DataTypes.VIRTUAL,
        get() {
            return this.testAd + "-" + this.testSoyad
        }
    }
}, {
    createdAt: true, updatedAt: true, deletedAt: true, modelName: "TestModel", tableName: "test", timestamps: true, version: true, hooks: {
        beforeValidate: (model) => {
            console.log("BeforeValidate", model)
        }
    }
})

TestModel.addHook("afterCreate", (m) => {
    console.log("afterCreate", m)
})

module.exports = TestModel