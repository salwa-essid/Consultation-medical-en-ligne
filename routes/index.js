var express = require('express');
var router = express.Router();
var responseRender = require("../middleware/responseRender")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json(responseRender(null,"","Welcome to consulting"))
});

module.exports = router;
