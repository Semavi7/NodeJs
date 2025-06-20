const express = require('express')
const app = express()
const router = express.Router()

app.use(express.json())
let data = [
    {
        id: 1,
        ad: 'Burçhan',
        soyad: 'Gürses'
    },
    {
        id: 2,
        ad: 'Derya',
        soyad: 'Gürses'
    },
    {
        id: 3,
        ad: 'Zeki',
        soyad: 'Gürses'
    }
]

const UserListRouteMiddleware = require('./middleware/UserListRouteMiddleware')
const GlobalMiddleware = require('./middleware/GlobalMiddleware')
router.get('/',[UserListRouteMiddleware], (req, res) => {
    // res.send('Yasin')
    // res.json({ id: 1 })
    // res.status(400).json({ id: 1 })
    // res.sendFile(path.join(__dirname, '/s.png'))
    // res.cookie('myCookie', 'Deneme22', { expires: new Date(Date.now() + 900000), domain: 'localhost', httpOnly: true })
    // res.send('Tamam')
    // res.redirect('http://localhost:5000/users-list')
    // res.append('Set-Cookie', 'foo=bar; Path=/; HttpOnly')
    // res.attachment(path.resolve('./index.txt'))
    // res.sendFile(path.join(__dirname, '/index.txt'))
    // res.download('./s.png')
    // res.setHeader('test', 'Merhaba')
    // res.send('tamam')
    // res.links({
    //     firstLink: 'http://localhost:500?page=1',
    //     secondLink: 'http://localhost:500?page=2'

    // })
     res.send('tamam')
})


router.get('/user-list', (req, res) => {

    console.log('url', req.url)
    console.log('ctype', req.is('html'))
    console.log('getType', req.get('Content-Type'))
    console.log('hostname', req.hostname)
    console.log('headers', req.headers)
    console.log('protocol', req.protocol)
    console.log('ip', req.ip)
    console.log('httpVersion', req.httpVersion)
    console.log('path', req.path)
    console.log('isSecure', req.secure)
    res.status(200).json(data)
})

router.post('/user-create', (req, res) => {
    const body = req.body
    console.log(body)
    body.id = Date.now()
    data.push(body)
    res.status(201).json(body)
})

router.delete('/user-delete/:userId', (req, res) => {
    const userId = req.params.userId
    const newArr = data.filter((user) => {
        return user.id !== Number(userId)
    })
    data = newArr
    res.status(200).json({ message: userId + 'Numaralı kayıt silindi' })
})

router.put('/user-update/:userId', (req, res) => {
    const body = req.body
    const findedIndex = data.findIndex((user) => {
        return user.id === Number(req.params.userId)
    })
    data[findedIndex] = { ...body, id: req.params.userId }
    res.status(200).json(data[findedIndex])
})

app.use(GlobalMiddleware)
app.use(router)

app.listen(5000, () => {
    console.log('5000 numaralı portta çalışıyor');
})