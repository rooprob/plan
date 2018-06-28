var express = require('express');
var planRouter = require('./plan');

var router = express.Router();

router.get('/', function(req, res) {
  res.json({message: 'api landing'});
});

router.use('/plan/:userId', planRouter);

module.exports = router;
