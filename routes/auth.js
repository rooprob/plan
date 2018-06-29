var express = require('express');
var jwt = require('jsonwebtoken');
var config = require('../config');
var verify = require('../middleware/auth');

var router = express.Router();

var User = require('../models/user');

router.post('/register', function(req, res) {
	User.create({
		name : req.body.name,
		email : req.body.email,
		password : req.body.password
	},
		function (err, user) {
			if (err) return res.status(500).send({ message: "Already registered username or email address." })
			// create a token
			var token = jwt.sign({ id: user._id }, config.secret, {
				expiresIn: 86400 // expires in 24 hours
			});
			res.status(200).json({ auth: true, token: token });
		});
});

router.post('/login', function(req, res) {
	User.auth({
		name : req.body.name,
		email : req.body.email,
		password : req.body.password
	},
		function (err, user) {
			if (err) return res.status(500).send({ message: "Authentication failed." })
			// create a token
			var token = jwt.sign({ id: user._id }, config.secret, {
				expiresIn: 86400 // expires in 24 hours
			});
			res.status(200).json({ auth: true, token: token });
		});
});

router.get('/me', verify, function(req, res) {
  User.fetchById(req.userId, ['password'], function (err, user) {
    if (err) return res.status(500).send({message: "There was a problem finding the user."});
    if (!user) return res.status(404).send({message: "No user found."});
    res.status(200).send(user);
  });
});

module.exports = router;
