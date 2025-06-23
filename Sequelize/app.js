const express = require("express")
const app = express()
const router = express.Router()
const db = require("./db")
const { Op, NUMBER, QueryTypes } = require("sequelize");
const TestModel = require("./models/test-model")
const SocialModel = require("./models/social-model")
const UserModel = require("./models/user-model")
UserModel.hasMany(SocialModel, { foreignKey: "user_id" })
SocialModel.belongsTo(UserModel)

router.post("/createData", async (req, res) => {
    // const test = new TestModel({
    //     testAd: "Burchan",
    //     testSoyad: "Gürses"
    // })
    const { testAd, testSoyad } = req.body
    try {
        const testData = await TestModel.create({
            testAd,
            testSoyad
        }, { logging: true, validate: true })
        console.log('res', testData)
        res.status(201).json(testData)
    } catch (err) {
        res.status(500).json({ message: "Hata Gerçeklerşti" })
        console.log('err', err.errors[0].message)
    }
})

router.get("/getAllData", async (req, res) => {
    try {
        const response = await TestModel.findAll({
            // attributes: ["id", "testAd"],
            logging: true
        })
        res.json(response)
        // res.forEach((item) => {
        //     console.log("item" + "-" + JSON.stringify(item.dataValues))
        // })
    } catch (err) {
        res.status(500).json({ message: "Hata Gerçeklerşti" })
        console.log('err', err)
    }
})

router.delete("/deleteData/:dataId", async (req, res) => {
    const { dataId } = req.params
    try {
        const findedData = await TestModel.findByPk(dataId)
        const removeData = await findedData.destroy({ logging: true, force: true })
        console.log('removeData', removeData)
        res.status(200).json(removeData)
    } catch (err) {
        res.status(500).json({ message: "Hata Gerçeklerşti" })
        console.log('err', err)
    }
})

router.post("/createMultiple", async (req, res) => {
    const { data } = req.body
    try {
        const response = await TestModel.bulkCreate(data)
        res.status(200).json(response)
    } catch (err) {
        res.status(500).json({ message: "Hata Gerçeklerşti" })
        console.log('err', err)
    }
})

router.post("/findOrCreate", async (req, res) => {
    const { testModel } = req.body
    try {
        const [data, İsCreated] = await TestModel.findOrCreate({
            where: {
                testAd: testModel.testAd
            },
            defaults: testModel
        })
        if (İsCreated) {
            res.status(200).json({ isExist: false, ...data })
            return
            console.log('İsCreated', data)
        }
        res.status(200).json({ isExist: true, ...data })
    } catch (error) {
        res.status(500).json({ message: "Hata Gerçeklerşti" })
    }
})

router.put("/updateData/:dataId", async (req, res) => {
    const { dataId } = req.params
    const { testAd, testSoyad } = req.body
    try {
        const isUpdated = await TestModel.update({ testAd: testAd, testSoyad: testSoyad }, { where: { test_id: dataId } })
        res.status(200).json(isUpdated)
    } catch (err) {
        console.log('err', err)
        res.status(500).json({ message: "Hata Gerçeklerşti" })
    }
})

router.get("/getTestDataById/:dataId", async (req, res) => {
    const { dataId } = req.params
    try {
        const findedData = await TestModel.findByPk(dataId)
        res.status(200).json(findedData)
    } catch (error) {
        res.status(500).json({ message: "Hata Gerçeklerşti" })
    }
})

router.get("/getTestDataWithPagination", async (req, res) => {
    const { limit, offset } = req.query
    const response = await TestModel.findAndCountAll({
        limit: Number(limit),
        logging: true,
        offset: Number(offset)
    })
    res.status(200).json(response)
    response.rows.forEach((item) => {
        console.log("item", JSON.stringify(item.dataValues))
    })
})

router.get("/getTestDataByQuery/:dataId", async (req, res) => {
    const { dataId } = req.params
    const response = await db.sequelize.query("SELECT * FROM test WHERE test_id = :testid", {
        replacements: {
            testid: dataId
        },
        logging: console.log,
        type: QueryTypes.SELECT
    })
    res.status(200).json(response)
})

router.get("/filterData", async (req, res) => {
    try {
        // where: {
        //         testAd: "Burchan",
        //         testSoyad: "Gürses"
        //     }
        const findedData = await TestModel.findAll({
            where: {
                // [Op.or]: [{ testAd: "Burchan" }, { testSoyad: "Gürses" }]
                testAd: {
                    // [Op.ne]: "Burchan"
                    [Op.startsWith]: 'R'
                }
            }
        })
        res.status(200).json(findedData)
        console.log('findedData', findedData)
    } catch (err) {
        console.log('err', err)
    }
})

router.post('/createDataWithTransaction', async (req, res) => {
    const t = await db.sequelize.transaction()
    const { testAd, testSoyad } = req.body
    try {
        //   const res = await test.save({ logging: true })
        const testData = await TestModel.create({
            testAd,
            testSoyad
        }, { logging: true, validate: true })

        await t.commit()
        console.log('res', testData)
        res.status(200).json(testData)
    } catch (error) {
        await t.rollback()
        console.log('error', error)
        res.status(500).json({ message: 'Hata Gerçekleşti' })

        //console.log('err', error.errors[0].message, error.errors[1].message)
    }
})

app.use(express.json())
app.use(router)

app.listen(5000, async () => {
    await db.connect()
    // await db.createTables()
    console.log("done !")
})


const cerateDataWithRelational = async () => {
    const user = await UserModel.create({
        userName: "Burchan"
    }, { logging: true })
    const social = await SocialModel.create({ socialMediaName: "Instagram" })
    const userWithSocial = await user.addSocial(social)
    console.log('userWithSocial', userWithSocial)
}

cerateDataWithRelational()