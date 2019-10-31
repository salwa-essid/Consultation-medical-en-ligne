const rTrim = require('../tools/lTrim');
var responsRender = require("../middleware/responseRender");
var ServerMessage = require("../constant/messages");
var ServerErrors = require("../constant/errors");

module.exports = function (req, res, next) {
    if (!req.file) return req.status(400).json(responsRender(null, ServerErrors.INVALID_FILE, ""))
    // let allowedFormat = ['image/jpg', 'image/jpeg', 'image/pjpeg', 'image/x-png', 'image/png'];
    // if (allowedFormat.indexOf(req.file.mimetype) < 0) return next(createError(423, "Uploaded file is not a valid image. Only JPG and PNG files are allowed."));
    let fileName = rTrim(process.env.APP_URL + ":" + process.env.PORT, "/") + "/images/uploads/" + req.file.filename;
    return res.status(200).json(responsRender(fileName, null, ServerMessage.OK))
}