var express = require('express')
  , markdown = require('markdown').markdown
  , path = require('path')
  , logger = require('morgan')
  , fs = require('fs');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  fs.readFile('public/markdown/plan.md', {"encoding": "utf8"}, function(err, data) {
    res.send(markdown.toHTML(data));
  });
});

module.exports = router;
