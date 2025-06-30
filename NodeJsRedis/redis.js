const { createClient } = require("redis")

const client = createClient()

const startApp = async() => {
    try {
      const connect = await client.connect()
      console.log(connect)
      const set = await client.set("mydata", Date.now())
      console.log(set)
      const set2 = await client.set("mydata2", "Burchan")
      console.log(set2)
      const get = await client.get("mydata")
      console.log(get)
      const get2 = await client.get("mydata2")
      console.log(get2)
      const del = await client.del("mydata2")
      console.log(del)
      const setex = await client.setEx("testkey", 10, "Derya")
      console.log(setex)
    } catch (error) {
        console.log(error)
    }
}

startApp()