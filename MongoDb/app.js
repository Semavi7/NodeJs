const express = require("express")
const app = express()
const router = express.Router()
const { createConnection } = require("./db")
const ObjectId = require('mongodb').ObjectId
let db

router.get("/listAllAuthors", async (req, res) => {
    try {
        // const response = await db.collection("author").find({
        //     $or: [{ name: "Franz" }, { surname: "Atay" }]
        // }).toArray()
        const response = await db.collection("author").find({}).toArray()
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ error: "Bir Hata Gerçekleşti" })
    }
})

router.post("/createAuthor", async (req, res) => {
    try {
        const { name, surname, books } = req.body
        const response = await db.collection("author").insertOne({
            name,
            surname,
            books
        })
        // const response2 = await db.collection("author").findOne({
        //     _id: response.insertedId
        // })
        res.status(200).json({ _id: response.insertedId, name, surname, books })
    } catch (error) {
        res.status(500).json({ error: "Bir Hata Gerçekleşti" })
    }
})

router.get("/findAuthorByName", async (req, res) => {
    try {
        const response = await db.collection("author").findOne({
            name: req.query.name
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ error: "Bir Hata Gerçekleşti" })
    }
})

router.post("/createMultipleAuthor", async (req, res) => {
    try {
        const { data } = req.body
        const response = await db.collection("author").insertMany(data)
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ error: "Bir Hata Gerçekleşti" })
    }
})

router.get("/listAuthorWithPagination", async (req, res) => {
    try {
        const response = await db.collection("author").find({}).skip(Number(req.query.skip)).limit(Number(req.query.limit)).toArray()
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ error: "Bir Hata Gerçekleşti" })
    }
})

router.get("/listAuthorWithSortName", async (req, res) => {
    try {
        const response = await db.collection("author").find({}).sort({ name: Number(req.query.order) }).toArray()
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ error: "Bir Hata Gerçekleşti" })
    }
})

router.put("/updateAuthorById/:authorId", async (req, res) => {
    try {
        const { name, surname } = req.body
        const { authorId } = req.params
        const response = await db.collection("author").updateOne({ _id: new ObjectId(authorId) }, {
            $set: {
                name: name,
                surname: surname
            }
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ error: "Bir Hata Gerçekleşti" })
    }
})

router.delete("/deleteAuthorById/:authorId", async(req,res) => {
    try {
        const response = await db.collection("author").deleteOne({
            _id: new ObjectId(req.params.authorId)
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ error: "Bir Hata Gerçekleşti" })
    }
})

app.use(express.json())
app.use(router)

const startServer = async () => {
    try {
        db = await createConnection();
        app.listen(5000, () => {
            console.log("Sunucu çalışıyor")
        })
    } catch (error) {
        console.log('error', error)
    }
}

startServer()





//https://www.mongodb.com/docs/manual/reference/operator/query/