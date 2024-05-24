const multer = require('multer')


const storage = multer.diskStorage({
    filename: function (req, file, cd) {
        cd(null, file.originalname)
    }
});
const upload = multer({
    storage: storage
});

module.exports = upload;