const express = require('express')
const app = express()
const singleFileUpload = require('./singleFileUpload')
const multipleFileUpload = require('./multipleFileUpload')
const differentFieldsFileUpload = require('./differentFieldsFileUpload')
const anyUpload = require('./anyUpload')
const memoryStorageUpload = require('./memoryStorageUpload')
const multer = require('multer')

app.use(express.json())

const router = express.Router()

router.get('/', (req,res) => {
    res.send('Merhaba')
})

router.post('/fileUpload', (req,res) => {
    singleFileUpload(req, res, (err) => {
        if(err){
            res.json(err)
        }
        else{
            res.send('okey')
        }
        console.log(req.file);
    })
})


const _upload = multipleFileUpload.array('dosya', 5)
router.post('/multipleFileUpload', (req,res) => {
    _upload(req, res, (err) => {
        if(err instanceof multer.MulterError){
            console.log('multererr', err);
            res.json(err)
        }
        else{
            console.log('hata', err);
        }
        if(err){
            res.send('hata var')
        }
        else{
            res.send('okey')
        }
    })
})

router.post('/differentFieldsFileUpload', (req,res) => {
    differentFieldsFileUpload(req, res, (err) => {
        if(err){
            res.json(err)
        }
        else{
            res.send('okey')
        }
        console.log(req.files);
    })
})

router.post('/anyUpload', (req,res) => {
    anyUpload(req, res, (err) => {
        if(err){
            res.json(err)
        }
        else{
            res.send('okey')
        }
        console.log(req.files);
    })
})

router.post('/memoryStorageUpload', (req,res) => {
    memoryStorageUpload(req, res, (err) => {
        if(err){
            res.json(err)
        }
        else{
            res.send('okey')
        }
        console.log(req.files);
    })
})

app.use(router)

app.listen(5000)