const { logDebug, logError } = require('../../loggers/logger')
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    }, 
    filename: function (req, file, cb) {
            cb(null, req.user.id + '.png');
    }
})

const upload = multer({storage: storage})

module.exports = { upload }
