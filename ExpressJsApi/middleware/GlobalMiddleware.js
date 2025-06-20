module.exports = (req, res, next) => {
    if (!req.url.includes('/user-list')) {
        if (req.query.ad === 'burchan') {
            console.log('Middleware 1 çalısıyor')
            next()
        } else {
            res.send('Adı yasin olan geçebilir')
        }
    } else {
        next()
    }
}