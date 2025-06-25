const { Sequelize, DataTypes } = require("sequelize")
const { Client } = require("whatsapp-web.js")
const qrcode = require("qrcode-terminal")
const sequelize = new Sequelize("wpdb", "root", "", {
    host: "localhost",
    dialect: "mysql"
})
let MESSAGES
const client = new Client()

const connetToDb = async () => {
    try {
        await sequelize.authenticate()
        MESSAGES = sequelize.define("Message", {
            from: {
                type: DataTypes.STRING
            },
            messageContent: {
                type: DataTypes.STRING
            }
        })
        // MESSAGES.sync({ force: true })

        client.on("qr", (qr) => {
            console.log('qr', qr)
            qrcode.generate(qr, { small: true })
        })
        client.on("message", (message) => {
            console.log(message)
            MESSAGES.create({
                from: message.from,
                messageContent: message.body
            })
        })
        client.on("ready", () => {
            console.log("Client Ready")
        })
        client.initialize()
    } catch (error) {
        console.log("Dbye Bağlanamadım");
    }
}

connetToDb()

//https://docs.wwebjs.dev/index.html