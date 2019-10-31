const multer = require('multer');
const path = require('path');
const fs = require('fs');
const uuid = require("uuid/v4")
const uploadDir = 'public/images/uploads';

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        try {
            fs.statSync(uploadDir);
        } catch (e) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const fileName = uuid() + path.extname(file.originalname);
        cb(null, fileName);
    }
});

module.exports = multer({ storage: storage });