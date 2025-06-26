const mongoose = require('mongoose');


exports.connectionMongoDb = async() => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/', {
            minPoolSize: 20,
            maxPoolSize: 40,
            autoIndex: true,
            compressors: "zlib",
            connectTimeoutMS: 5000,
            dbName: "mytestdb"
        })
        console.log("connected !")
    } catch (error) {
        console.log('error', error)
        throw new Error(error)
    }
}