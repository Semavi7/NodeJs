module.exports = (req,res,next) => {
    if(req.query.id == 3) {
        next()
    }
    else{
        res.send('Id 3 olan kullanıcılar girebilir')
    }
}