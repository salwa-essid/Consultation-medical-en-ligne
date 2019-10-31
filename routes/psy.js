var express = require('express');
var router = express.Router();
var psyController = require("../controllers/PsyController")
var security = require("../controllers/securityController")
var accessControl = require("../middleware/accessAuthorization")
var policyControl = require("../middleware/policyControl")
const upload = require('../tools/upload');
const uploadController = require('../controllers/uploadController');

router.post('/psy/register', psyController.register);
router.delete('/psy/delete/:id', psyController.delete);
router.get('/psy/list', psyController.list)
router.post('/psy/login', security.psyLogin)
router.get('/psy/rdv/list', accessControl.AuthorizationCheck, policyControl.isPsy, psyController.getAllRdv)
router.get('/psy/:id', psyController.getPsy)
router.post("/psy/upload", upload.single('file'), uploadController);
router.get("/psy/auth/profile", accessControl.AuthorizationCheck, policyControl.isPsy, psyController.profile);




module.exports = router;