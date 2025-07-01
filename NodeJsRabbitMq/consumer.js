const amqp = require("amqplib")
const rabitmqConnection = require("./rabbitmqCollection")
const KEY = "emailkuyrugu"
const onConsumerData = async () => {
    const connection = await rabitmqConnection()
    const channel = await connection.createChannel()
    await channel.assertQueue(KEY)
    channel.consume(KEY, (data) => {
        console.log(JSON.parse(data.content.toString()))
        const _data = JSON.parse(data.content.toString())
        setTimeout(() => {
            console.log("email gönderildi", _data.email)
            channel.ack(data)
        },5000)
    })
}
onConsumerData()