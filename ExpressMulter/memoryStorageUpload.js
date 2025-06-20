const multer = require('multer')


const storage = multer.memoryStorage({
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '_' + Date.now() + '_' + 'Multer' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype.includes('image')) {
        cb(null, true)
    }
    else {
        cb(new multer.MulterError(300, file.originalname), false)
    }

}

const upload = multer({ storage: storage, fileFilter: fileFilter, limits:{fileSize: 3000000} }).any()

module.exports = upload