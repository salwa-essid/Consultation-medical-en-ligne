var express = require('express');
var router = express.Router();
var patientController = require("../controllers/patientController")
var security = require("../controllers/securityController")
var accessControl = require("../middleware/accessAuthorization")
var policyControl = require("../middleware/policyControl")

router.post('/patient/register', patientController.register);
router.delete('/patient/delete/:id',patientController.delete);
router.post('/patient/login',security.patientLogin)
router.post('/patient/rdv/add',accessControl.AuthorizationCheck,policyControl.isPatient,patientController.addRdv)
router.get('/patient/list',patientController.list)
router.get('/patient/:id',patientController.getpatient)
router.put('/patient/modify', patientController.update)

module.exports = router;
