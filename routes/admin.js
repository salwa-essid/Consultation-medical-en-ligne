var express = require('express');
var router = express.Router();
var adminController = require("../controllers/adminController")
var security = require("../controllers/securityController")
var accessControl = require("../middleware/accessAuthorization")
var policyControl = require("../middleware/policyControl")

router.post('/admin/register', adminController.register);
router.post('/admin/login',security.admintLogin)





module.exports = router;
