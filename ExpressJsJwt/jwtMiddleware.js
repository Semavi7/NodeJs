const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    if(!req.url.includes('/login')){
        if(req.headers.authorization){
            const t = req.headers.authorization.split(' ')[1]
            jwt.verify(t, 'merhaba123*', (err, decode) => {
                if(err) {
                    return res.status(401).send({message: 'Oturum açmadan giremezsin'})
                }
                req.user = decode
                next()
            })
        }
        else{
            return res.status(401).send({message: 'Oturum açmadan giremezsin'})
        }
    }
    else{
        next()
    }
}