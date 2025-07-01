const amqp = require("amqplib")


module.exports = async () => {
    const connection = await amqp.connect({
    password: "guest",
    username: "guest"
})
return connection
}