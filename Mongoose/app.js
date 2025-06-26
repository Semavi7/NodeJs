const { connectionMongoDb } = require("./db")
const Animal = require("./animal")
const Country = require('./country')
const Team = require('./teams')
const express = require("express")
const app = express()
const router = express.Router()

router.get("/listAllAnimal", async (req, res) => {
    try {
        const find = await Animal.find()
        res.status(200).json(find)
    } catch (error) {
        res.status(500).json({ error: "Bir Hata Gerçekleşti" })
    }
})

router.get("/getAnimalByI/:id", async (req, res) => {
    try {
        const findById = await Animal.findById(req.params.id)
        res.status(200).json(findById)
    } catch (error) {
        res.status(500).json({ error: "Bir Hata Gerçekleşti" })
    }
})

router.get("/findByAnimalName", async (req, res) => {
    try {
        const response = await Animal.findByAnimalName(req.query.name)
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ error: "Bir Hata Gerçekleşti" })
    }
})

router.get("/getAnimalByFamily", async (req, res) => {
    try {
        const find = await Animal.find().byFamily(req.query.family)
        res.status(200).json(find)
    } catch (error) {
        res.status(500).json({ error: "Bir Hata Gerçekleşti" })
    }
})

router.get("/findOne", async (req, res) => {
    try {
        const findOne = await Animal.findOne({ name: req.query.name })
        res.status(200).json(findOne)
    } catch (error) {
        res.status(500).json({ error: "Bir Hata Gerçekleşti" })
    }
})

router.get("/findWhere", async (req, res) => {
    try {
        const where = await Animal.where("name").equals(req.query.name)
        res.status(200).json(where)
    } catch (error) {
        res.status(500).json({ error: "Bir Hata Gerçekleşti" })
    }
})

router.get("/findByNameOrId", async (req, res) => {
    try {
        const findOr = await Animal.find({
            $and: [
                { $or: [{ name: req.query.name }, { _id: req.query.id }] }
            ]
        })
        res.status(200).json(findOr)
    } catch (error) {
        res.status(500).json({ error: "Bir Hata Gerçekleşti" })
    }
})

router.post("/createAnimal", async (req, res) => {
    try {
        const { name, family, age, live_area } = req.body
        const animal = new Animal({
            name,
            family,
            age,
            live_area
        })
        const animalSave = await animal.save()
        res.status(200).json(animal, animalSave)
        const errors = animal.validateSync()
        console.log(errors)
    } catch (err) { // Hata değişkeninin adını 'err' olarak değiştirdim, 'error' ile karışmaması için
        console.error("API Hatası (/createAnimal):", err); // GERÇEK HATAYI KONSOLA YAZDIR

        if (err.name === 'ValidationError') {
            // Bu bir Mongoose doğrulama hatasıdır
            // err.errors nesnesi hangi alanların neden geçersiz olduğuna dair detayları içerir
            console.log("Mongoose Doğrulama Hataları:", err.errors);
            res.status(400).json({ // İstemciye 400 Bad Request ve detayları gönder
                message: "Doğrulama Başarısız Oldu",
                errors: err.errors
            });
        } else {
            // Diğer tür hata_mesajı (örn: veritabanı bağlantı sorunu, beklenmedik hatalar)
            res.status(500).json({
                error: "Sunucuda Bir Hata Gerçekleşti",
                details: err.message // Genel bir hata mesajı ve hatanın mesajını gönder
            });
        }
    }
})

router.post("/createAnimals", async (req, res) => {
    try {
        const { data } = req.body
        const animalArr = []
        for (let index = 0; index < data.length; index++) {
            animalArr.push(new Animal({
                name: data[index].name,
                family: data[index].family,
                age: data[index].age,
                live_area: data[index].live_area
            }))

        }
        const insertMany = await Animal.insertMany(animalArr)
        res.status(200).json(insertMany)
    } catch (error) {
        res.status(500).json({ error: "Bir Hata Gerçekleşti" })
    }
})

router.get("/getAllAnimalsWithPagination", async (req, res) => {
    try {
        const limit = await Animal.find().select("family name live_area").limit(Number(req.query.limit)).skip(Number(req.query.skip)).sort({ [req.query.sort]: req.query.sortType })
        res.status(200).json(limit)
    } catch (error) {
        res.status(500).json({ error: "Bir Hata Gerçekleşti" })
    }
})

router.put("/updateAnimalById", async (req, res) => {
    try {
        const { name } = req.body
        const update = await Animal.findByIdAndUpdate({ _id: req.query.id }, {
            name
        })
        res.status(200).json(update)
    } catch (error) {
        res.status(500).json({ error: "Bir Hata Gerçekleşti" })
    }

    // const update2 = await Animal.updateOne({ _id: "685d0961699ce3043bf5a9a9" }, { name: "İnek" })
    // console.log('update2', update2)
})

router.delete("/deleteAnimalById/:id", async (req, res) => {
    try {
        const deleteId = await Animal.findByIdAndDelete(req.params.id)
        res.status(200).json(deleteId)
    } catch (error) {
        res.status(500).json({ error: "Bir Hata Gerçekleşti" })
    }
})

router.post("/createRelation", async (req, res) => {
    try {
        // const country = new Country({
        //     name: "Türkiye"
        // })
        // const save = await country.save()
        // const team = new Team({
        //     name: "Beşiktaş",
        //     team_year: new Date().getFullYear() - 1903,
        //     countryId: save._id
        // })
        // const save2 = await team.save()
        // country.teams.push(save2)
        // const save3 = await country.save()

        const country = await Country.findById("685d383adb475df11c8fb24c")
        const team = new Team({
            name: "Beşiktaş",
            team_year: new Date().getFullYear() - 1903,
            countryId: country._id
        })
        const save2 = await team.save()
        country.teams.push(save2)
        const save3 = await country.save()


        res.status(200).json(save2, save3)
    } catch (error) {
        res.status(500).json({ error: "Bir Hata Gerçekleşti" })
    }
})

router.get("/getRelation", async (req, res) => {
    try {
        const get = await Country.findOne({name: "Türkiye"}).populate({
            path: "teams",
            select: "name team_year",
            match: {
                name: "Beşiktaş"
            }
        })
        res.status(200).json(get)
    } catch (error) {
        res.status(500).json({ error: "Bir Hata Gerçekleşti" })
    }
})

router.get('/updateRelation', async(req, res) => {
    const country = await Country.findById('62922a8ef2782c273f515ebb')
    const arr = [...country.teams]

    console.log(arr.pop())
    console.log(arr)
    country.teams = [...arr]
    country.save().then((r) => {
            console.log('r', r)
        })
        // const team = new Team({
        //     name: 'Galatasaray',
        //     team_year: new Date().getFullYear() - 1905,
        //     countryId: country._id
        // })
        // team.save().then((t) => {
        //     country.teams.push(t)
        //     country.save().then((r) => {
        //         // res.json(r)
        //     })
        // })
})

const test = async() => {
    const country = await Country.findById('62922a8ef2782c273f515ebb')
    Team.deleteMany({ countryId: country._id }).then((r) => {
        console.log('r', r)
        Country.findByIdAndDelete(country._id).then((r) => {
            console.log('r', r)
        })
    })
    console.log(country.teams)

}

app.use(express.json())
app.use(router)


const Start = async () => {
    try {
        await connectionMongoDb()
        app.listen(5000, () => {
            console.log("Sunucu çalışıyor")
        })
    } catch (error) {
        console.error("Bir hata oluştu", error.message)
    }
}

Start()

//https://mongoosejs.com/docs/api.html#query_Query-and