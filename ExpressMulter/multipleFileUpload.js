const multer = require('multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'uploads')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '_' + Date.now() + '_' + 'Multer' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype.includes('image')){
        cb(null, true)
    }
    else{
        cb(new multer.MulterError(300, file.originalname), false)
    }
    
}

const upload = multer({storage:storage,fileFilter: fileFilter})

module.exports = upload