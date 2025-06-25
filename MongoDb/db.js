const { MongoClient } = require('mongodb');
const client = new MongoClient("mongodb://localhost:27017")

const createConnection = async () => {
    try {
        await client.connect()
        const db = client.db("egitimdb")
        return db
    } catch (error) {
        console.error(error)
        throw error
    }
}

module.exports = { createConnection }