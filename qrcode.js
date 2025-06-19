const qrcode = require('qrcode-terminal')
const readline = require('readline')
const process = require('process')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
rl.question('Qr ne için oluşturulsun? \r\n', (ans) => {
    qrcode.generate(ans, { small: true })
    rl.close()
})