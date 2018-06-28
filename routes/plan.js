var express = require('express')
  , fs = require('fs');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  fs.readFile('public/markdown/plan.md', {"encoding": "utf8"}, function(err, data) {
    res.json(data);
  });
});

module.exports = router;
