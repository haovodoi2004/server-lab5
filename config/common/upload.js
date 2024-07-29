const multer = require('multer');

const _storege = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage: _storege });

module.exports = upload;
