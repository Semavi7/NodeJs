const amqp = require("amqplib")
const rabitmqConnection = require("./rabbitmqCollection")

const KEY = "emailkuyrugu"

module.exports = async (data) => {
    try {
        const connection = await rabitmqConnection()
        const channel = await connection.createChannel()
        await channel.assertQueue(KEY)
        channel.sendToQueue(KEY, Buffer.from(JSON.stringify(data)))
        console.log("Veri kuyruğa eklendi")
    } catch (error) {
        console.log('error', error)
    }
}