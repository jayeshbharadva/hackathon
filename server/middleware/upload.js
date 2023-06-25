const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const destinationPath = path.join(__dirname, '..', 'uploads');
        return cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split("/")[1];
        const date =  Date.now();
        return cb(null, `${date}-${file.originalname}.${ext}`);
    }
});

const upload = multer({ storage });

module.exports = upload;
