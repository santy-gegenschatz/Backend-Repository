const { logDebug } = require('../../loggers/logger')
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    }, 
    filename: function (req, file, cb) {
        console.log(req.body);
        cb(null, req.body.user + '.png');
    }
})

const upload = multer({storage: storage})

logDebug(' Creating upload middleware...')
module.exports = { upload }
