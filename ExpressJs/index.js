import express from 'express'
const app = express()
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use('/assets', express.static('assets'))


// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '/index.html'))
// })

// app.get('/user', (req, res) => {
//     res.sendFile(path.join(__dirname, '/user.html'))
// })

// app.get('/profile', (req, res) => {
//     res.send('profile')
// })

// app.get('/test', (req, res) => {
// //    res.sendFile(path.join(__dirname, '/test.html'))
//     res.redirect('/user')
// })

// app.get('/getjson', (req, res) => {
//     res.json({id: 1, ad: 'Burchan'})
// })

// app.get('/deneme', (req,res) => {
//     res.send('Get Request')
// })

// app.post('/deneme', (req,res) => {
//     res.send('Post Request')
// })

// app.put('/deneme', (req,res) => {
//     res.send('Put Request')
// })

// app.delete('/deneme', (req,res) => {
//     res.send('Delete Request')
// })

const router = express.Router()

import appRouter from './Router/router.js'
app.set('view engine', 'ejs')
app.use(appRouter)



app.listen(5000, () => {
    console.log('Proje http://localhost:5000 numaralı portta çalışıyor')
})