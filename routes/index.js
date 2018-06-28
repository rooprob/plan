var express = require('express');
var router = express.Router();

var users = require('../controllers/users.js');

/* GET home page. */
router.get('/', users.findAll) ;

module.exports = router;
