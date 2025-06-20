const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const jwtMiddleware = require('./jwtMiddleware')
const router = express.Router()
app.use(express.json())

router.post('/login', (req, res, next) => {
    const { username, password } = req.body
    const token = jwt.sign({
        ad: username,
        id: Date.now(),
        issuer: 'www.abc.com',
        audience: 'abc.com'
    }, 'merhaba123*', { expiresIn: '5m' })
    res.json({ name: username, token})
})

router.get('/user', (req, res) => {
    res.send('başarılı giriş')
})

router.get('/products', (req, res) => {
    res.send('başarılı giriş')
})

app.use(jwtMiddleware)
app.use(router)

app.listen(5000, () => {})