import express from 'express'
import {GetParameters, Index} from '../Controller/indexController.js'
const router = express.Router()

router.get('/deneme2', Index)

router.get('/deneme2/:markaAdi/arac/:segirAdi', GetParameters)

router.use((req,res) => {
    res.status(404).json({mesage: 'Aranan kaynak bulunamadı', url: req.url, date: Date.now(), statusCode: 404})
})

export default router