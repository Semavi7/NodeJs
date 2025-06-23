const express = require("express")
const app = express()
const router = express.Router()
const db = require("./db")
const { Op, NUMBER, QueryTypes } = require("sequelize");
const TestModel = require("./models/test-model")
const SocialModel = require("./models/social-model")
const UserModel = require("./models/user-model")
const Actor_Movie = require("./models/actor-move-model")
const Actor = require("./models/actor-model")
const Movie = require("./models/move-model")
Actor.belongsToMany(Movie, { through: Actor_Movie, foreignKey: "actor_id" })
Movie.belongsToMany(Actor, { through: Actor_Movie, foreignKey: "movie_id" })
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

router.post("/createWithRelation", async (req, res) => {
    // const user = await UserModel.create({
    //     userName: "Burchan"
    // }, { logging: true })
    const socialMedia = await SocialModel.findByPk(5)
    const socialMedi2 = await SocialModel.findByPk(6)
    const user = await UserModel.findByPk(2)
    const _removes = await user.removeSocials([socialMedia, socialMedi2])
    console.log('_removes', _removes)
    // const x = await user.createSocial({ socialMediaName: "pinterest" })
    const data = await user.getSocials()
    const count = await user.countSocials()
    const social = await SocialModel.create({ socialMediaName: "FaceBook" })
    const social2 = await SocialModel.create({ socialMediaName: "WhatsApp" })
    const result = await user.addSocials([social, social2])
    console.log('result', result)
    // const social = await SocialModel.create({ socialMediaName: "Instagram" })
    // const userWithSocial = await user.addSocial(social)
    // console.log('userWithSocial', userWithSocial)
})

router.get("/getUserWithSocials", async (req, res) => {
    const data = await UserModel.findAll({
        where: {
            id: 2
        },
        include: {
            model: SocialModel,
            attributes: ["socialMediaName", "id"],
            where: {
                social_media_name: {
                    [Op.in]: ["Pinterest"]
                }
            }
        }
    })
    res.json(data)
})

router.post("/ManyToManyRelations", async (req, res) => {
    // const actor = await Actor.findByPk(2)
    const movie = await Movie.findByPk(4)
    const actor1 = await Actor.create({ actor_name: "Abc" })
    const actor2 = await Actor.create({ actor_name: "Def" })
    // const actor = await Actor.create({ actor_name: "Brad Pit" })
    // const movie = await Movie.create({ movie_name: "abc" })
    // const movie2 = await Movie.create({ movie_name: "abc2" })
    // const result = await actor.addMovie(movie)
    // const result = await actor.addMovies([movie, movie2])
    const result = await movie.addActors([actor1, actor2])
    console.log('result', result)
})

router.get("/manyToManyGetMoviesWithActor/:dataId", async (req, res) => {
    const { dataId } = req.params
    const actor = await Actor.findByPk(dataId)
    const result = await actor.getMovies()
    res.status(200).json(result)
})

router.get("/manyToManyGetMoviesWithMovie/:dataId", async (req, res) => {
    const { dataId } = req.params
    const movie = await Movie.findByPk(dataId)
    const result = await movie.getActors()
    res.status(200).json(result)
})

router.post("/manyToManyCreateActorWithMovie/:dataId", async (req, res) => {
    const { dataId } = req.params
    const { movie_name } = req.body
    const actor = await Actor.findByPk(dataId)

    const x = await actor.createMovie({ movie_name })
    res.status(200).json(x)
})

router.get("/manyToManyGetMoviesWithActorCount/:dataId", async (req, res) => {
    const { dataId } = req.params
    const actor = await Actor.findByPk(dataId)
    const count = await actor.countMovies()
    res.status(200).json({ count })

})

router.delete("/manyToManyRemoveRelation/:dataId/:movieId", async (req, res) => {
    const { dataId, movieId } = req.params
    const actor = await Actor.findByPk(dataId)
    const movie = await Movie.findByPk(movieId)
    const r = await actor.removeMovie(movie)
    res.status(200).json({ reult: r })
})

router.get("/monyToManyListDataForActor/:dataId", async (req, res) => {
    const { dataId } = req.params
    const data = await Actor.findAll({
        where: {
            id: dataId
        },
        include: {
            model: Movie,
            where: {
                movie_name: {
                    [Op.eq]: ["abc2"]
                }
            },
            through: { attributes: [] }
        }
    })
    res.json(data)
})

app.use(express.json())
app.use(router)

app.listen(5000, async () => {
    await db.connect()
    // await db.createTables()
    console.log("done !")
})

