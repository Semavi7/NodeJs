const readline = require('readline')
const fs = require('fs')
const c = require('ansi-colors')
console.log(process.argv)

const fileName = process.argv[2]

const colors = ['red','blue','yellow','green','cyan']

const readFileByLine = async() => {
    const fileStream = fs.createReadStream(fileName)
    const rl = readline.createInterface({
        input: fileStream
    })

    for await (const Line of rl){
        const rNumber = Math.floor(Math.random() * 4)
        const rColor = colors[rNumber]
        console.log(c[rColor](Line))
    }
}

readFileByLine()