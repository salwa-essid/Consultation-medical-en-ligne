var express = require('express');
var router = express.Router();
var psyController = require("../controllers/PsyController")
var security = require("../controllers/securityController")
var accessControl = require("../middleware/accessAuthorization")
var policyControl = require("../middleware/policyControl")

// const multer =require('multer')
// const upload = multer({dest:__dirname + '/upload/images'})


router.post('/psy/register', psyController.register);
router.delete('/psy/delete/:id',psyController.delete);
router.get('/psy/list',psyController.list)
router.post('/psy/login',security.psyLogin)
router.get('/psy/rdv/list',accessControl.AuthorizationCheck,policyControl.isPsy,psyController.getAllRdv)
router.get('/psy/:id',psyController.getPsy)




module.exports = router;
