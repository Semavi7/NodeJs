import express, {Request,Response} from 'express'

const app = express()

const router = express.Router()

interface User{
    id: string,
    ad: string,
    soyad: string
}

router.get('/user', (req:Request,res:Response) => {
    const arr:User[] = [{ad:'Ali', id:'1',soyad:'Saydam'},{ad:'Mehmet', id:'2',soyad:'Yılmaz'}]
    res.status(200).json(arr)
})

router.post('/user', (req:Request,res:Response) => {
    const obj:User={ad:'Burçhan', id:'3',soyad:'Gürses'}
    res.status(200).json(obj)
})

app.use(router)

app.listen(5000, () => {
    console.log('http://localhost:5000 numaralı portta dinliyor');
})